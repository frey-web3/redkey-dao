'use client';

import React, { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import { useActiveAccount } from 'thirdweb/react';
import { ArrowLeft, Clock, DollarSign, TrendingUp, Calendar, AlertTriangle, MessageSquare, Send } from 'lucide-react';
import Link from 'next/link';
import DaoNavbar from '../../components/DaoNavbar';
import VotingPanel from '../../components/VotingPanel';
import { STATUS_CONFIG, RISK_LEVELS } from '../../config';
import { seedIfNeeded, getProposal, castProposalVote, hasVotedProposal, getComments, addComment, getMember } from '@/lib/local-dao-store';
import type { Proposal, ProposalComment, VoteChoice } from '../../types';

function formatTimeAgo(ts: number): string {
    const diff = Date.now() - ts;
    const hrs = Math.floor(diff / 3600000);
    if (hrs < 24) return `${hrs}h`;
    return `${Math.floor(hrs / 24)}d`;
}

export default function ProposalDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const account = useActiveAccount();
    const [proposal, setProposal] = useState<Proposal | null>(null);
    const [comments, setComments] = useState<ProposalComment[]>([]);
    const [hasVoted, setHasVoted] = useState(false);
    const [userVote, setUserVote] = useState<VoteChoice | undefined>();
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(true);

    const reload = () => {
        const p = getProposal(id);
        if (p) { setProposal({ ...p }); }
        setComments(getComments(id));
        if (account) setHasVoted(hasVotedProposal(id, account.address));
    };

    useEffect(() => {
        seedIfNeeded();
        reload();
        setLoading(false);
    }, [id, account]);

    if (loading) return <div className="min-h-screen bg-[#060608]"><DaoNavbar /><div className="flex items-center justify-center h-[60vh]"><span className="text-gray-600 font-mono text-xs">LOADING...</span></div></div>;
    if (!proposal) return <div className="min-h-screen bg-[#060608]"><DaoNavbar /><div className="flex items-center justify-center h-[60vh]"><span className="text-gray-600 font-mono text-xs">PROPOSAL NOT FOUND</span></div></div>;

    const statusCfg = STATUS_CONFIG[proposal.status];
    const riskCfg = RISK_LEVELS[proposal.riskLevel];

    const handleVote = async (choice: VoteChoice) => {
        if (!account) return;
        const member = getMember(account.address);
        castProposalVote(id, account.address, member?.displayName, choice, member?.votingPower || 100);
        setHasVoted(true);
        setUserVote(choice);
        reload();
    };

    const handleComment = () => {
        if (!comment.trim() || !account) return;
        const member = getMember(account.address);
        addComment(id, account.address, member?.displayName || 'You', comment);
        setComment('');
        reload();
    };

    return (
        <div className="min-h-screen bg-[#060608]">
            <div className="fixed inset-0 pointer-events-none overflow-hidden"><div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" /></div>
            <DaoNavbar />
            <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8">
                <Link href="/dao/proposals" className="inline-flex items-center gap-2 text-[10px] text-gray-600 hover:text-red-400 mb-6 font-mono tracking-wider uppercase transition-colors"><ArrowLeft className="w-3.5 h-3.5" /> BACK</Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    <div className="lg:col-span-2 space-y-5">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0d0d0d] border border-red-500/[0.08] overflow-hidden">
                            <div className="h-[1px] bg-gradient-to-r from-red-600/40 via-red-500/20 to-transparent" />
                            <div className="p-6">
                                <div className="flex items-start justify-between gap-3 mb-4">
                                    <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">{proposal.title}</h1>
                                    <span className="shrink-0 text-[9px] font-mono font-bold tracking-[0.15em] uppercase px-2 py-1 border" style={{ color: statusCfg.color, borderColor: `${statusCfg.color}40`, backgroundColor: `${statusCfg.color}08` }}>{statusCfg.label}</span>
                                </div>

                                <div className="flex flex-wrap gap-4 text-xs text-gray-500 font-mono mb-6 pb-6 border-b border-red-500/[0.06]">
                                    <span className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5 text-emerald-500" /><span className="text-white font-bold">${proposal.requestedAmount.toLocaleString()}</span></span>
                                    {proposal.expectedROI && <span className="flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5 text-red-400" />+{proposal.expectedROI}% ROI</span>}
                                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-blue-400" />{proposal.timeline}</span>
                                    <span className="flex items-center gap-1.5" style={{ color: riskCfg.color }}><AlertTriangle className="w-3.5 h-3.5" />{riskCfg.label}</span>
                                </div>

                                <div className="flex items-center gap-3 mb-6">
                                    {getMember(proposal.author)?.avatar ? (
                                        <img src={getMember(proposal.author)!.avatar!} alt={getMember(proposal.author)!.displayName} className="w-9 h-9 rounded-full object-cover border border-red-500/15" />
                                    ) : (
                                        <div className="w-9 h-9 rounded-full bg-[#111] border border-red-500/15 flex items-center justify-center text-xs font-bold text-red-400 font-mono">
                                            {(getMember(proposal.author)?.displayName || proposal.authorName || '?').charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <div>
                                        <div className="text-white text-sm font-medium">{getMember(proposal.author)?.displayName || proposal.authorName}</div>
                                        <div className="text-[10px] text-gray-700 font-mono">{proposal.author.slice(0, 10)}...{proposal.author.slice(-6)}</div>
                                    </div>
                                    <span className="text-[10px] text-gray-700 font-mono ml-auto">{formatTimeAgo(proposal.createdAt)}</span>
                                </div>

                                <div className="text-sm text-gray-400 leading-relaxed whitespace-pre-wrap">{proposal.description}</div>

                                {proposal.tags && proposal.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-red-500/[0.06]">
                                        {proposal.tags.map((tag: string) => (<span key={tag} className="text-[9px] px-2 py-0.5 border border-red-500/20 text-red-400/70 font-mono tracking-wider uppercase">#{tag}</span>))}
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Comments */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#0d0d0d] border border-red-500/[0.08] overflow-hidden">
                            <div className="px-5 py-3 border-b border-red-500/[0.06]">
                                <h3 className="text-[10px] text-white font-mono tracking-[0.15em] uppercase font-bold flex items-center gap-2"><MessageSquare className="w-3.5 h-3.5 text-red-500" /> DISCUSSION ({comments.length})</h3>
                            </div>
                            <div className="divide-y divide-red-500/[0.04]">
                                {comments.map(c => (
                                    <div key={c.id} className="p-5">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-6 h-6 bg-[#111] border border-red-500/[0.1] flex items-center justify-center text-[9px] font-bold text-red-400 font-mono">{c.authorName?.charAt(0) || '?'}</div>
                                            <span className="text-xs text-white font-medium">{c.authorName || c.author}</span>
                                            <span className="text-[9px] text-gray-700 font-mono">{formatTimeAgo(c.timestamp)}</span>
                                        </div>
                                        <p className="text-xs text-gray-400 leading-relaxed pl-8">{c.content}</p>
                                    </div>
                                ))}
                            </div>
                            {account && (
                                <div className="p-5 border-t border-red-500/[0.06]">
                                    <div className="flex gap-3">
                                        <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add comment..." onKeyDown={(e) => e.key === 'Enter' && handleComment()} className="flex-1 bg-black border border-red-500/[0.1] px-4 py-2.5 text-white font-mono placeholder-gray-800 focus:outline-none focus:border-red-500/30 text-xs" />
                                        <button onClick={handleComment} disabled={!comment.trim()} className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white transition-colors disabled:opacity-50"><Send className="w-4 h-4" /></button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    <div className="space-y-5">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            <VotingPanel proposal={proposal} hasVoted={hasVoted} userVote={userVote} onVote={handleVote} />
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#0d0d0d] border border-red-500/[0.08] p-5">
                            <h3 className="text-[10px] text-white font-mono tracking-[0.15em] uppercase font-bold mb-4 flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-red-500" /> TIMELINE</h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'CREATED', time: proposal.createdAt, active: true },
                                    { label: 'VOTING START', time: proposal.votingStartsAt, active: !!proposal.votingStartsAt },
                                    { label: 'VOTING END', time: proposal.votingEndsAt, active: false },
                                    { label: 'COMPLETED', time: proposal.completedAt, active: false },
                                ].map(step => (
                                    <div key={step.label} className="flex items-start gap-3">
                                        <div className={`w-1.5 h-1.5 mt-1.5 ${step.active || step.time ? 'bg-red-500' : 'bg-gray-800'}`} />
                                        <div>
                                            <div className={`text-[10px] font-mono tracking-wider ${step.active || step.time ? 'text-white' : 'text-gray-700'}`}>{step.label}</div>
                                            <div className="text-[9px] text-gray-600 font-mono">
                                                {step.time ? new Date(step.time).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}

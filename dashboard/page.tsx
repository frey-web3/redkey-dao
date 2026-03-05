'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useActiveAccount } from 'thirdweb/react';
import { Plus, ArrowRight, Users, ScrollText, Vault, Activity, Zap, Terminal, Landmark, Briefcase } from 'lucide-react';
import Link from 'next/link';
import DaoNavbar from '../components/DaoNavbar';
import TreasuryCard from '../components/TreasuryCard';
import ProposalCard from '../components/ProposalCard';
import LoanCard from '../components/LoanCard';
import AvaxPriceCard from '../components/AvaxPriceCard';
import AvaxNewsSection from '../components/AvaxNewsSection';
import { seedIfNeeded, getTreasury, getProposals, getMembers, getLoans, getActivity } from '@/lib/local-dao-store';
import { mockProjects } from '../portfolio/mockData';
import type { TreasurySummary, Proposal, DaoMember, LoanRequest, AuditLogEntry } from '../types';

const ACTIVITY_ICONS: Record<string, { icon: React.ElementType; color: string }> = {
    'vote.cast': { icon: Zap, color: '#ef4444' },
    'treasury.deposit': { icon: Vault, color: '#22c55e' },
    'proposal.created': { icon: ScrollText, color: '#3b82f6' },
    'member.registered': { icon: Users, color: '#f59e0b' },
    'loan.requested': { icon: Landmark, color: '#06b6d4' },
    'loan.vote': { icon: Zap, color: '#8b5cf6' },
    'loan.approved': { icon: Landmark, color: '#22c55e' },
    'loan.collateral_confirmed': { icon: Landmark, color: '#f59e0b' },
    'loan.funded': { icon: Landmark, color: '#06b6d4' },
};

function formatTimeAgo(timestamp: number): string {
    const diff = Date.now() - timestamp;
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h`;
    return `${Math.floor(hrs / 24)}d`;
}

function formatAction(entry: AuditLogEntry): string {
    switch (entry.action) {
        case 'vote.cast': return `voted ${(entry.details.choice as string) || ''} on proposal`;
        case 'treasury.deposit': return `deposited $${(entry.details.amount as number)?.toLocaleString() || ''}`;
        case 'proposal.created': return `created "${(entry.details.title as string) || ''}"`;
        case 'member.registered': return `joined the network`;
        case 'loan.requested': return `requested $${(entry.details.amount as number)?.toLocaleString()} loan`;
        case 'loan.vote': return `voted on loan request`;
        case 'loan.approved': return `loan approved`;
        case 'loan.funded': return `funded loan — $${(entry.details.amount as number)?.toLocaleString()}`;
        case 'loan.collateral_confirmed': return `deposited collateral`;
        default: return entry.action;
    }
}

export default function DaoDashboard() {
    const account = useActiveAccount();
    const [loading, setLoading] = useState(true);
    const [treasury, setTreasury] = useState<TreasurySummary | null>(null);
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [members, setMembers] = useState<DaoMember[]>([]);
    const [loans, setLoans] = useState<LoanRequest[]>([]);
    const [activity, setActivity] = useState<AuditLogEntry[]>([]);

    useEffect(() => {
        seedIfNeeded();
        setTreasury(getTreasury());
        setProposals(getProposals());
        setMembers(getMembers());
        setLoans(getLoans());
        setActivity(getActivity(10));
        setLoading(false);
    }, []);

    const activeProposals = proposals.filter(p => p.status === 'active');
    const fundingLoans = loans.filter(l => l.status === 'funding' || l.status === 'voting');

    return (
        <div className="min-h-screen bg-[#060608]">
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/[0.03] rounded-full blur-[150px]" />
            </div>

            <DaoNavbar />

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <div>
                            <div className="text-[10px] text-red-500/60 font-mono tracking-[0.3em] uppercase mb-1">// SYSTEM DASHBOARD</div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-mono">OVERVIEW</h1>
                            <p className="text-gray-600 mt-1 text-xs font-mono">Community treasury, governance & lending metrics</p>
                        </div>
                        {account && (
                            <div className="flex gap-2">
                                <Link href="/dao/proposals/new" className="inline-flex items-center gap-2 px-4 py-2.5 border border-red-500/40 bg-red-500/[0.06] text-red-400 font-mono text-xs font-bold tracking-wider uppercase hover:bg-red-500/15 active:scale-[0.98] transition-all">
                                    <Plus className="w-3.5 h-3.5" /> PROPOSAL
                                </Link>
                                <Link href="/dao/loans/new" className="inline-flex items-center gap-2 px-4 py-2.5 border border-cyan-500/40 bg-cyan-500/[0.06] text-cyan-400 font-mono text-xs font-bold tracking-wider uppercase hover:bg-cyan-500/15 active:scale-[0.98] transition-all">
                                    <Landmark className="w-3.5 h-3.5" /> LOAN
                                </Link>
                            </div>
                        )}
                    </div>
                </motion.div>

                <div className="mb-8"><TreasuryCard treasury={loading ? null : treasury} loading={loading} /></div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    <div className="lg:col-span-2 space-y-5">
                        {/* Active Proposals */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-xs font-mono text-white tracking-[0.15em] uppercase font-bold flex items-center gap-2">
                                    <Terminal className="w-3.5 h-3.5 text-red-500" /> ACTIVE PROPOSALS
                                </h2>
                                <Link href="/dao/proposals" className="text-[10px] text-red-500/70 hover:text-red-400 flex items-center gap-1 font-mono tracking-wider uppercase transition-colors">
                                    VIEW ALL <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                            {loading ? (
                                <div className="space-y-3">{[1, 2].map(i => (<div key={i} className="h-32 bg-white/[0.02] border border-red-500/[0.06] animate-pulse" />))}</div>
                            ) : activeProposals.length > 0 ? (
                                <div className="space-y-3">{activeProposals.slice(0, 3).map((p, i) => (<ProposalCard key={p.id} proposal={p} index={i} />))}</div>
                            ) : (
                                <div className="text-center py-10 bg-[#0d0d0d] border border-red-500/[0.06]"><p className="text-gray-700 font-mono text-xs">No active proposals</p></div>
                            )}
                        </div>

                        {/* Open Loans */}
                        {fundingLoans.length > 0 && (
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <h2 className="text-xs font-mono text-white tracking-[0.15em] uppercase font-bold flex items-center gap-2">
                                        <Landmark className="w-3.5 h-3.5 text-cyan-500" /> OPEN LOANS
                                    </h2>
                                    <Link href="/dao/loans" className="text-[10px] text-cyan-500/70 hover:text-cyan-400 flex items-center gap-1 font-mono tracking-wider uppercase transition-colors">
                                        VIEW ALL <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                                <div className="space-y-3">{fundingLoans.slice(0, 2).map((l, i) => (<LoanCard key={l.id} loan={l} index={i} />))}</div>
                            </div>
                        )}

                        {/* AVAX News */}
                        <AvaxNewsSection />
                    </div>

                    <div className="space-y-5">
                        {/* Avalanche Price Card */}
                        <AvaxPriceCard />

                        {/* Quick Stats */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#0d0d0d] border border-red-500/[0.08] p-5">
                            <h3 className="text-[10px] text-white font-mono tracking-[0.15em] uppercase font-bold flex items-center gap-2 mb-4">
                                <Activity className="w-3.5 h-3.5 text-red-500" /> SYSTEM STATUS
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { label: 'MEMBERS', value: String(members.length), color: 'text-blue-400' },
                                    { label: 'PROPOSALS', value: String(proposals.length), color: 'text-emerald-400' },
                                    { label: 'ACTIVE LOANS', value: String(loans.filter(l => ['voting', 'funding', 'active'].includes(l.status)).length), color: 'text-cyan-400' },
                                    { label: 'TREASURY', value: treasury ? `$${treasury.totalBalance.toLocaleString()}` : '—', color: 'text-amber-400' },
                                ].map(stat => (
                                    <div key={stat.label} className="flex items-center justify-between py-1.5 border-b border-red-500/[0.04] last:border-0">
                                        <span className="text-[10px] text-gray-600 font-mono tracking-wider">{stat.label}</span>
                                        <span className={`text-xs font-mono font-bold ${stat.color}`}>{stat.value}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Funded Projects Highlight */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-[#0d0d0d] border border-red-500/[0.08] p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-[10px] text-white font-mono tracking-[0.15em] uppercase font-bold flex items-center gap-2">
                                    <Briefcase className="w-3.5 h-3.5 text-red-500" /> FUNDED PROJECTS
                                </h3>
                                <Link href="/dao/portfolio" className="text-[9px] text-red-500/60 hover:text-red-400 font-mono tracking-wider uppercase transition-colors">ALL →</Link>
                            </div>
                            <div className="space-y-3">
                                {mockProjects.filter(p => p.status === 'Funded' || p.status === 'Active').slice(0, 3).map((project) => (
                                    <Link key={project.id} href={`/dao/portfolio/${project.id}`} className="flex items-center gap-3 py-2 group">
                                        <div className="w-8 h-8 bg-[#111] border border-red-500/[0.12] flex items-center justify-center shrink-0 group-hover:border-red-500/40 transition-colors">
                                            {project.logoUrl ? (
                                                <img src={project.logoUrl} alt={project.name} className="max-w-full max-h-full object-contain p-1" />
                                            ) : (
                                                <Briefcase className="w-3.5 h-3.5 text-red-500/50" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs text-white font-medium truncate group-hover:text-red-400 transition-colors">{project.name}</div>
                                            <div className="text-[9px] text-gray-500 font-mono uppercase truncate">{project.category}</div>
                                        </div>
                                        <ArrowRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-red-400 transition-colors" />
                                    </Link>
                                ))}
                            </div>
                        </motion.div>

                        {/* Top Members */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-[#0d0d0d] border border-red-500/[0.08] p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-[10px] text-white font-mono tracking-[0.15em] uppercase font-bold flex items-center gap-2"><Users className="w-3.5 h-3.5 text-red-500" /> TOP MEMBERS</h3>
                                <Link href="/dao/members" className="text-[9px] text-red-500/60 hover:text-red-400 font-mono tracking-wider uppercase transition-colors">ALL →</Link>
                            </div>
                            <div className="space-y-3">
                                {members.slice(0, 3).map((m, i) => (
                                    <div key={m.walletAddress} className="flex items-center gap-3 py-2">
                                        <div className="text-[10px] font-mono text-gray-700 font-bold w-4">{String(i + 1).padStart(2, '0')}</div>
                                        <div className="w-7 h-7 bg-[#111] border border-red-500/[0.12] flex items-center justify-center text-[10px] font-bold text-red-400 font-mono overflow-hidden">
                                            {m.avatar ? (
                                                <img src={m.avatar} alt={m.displayName} className="w-full h-full object-cover" />
                                            ) : (
                                                m.displayName?.charAt(0)
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs text-white font-medium truncate">{m.displayName}</div>
                                            <div className="text-[9px] text-gray-600 font-mono">REP: {m.reputation}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Activity Feed */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-[#0d0d0d] border border-red-500/[0.08] p-5">
                            <h3 className="text-[10px] text-white font-mono tracking-[0.15em] uppercase font-bold flex items-center gap-2 mb-4"><Activity className="w-3.5 h-3.5 text-red-500" /> ACTIVITY LOG</h3>
                            {activity.length > 0 ? (
                                <div className="space-y-2">
                                    {activity.map(entry => {
                                        const cfg = ACTIVITY_ICONS[entry.action] || { icon: Activity, color: '#6b7280' };
                                        const Icon = cfg.icon;
                                        const member = members.find(m => m.walletAddress.toLowerCase() === entry.actor.toLowerCase());
                                        const displayName = member?.displayName || entry.actorName || (entry.actor === 'system' ? 'System' : entry.actor.slice(0, 10));

                                        return (
                                            <div key={entry.id} className="flex items-start gap-3 py-2 border-b border-red-500/[0.04] last:border-0">
                                                {member?.avatar ? (
                                                    <div className="w-6 h-6 shrink-0 mt-0.5 overflow-hidden border" style={{ borderColor: `${cfg.color}30` }}>
                                                        <img src={member.avatar} alt={displayName} className="w-full h-full object-cover" />
                                                    </div>
                                                ) : (
                                                    <div className="w-6 h-6 border flex items-center justify-center shrink-0 mt-0.5" style={{ borderColor: `${cfg.color}30`, backgroundColor: `${cfg.color}08` }}>
                                                        {member?.displayName ? (
                                                            <span className="text-[10px] font-bold font-mono" style={{ color: cfg.color }}>{member.displayName.charAt(0).toUpperCase()}</span>
                                                        ) : (
                                                            <Icon className="w-3 h-3" style={{ color: cfg.color }} />
                                                        )}
                                                    </div>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[10px] text-gray-400 font-mono leading-relaxed">
                                                        <span className="text-white font-medium">{displayName}</span>{' '}{formatAction(entry)}
                                                    </p>
                                                    <span className="text-[9px] text-gray-700 font-mono">{formatTimeAgo(entry.timestamp)}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-[10px] text-gray-700 font-mono">No recent activity</p>
                            )}
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}

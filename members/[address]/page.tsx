'use client';

import React, { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Vote, ScrollText, DollarSign, Calendar, TrendingUp, Clock } from 'lucide-react';
import Link from 'next/link';
import DaoNavbar from '../../components/DaoNavbar';
import ReputationPartnerSection, { getPartnerReputationScore } from '../../components/ReputationPartnerSection';
import { ROLE_CONFIG, CREDIT_TIERS } from '../../config';
import { seedIfNeeded, getMember } from '@/lib/local-dao-store';
import type { DaoMember } from '../../types';

function formatDate(ts: number): string { return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }

export default function MemberProfilePage({ params }: { params: Promise<{ address: string }> }) {
    const { address } = use(params);
    const [member, setMember] = useState<DaoMember | null>(null);

    useEffect(() => { seedIfNeeded(); const m = getMember(address); if (m) setMember(m); }, [address]);

    if (!member) return <div className="min-h-screen bg-[#060608]"><DaoNavbar /><div className="flex items-center justify-center h-[60vh]"><span className="text-gray-600 font-mono text-xs">MEMBER NOT FOUND</span></div></div>;

    const roleCfg = ROLE_CONFIG[member.role];
    const creditCfg = CREDIT_TIERS[member.creditTier];

    const stats = [
        { label: 'REPUTATION', value: member.reputation.toString(), maxValue: '/1000', icon: Star, color: '#f59e0b' },
        { label: 'VOTING POWER', value: member.votingPower.toString(), icon: Vote, color: '#ef4444' },
        { label: 'CONTRIBUTED', value: `$${member.totalContribution.toLocaleString()}`, icon: DollarSign, color: '#22c55e' },
        { label: 'PROPOSALS', value: member.proposalsSubmitted.toString(), icon: ScrollText, color: '#3b82f6' },
        { label: 'VOTES CAST', value: member.votesCount.toString(), icon: Vote, color: '#06b6d4' },
        { label: 'JOINED', value: formatDate(member.joinedAt), icon: Calendar, color: '#6b7280' },
    ];

    return (
        <div className="min-h-screen bg-[#060608]">
            <div className="fixed inset-0 pointer-events-none overflow-hidden"><div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" /></div>
            <DaoNavbar />
            <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8">
                <Link href="/dao/members" className="inline-flex items-center gap-2 text-[10px] text-gray-600 hover:text-red-400 mb-6 font-mono tracking-wider uppercase transition-colors"><ArrowLeft className="w-3.5 h-3.5" /> BACK</Link>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0d0d0d] border border-red-500/[0.08] overflow-hidden mb-5">
                    <div className="h-[1px] bg-gradient-to-r from-red-600/40 via-red-500/20 to-transparent" />
                    <div className="p-6">
                        <div className="flex flex-col sm:flex-row items-start gap-5">
                            <div className="bg-[#111] border border-red-500/[0.15] flex items-center justify-center text-2xl font-bold text-red-400 font-mono" style={{ width: '72px', height: '72px' }}>
                                {member.avatar ? <img src={member.avatar} alt={member.displayName} className="w-full h-full object-cover" /> : member.displayName?.charAt(0)?.toUpperCase() || '?'}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <h1 className="text-2xl font-bold text-white font-mono">{member.displayName}</h1>
                                    <span className="text-[9px] font-mono font-bold tracking-[0.15em] uppercase px-2 py-0.5 border" style={{ color: roleCfg.color, borderColor: `${roleCfg.color}40`, backgroundColor: `${roleCfg.color}08` }}>{roleCfg.label}</span>
                                </div>
                                <p className="text-[10px] text-gray-600 font-mono mb-3">{member.walletAddress}</p>
                                {member.bio && <p className="text-sm text-gray-400 leading-relaxed">{member.bio}</p>}
                                <div className="mt-4 flex items-center gap-3">
                                    <span className="text-[9px] font-mono font-bold tracking-wider uppercase px-2 py-1 border" style={{ color: creditCfg.color, borderColor: `${creditCfg.color}30`, backgroundColor: `${creditCfg.color}08` }}>{creditCfg.icon} {creditCfg.label} TIER</span>
                                    <span className="text-[9px] text-gray-600 font-mono flex items-center gap-1"><Clock className="w-3 h-3" /> Last active {new Date(member.lastActiveAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="bg-[#0d0d0d] border border-red-500/[0.08] p-4">
                                <div className="flex items-center gap-2 mb-2"><Icon className="w-3.5 h-3.5" style={{ color: stat.color }} /><span className="text-[9px] text-gray-600 font-mono tracking-wider">{stat.label}</span></div>
                                <div className="text-lg font-bold text-white font-mono">{stat.value}{stat.maxValue && <span className="text-xs text-gray-700 font-normal">{stat.maxValue}</span>}</div>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#0d0d0d] border border-red-500/[0.08] p-6">
                    <h3 className="text-[10px] text-white font-mono tracking-[0.15em] uppercase font-bold mb-4 flex items-center gap-2"><TrendingUp className="w-3.5 h-3.5 text-red-500" /> REPUTATION MATRIX</h3>
                    <div className="space-y-4">
                        {[
                            { label: 'VOTING PARTICIPATION', value: Math.min(100, Math.round(member.votesCount * 2.5)), color: '#ef4444' },
                            { label: 'PROPOSAL QUALITY', value: Math.min(100, member.proposalsSubmitted * 20), color: '#3b82f6' },
                            { label: 'TREASURY CONTRIBUTION', value: Math.min(100, Math.round(member.totalContribution / 250)), color: '#22c55e' },
                            { label: 'COMMUNITY ENGAGEMENT', value: Math.min(100, Math.round(member.reputation / 10)), color: '#f59e0b' },
                            { label: 'PARTNER REPUTATION', value: getPartnerReputationScore(member.walletAddress), color: '#a855f7' },
                        ].map(metric => (
                            <div key={metric.label}>
                                <div className="flex justify-between mb-1.5">
                                    <span className="text-[10px] text-gray-500 font-mono tracking-wider">{metric.label}</span>
                                    <span className="text-xs text-white font-mono font-bold">{metric.value}%</span>
                                </div>
                                <div className="h-1 bg-gray-900 overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${metric.value}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} className="h-full" style={{ backgroundColor: metric.color }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Reputation Partners — Read-only */}
                <ReputationPartnerSection walletAddress={member.walletAddress} isOwnProfile={false} />
            </main>
        </div>
    );
}

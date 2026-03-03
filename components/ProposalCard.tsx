'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, MessageSquare, DollarSign, AlertTriangle } from 'lucide-react';
import { STATUS_CONFIG, RISK_LEVELS } from '../config';
import { seedIfNeeded, getMember } from '@/lib/local-dao-store';
import type { Proposal } from '../types';

interface Props {
    proposal: Proposal;
    index?: number;
}

function timeLeft(endsAt?: number): string {
    if (!endsAt) return '—';
    const diff = endsAt - Date.now();
    if (diff <= 0) return 'ENDED';
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    if (d > 0) return `${d}d ${h}h`;
    const m = Math.floor((diff / (1000 * 60)) % 60);
    return `${h}h ${m}m`;
}

export default function ProposalCard({ proposal, index = 0 }: Props) {
    const statusCfg = STATUS_CONFIG[proposal.status];
    const riskCfg = RISK_LEVELS[proposal.riskLevel || 'medium'];
    const totalVotes = proposal.votesFor + proposal.votesAgainst + proposal.votesAbstain;
    const forPct = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0;
    const againstPct = totalVotes > 0 ? (proposal.votesAgainst / totalVotes) * 100 : 0;

    // Fetch member data
    const member = getMember(proposal.author);
    const displayName = member?.displayName || proposal.authorName || 'Unknown';

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
        >
            <Link href={`/dao/proposals/${proposal.id}`} className="block group">
                <div
                    className="relative bg-[#0d0d0d] border border-red-500/[0.08] overflow-hidden transition-all hover:border-red-500/25"
                    style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)' }}
                >
                    {/* Top accent bar */}
                    <div className="h-[1px] bg-gradient-to-r from-red-600/40 via-red-500/20 to-transparent" />

                    <div className="p-5">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span
                                        className="text-[9px] font-mono font-bold tracking-[0.15em] uppercase px-2 py-0.5 border"
                                        style={{ color: statusCfg.color, borderColor: `${statusCfg.color}40`, backgroundColor: `${statusCfg.color}08` }}
                                    >
                                        {statusCfg.label}
                                    </span>
                                    <span
                                        className="text-[9px] font-mono tracking-wider uppercase flex items-center gap-1"
                                        style={{ color: riskCfg.color }}
                                    >
                                        <AlertTriangle className="w-2.5 h-2.5" />
                                        {riskCfg.label}
                                    </span>
                                </div>
                                <h3 className="text-white font-semibold text-sm leading-snug group-hover:text-red-400 transition-colors line-clamp-1">
                                    {proposal.title}
                                </h3>
                            </div>
                            <div className="text-right shrink-0">
                                <div className="text-xs text-red-400 font-mono font-bold">
                                    ${proposal.requestedAmount.toLocaleString()}
                                </div>
                                {proposal.expectedROI && (
                                    <div className="text-[9px] text-gray-600 font-mono">
                                        +{proposal.expectedROI}% ROI
                                    </div>
                                )}
                            </div>
                        </div>

                        <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-1">
                            {proposal.description}
                        </p>

                        {/* Vote Bar */}
                        {totalVotes > 0 && (
                            <div className="mb-3">
                                <div className="h-1 bg-gray-900 flex overflow-hidden">
                                    <div className="h-full bg-emerald-500 transition-all" style={{ width: `${forPct}%` }} />
                                    <div className="h-full bg-red-600 transition-all" style={{ width: `${againstPct}%` }} />
                                </div>
                                <div className="flex justify-between mt-1">
                                    <span className="text-[9px] font-mono text-emerald-500">FOR {forPct.toFixed(0)}%</span>
                                    <span className="text-[9px] font-mono text-red-500">AGN {againstPct.toFixed(0)}%</span>
                                </div>
                            </div>
                        )}

                        {/* Footer */}
                        <div className="flex items-center gap-4 text-[10px] text-gray-600 font-mono mt-4">
                            <span className="flex items-center gap-2">
                                {member?.avatar ? (
                                    <img src={member.avatar} alt={member.displayName} className="w-4 h-4 rounded-full object-cover border border-red-500/20" />
                                ) : (
                                    <div className="w-4 h-4 rounded-full bg-[#111] border border-red-500/20 flex items-center justify-center text-[7px] font-bold text-red-400">
                                        {displayName.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <span className="text-gray-400">{displayName}</span>
                            </span>
                            <span className="flex items-center gap-1">
                                <MessageSquare className="w-2.5 h-2.5" />
                                {proposal.commentsCount}
                            </span>
                            {proposal.votingEndsAt && proposal.status === 'active' && (
                                <span className="flex items-center gap-1 text-red-400/80">
                                    <Clock className="w-2.5 h-2.5" />
                                    {timeLeft(proposal.votingEndsAt)}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Corner cut accent */}
                    <div className="absolute top-0 right-0 w-4 h-4">
                        <div className="absolute top-[1px] right-[16px] w-[1px] h-2 bg-red-500/30" />
                        <div className="absolute top-[16px] right-[1px] w-2 h-[1px] bg-red-500/30" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

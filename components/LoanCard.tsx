'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, Users, DollarSign } from 'lucide-react';
import { LOAN_STATUS_CONFIG } from '../config';
import { seedIfNeeded, getMember } from '@/lib/local-dao-store';
import type { LoanRequest } from '../types';

interface Props {
    loan: LoanRequest;
    index?: number;
}

function timeLeft(deadline?: number): string {
    if (!deadline) return '—';
    const diff = deadline - Date.now();
    if (diff <= 0) return 'ENDED';
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff / 3600000) % 24);
    if (d > 0) return `${d}d ${h}h`;
    return `${h}h`;
}

export default function LoanCard({ loan, index = 0 }: Props) {
    const statusCfg = LOAN_STATUS_CONFIG[loan.status];
    const fundPct = loan.amount > 0 ? (loan.fundedAmount / loan.amount) * 100 : 0;

    // Fetch member data
    const member = getMember(loan.borrower);
    const displayName = member?.displayName || loan.borrowerName || loan.borrower.slice(0, 10);

    return (
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.08 }}>
            <Link href={`/dao/loans/${loan.id}`} className="block group">
                <div
                    className="relative bg-[#0d0d0d] border border-red-500/[0.08] overflow-hidden transition-all hover:border-red-500/25"
                    style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)' }}
                >
                    <div className="h-[1px] bg-gradient-to-r from-cyan-600/40 via-cyan-500/20 to-transparent" />

                    <div className="p-5">
                        <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[9px] font-mono font-bold tracking-[0.15em] uppercase px-2 py-0.5 border"
                                        style={{ color: statusCfg.color, borderColor: `${statusCfg.color}40`, backgroundColor: `${statusCfg.color}08` }}>
                                        {statusCfg.label}
                                    </span>
                                    <span className="text-[9px] font-mono text-gray-600 tracking-wider">
                                        {loan.tenor}mo · {loan.interestRate}% flat
                                    </span>
                                </div>
                                <h3 className="text-white font-semibold text-sm leading-snug group-hover:text-cyan-400 transition-colors line-clamp-1 flex items-center gap-2">
                                    Loan #{loan.id.slice(0, 6)} —
                                    {member?.avatar ? (
                                        <img src={member.avatar} alt={displayName} className="w-5 h-5 rounded-full object-cover border border-cyan-500/20 inline-block align-middle" />
                                    ) : (
                                        <div className="w-5 h-5 rounded-full bg-[#111] border border-cyan-500/20 inline-flex items-center justify-center text-[8px] font-bold text-cyan-400 align-middle">
                                            {displayName.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <span className="align-middle">{displayName}</span>
                                </h3>
                            </div>
                            <div className="text-right shrink-0">
                                <div className="text-xs text-cyan-400 font-mono font-bold">${loan.amount.toLocaleString()}</div>
                                <div className="text-[9px] text-gray-600 font-mono">repay ${loan.totalRepayment.toLocaleString()}</div>
                            </div>
                        </div>

                        <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-1">{loan.purpose}</p>

                        {/* Funding Progress */}
                        {(loan.status === 'funding' || loan.status === 'active' || loan.status === 'repaid' || loan.status === 'defaulted') && (
                            <div className="mb-3">
                                <div className="flex justify-between mb-1">
                                    <span className="text-[9px] font-mono text-gray-600">FUNDED</span>
                                    <span className="text-[9px] font-mono text-cyan-400">${loan.fundedAmount.toLocaleString()} / ${loan.amount.toLocaleString()}</span>
                                </div>
                                <div className="h-1.5 bg-gray-900 overflow-hidden">
                                    <div className="h-full bg-cyan-500 transition-all" style={{ width: `${Math.min(fundPct, 100)}%` }} />
                                </div>
                            </div>
                        )}

                        {/* Voting Progress */}
                        {loan.status === 'voting' && loan.totalVotingPower > 0 && (
                            <div className="mb-3">
                                <div className="h-1 bg-gray-900 flex overflow-hidden">
                                    <div className="h-full bg-emerald-500" style={{ width: `${(loan.votesFor / loan.totalVotingPower) * 100}%` }} />
                                    <div className="h-full bg-red-600" style={{ width: `${(loan.votesAgainst / loan.totalVotingPower) * 100}%` }} />
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-4 text-[10px] text-gray-600 font-mono">
                            <span className="flex items-center gap-1"><Users className="w-2.5 h-2.5" />{loan.funders.length} funders</span>
                            {loan.collateralConfirmed && <span className="text-emerald-500">✓ collateral</span>}
                            {loan.fundingDeadline && loan.status === 'funding' && (
                                <span className="flex items-center gap-1 text-cyan-400/70"><Clock className="w-2.5 h-2.5" />{timeLeft(loan.fundingDeadline)}</span>
                            )}
                            {loan.votingEndsAt && loan.status === 'voting' && (
                                <span className="flex items-center gap-1 text-red-400/70"><Clock className="w-2.5 h-2.5" />{timeLeft(loan.votingEndsAt)}</span>
                            )}
                        </div>
                    </div>

                    <div className="absolute top-0 right-0 w-4 h-4">
                        <div className="absolute top-[1px] right-[16px] w-[1px] h-2 bg-cyan-500/30" />
                        <div className="absolute top-[16px] right-[1px] w-2 h-[1px] bg-cyan-500/30" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

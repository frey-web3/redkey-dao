'use client';

import React, { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import { useActiveAccount } from 'thirdweb/react';
import { ArrowLeft, Clock, DollarSign, Calendar, Shield, MessageSquare, Send } from 'lucide-react';
import Link from 'next/link';
import DaoNavbar from '../../components/DaoNavbar';
import LoanFundingPanel from '../../components/LoanFundingPanel';
import { LOAN_STATUS_CONFIG } from '../../config';
import { seedIfNeeded, getLoan, castLoanVote, hasVotedLoan, confirmCollateral, fundLoan, approveLoan, getMember } from '@/lib/local-dao-store';
import type { LoanRequest, VoteChoice } from '../../types';

function formatTimeAgo(ts: number): string {
    const diff = Date.now() - ts;
    const hrs = Math.floor(diff / 3600000);
    if (hrs < 24) return `${hrs}h`;
    return `${Math.floor(hrs / 24)}d`;
}

export default function LoanDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const account = useActiveAccount();
    const [loan, setLoan] = useState<LoanRequest | null>(null);
    const [voted, setVoted] = useState(false);
    const [userVote, setUserVote] = useState<VoteChoice | undefined>();
    const [loading, setLoading] = useState(true);

    const reload = () => {
        const l = getLoan(id);
        if (l) {
            setLoan({ ...l });
            if (account) setVoted(hasVotedLoan(id, account.address));
        }
    };

    useEffect(() => {
        seedIfNeeded();
        reload();
        setLoading(false);
    }, [id, account]);

    if (loading) return <div className="min-h-screen bg-[#060608]"><DaoNavbar /><div className="flex items-center justify-center h-[60vh]"><span className="text-gray-600 font-mono text-xs">LOADING...</span></div></div>;
    if (!loan) return <div className="min-h-screen bg-[#060608]"><DaoNavbar /><div className="flex items-center justify-center h-[60vh]"><span className="text-gray-600 font-mono text-xs">LOAN NOT FOUND</span></div></div>;

    const statusCfg = LOAN_STATUS_CONFIG[loan.status];

    const handleVote = async (choice: VoteChoice) => {
        if (!account) return;
        const member = getMember(account.address);
        castLoanVote(id, account.address, member?.displayName, choice, member?.votingPower || 100);
        setVoted(true);
        setUserVote(choice);

        // Auto-approve if voting conditions are met
        const updated = getLoan(id);
        if (updated && updated.votesFor > 0 && updated.totalVotingPower > 0) {
            const forPct = (updated.votesFor / updated.totalVotingPower) * 100;
            if (forPct >= updated.approvalThreshold) {
                approveLoan(id);
            }
        }
        reload();
    };

    const handleConfirmCollateral = (txHash: string) => {
        confirmCollateral(id, txHash);
        reload();
    };

    const handleFund = (amount: number) => {
        if (!account) return;
        const member = getMember(account.address);
        fundLoan(id, account.address, member?.displayName || account.address.slice(0, 10), amount);
        reload();
    };

    return (
        <div className="min-h-screen bg-[#060608]">
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>
            <DaoNavbar />
            <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8">
                <Link href="/dao/loans" className="inline-flex items-center gap-2 text-[10px] text-gray-600 hover:text-red-400 mb-6 font-mono tracking-wider uppercase transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5" /> BACK
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-5">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0d0d0d] border border-red-500/[0.08] overflow-hidden">
                            <div className="h-[1px] bg-gradient-to-r from-cyan-600/40 via-cyan-500/20 to-transparent" />
                            <div className="p-6">
                                <div className="flex items-start justify-between gap-3 mb-4">
                                    <div>
                                        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                                            Loan Request #{loan.id.slice(0, 6)}
                                        </h1>
                                        <p className="text-xs text-gray-600 font-mono mt-1">
                                            by {loan.borrowerName || loan.borrower.slice(0, 10)}
                                        </p>
                                    </div>
                                    <span className="text-[9px] font-mono font-bold tracking-[0.15em] uppercase px-2 py-1 border"
                                        style={{ color: statusCfg.color, borderColor: `${statusCfg.color}40`, backgroundColor: `${statusCfg.color}08` }}>
                                        {statusCfg.label}
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-4 text-xs text-gray-500 font-mono mb-6 pb-6 border-b border-red-500/[0.06]">
                                    <span className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5 text-cyan-500" /><span className="text-white font-bold">${loan.amount.toLocaleString()}</span></span>
                                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-blue-400" />{loan.tenor} months</span>
                                    <span className="flex items-center gap-1.5"><span className="text-amber-400">{loan.interestRate}% flat</span></span>
                                    <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-amber-400" />{loan.collateralAmount.toLocaleString()} {loan.collateralToken}</span>
                                </div>

                                {/* Borrower info */}
                                <div className="flex items-center gap-3 mb-6">
                                    {getMember(loan.borrower)?.avatar ? (
                                        <img src={getMember(loan.borrower)!.avatar!} alt={getMember(loan.borrower)!.displayName} className="w-9 h-9 rounded-full object-cover border border-cyan-500/15" />
                                    ) : (
                                        <div className="w-9 h-9 rounded-full bg-[#111] border border-cyan-500/15 flex items-center justify-center text-xs font-bold text-cyan-400 font-mono">
                                            {(getMember(loan.borrower)?.displayName || loan.borrowerName || '?').charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <div>
                                        <div className="text-white text-sm font-medium">{getMember(loan.borrower)?.displayName || loan.borrowerName}</div>
                                        <div className="text-[10px] text-gray-700 font-mono">{loan.borrower.slice(0, 10)}...{loan.borrower.slice(-6)}</div>
                                    </div>
                                    <span className="text-[10px] text-gray-700 font-mono ml-auto">{formatTimeAgo(loan.createdAt)}</span>
                                </div>

                                {/* Purpose */}
                                <div>
                                    <h3 className="text-[10px] text-gray-500 font-mono tracking-wider mb-2">PURPOSE</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-wrap">{loan.purpose}</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Timeline */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#0d0d0d] border border-red-500/[0.08] p-5">
                            <h3 className="text-[10px] text-white font-mono tracking-[0.15em] uppercase font-bold mb-4 flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5 text-red-500" /> LIFECYCLE
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { label: 'REQUESTED', time: loan.createdAt, active: true },
                                    { label: 'VOTING', time: loan.votingStartsAt, active: !!loan.votingStartsAt },
                                    { label: 'APPROVED', time: loan.approvedAt, active: !!loan.approvedAt },
                                    { label: 'COLLATERAL DEPOSITED', time: loan.collateralDepositedAt, active: !!loan.collateralDepositedAt },
                                    { label: 'FULLY FUNDED', time: loan.fundedAt, active: !!loan.fundedAt },
                                    { label: 'REPAID', time: loan.repaidAt, active: !!loan.repaidAt },
                                ].map(step => (
                                    <div key={step.label} className="flex items-start gap-3">
                                        <div className={`w-1.5 h-1.5 mt-1.5 ${step.active ? 'bg-cyan-500' : 'bg-gray-800'}`} />
                                        <div>
                                            <div className={`text-[10px] font-mono tracking-wider ${step.active ? 'text-white' : 'text-gray-700'}`}>{step.label}</div>
                                            <div className="text-[9px] text-gray-600 font-mono">
                                                {step.time ? new Date(step.time).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right column — Funding Panel */}
                    <div>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            <LoanFundingPanel
                                loan={loan}
                                currentUser={account?.address}
                                currentUserName={account ? getMember(account.address)?.displayName : undefined}
                                hasVoted={voted}
                                userVote={userVote}
                                onVote={handleVote}
                                onConfirmCollateral={handleConfirmCollateral}
                                onFund={handleFund}
                            />
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}

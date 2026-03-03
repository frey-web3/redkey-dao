'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown, Minus, Clock, Zap, Check, Shield, DollarSign, Users, AlertTriangle, AlertOctagon } from 'lucide-react';
import type { LoanRequest, VoteChoice } from '../types';

interface Props {
    loan: LoanRequest;
    currentUser?: string;
    currentUserName?: string;
    hasVoted: boolean;
    userVote?: VoteChoice;
    onVote: (choice: VoteChoice) => void;
    onConfirmCollateral: (txHash: string) => void;
    onFund: (amount: number) => void;
}

function timeLeft(endsAt?: number): string {
    if (!endsAt) return '—';
    const diff = endsAt - Date.now();
    if (diff <= 0) return 'ENDED';
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff / 3600000) % 24);
    if (d > 0) return `${d}D ${h}H`;
    return `${h}H`;
}

export default function LoanFundingPanel({ loan, currentUser, currentUserName, hasVoted, userVote, onVote, onConfirmCollateral, onFund }: Props) {
    const [voting, setVoting] = useState(false);
    const [fundAmount, setFundAmount] = useState('');
    const [txHash, setTxHash] = useState('');
    const totalVotes = loan.votesFor + loan.votesAgainst + loan.votesAbstain;
    const fundPct = loan.amount > 0 ? (loan.fundedAmount / loan.amount) * 100 : 0;
    const remaining = loan.amount - loan.fundedAmount;
    const isBorrower = currentUser?.toLowerCase() === loan.borrower.toLowerCase();

    const handleVote = async (choice: VoteChoice) => {
        setVoting(true);
        await onVote(choice);
        setVoting(false);
    };

    return (
        <div className="space-y-4">
            {/* Loan Summary */}
            <div className="bg-[#0d0d0d] border border-cyan-500/[0.1] overflow-hidden"
                style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}>
                <div className="flex items-center justify-between px-5 py-3 border-b border-cyan-500/[0.08]">
                    <h3 className="text-xs text-white font-mono tracking-[0.15em] uppercase font-bold flex items-center gap-2">
                        <DollarSign className="w-3.5 h-3.5 text-cyan-500" /> LOAN TERMS
                    </h3>
                </div>
                <div className="p-5 space-y-2">
                    {[
                        { label: 'AMOUNT', value: `$${loan.amount.toLocaleString()}` },
                        { label: 'TENOR', value: `${loan.tenor} months` },
                        { label: 'INTEREST', value: `${loan.interestRate}% flat` },
                        { label: 'REPAYMENT', value: `$${loan.totalRepayment.toLocaleString()}` },
                        { label: 'COLLATERAL', value: `${loan.collateralAmount.toLocaleString()} ${loan.collateralToken} (100%)` },
                    ].map(row => (
                        <div key={row.label} className="flex justify-between py-1.5 border-b border-cyan-500/[0.04] last:border-0">
                            <span className="text-[10px] text-gray-600 font-mono tracking-wider">{row.label}</span>
                            <span className="text-xs text-white font-mono font-bold">{row.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* VOTING PHASE */}
            {loan.status === 'voting' && (
                <div className="bg-[#0d0d0d] border border-red-500/[0.1] overflow-hidden"
                    style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}>
                    <div className="flex items-center justify-between px-5 py-3 border-b border-red-500/[0.08]">
                        <h3 className="text-xs text-white font-mono tracking-[0.15em] uppercase font-bold flex items-center gap-2">
                            <Zap className="w-3.5 h-3.5 text-red-500" /> VOTING
                        </h3>
                        {loan.votingEndsAt && (
                            <span className="text-[10px] font-mono text-red-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />{timeLeft(loan.votingEndsAt)}
                            </span>
                        )}
                    </div>
                    <div className="p-5 space-y-3">
                        {[
                            { label: 'FOR', value: loan.votesFor, pct: totalVotes > 0 ? (loan.votesFor / totalVotes) * 100 : 0, color: '#22c55e' },
                            { label: 'AGAINST', value: loan.votesAgainst, pct: totalVotes > 0 ? (loan.votesAgainst / totalVotes) * 100 : 0, color: '#ef4444' },
                            { label: 'ABSTAIN', value: loan.votesAbstain, pct: totalVotes > 0 ? (loan.votesAbstain / totalVotes) * 100 : 0, color: '#6b7280' },
                        ].map(bar => (
                            <div key={bar.label}>
                                <div className="flex justify-between mb-1">
                                    <span className="text-[10px] font-mono text-gray-500 tracking-wider">{bar.label}</span>
                                    <span className="text-[10px] font-mono text-gray-400">{bar.pct.toFixed(1)}%</span>
                                </div>
                                <div className="h-1.5 bg-gray-900 overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${bar.pct}%` }} transition={{ duration: 0.8 }} className="h-full" style={{ backgroundColor: bar.color }} />
                                </div>
                            </div>
                        ))}

                        {!hasVoted && !isBorrower && (
                            <div className="grid grid-cols-3 gap-2 pt-2">
                                {([
                                    { choice: 'for' as VoteChoice, label: 'FOR', icon: ThumbsUp, color: '#22c55e' },
                                    { choice: 'against' as VoteChoice, label: 'AGAINST', icon: ThumbsDown, color: '#ef4444' },
                                    { choice: 'abstain' as VoteChoice, label: 'ABSTAIN', icon: Minus, color: '#6b7280' },
                                ]).map(btn => {
                                    const Icon = btn.icon;
                                    return (
                                        <button key={btn.choice} onClick={() => handleVote(btn.choice)} disabled={voting}
                                            className="flex flex-col items-center gap-1.5 py-3 border transition-all disabled:opacity-50 font-mono"
                                            style={{ borderColor: `${btn.color}30`, backgroundColor: `${btn.color}05`, color: btn.color }}>
                                            <Icon className="w-4 h-4" />
                                            <span className="text-[9px] font-bold tracking-[0.15em]">{btn.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {hasVoted && userVote && (
                            <div className="flex items-center gap-2 py-3 border border-emerald-500/20 bg-emerald-500/[0.05] px-4">
                                <Check className="w-4 h-4 text-emerald-400" />
                                <span className="text-xs font-mono text-emerald-400 tracking-wider uppercase">VOTED: {userVote}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* COLLATERAL DEPOSIT PHASE */}
            {loan.status === 'collateral_pending' && isBorrower && (
                <div className="bg-[#0d0d0d] border border-amber-500/[0.15] overflow-hidden"
                    style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}>
                    <div className="px-5 py-3 border-b border-amber-500/[0.08]">
                        <h3 className="text-xs text-white font-mono tracking-[0.15em] uppercase font-bold flex items-center gap-2">
                            <Shield className="w-3.5 h-3.5 text-amber-500" /> DEPOSIT COLLATERAL
                        </h3>
                    </div>
                    <div className="p-5 space-y-4">
                        <p className="text-[10px] text-gray-400 font-mono leading-relaxed">
                            Deposit <span className="text-white font-bold">{loan.collateralAmount.toLocaleString()} {loan.collateralToken}</span> (100% of loan) as collateral to proceed.
                        </p>
                        <div>
                            <label className="text-[10px] text-gray-500 font-mono mb-1.5 block tracking-wider">TX HASH</label>
                            <input type="text" value={txHash} onChange={(e) => setTxHash(e.target.value)} placeholder="0x..." className="w-full bg-black border border-amber-500/[0.15] px-4 py-2.5 text-white font-mono placeholder-gray-800 focus:outline-none focus:border-amber-500/40 text-xs" />
                        </div>
                        <button onClick={() => { onConfirmCollateral(txHash); setTxHash(''); }} disabled={!txHash.trim()}
                            className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold tracking-wider transition-all disabled:opacity-50">
                            CONFIRM DEPOSIT
                        </button>
                    </div>
                </div>
            )}

            {loan.status === 'collateral_pending' && !isBorrower && (
                <div className="bg-[#0d0d0d] border border-amber-500/[0.1] p-5">
                    <div className="flex items-center gap-2 text-amber-400">
                        <Shield className="w-4 h-4" />
                        <span className="text-xs font-mono tracking-wider uppercase">Waiting for borrower to deposit collateral</span>
                    </div>
                </div>
            )}

            {/* FUNDING PHASE */}
            {loan.status === 'funding' && (
                <div className="bg-[#0d0d0d] border border-cyan-500/[0.1] overflow-hidden"
                    style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}>
                    <div className="flex items-center justify-between px-5 py-3 border-b border-cyan-500/[0.08]">
                        <h3 className="text-xs text-white font-mono tracking-[0.15em] uppercase font-bold flex items-center gap-2">
                            <Users className="w-3.5 h-3.5 text-cyan-500" /> FUNDING
                        </h3>
                        {loan.fundingDeadline && (
                            <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />{timeLeft(loan.fundingDeadline)}
                            </span>
                        )}
                    </div>
                    <div className="p-5 space-y-4">
                        {/* Progress */}
                        <div>
                            <div className="flex justify-between mb-1.5">
                                <span className="text-[10px] font-mono text-gray-500 tracking-wider">FUNDED</span>
                                <span className="text-xs font-mono text-cyan-400 font-bold">{fundPct.toFixed(0)}%</span>
                            </div>
                            <div className="h-2 bg-gray-900 overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(fundPct, 100)}%` }} transition={{ duration: 0.8 }}
                                    className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400" />
                            </div>
                            <div className="flex justify-between mt-1">
                                <span className="text-[9px] font-mono text-gray-600">${loan.fundedAmount.toLocaleString()}</span>
                                <span className="text-[9px] font-mono text-gray-600">${loan.amount.toLocaleString()}</span>
                            </div>
                        </div>

                        {/* Funders list */}
                        {loan.funders.length > 0 && (
                            <div className="space-y-1">
                                {loan.funders.map((f, i) => (
                                    <div key={i} className="flex justify-between py-1.5 text-[10px] font-mono border-b border-cyan-500/[0.04] last:border-0">
                                        <span className="text-gray-400">{f.name || f.address.slice(0, 10)}</span>
                                        <span className="text-cyan-400 font-bold">${f.amount.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Fund form */}
                        {!isBorrower && remaining > 0 && (
                            <div className="pt-2 border-t border-cyan-500/[0.06]">
                                <label className="text-[10px] text-gray-500 font-mono mb-1.5 block tracking-wider">CONTRIBUTE (remaining: ${remaining.toLocaleString()})</label>
                                <div className="flex gap-2">
                                    <input type="number" value={fundAmount} onChange={(e) => setFundAmount(e.target.value)}
                                        placeholder={`Max $${remaining.toLocaleString()}`} min={1} max={remaining}
                                        className="flex-1 bg-black border border-cyan-500/[0.15] px-4 py-2.5 text-white font-mono placeholder-gray-800 focus:outline-none focus:border-cyan-500/40 text-xs" />
                                    <button onClick={() => { onFund(Math.min(Number(fundAmount), remaining)); setFundAmount(''); }}
                                        disabled={!fundAmount || Number(fundAmount) <= 0}
                                        className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold tracking-wider transition-all disabled:opacity-50">
                                        FUND
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* COLLATERAL CONFIRMED STATUS */}
            {loan.collateralConfirmed && (
                <div className="flex items-center gap-2 bg-emerald-500/[0.05] border border-emerald-500/20 px-4 py-3">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-mono text-emerald-400 tracking-wider uppercase">Collateral Deposited</span>
                    {loan.collateralTxHash && <span className="text-[9px] font-mono text-gray-600 ml-auto">{loan.collateralTxHash.slice(0, 10)}...</span>}
                </div>
            )}

            {/* ACTIVE / REPAID STATUS */}
            {(loan.status === 'active' || loan.status === 'repaying') && (
                <div className="bg-[#0d0d0d] border border-emerald-500/[0.1] p-5">
                    <div className="flex items-center gap-2 text-emerald-400 mb-2">
                        <Check className="w-4 h-4" />
                        <span className="text-xs font-mono tracking-wider uppercase font-bold">LOAN ACTIVE</span>
                    </div>
                    <p className="text-[10px] text-gray-500 font-mono">Fully funded. Borrower is in repayment period ({loan.tenor} months).</p>
                </div>
            )}

            {loan.status === 'repaid' && (
                <div className="bg-[#0d0d0d] border border-emerald-500/[0.15] p-5">
                    <div className="flex items-center gap-2 text-emerald-400 mb-2">
                        <Check className="w-4 h-4" />
                        <span className="text-xs font-mono tracking-wider uppercase font-bold">REPAID</span>
                    </div>
                    <p className="text-[10px] text-gray-500 font-mono">Loan has been fully repaid. Funders received principal + interest.</p>
                </div>
            )}

            {/* DEFAULTED STATUS */}
            {loan.status === 'defaulted' && (
                <div className="bg-[#0d0d0d] border border-red-500/[0.15] p-5">
                    <div className="flex items-center gap-2 text-red-500 mb-3">
                        <AlertOctagon className="w-5 h-5" />
                        <span className="text-sm font-mono tracking-wider uppercase font-bold">DEFAULTED</span>
                    </div>
                    <p className="text-[10px] text-gray-400 font-mono mb-4 leading-relaxed">
                        Borrower failed to repay within the tenor period. Collateral (<span className="text-red-400">{loan.collateralAmount.toLocaleString()} {loan.collateralToken}</span>) has been seized and distributed proportionally to funders.
                    </p>

                    {loan.funders.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-red-500/[0.08]">
                            <h4 className="text-[9px] text-gray-500 font-mono mb-2 tracking-wider">COLLATERAL DISTRIBUTION</h4>
                            <div className="space-y-1.5">
                                {loan.funders.map((f, i) => {
                                    const pct = f.amount / loan.amount;
                                    const collateralShare = pct * loan.collateralAmount;
                                    return (
                                        <div key={i} className="flex justify-between items-center text-[10px] font-mono border-b border-red-500/[0.04] py-1.5 last:border-0">
                                            <span className="text-gray-400">{f.name || f.address.slice(0, 10)}</span>
                                            <div className="text-right">
                                                <div className="text-red-400 font-bold">{collateralShare.toLocaleString(undefined, { maximumFractionDigits: 2 })} {loan.collateralToken}</div>
                                                <div className="text-[8px] text-gray-600">{(pct * 100).toFixed(1)}% share</div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown, Minus, Clock, Zap, Check } from 'lucide-react';
import type { Proposal, VoteChoice } from '../types';

interface Props {
    proposal: Proposal;
    hasVoted: boolean;
    userVote?: VoteChoice;
    onVote: (choice: VoteChoice) => void;
}

function timeLeft(endsAt?: number): string {
    if (!endsAt) return '—';
    const diff = endsAt - Date.now();
    if (diff <= 0) return 'ENDED';
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    if (d > 0) return `${d}D ${h}H`;
    const m = Math.floor((diff / (1000 * 60)) % 60);
    return `${h}H ${m}M`;
}

export default function VotingPanel({ proposal, hasVoted, userVote, onVote }: Props) {
    const [voting, setVoting] = useState(false);
    const totalVotes = proposal.votesFor + proposal.votesAgainst + proposal.votesAbstain;
    const isActive = proposal.status === 'active';

    const bars = [
        { label: 'FOR', value: proposal.votesFor, color: '#22c55e', pct: totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0 },
        { label: 'AGAINST', value: proposal.votesAgainst, color: '#ef4444', pct: totalVotes > 0 ? (proposal.votesAgainst / totalVotes) * 100 : 0 },
        { label: 'ABSTAIN', value: proposal.votesAbstain, color: '#6b7280', pct: totalVotes > 0 ? (proposal.votesAbstain / totalVotes) * 100 : 0 },
    ];

    const quorumMet = totalVotes >= (proposal.quorumRequired / 100) * totalVotes;

    const handleVote = async (choice: VoteChoice) => {
        setVoting(true);
        await onVote(choice);
        setVoting(false);
    };

    const voteButtons: { choice: VoteChoice; label: string; icon: React.ElementType; color: string }[] = [
        { choice: 'for', label: 'FOR', icon: ThumbsUp, color: '#22c55e' },
        { choice: 'against', label: 'AGAINST', icon: ThumbsDown, color: '#ef4444' },
        { choice: 'abstain', label: 'ABSTAIN', icon: Minus, color: '#6b7280' },
    ];

    return (
        <div
            className="bg-[#0d0d0d] border border-red-500/[0.1] overflow-hidden"
            style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-red-500/[0.08]">
                <h3 className="text-xs text-white font-mono tracking-[0.15em] uppercase font-bold flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-red-500" />
                    VOTING
                </h3>
                {isActive && proposal.votingEndsAt && (
                    <span className="text-[10px] font-mono text-red-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {timeLeft(proposal.votingEndsAt)}
                    </span>
                )}
            </div>

            <div className="p-5 space-y-4">
                {/* Vote bars */}
                {bars.map((bar) => (
                    <div key={bar.label}>
                        <div className="flex justify-between mb-1">
                            <span className="text-[10px] font-mono text-gray-500 tracking-wider">{bar.label}</span>
                            <span className="text-[10px] font-mono text-gray-400">{bar.pct.toFixed(1)}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-900 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${bar.pct}%` }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                                className="h-full"
                                style={{ backgroundColor: bar.color }}
                            />
                        </div>
                    </div>
                ))}

                {/* Total votes */}
                <div className="flex items-center justify-between py-2 border-t border-red-500/[0.06]">
                    <span className="text-[10px] font-mono text-gray-600 tracking-wider">TOTAL POWER</span>
                    <span className="text-xs font-mono text-white font-bold">{totalVotes.toLocaleString()}</span>
                </div>

                {/* Vote buttons */}
                {isActive && !hasVoted && (
                    <div className="grid grid-cols-3 gap-2 pt-1">
                        {voteButtons.map((btn) => {
                            const Icon = btn.icon;
                            return (
                                <button
                                    key={btn.choice}
                                    onClick={() => handleVote(btn.choice)}
                                    disabled={voting}
                                    className="flex flex-col items-center gap-1.5 py-3 border transition-all disabled:opacity-50 font-mono"
                                    style={{
                                        borderColor: `${btn.color}30`,
                                        backgroundColor: `${btn.color}05`,
                                        color: btn.color,
                                    }}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span className="text-[9px] font-bold tracking-[0.15em]">{btn.label}</span>
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Already voted */}
                {hasVoted && userVote && (
                    <div className="flex items-center gap-2 py-3 border border-emerald-500/20 bg-emerald-500/[0.05] px-4">
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-mono text-emerald-400 tracking-wider uppercase">
                            VOTED: {userVote}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

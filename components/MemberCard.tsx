'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, Vote, ScrollText } from 'lucide-react';
import { ROLE_CONFIG } from '../config';
import type { DaoMember } from '../types';

interface Props {
    member: DaoMember;
    index?: number;
    rank?: number;
}

export default function MemberCard({ member, index = 0, rank }: Props) {
    const roleCfg = ROLE_CONFIG[member.role];

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.06 }}
        >
            <Link href={`/dao/members/${member.walletAddress}`} className="block group">
                <div className="relative bg-[#0d0d0d] border border-red-500/[0.06] overflow-hidden transition-all hover:border-red-500/20">
                    {/* Left accent */}
                    <div className="absolute left-0 top-0 bottom-0 w-[2px]" style={{ backgroundColor: `${roleCfg.color}40` }} />

                    <div className="flex items-center gap-4 px-5 py-4">
                        {/* Rank */}
                        {rank && (
                            <div className="text-[10px] font-mono text-gray-700 w-5 text-center font-bold">
                                {String(rank).padStart(2, '0')}
                            </div>
                        )}

                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-10 h-10 bg-[#111] border border-red-500/[0.15] flex items-center justify-center text-sm font-bold text-red-400 font-mono">
                                {member.avatar ? (
                                    <img src={member.avatar} alt={member.displayName} className="w-full h-full object-cover" />
                                ) : (
                                    member.displayName?.charAt(0)?.toUpperCase() || '?'
                                )}
                            </div>
                            {member.isActive && (
                                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#0d0d0d]" />
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="text-white font-semibold text-sm truncate group-hover:text-red-400 transition-colors">
                                    {member.displayName}
                                </span>
                                <span
                                    className="text-[8px] font-mono font-bold tracking-[0.15em] uppercase px-1.5 py-0.5 border"
                                    style={{ color: roleCfg.color, borderColor: `${roleCfg.color}30`, backgroundColor: `${roleCfg.color}08` }}
                                >
                                    {roleCfg.label}
                                </span>
                            </div>
                            <div className="text-[10px] text-gray-600 font-mono mt-0.5">
                                {member.walletAddress.slice(0, 6)}...{member.walletAddress.slice(-4)}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="hidden sm:flex items-center gap-5 text-center">
                            <div>
                                <div className="text-xs text-white font-mono font-bold">{member.reputation}</div>
                                <div className="text-[8px] text-gray-600 font-mono tracking-wider">REP</div>
                            </div>
                            <div>
                                <div className="text-xs text-white font-mono font-bold">{member.votesCount}</div>
                                <div className="text-[8px] text-gray-600 font-mono tracking-wider">VOTES</div>
                            </div>
                            <div>
                                <div className="text-xs text-white font-mono font-bold">{member.proposalsSubmitted}</div>
                                <div className="text-[8px] text-gray-600 font-mono tracking-wider">PROPS</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

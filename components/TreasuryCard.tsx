'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, ArrowUpRight, Shield, DollarSign } from 'lucide-react';
import type { TreasurySummary } from '../types';

import Link from 'next/link';

interface Props {
    treasury: TreasurySummary | null;
    loading?: boolean;
    onchainUsdBalance?: number;
}

type CardData = { value?: number; isLink?: boolean; href?: string; };

const cards = [
    { key: 'total', label: 'TOTAL ASSETS', icon: Wallet, accessor: (t: TreasurySummary): CardData => ({ value: t.totalBalance }) },
    { key: 'onchain', label: 'ONCHAIN FUNDS', icon: Shield, accessor: (t: TreasurySummary, usd: number): CardData => ({ value: usd, isLink: true, href: '/dao/treasury/onchain' }) },
    { key: 'available', label: 'AVAILABLE', icon: DollarSign, accessor: (t: TreasurySummary): CardData => ({ value: t.availableFunds }) },
    { key: 'allocated', label: 'ALLOCATED', icon: Shield, accessor: (t: TreasurySummary): CardData => ({ value: t.allocatedFunds }) },
    { key: 'returns', label: 'RETURNS', icon: ArrowUpRight, accessor: (t: TreasurySummary): CardData => ({ value: t.totalReturns }) },
];

export default function TreasuryCard({ treasury, loading, onchainUsdBalance = 0 }: Props) {
    if (loading || !treasury) {
        return (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-28 bg-white/[0.02] border border-red-500/[0.06] animate-pulse" style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }} />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
            {cards.map((card, index) => {
                const Icon = card.icon;
                const data = card.accessor(treasury, onchainUsdBalance);

                const cardContent = (
                    <motion.div
                        key={card.key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative group"
                    >
                        {/* Cyber-cut container */}
                        <div
                            className="relative bg-[#0d0d0d] border border-red-500/[0.1] p-4 overflow-hidden transition-all hover:border-red-500/30"
                            style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}
                        >
                            {/* Corner accents */}
                            <div className="absolute top-0 right-3 w-[1px] h-3 bg-red-500/40" />
                            <div className="absolute top-3 right-0 w-3 h-[1px] bg-red-500/40" />
                            <div className="absolute bottom-0 left-3 w-[1px] h-3 bg-red-500/40" />
                            <div className="absolute bottom-3 left-0 w-3 h-[1px] bg-red-500/40" />

                            {/* Scan line */}
                            <div className="absolute inset-0 bg-gradient-to-b from-red-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-7 h-7 border border-red-500/20 bg-red-500/[0.06] flex items-center justify-center">
                                        <Icon className="w-3.5 h-3.5 text-red-500" />
                                    </div>
                                    <span className="text-[10px] text-gray-600 font-mono tracking-[0.2em] uppercase">{card.label}</span>
                                </div>
                                <div className="text-xl font-bold text-white font-mono tracking-tight">
                                    ${data.value?.toLocaleString('en-US', { minimumFractionDigits: 0 })}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );

                if (data.isLink && data.href) {
                    return (
                        <Link href={data.href} key={card.key}>
                            {cardContent}
                        </Link>
                    );
                }

                return cardContent;
            })}
        </div>
    );
}

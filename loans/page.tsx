'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Landmark, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import DaoNavbar from '../components/DaoNavbar';
import LoanCard from '../components/LoanCard';
import { seedIfNeeded, getLoans } from '@/lib/local-dao-store';
import type { LoanRequest, LoanFilterTab } from '../types';

const FILTER_TABS: { key: LoanFilterTab; label: string }[] = [
    { key: 'all', label: 'ALL' },
    { key: 'voting', label: 'VOTING' },
    { key: 'funding', label: 'FUNDING' },
    { key: 'active', label: 'ACTIVE' },
    { key: 'repaid', label: 'REPAID' },
    { key: 'defaulted', label: 'DEFAULTED' },
];

export default function LoansPage() {
    const [loans, setLoans] = useState<LoanRequest[]>([]);
    const [filter, setFilter] = useState<LoanFilterTab>('all');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        seedIfNeeded();
        setLoans(getLoans());
        setLoading(false);
    }, []);

    const filtered = loans
        .filter(l => filter === 'all' || l.status === filter)
        .filter(l => !search || l.borrowerName?.toLowerCase().includes(search.toLowerCase()) || l.purpose.toLowerCase().includes(search.toLowerCase()));

    const totalFunding = loans.filter(l => l.status === 'funding').reduce((s, l) => s + l.amount, 0);
    const totalActive = loans.filter(l => l.status === 'active' || l.status === 'repaying').reduce((s, l) => s + l.amount, 0);

    return (
        <div className="min-h-screen bg-[#060608]">
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>
            <DaoNavbar />
            <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <div>
                            <div className="text-[10px] text-red-500/60 font-mono tracking-[0.3em] uppercase mb-1">// LENDING</div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-mono flex items-center gap-3">
                                <Landmark className="w-8 h-8 text-red-500" />
                                LOANS
                            </h1>
                            <p className="text-gray-600 mt-1 text-xs font-mono">
                                {loans.length} total · {loans.filter(l => l.status === 'voting').length} voting · {loans.filter(l => l.status === 'funding').length} funding
                            </p>
                        </div>
                        <Link href="/dao/loans/new" className="inline-flex items-center gap-2 px-5 py-2.5 border border-cyan-500/40 bg-cyan-500/[0.06] text-cyan-400 font-mono text-xs font-bold tracking-wider uppercase hover:bg-cyan-500/15 active:scale-[0.98] transition-all">
                            <Plus className="w-3.5 h-3.5" />
                            REQUEST LOAN
                        </Link>
                    </div>
                </motion.div>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                        { label: 'SEEKING FUNDING', value: `$${totalFunding.toLocaleString()}`, color: 'text-cyan-400' },
                        { label: 'ACTIVE LOANS', value: `$${totalActive.toLocaleString()}`, color: 'text-emerald-400' },
                        { label: 'FLAT RATES', value: '3 / 6 / 9%', color: 'text-amber-400' },
                    ].map(stat => (
                        <div key={stat.label} className="bg-[#0d0d0d] border border-red-500/[0.06] p-4 text-center">
                            <div className={`text-sm font-mono font-bold ${stat.color}`}>{stat.value}</div>
                            <div className="text-[8px] text-gray-600 font-mono tracking-wider mt-0.5">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700" />
                        <input type="text" placeholder="Search loans..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-[#0d0d0d] border border-red-500/[0.08] pl-10 pr-4 py-2.5 text-white font-mono placeholder-gray-700 focus:outline-none focus:border-red-500/30 transition-colors text-xs" />
                    </div>
                    <div className="flex gap-1.5 overflow-x-auto pb-1">
                        {FILTER_TABS.map(tab => (
                            <button key={tab.key} onClick={() => setFilter(tab.key)} className={`px-3 py-2 text-[10px] font-mono font-bold tracking-wider uppercase whitespace-nowrap transition-all border ${filter === tab.key ? 'text-cyan-400 border-cyan-500/30 bg-cyan-500/[0.06]' : 'text-gray-600 border-red-500/[0.06] hover:text-white'}`}>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="space-y-3">{[1, 2, 3].map(i => (<div key={i} className="h-28 bg-white/[0.02] border border-red-500/[0.06] animate-pulse" />))}</div>
                ) : filtered.length > 0 ? (
                    <div className="space-y-3">{filtered.map((loan, i) => (<LoanCard key={loan.id} loan={loan} index={i} />))}</div>
                ) : (
                    <div className="text-center py-20">
                        <Landmark className="w-10 h-10 text-gray-800 mx-auto mb-3" />
                        <p className="text-gray-500 font-mono text-sm">NO LOANS FOUND</p>
                    </div>
                )}
            </main>
        </div>
    );
}

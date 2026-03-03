'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrollText, Plus, Search, Terminal } from 'lucide-react';
import Link from 'next/link';
import DaoNavbar from '../components/DaoNavbar';
import ProposalCard from '../components/ProposalCard';
import { seedIfNeeded, getProposals } from '@/lib/local-dao-store';
import type { Proposal, ProposalFilterTab } from '../types';

const FILTER_TABS: { key: ProposalFilterTab; label: string }[] = [
    { key: 'all', label: 'ALL' },
    { key: 'active', label: 'ACTIVE' },
    { key: 'passed', label: 'PASSED' },
    { key: 'failed', label: 'FAILED' },
    { key: 'draft', label: 'DRAFT' },
];

export default function ProposalsPage() {
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [activeFilter, setActiveFilter] = useState<ProposalFilterTab>('all');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        seedIfNeeded();
        setProposals(getProposals());
        setLoading(false);
    }, []);

    const filtered = proposals
        .filter(p => activeFilter === 'all' || p.status === activeFilter)
        .filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()));

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
                            <div className="text-[10px] text-red-500/60 font-mono tracking-[0.3em] uppercase mb-1">// GOVERNANCE</div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-mono flex items-center gap-3">
                                <Terminal className="w-8 h-8 text-red-500" /> PROPOSALS
                            </h1>
                            <p className="text-gray-600 mt-1 text-xs font-mono">
                                {proposals.length} total · {proposals.filter(p => p.status === 'active').length} active
                            </p>
                        </div>
                        <Link href="/dao/proposals/new" className="inline-flex items-center gap-2 px-5 py-2.5 border border-red-500/40 bg-red-500/[0.06] text-red-400 font-mono text-xs font-bold tracking-wider uppercase hover:bg-red-500/15 active:scale-[0.98] transition-all">
                            <Plus className="w-3.5 h-3.5" /> NEW PROPOSAL
                        </Link>
                    </div>
                </motion.div>

                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700" />
                        <input type="text" placeholder="Search proposals..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-[#0d0d0d] border border-red-500/[0.08] pl-10 pr-4 py-2.5 text-white font-mono placeholder-gray-700 focus:outline-none focus:border-red-500/30 transition-colors text-xs" />
                    </div>
                    <div className="flex gap-1.5 overflow-x-auto pb-1">
                        {FILTER_TABS.map(tab => (
                            <button key={tab.key} onClick={() => setActiveFilter(tab.key)} className={`px-3 py-2 text-[10px] font-mono font-bold tracking-wider uppercase whitespace-nowrap transition-all border ${activeFilter === tab.key ? 'text-red-400 border-red-500/30 bg-red-500/[0.06]' : 'text-gray-600 border-red-500/[0.06] hover:text-white'}`}>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="space-y-3">{[1, 2, 3].map(i => (<div key={i} className="h-32 bg-white/[0.02] border border-red-500/[0.06] animate-pulse" />))}</div>
                ) : filtered.length > 0 ? (
                    <div className="space-y-3">{filtered.map((p, i) => (<ProposalCard key={p.id} proposal={p} index={i} />))}</div>
                ) : (
                    <div className="text-center py-20">
                        <ScrollText className="w-10 h-10 text-gray-800 mx-auto mb-3" />
                        <p className="text-gray-500 font-mono text-sm">NO MATCHES FOUND</p>
                    </div>
                )}
            </main>
        </div>
    );
}

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Search } from 'lucide-react';
import DaoNavbar from '../components/DaoNavbar';
import MemberCard from '../components/MemberCard';
import { seedIfNeeded, getMembers } from '@/lib/local-dao-store';
import type { DaoMember, DaoRole } from '../types';

const ROLE_FILTERS: { key: 'all' | DaoRole; label: string }[] = [
    { key: 'all', label: 'ALL' }, { key: 'admin', label: 'ADMIN' }, { key: 'member', label: 'MEMBER' }, { key: 'observer', label: 'OBSERVER' },
];

export default function MembersPage() {
    const [members, setMembers] = useState<DaoMember[]>([]);
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState<'all' | DaoRole>('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => { seedIfNeeded(); setMembers(getMembers()); setLoading(false); }, []);

    const filtered = members
        .filter(m => roleFilter === 'all' || m.role === roleFilter)
        .filter(m => !search || m.displayName.toLowerCase().includes(search.toLowerCase()) || m.walletAddress.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="min-h-screen bg-[#060608]">
            <div className="fixed inset-0 pointer-events-none overflow-hidden"><div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" /></div>
            <DaoNavbar />
            <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <div className="text-[10px] text-red-500/60 font-mono tracking-[0.3em] uppercase mb-1">// NETWORK</div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-mono flex items-center gap-3"><Users className="w-8 h-8 text-red-500" /> MEMBERS</h1>
                    <p className="text-gray-600 mt-1 text-xs font-mono">{members.length} registered · Ranked by reputation</p>
                </motion.div>

                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700" />
                        <input type="text" placeholder="Search by name or wallet..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-[#0d0d0d] border border-red-500/[0.08] pl-10 pr-4 py-2.5 text-white font-mono placeholder-gray-700 focus:outline-none focus:border-red-500/30 text-xs" />
                    </div>
                    <div className="flex gap-1.5 overflow-x-auto pb-1">
                        {ROLE_FILTERS.map(f => (
                            <button key={f.key} onClick={() => setRoleFilter(f.key)} className={`px-3 py-2 text-[10px] font-mono font-bold tracking-wider uppercase whitespace-nowrap transition-all border ${roleFilter === f.key ? 'text-red-400 border-red-500/30 bg-red-500/[0.06]' : 'text-gray-600 border-red-500/[0.06] hover:text-white'}`}>{f.label}</button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="space-y-2">{[1, 2, 3, 4].map(i => (<div key={i} className="h-16 bg-white/[0.02] border border-red-500/[0.06] animate-pulse" />))}</div>
                ) : filtered.length > 0 ? (
                    <div className="space-y-2">{filtered.map((m, i) => (<MemberCard key={m.walletAddress} member={m} index={i} rank={i + 1} />))}</div>
                ) : (
                    <div className="text-center py-20"><Users className="w-10 h-10 text-gray-800 mx-auto mb-3" /><p className="text-gray-500 font-mono text-sm">NO MATCHES</p></div>
                )}
            </main>
        </div>
    );
}

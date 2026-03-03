'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useActiveAccount } from 'thirdweb/react';
import { Vault, ArrowUpRight, ArrowDownRight, Clock, Plus } from 'lucide-react';
import DaoNavbar from '../components/DaoNavbar';
import TreasuryCard from '../components/TreasuryCard';
import { seedIfNeeded, getTreasury, getTransactions, addContribution, getMember } from '@/lib/local-dao-store';
import type { TreasurySummary, TreasuryTransaction, TransactionType } from '../types';

const TX_STYLE: Record<TransactionType, { icon: React.ElementType; color: string; sign: string }> = {
    deposit: { icon: ArrowDownRight, color: '#22c55e', sign: '+' },
    withdrawal: { icon: ArrowUpRight, color: '#ef4444', sign: '-' },
    allocation: { icon: ArrowUpRight, color: '#f59e0b', sign: '-' },
    return: { icon: ArrowDownRight, color: '#22c55e', sign: '+' },
    loan_disbursement: { icon: ArrowUpRight, color: '#06b6d4', sign: '-' },
    loan_repayment: { icon: ArrowDownRight, color: '#06b6d4', sign: '+' },
};

function formatDate(ts: number): string { return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
function formatTime(ts: number): string { return new Date(ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }); }

export default function TreasuryPage() {
    const account = useActiveAccount();
    const [treasury, setTreasury] = useState<TreasurySummary | null>(null);
    const [transactions, setTransactions] = useState<TreasuryTransaction[]>([]);
    const [showContribute, setShowContribute] = useState(false);
    const [contributeAmount, setContributeAmount] = useState('');
    const [filter, setFilter] = useState<'all' | TransactionType>('all');
    const [loading, setLoading] = useState(true);

    const reload = () => {
        setTreasury(getTreasury());
        setTransactions(getTransactions());
    };

    useEffect(() => {
        seedIfNeeded();
        reload();
        setLoading(false);
    }, []);

    const handleContribute = () => {
        if (!account || !contributeAmount || Number(contributeAmount) <= 0) return;
        const member = getMember(account.address);
        addContribution(account.address, Number(contributeAmount), member ? `Contribution — ${member.displayName}` : 'Treasury contribution');
        setContributeAmount('');
        setShowContribute(false);
        reload();
    };

    const filtered = filter === 'all' ? transactions : transactions.filter(tx => tx.type === filter);

    return (
        <div className="min-h-screen bg-[#060608]">
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>
            <DaoNavbar />
            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <div>
                            <div className="text-[10px] text-red-500/60 font-mono tracking-[0.3em] uppercase mb-1">// FINANCIAL CORE</div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-mono flex items-center gap-3"><Vault className="w-8 h-8 text-red-500" />TREASURY</h1>
                            <p className="text-gray-600 mt-1 text-xs font-mono">Fund overview & transaction history</p>
                        </div>
                        {account && (
                            <button onClick={() => setShowContribute(!showContribute)} className="inline-flex items-center gap-2 px-5 py-2.5 border border-emerald-500/40 bg-emerald-500/[0.06] text-emerald-400 font-mono text-xs font-bold tracking-wider uppercase hover:bg-emerald-500/15 active:scale-[0.98] transition-all">
                                <Plus className="w-3.5 h-3.5" />CONTRIBUTE
                            </button>
                        )}
                    </div>
                </motion.div>

                <div className="mb-8"><TreasuryCard treasury={loading ? null : treasury} loading={loading} /></div>

                {showContribute && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-8">
                        <div className="bg-[#0d0d0d] border border-emerald-500/20 p-6">
                            <h3 className="text-xs text-white font-mono tracking-[0.15em] uppercase font-bold mb-4">// CONTRIBUTE</h3>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="flex-1">
                                    <label className="text-[10px] text-gray-600 font-mono mb-1 block tracking-wider">AMOUNT (USD)</label>
                                    <input type="number" value={contributeAmount} onChange={(e) => setContributeAmount(e.target.value)} placeholder="0.00" className="w-full bg-black border border-red-500/[0.1] px-4 py-3 text-white font-mono placeholder-gray-800 focus:outline-none focus:border-red-500/30 text-sm" />
                                </div>
                                <div className="flex items-end">
                                    <button onClick={handleContribute} disabled={!contributeAmount || Number(contributeAmount) <= 0} className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold tracking-wider transition-colors disabled:opacity-50">CONFIRM</button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
                    {(['all', 'deposit', 'allocation', 'return', 'loan_disbursement', 'loan_repayment'] as const).map(f => (
                        <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 text-[10px] font-mono font-bold tracking-wider uppercase whitespace-nowrap transition-all border ${filter === f ? 'text-red-400 border-red-500/30 bg-red-500/[0.06]' : 'text-gray-600 border-red-500/[0.06] hover:text-white hover:border-red-500/15'}`}>
                            {f === 'all' ? 'ALL' : f.replace('_', ' ')}
                        </button>
                    ))}
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#0d0d0d] border border-red-500/[0.08] overflow-hidden">
                    <div className="px-5 py-3 border-b border-red-500/[0.06]">
                        <h3 className="text-[10px] text-white font-mono tracking-[0.15em] uppercase font-bold">TRANSACTION LOG</h3>
                    </div>
                    {filtered.length > 0 ? (
                        <div className="divide-y divide-red-500/[0.04]">
                            {filtered.map(tx => {
                                const style = TX_STYLE[tx.type];
                                const Icon = style.icon;
                                return (
                                    <div key={tx.id} className="flex items-center gap-4 px-5 py-4 hover:bg-red-500/[0.02] transition-colors">
                                        <div className="w-8 h-8 border flex items-center justify-center shrink-0" style={{ borderColor: `${style.color}25`, backgroundColor: `${style.color}08` }}>
                                            <Icon className="w-3.5 h-3.5" style={{ color: style.color }} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs text-white font-medium">{tx.description}</div>
                                            <div className="text-[9px] text-gray-600 font-mono flex items-center gap-2 mt-0.5"><Clock className="w-2.5 h-2.5" />{formatDate(tx.timestamp)} · {formatTime(tx.timestamp)}</div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-sm font-mono font-bold" style={{ color: style.color }}>{style.sign}${tx.amount.toLocaleString()}</span>
                                            <div className="text-[8px] text-gray-700 font-mono tracking-wider uppercase mt-0.5">{tx.type.replace('_', ' ')}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12"><p className="text-gray-700 font-mono text-xs">No transactions</p></div>
                    )}
                </motion.div>
            </main>
        </div>
    );
}

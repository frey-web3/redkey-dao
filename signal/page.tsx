'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Radar, Plus, Trash2, ExternalLink, Copy, Check, Eye } from 'lucide-react';
import DaoNavbar from '../components/DaoNavbar';

// Predefined smart money addresses (known whale/fund wallets on AVAX)
const DEFAULT_WALLETS = [
    {
        address: '0x9f8c163cBA728e99993ABe7495F06c0A3c8Ac8b9',
        label: 'Avalanche Foundation',
        tag: 'Foundation',
    },
    {
        address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
        label: 'WAVAX Contract',
        tag: 'DeFi',
    },
    {
        address: '0x60aE616a2155Ee3d9A68541Ba4544862310933d4',
        label: 'Trader Joe Router',
        tag: 'DEX',
    },
    {
        address: '0x1a1ec25DC08e98e5E93F1104B5e5cdD298707d31',
        label: 'Whale Wallet #1',
        tag: 'Whale',
    },
    {
        address: '0x4aeFa39caEAdD662aE31ab0CE7c8C2c9c0a013E8',
        label: 'GMX Whale',
        tag: 'Whale',
    },
];

const TAG_COLORS: Record<string, string> = {
    Foundation: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    DeFi: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    DEX: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    Whale: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    Custom: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
};

interface WalletEntry {
    address: string;
    label: string;
    tag: string;
}

export default function SignalPage() {
    const [wallets, setWallets] = useState<WalletEntry[]>(DEFAULT_WALLETS);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newAddress, setNewAddress] = useState('');
    const [newLabel, setNewLabel] = useState('');
    const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

    const handleAdd = () => {
        if (!newAddress.trim()) return;
        const entry: WalletEntry = {
            address: newAddress.trim(),
            label: newLabel.trim() || `Wallet ${wallets.length + 1}`,
            tag: 'Custom',
        };
        setWallets([entry, ...wallets]);
        setNewAddress('');
        setNewLabel('');
        setShowAddForm(false);
    };

    const handleRemove = (index: number) => {
        setWallets(wallets.filter((_, i) => i !== index));
    };

    const handleCopy = (address: string, idx: number) => {
        navigator.clipboard.writeText(address);
        setCopiedIdx(idx);
        setTimeout(() => setCopiedIdx(null), 1500);
    };

    return (
        <div className="min-h-screen bg-[#060608]">
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-red-600/[0.03] rounded-full blur-[150px]" />
            </div>

            <DaoNavbar />

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <div>
                            <div className="text-[10px] text-red-500/60 font-mono tracking-[0.3em] uppercase mb-1">// SIGNAL TRACKER</div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-mono">SMART MONEY</h1>
                            <p className="text-gray-600 mt-1 text-xs font-mono">Track whale wallets & smart money movements on Avalanche</p>
                        </div>
                        <button
                            onClick={() => setShowAddForm(!showAddForm)}
                            className="inline-flex items-center gap-2 px-4 py-2.5 border border-red-500/40 bg-red-500/[0.06] text-red-400 font-mono text-xs font-bold tracking-wider uppercase hover:bg-red-500/15 active:scale-[0.98] transition-all"
                        >
                            <Plus className="w-3.5 h-3.5" /> TRACK ADDRESS
                        </button>
                    </div>
                </motion.div>

                {/* Add Form */}
                {showAddForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-6 bg-[#0d0d0d] border border-red-500/[0.12] p-5"
                    >
                        <h3 className="text-[10px] text-white font-mono tracking-[0.15em] uppercase font-bold mb-4">
                            ADD WALLET TO TRACK
                        </h3>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="text"
                                placeholder="0x... wallet address"
                                value={newAddress}
                                onChange={(e) => setNewAddress(e.target.value)}
                                className="flex-1 bg-[#111] border border-red-500/[0.1] text-white text-xs font-mono px-4 py-3 placeholder:text-gray-700 focus:outline-none focus:border-red-500/30 transition-colors"
                            />
                            <input
                                type="text"
                                placeholder="Label (optional)"
                                value={newLabel}
                                onChange={(e) => setNewLabel(e.target.value)}
                                className="sm:w-48 bg-[#111] border border-red-500/[0.1] text-white text-xs font-mono px-4 py-3 placeholder:text-gray-700 focus:outline-none focus:border-red-500/30 transition-colors"
                            />
                            <button
                                onClick={handleAdd}
                                disabled={!newAddress.trim()}
                                className="px-6 py-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-bold uppercase tracking-wider hover:bg-red-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                ADD
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-6 mb-6 py-3 px-5 bg-[#0d0d0d] border border-red-500/[0.06]"
                >
                    <div className="flex items-center gap-2">
                        <Radar className="w-4 h-4 text-red-500" />
                        <span className="text-[10px] text-gray-500 font-mono tracking-wider uppercase">TRACKING</span>
                        <span className="text-xs text-white font-mono font-bold">{wallets.length}</span>
                    </div>
                    <div className="h-4 border-l border-red-500/[0.1]" />
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-500 font-mono tracking-wider uppercase">NETWORK</span>
                        <span className="text-xs text-red-400 font-mono font-bold">AVALANCHE</span>
                    </div>
                </motion.div>

                {/* Wallet List */}
                <div className="space-y-2">
                    {wallets.map((wallet, idx) => (
                        <motion.div
                            key={wallet.address + idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 * idx }}
                            className="group bg-[#0d0d0d] border border-red-500/[0.06] hover:border-red-500/[0.15] transition-all"
                        >
                            <div className="flex items-center justify-between px-5 py-4">
                                <div className="flex items-center gap-4 min-w-0 flex-1">
                                    {/* Index */}
                                    <div className="text-[10px] font-mono text-gray-700 font-bold w-6">
                                        {String(idx + 1).padStart(2, '0')}
                                    </div>

                                    {/* Avatar */}
                                    <div className="w-9 h-9 border border-red-500/[0.12] bg-[#111] flex items-center justify-center shrink-0">
                                        <span className="text-[10px] font-bold text-red-400 font-mono">
                                            {wallet.label.charAt(0).toUpperCase()}
                                        </span>
                                    </div>

                                    {/* Info */}
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="text-sm text-white font-medium truncate">{wallet.label}</span>
                                            <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 border ${TAG_COLORS[wallet.tag] || TAG_COLORS.Custom}`}>
                                                {wallet.tag}
                                            </span>
                                        </div>
                                        <div className="text-[10px] text-gray-600 font-mono truncate">
                                            {wallet.address}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-1 ml-4 shrink-0">
                                    <button
                                        onClick={() => handleCopy(wallet.address, idx)}
                                        className="p-2 text-gray-700 hover:text-gray-400 transition-colors"
                                        title="Copy address"
                                    >
                                        {copiedIdx === idx ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                                    </button>
                                    <a
                                        href={`https://snowtrace.io/address/${wallet.address}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 text-gray-700 hover:text-gray-400 transition-colors"
                                        title="View on Snowtrace"
                                    >
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                    <Link
                                        href={`/dao/signal/${wallet.address}`}
                                        className="p-2 text-gray-700 hover:text-red-400 transition-colors"
                                        title="View transactions"
                                    >
                                        <Eye className="w-3.5 h-3.5" />
                                    </Link>
                                    <button
                                        onClick={() => handleRemove(idx)}
                                        className="p-2 text-gray-700 hover:text-red-500 transition-colors"
                                        title="Remove"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {wallets.length === 0 && (
                    <div className="text-center py-20 bg-[#0d0d0d] border border-red-500/[0.06]">
                        <Radar className="w-10 h-10 text-gray-800 mx-auto mb-4" />
                        <p className="text-gray-700 font-mono text-xs mb-3">No wallets being tracked</p>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="text-[10px] text-red-500/70 hover:text-red-400 font-mono tracking-wider uppercase transition-colors"
                        >
                            + Add your first wallet
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}

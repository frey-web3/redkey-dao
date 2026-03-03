'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    ArrowLeft, ExternalLink, Copy, Check, ArrowUpRight, ArrowDownLeft,
    Loader2, AlertTriangle, Radar
} from 'lucide-react';
import DaoNavbar from '../../components/DaoNavbar';

interface Transfer {
    hash: string;
    from: string;
    to: string;
    value: number | null;
    asset: string | null;
    category: string;
    metadata: {
        blockTimestamp: string;
    };
    rawContract?: {
        address?: string;
    };
}

function formatTimeAgo(timestamp: string): string {
    const diff = Date.now() - new Date(timestamp).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days}d ago`;
    return `${Math.floor(days / 30)}mo ago`;
}

function formatDate(timestamp: string): string {
    return new Date(timestamp).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

function shortenAddress(addr: string): string {
    if (!addr) return '—';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
    external: { label: 'AVAX', color: 'text-red-400' },
    erc20: { label: 'ERC-20', color: 'text-blue-400' },
    erc721: { label: 'NFT', color: 'text-purple-400' },
    erc1155: { label: 'ERC-1155', color: 'text-amber-400' },
};

const PAGE_SIZE = 10;

export default function SignalAddressPage() {
    const params = useParams();
    const address = params?.address as string;
    const [allTransfers, setAllTransfers] = useState<Transfer[]>([]);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const sentinelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!address) return;
        const fetchTransfers = async () => {
            try {
                const res = await fetch(`/api/signal?address=${address}`);
                if (!res.ok) throw new Error('Failed');
                const data = await res.json();
                setAllTransfers(data.transfers || []);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchTransfers();
    }, [address]);

    // Infinite scroll observer
    const loadMore = useCallback(() => {
        setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, allTransfers.length));
    }, [allTransfers.length]);

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) loadMore();
            },
            { rootMargin: '200px' }
        );
        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [loadMore, loading]);

    const transfers = allTransfers.slice(0, visibleCount);
    const hasMore = visibleCount < allTransfers.length;

    const handleCopy = () => {
        navigator.clipboard.writeText(address);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const outCount = allTransfers.filter(t => t.from?.toLowerCase() === address?.toLowerCase()).length;
    const inCount = allTransfers.filter(t => t.to?.toLowerCase() === address?.toLowerCase()).length;

    return (
        <div className="min-h-screen bg-[#060608]">
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
                <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-red-600/[0.03] rounded-full blur-[150px]" />
            </div>

            <DaoNavbar />

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8">
                {/* Back */}
                <Link
                    href="/dao/signal"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-red-400 transition-colors text-xs font-mono tracking-wider uppercase mb-6"
                >
                    <ArrowLeft className="w-3.5 h-3.5" /> BACK TO SIGNAL
                </Link>

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                    <div className="text-[10px] text-red-500/60 font-mono tracking-[0.3em] uppercase mb-1">// WALLET ANALYSIS</div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <h1 className="text-lg sm:text-xl font-bold text-white font-mono break-all">{address}</h1>
                        <div className="flex items-center gap-2 shrink-0">
                            <button
                                onClick={handleCopy}
                                className="p-1.5 text-gray-600 hover:text-gray-400 transition-colors border border-red-500/[0.08] bg-[#0d0d0d]"
                                title="Copy"
                            >
                                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                            <a
                                href={`https://snowtrace.io/address/${address}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 text-gray-600 hover:text-gray-400 transition-colors border border-red-500/[0.08] bg-[#0d0d0d]"
                                title="Snowtrace"
                            >
                                <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Stats */}
                {!loading && !error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-wrap items-center gap-6 mb-6 py-3 px-5 bg-[#0d0d0d] border border-red-500/[0.06]"
                    >
                        <div className="flex items-center gap-2">
                            <Radar className="w-4 h-4 text-red-500" />
                            <span className="text-[10px] text-gray-500 font-mono tracking-wider uppercase">TRANSACTIONS</span>
                            <span className="text-xs text-white font-mono font-bold">{allTransfers.length}</span>
                        </div>
                        <div className="h-4 border-l border-red-500/[0.1]" />
                        <div className="flex items-center gap-2">
                            <ArrowUpRight className="w-3.5 h-3.5 text-orange-400" />
                            <span className="text-[10px] text-gray-500 font-mono tracking-wider uppercase">OUT</span>
                            <span className="text-xs text-orange-400 font-mono font-bold">{outCount}</span>
                        </div>
                        <div className="h-4 border-l border-red-500/[0.1]" />
                        <div className="flex items-center gap-2">
                            <ArrowDownLeft className="w-3.5 h-3.5 text-green-400" />
                            <span className="text-[10px] text-gray-500 font-mono tracking-wider uppercase">IN</span>
                            <span className="text-xs text-green-400 font-mono font-bold">{inCount}</span>
                        </div>
                        <div className="h-4 border-l border-red-500/[0.1]" />
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] text-gray-500 font-mono tracking-wider uppercase">SHOWING</span>
                            <span className="text-xs text-gray-400 font-mono font-bold">{transfers.length} / {allTransfers.length}</span>
                        </div>
                    </motion.div>
                )}

                {/* Loading */}
                {loading && (
                    <div className="text-center py-20 bg-[#0d0d0d] border border-red-500/[0.06]">
                        <Loader2 className="w-8 h-8 text-red-500/40 mx-auto mb-4 animate-spin" />
                        <p className="text-gray-600 font-mono text-xs">Fetching transactions from Alchemy...</p>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="text-center py-20 bg-[#0d0d0d] border border-red-500/[0.06]">
                        <AlertTriangle className="w-8 h-8 text-red-500/40 mx-auto mb-4" />
                        <p className="text-gray-600 font-mono text-xs mb-3">Failed to fetch transactions</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="text-[10px] text-red-500/70 hover:text-red-400 font-mono tracking-wider uppercase transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Transaction List */}
                {!loading && !error && (
                    <div className="space-y-1">
                        {/* Column headers */}
                        <div className="hidden sm:flex items-center gap-4 px-5 py-2 text-[9px] text-gray-700 font-mono tracking-[0.15em] uppercase">
                            <div className="w-6">#</div>
                            <div className="w-16">TYPE</div>
                            <div className="w-16">CAT</div>
                            <div className="flex-1">FROM → TO</div>
                            <div className="w-32 text-right">VALUE</div>
                            <div className="w-28 text-right">TIME</div>
                            <div className="w-8" />
                        </div>

                        {transfers.map((tx, idx) => {
                            const isOut = tx.from?.toLowerCase() === address?.toLowerCase();
                            const cat = CATEGORY_LABELS[tx.category] || { label: tx.category, color: 'text-gray-400' };

                            return (
                                <motion.div
                                    key={tx.hash + idx}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: Math.min(0.02 * (idx % PAGE_SIZE), 0.2) }}
                                    className="group bg-[#0d0d0d] border border-red-500/[0.04] hover:border-red-500/[0.12] transition-all"
                                >
                                    {/* Desktop */}
                                    <div className="hidden sm:flex items-center gap-4 px-5 py-3">
                                        <div className="text-[10px] font-mono text-gray-700 font-bold w-6">
                                            {String(idx + 1).padStart(2, '0')}
                                        </div>

                                        <div className="w-16">
                                            <div className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold ${isOut ? 'text-orange-400' : 'text-green-400'}`}>
                                                {isOut ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownLeft className="w-3 h-3" />}
                                                {isOut ? 'OUT' : 'IN'}
                                            </div>
                                        </div>

                                        <div className="w-16">
                                            <span className={`text-[9px] font-mono font-bold ${cat.color}`}>{cat.label}</span>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <span className="text-[10px] text-gray-500 font-mono">
                                                {shortenAddress(tx.from)} → {shortenAddress(tx.to)}
                                            </span>
                                        </div>

                                        <div className="w-32 text-right">
                                            <span className="text-xs text-white font-mono font-medium">
                                                {tx.value !== null && tx.value !== undefined
                                                    ? `${Number(tx.value).toLocaleString(undefined, { maximumFractionDigits: 4 })} ${tx.asset || ''}`
                                                    : '—'}
                                            </span>
                                        </div>

                                        <div className="w-28 text-right">
                                            <span className="text-[10px] text-gray-600 font-mono" title={formatDate(tx.metadata?.blockTimestamp)}>
                                                {formatTimeAgo(tx.metadata?.blockTimestamp)}
                                            </span>
                                        </div>

                                        <div className="w-8">
                                            <a
                                                href={`https://snowtrace.io/tx/${tx.hash}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-1 text-gray-700 hover:text-gray-400 transition-colors opacity-0 group-hover:opacity-100"
                                            >
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </div>
                                    </div>

                                    {/* Mobile */}
                                    <div className="sm:hidden px-4 py-3">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-mono text-gray-700 font-bold">{String(idx + 1).padStart(2, '0')}</span>
                                                <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold ${isOut ? 'text-orange-400' : 'text-green-400'}`}>
                                                    {isOut ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownLeft className="w-3 h-3" />}
                                                    {isOut ? 'OUT' : 'IN'}
                                                </span>
                                                <span className={`text-[9px] font-mono font-bold ${cat.color}`}>{cat.label}</span>
                                            </div>
                                            <span className="text-[10px] text-gray-600 font-mono">
                                                {formatTimeAgo(tx.metadata?.blockTimestamp)}
                                            </span>
                                        </div>
                                        <div className="text-[10px] text-gray-500 font-mono mb-1">
                                            {shortenAddress(tx.from)} → {shortenAddress(tx.to)}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-white font-mono font-medium">
                                                {tx.value !== null && tx.value !== undefined
                                                    ? `${Number(tx.value).toLocaleString(undefined, { maximumFractionDigits: 4 })} ${tx.asset || ''}`
                                                    : '—'}
                                            </span>
                                            <a
                                                href={`https://snowtrace.io/tx/${tx.hash}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-1 text-gray-700"
                                            >
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}

                        {transfers.length === 0 && (
                            <div className="text-center py-16 bg-[#0d0d0d] border border-red-500/[0.06]">
                                <p className="text-gray-700 font-mono text-xs">No transactions found for this address</p>
                            </div>
                        )}

                        {/* Infinite scroll sentinel */}
                        {hasMore && (
                            <div ref={sentinelRef} className="flex items-center justify-center py-6">
                                <Loader2 className="w-4 h-4 text-red-500/30 animate-spin mr-2" />
                                <span className="text-[10px] text-gray-700 font-mono tracking-wider">LOADING MORE...</span>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}

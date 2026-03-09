'use client';

import React, { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useActiveAccount } from 'thirdweb/react';
import {
    ArrowLeft, Search, Star, Vote, ScrollText, DollarSign, Calendar,
    TrendingUp, Clock, Copy, Check, ExternalLink, Edit3,
    Twitter, Github, Linkedin, Globe, UserCircle, Shield, AlertTriangle
} from 'lucide-react';
import Link from 'next/link';
import DaoNavbar from '../../components/DaoNavbar';
import ReputationPartnerSection, { getPartnerReputationScore } from '../../components/ReputationPartnerSection';
import { ROLE_CONFIG, CREDIT_TIERS } from '../../config';
import { seedIfNeeded, getMember, getMembers } from '@/lib/local-dao-store';
import type { DaoMember } from '../../types';

function formatDate(ts: number): string {
    return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function timeAgo(ts: number): string {
    const diff = Date.now() - ts;
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    return `${months}mo ago`;
}

export default function PublicProfilePage({ params }: { params: Promise<{ address: string }> }) {
    const { address } = use(params);
    const router = useRouter();
    const account = useActiveAccount();
    const [member, setMember] = useState<DaoMember | null>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<DaoMember[]>([]);
    const [showSearch, setShowSearch] = useState(false);

    const isOwnProfile = account?.address?.toLowerCase() === address.toLowerCase();

    useEffect(() => {
        seedIfNeeded();
        const m = getMember(address);
        setMember(m || null);
        setLoading(false);
    }, [address]);

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(member?.walletAddress || address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query.trim().length < 2) {
            setSearchResults([]);
            return;
        }
        const allMembers = getMembers();
        const q = query.toLowerCase();
        const results = allMembers.filter(
            m => m.displayName.toLowerCase().includes(q) ||
                m.walletAddress.toLowerCase().includes(q)
        ).slice(0, 5);
        setSearchResults(results);
    };

    const navigateToProfile = (addr: string) => {
        setSearchQuery('');
        setSearchResults([]);
        setShowSearch(false);
        router.push(`/dao/profile/${addr}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#060608]">
                <DaoNavbar />
                <div className="flex items-center justify-center h-[60vh]">
                    <span className="text-gray-600 font-mono text-xs animate-pulse">LOADING PROFILE...</span>
                </div>
            </div>
        );
    }

    if (!member) {
        return (
            <div className="min-h-screen bg-[#060608]">
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
                </div>
                <DaoNavbar />
                <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8">
                    {/* Search Bar */}
                    <div className="mb-8 relative">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700" />
                            <input
                                type="text"
                                placeholder="Search by wallet address or name..."
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                onFocus={() => setShowSearch(true)}
                                className="w-full bg-[#0d0d0d] border border-red-500/[0.08] pl-11 pr-4 py-3 text-white font-mono placeholder-gray-700 focus:outline-none focus:border-red-500/30 text-xs"
                            />
                        </div>
                        {showSearch && searchResults.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-[#111] border border-red-500/[0.12] shadow-xl shadow-black/50 z-50 max-h-64 overflow-y-auto">
                                {searchResults.map(m => (
                                    <button
                                        key={m.walletAddress}
                                        onClick={() => navigateToProfile(m.walletAddress)}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-500/5 transition-colors border-b border-red-500/[0.04] last:border-0"
                                    >
                                        <div className="w-8 h-8 bg-[#1a1a1a] border border-red-500/[0.15] flex items-center justify-center text-xs font-bold text-red-400 font-mono shrink-0">
                                            {m.avatar ? <img src={m.avatar} alt="" className="w-full h-full object-cover" /> : m.displayName?.charAt(0)?.toUpperCase() || '?'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm text-white font-mono truncate">{m.displayName}</div>
                                            <div className="text-[10px] text-gray-600 font-mono">{m.walletAddress.slice(0, 10)}...{m.walletAddress.slice(-6)}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col items-center justify-center min-h-[40vh]">
                        <div className="w-14 h-14 border border-amber-500/30 bg-amber-500/[0.06] flex items-center justify-center mb-4">
                            <AlertTriangle className="w-7 h-7 text-amber-400" />
                        </div>
                        <h2 className="text-white text-lg font-mono font-bold mb-2">[ MEMBER NOT FOUND ]</h2>
                        <p className="text-gray-600 text-xs font-mono text-center max-w-sm mb-1">
                            No profile found for this wallet address.
                        </p>
                        <p className="text-[10px] text-gray-700 font-mono break-all max-w-md text-center mb-6">{address}</p>
                        <Link href="/dao/members" className="inline-flex items-center gap-2 px-5 py-2.5 border border-red-500/20 text-red-400 hover:bg-red-500/5 font-mono text-xs font-bold tracking-wider transition-all">
                            BROWSE MEMBERS
                        </Link>
                    </div>
                </main>
            </div>
        );
    }

    const roleCfg = ROLE_CONFIG[member.role];
    const creditCfg = CREDIT_TIERS[member.creditTier];

    const stats = [
        { label: 'REPUTATION', value: member.reputation.toString(), maxValue: '/1000', icon: Star, color: '#f59e0b' },
        { label: 'VOTING POWER', value: member.votingPower.toString(), icon: Vote, color: '#ef4444' },
        { label: 'CONTRIBUTED', value: `$${member.totalContribution.toLocaleString()}`, icon: DollarSign, color: '#22c55e' },
        { label: 'PROPOSALS', value: member.proposalsSubmitted.toString(), icon: ScrollText, color: '#3b82f6' },
        { label: 'VOTES CAST', value: member.votesCount.toString(), icon: Vote, color: '#06b6d4' },
        { label: 'JOINED', value: formatDate(member.joinedAt), icon: Calendar, color: '#6b7280' },
    ];

    const socialLinks = [
        { key: 'twitter', value: member.twitter, icon: Twitter, url: (v: string) => `https://x.com/${v}`, label: 'X / Twitter' },
        { key: 'github', value: member.github, icon: Github, url: (v: string) => `https://github.com/${v}`, label: 'GitHub' },
        { key: 'linkedin', value: member.linkedin, icon: Linkedin, url: (v: string) => `https://linkedin.com/in/${v}`, label: 'LinkedIn' },
        { key: 'website', value: member.website, icon: Globe, url: (v: string) => v.startsWith('http') ? v : `https://${v}`, label: 'Website' },
    ].filter(s => s.value);

    const partnerScore = getPartnerReputationScore(member.walletAddress);

    const reputationMetrics = [
        { label: 'VOTING PARTICIPATION', value: Math.min(100, Math.round(member.votesCount * 2.5)), color: '#ef4444' },
        { label: 'PROPOSAL QUALITY', value: Math.min(100, member.proposalsSubmitted * 20), color: '#3b82f6' },
        { label: 'TREASURY CONTRIBUTION', value: Math.min(100, Math.round(member.totalContribution / 250)), color: '#22c55e' },
        { label: 'COMMUNITY ENGAGEMENT', value: Math.min(100, Math.round(member.reputation / 10)), color: '#f59e0b' },
        { label: 'PARTNER REPUTATION', value: partnerScore, color: '#a855f7' },
    ];

    return (
        <div className="min-h-screen bg-[#060608]">
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>
            <DaoNavbar />

            <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8">

                {/* Search Bar */}
                <div className="mb-6 relative">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700" />
                        <input
                            type="text"
                            placeholder="Search by wallet address or name..."
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            onFocus={() => setShowSearch(true)}
                            onBlur={() => setTimeout(() => setShowSearch(false), 200)}
                            className="w-full bg-[#0d0d0d] border border-red-500/[0.08] pl-11 pr-4 py-3 text-white font-mono placeholder-gray-700 focus:outline-none focus:border-red-500/30 text-xs"
                        />
                    </div>
                    {showSearch && searchResults.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-[#111] border border-red-500/[0.12] shadow-xl shadow-black/50 z-50 max-h-64 overflow-y-auto">
                            {searchResults.map(m => (
                                <button
                                    key={m.walletAddress}
                                    onClick={() => navigateToProfile(m.walletAddress)}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-500/5 transition-colors border-b border-red-500/[0.04] last:border-0"
                                >
                                    <div className="w-8 h-8 bg-[#1a1a1a] border border-red-500/[0.15] flex items-center justify-center text-xs font-bold text-red-400 font-mono shrink-0">
                                        {m.avatar ? <img src={m.avatar} alt="" className="w-full h-full object-cover" /> : m.displayName?.charAt(0)?.toUpperCase() || '?'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm text-white font-mono truncate">{m.displayName}</div>
                                        <div className="text-[10px] text-gray-600 font-mono">{m.walletAddress.slice(0, 10)}...{m.walletAddress.slice(-6)}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Back + Header Row */}
                <div className="flex items-center justify-between mb-6">
                    <Link href="/dao/members" className="inline-flex items-center gap-2 text-[10px] text-gray-600 hover:text-red-400 font-mono tracking-wider uppercase transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5" /> BACK TO MEMBERS
                    </Link>
                    {isOwnProfile && (
                        <Link
                            href="/dao/profile"
                            className="inline-flex items-center gap-2 px-4 py-2 border border-red-500/20 text-red-400 hover:bg-red-500/5 font-mono text-[10px] font-bold tracking-wider transition-all"
                        >
                            <Edit3 className="w-3 h-3" /> EDIT PROFILE
                        </Link>
                    )}
                </div>

                {/* Profile Header Card */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0d0d0d] border border-red-500/[0.08] overflow-hidden mb-5">
                    <div className="h-[2px] bg-gradient-to-r from-red-600/50 via-red-500/20 to-transparent" />
                    <div className="p-6">
                        <div className="flex flex-col sm:flex-row items-start gap-5">
                            {/* Avatar */}
                            <div className="relative">
                                <div className="w-20 h-20 bg-[#111] border border-red-500/[0.15] flex items-center justify-center text-2xl font-bold text-red-400 font-mono">
                                    {member.avatar
                                        ? <img src={member.avatar} alt={member.displayName} className="w-full h-full object-cover" />
                                        : member.displayName?.charAt(0)?.toUpperCase() || '?'
                                    }
                                </div>
                                {member.isActive && (
                                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#0d0d0d]" />
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-1">
                                    <h1 className="text-2xl font-bold text-white font-mono">{member.displayName}</h1>
                                    <span
                                        className="text-[9px] font-mono font-bold tracking-[0.15em] uppercase px-2 py-0.5 border"
                                        style={{ color: roleCfg.color, borderColor: `${roleCfg.color}40`, backgroundColor: `${roleCfg.color}08` }}
                                    >
                                        {roleCfg.icon} {roleCfg.label}
                                    </span>
                                </div>

                                {/* Wallet Address - Copyable */}
                                <button
                                    onClick={handleCopyAddress}
                                    className="flex items-center gap-2 text-[10px] text-gray-600 font-mono mb-3 hover:text-red-400 transition-colors group"
                                >
                                    <span className="break-all">{member.walletAddress}</span>
                                    {copied
                                        ? <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                                        : <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                                    }
                                </button>

                                {member.bio && (
                                    <p className="text-sm text-gray-400 leading-relaxed mb-3">{member.bio}</p>
                                )}

                                <div className="flex flex-wrap items-center gap-3">
                                    <span
                                        className="text-[9px] font-mono font-bold tracking-wider uppercase px-2 py-1 border"
                                        style={{ color: creditCfg.color, borderColor: `${creditCfg.color}30`, backgroundColor: `${creditCfg.color}08` }}
                                    >
                                        {creditCfg.icon} {creditCfg.label} TIER
                                    </span>
                                    <span className="text-[9px] text-gray-600 font-mono flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> Active {timeAgo(member.lastActiveAt)}
                                    </span>
                                    {member.isActive && (
                                        <span className="text-[9px] text-emerald-500 font-mono flex items-center gap-1">
                                            <Shield className="w-3 h-3" /> ONLINE
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.06 }}
                                className="bg-[#0d0d0d] border border-red-500/[0.08] p-4"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <Icon className="w-3.5 h-3.5" style={{ color: stat.color }} />
                                    <span className="text-[9px] text-gray-600 font-mono tracking-wider">{stat.label}</span>
                                </div>
                                <div className="text-lg font-bold text-white font-mono">
                                    {stat.value}
                                    {stat.maxValue && <span className="text-xs text-gray-700 font-normal">{stat.maxValue}</span>}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Social Links (if any) */}
                {socialLinks.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="bg-[#0d0d0d] border border-red-500/[0.08] p-5 mb-5"
                    >
                        <h3 className="text-[10px] text-white font-mono tracking-[0.15em] uppercase font-bold mb-4 flex items-center gap-2">
                            <Globe className="w-3.5 h-3.5 text-red-500" /> LINKS
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {socialLinks.map(link => {
                                const Icon = link.icon;
                                return (
                                    <a
                                        key={link.key}
                                        href={link.url(link.value!)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-3 py-2 bg-black border border-red-500/[0.1] hover:border-red-500/30 text-gray-400 hover:text-white transition-all text-xs font-mono group"
                                    >
                                        <Icon className="w-3.5 h-3.5 text-gray-600 group-hover:text-red-400 transition-colors" />
                                        {link.value}
                                        <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-50 transition-opacity" />
                                    </a>
                                );
                            })}
                        </div>
                    </motion.div>
                )}

                {/* Reputation Matrix */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-[#0d0d0d] border border-red-500/[0.08] p-6"
                >
                    <h3 className="text-[10px] text-white font-mono tracking-[0.15em] uppercase font-bold mb-4 flex items-center gap-2">
                        <TrendingUp className="w-3.5 h-3.5 text-red-500" /> REPUTATION MATRIX
                    </h3>
                    <div className="space-y-4">
                        {reputationMetrics.map(metric => (
                            <div key={metric.label}>
                                <div className="flex justify-between mb-1.5">
                                    <span className="text-[10px] text-gray-500 font-mono tracking-wider">{metric.label}</span>
                                    <span className="text-xs text-white font-mono font-bold">{metric.value}%</span>
                                </div>
                                <div className="h-1 bg-gray-900 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${metric.value}%` }}
                                        transition={{ duration: 0.8, ease: 'easeOut' }}
                                        className="h-full"
                                        style={{ backgroundColor: metric.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Reputation Partners — Read-only view (claim on private profile) */}
                <ReputationPartnerSection walletAddress={member.walletAddress} isOwnProfile={false} />
            </main>
        </div>
    );
}

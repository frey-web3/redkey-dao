'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useActiveAccount } from 'thirdweb/react';
import {
    Save, Star, Vote, ScrollText, DollarSign, Calendar,
    TrendingUp, Clock, Copy, Check, Eye,
    Twitter, Github, Linkedin, Globe, UserCircle, Shield,
    AlertTriangle, Link as LinkIcon
} from 'lucide-react';
import Link from 'next/link';
import DaoNavbar from '../components/DaoNavbar';
import ReputationPartnerSection, { getPartnerReputationScore } from '../components/ReputationPartnerSection';
import { ROLE_CONFIG, CREDIT_TIERS } from '../config';
import { seedIfNeeded, getMember, updateMember, addMember } from '@/lib/local-dao-store';
import type { DaoMember } from '../types';

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

export default function ProfilePage() {
    const account = useActiveAccount();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [copied, setCopied] = useState(false);
    const [member, setMember] = useState<DaoMember | null>(null);

    // Form state
    const [form, setForm] = useState({
        displayName: '',
        avatar: '',
        bio: '',
        twitter: '',
        github: '',
        linkedin: '',
        website: ''
    });

    useEffect(() => {
        seedIfNeeded();
        if (account) {
            const m = getMember(account.address);
            setMember(m || null);
            if (m) {
                setForm({
                    displayName: m.displayName || '',
                    avatar: m.avatar || '',
                    bio: m.bio || '',
                    twitter: m.twitter || '',
                    github: m.github || '',
                    linkedin: m.linkedin || '',
                    website: m.website || ''
                });
            } else {
                setForm(prev => ({ ...prev, displayName: account.address.slice(0, 6) + '...' + account.address.slice(-4) }));
            }
        }
        setLoading(false);
    }, [account]);

    const updateField = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

    const handleCopyAddress = () => {
        if (!account) return;
        navigator.clipboard.writeText(account.address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSave = async () => {
        if (!account || !form.displayName.trim()) return;
        setSaving(true);

        const existing = getMember(account.address);
        if (existing) {
            updateMember(account.address, {
                displayName: form.displayName,
                avatar: form.avatar,
                bio: form.bio,
                twitter: form.twitter,
                github: form.github,
                linkedin: form.linkedin,
                website: form.website
            });
        } else {
            const newMember: DaoMember = {
                walletAddress: account.address,
                displayName: form.displayName,
                avatar: form.avatar,
                bio: form.bio,
                twitter: form.twitter,
                github: form.github,
                linkedin: form.linkedin,
                website: form.website,
                role: 'observer',
                reputation: 0,
                creditTier: 'new',
                totalContribution: 0,
                votingPower: 0,
                joinedAt: Date.now(),
                lastActiveAt: Date.now(),
                proposalsSubmitted: 0,
                votesCount: 0,
                isActive: true
            };
            addMember(newMember);
            setMember(newMember);
        }

        // Refresh member data
        const refreshed = getMember(account.address);
        if (refreshed) setMember(refreshed);

        await new Promise(r => setTimeout(r, 800));
        setSaving(false);
    };

    if (!account) {
        return (
            <div className="min-h-screen bg-[#060608]">
                <DaoNavbar />
                <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
                    <div className="w-14 h-14 border border-amber-500/30 bg-amber-500/[0.06] flex items-center justify-center mb-4">
                        <AlertTriangle className="w-7 h-7 text-amber-400" />
                    </div>
                    <h2 className="text-white text-lg font-mono font-bold mb-2">[ WALLET REQUIRED ]</h2>
                    <p className="text-gray-600 text-xs font-mono text-center max-w-sm">Connect your wallet to view and edit your profile.</p>
                </div>
            </div>
        );
    }

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

    const roleCfg = member ? ROLE_CONFIG[member.role] : ROLE_CONFIG['observer'];
    const creditCfg = member ? CREDIT_TIERS[member.creditTier] : CREDIT_TIERS['new'];

    const stats = member ? [
        { label: 'REPUTATION', value: member.reputation.toString(), maxValue: '/1000', icon: Star, color: '#f59e0b' },
        { label: 'VOTING POWER', value: member.votingPower.toString(), icon: Vote, color: '#ef4444' },
        { label: 'CONTRIBUTED', value: `$${member.totalContribution.toLocaleString()}`, icon: DollarSign, color: '#22c55e' },
        { label: 'PROPOSALS', value: member.proposalsSubmitted.toString(), icon: ScrollText, color: '#3b82f6' },
        { label: 'VOTES CAST', value: member.votesCount.toString(), icon: Vote, color: '#06b6d4' },
        { label: 'JOINED', value: formatDate(member.joinedAt), icon: Calendar, color: '#6b7280' },
    ] : [];

    const partnerScore = getPartnerReputationScore(account.address);

    const reputationMetrics = member ? [
        { label: 'VOTING PARTICIPATION', value: Math.min(100, Math.round(member.votesCount * 2.5)), color: '#ef4444' },
        { label: 'PROPOSAL QUALITY', value: Math.min(100, member.proposalsSubmitted * 20), color: '#3b82f6' },
        { label: 'TREASURY CONTRIBUTION', value: Math.min(100, Math.round(member.totalContribution / 250)), color: '#22c55e' },
        { label: 'COMMUNITY ENGAGEMENT', value: Math.min(100, Math.round(member.reputation / 10)), color: '#f59e0b' },
        { label: 'PARTNER REPUTATION', value: partnerScore, color: '#a855f7' },
    ] : [];

    return (
        <div className="min-h-screen bg-[#060608]">
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>
            <DaoNavbar />

            <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8">

                {/* Header Row */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <div className="text-[10px] text-red-500/60 font-mono tracking-[0.3em] uppercase mb-1">// IDENTITY MODULE</div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-mono flex items-center gap-3">
                            <UserCircle className="w-7 h-7 text-red-500" /> MY PROFILE
                        </h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href={`/dao/profile/${account.address}`}
                            className="inline-flex items-center gap-2 px-3 py-2 border border-red-500/20 text-red-400 hover:bg-red-500/5 font-mono text-[10px] font-bold tracking-wider transition-all"
                        >
                            <Eye className="w-3.5 h-3.5" /> VIEW PUBLIC
                        </Link>
                        <button
                            onClick={handleSave}
                            disabled={saving || !form.displayName.trim()}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-mono text-[10px] font-bold tracking-wider transition-all"
                        >
                            {saving ? 'SAVING...' : <><Save className="w-3.5 h-3.5" /> SAVE</>}
                        </button>
                    </div>
                </div>

                {/* Profile Header Card — Like public but with editable fields */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0d0d0d] border border-red-500/[0.08] overflow-hidden mb-5">
                    <div className="h-[2px] bg-gradient-to-r from-red-600/50 via-red-500/20 to-transparent" />
                    <div className="p-6">
                        <div className="flex flex-col sm:flex-row items-start gap-5">
                            {/* Avatar — Editable */}
                            <div className="relative shrink-0">
                                <div className="w-20 h-20 bg-[#111] border border-red-500/[0.15] flex items-center justify-center text-2xl font-bold text-red-400 font-mono overflow-hidden group cursor-pointer">
                                    {form.avatar
                                        ? <img src={form.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                        : form.displayName?.charAt(0)?.toUpperCase() || '?'
                                    }
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-[9px] text-white font-mono tracking-wider">EDIT</span>
                                    </div>
                                </div>
                                {member?.isActive && (
                                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#0d0d0d]" />
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 w-full">
                                {/* Display Name — Editable */}
                                <div className="mb-2">
                                    <input
                                        type="text"
                                        value={form.displayName}
                                        onChange={(e) => updateField('displayName', e.target.value)}
                                        placeholder="Your display name"
                                        maxLength={30}
                                        className="bg-black border border-red-500/[0.1] text-2xl font-bold text-white font-mono w-full focus:outline-none focus:border-red-500/30 transition-colors px-3 py-2 placeholder-gray-700"
                                    />
                                    {!form.displayName.trim() && <span className="text-[9px] text-red-500 font-mono mt-0.5 block">Name is required</span>}
                                </div>

                                {/* Wallet Address — Read-only, Copyable */}
                                <button
                                    onClick={handleCopyAddress}
                                    className="flex items-center gap-2 text-[10px] text-gray-600 font-mono mb-3 hover:text-red-400 transition-colors group"
                                >
                                    <span className="break-all">{account.address}</span>
                                    {copied
                                        ? <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                                        : <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                                    }
                                </button>

                                {/* Bio — Editable */}
                                <textarea
                                    value={form.bio}
                                    onChange={(e) => updateField('bio', e.target.value)}
                                    placeholder="Tell the DAO about your skills and interests..."
                                    rows={2}
                                    className="w-full bg-black border border-red-500/[0.1] text-sm text-gray-400 leading-relaxed font-mono mb-3 focus:outline-none focus:border-red-500/30 px-3 py-2.5 transition-colors placeholder-gray-800 resize-none"
                                />

                                {/* Role + Credit + Status */}
                                <div className="flex flex-wrap items-center gap-3">
                                    {member && (
                                        <>
                                            <span
                                                className="text-[9px] font-mono font-bold tracking-[0.15em] uppercase px-2 py-0.5 border"
                                                style={{ color: roleCfg.color, borderColor: `${roleCfg.color}40`, backgroundColor: `${roleCfg.color}08` }}
                                            >
                                                {roleCfg.icon} {roleCfg.label}
                                            </span>
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
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Avatar URL Input */}
                        <div className="mt-4 pt-3 border-t border-gray-800/30">
                            <label className="text-[9px] text-gray-600 font-mono mb-1.5 block tracking-wider">AVATAR URL</label>
                            <input
                                type="text"
                                value={form.avatar}
                                onChange={(e) => updateField('avatar', e.target.value)}
                                placeholder="https://..."
                                className="w-full bg-black border border-red-500/[0.06] px-3 py-2 text-white font-mono placeholder-gray-800 focus:outline-none focus:border-red-500/30 text-[10px]"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                {stats.length > 0 && (
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
                )}

                {/* Social Links — Editable */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-[#0d0d0d] border border-red-500/[0.08] p-5 mb-5"
                >
                    <h3 className="text-[10px] text-white font-mono tracking-[0.15em] uppercase font-bold mb-4 flex items-center gap-2">
                        <LinkIcon className="w-3.5 h-3.5 text-red-500" /> SOCIAL LINKS
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                            { key: 'twitter', icon: Twitter, placeholder: 'Username (without @)', label: 'X / TWITTER' },
                            { key: 'github', icon: Github, placeholder: 'GitHub username', label: 'GITHUB' },
                            { key: 'linkedin', icon: Linkedin, placeholder: 'LinkedIn username', label: 'LINKEDIN' },
                            { key: 'website', icon: Globe, placeholder: 'https://your-website.com', label: 'WEBSITE' },
                        ].map(social => {
                            const SocialIcon = social.icon;
                            return (
                                <div key={social.key} className="flex bg-black border border-red-500/[0.06] focus-within:border-red-500/30 transition-colors">
                                    <div className="flex items-center justify-center w-10 border-r border-red-500/[0.06]">
                                        <SocialIcon className="w-3.5 h-3.5 text-gray-600" />
                                    </div>
                                    <input
                                        type="text"
                                        value={form[social.key as keyof typeof form]}
                                        onChange={(e) => updateField(social.key, e.target.value)}
                                        placeholder={social.placeholder}
                                        className="flex-1 bg-transparent px-3 py-2.5 text-white font-mono placeholder-gray-800 focus:outline-none text-xs"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Reputation Matrix */}
                {reputationMetrics.length > 0 && (
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
                )}

                {/* Reputation Partners — Claimable here */}
                <ReputationPartnerSection walletAddress={account.address} isOwnProfile={true} />
            </main>
        </div>
    );
}

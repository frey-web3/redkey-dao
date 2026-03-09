'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Zap, Droplets, Users, TrendingUp, Shield, Lock, CheckCircle2, Sparkles, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

// ============================================================
// Types
// ============================================================

export interface ReputationBadge {
    id: string;
    title: string;
    description: string;
    points: number;
    icon: React.ElementType;
    tier: 'common' | 'rare' | 'epic' | 'legendary';
    requirement: string;
}

export interface ReputationPartner {
    id: string;
    name: string;
    description: string;
    logo: string;          // emoji for now, will be image later
    accentColor: string;
    website?: string;
    badges: ReputationBadge[];
}

// ============================================================
// Badge tier config
// ============================================================

const TIER_CONFIG = {
    common: { label: 'COMMON', color: '#6b7280', glow: 'rgba(107,114,128,0.15)', border: 'rgba(107,114,128,0.25)' },
    rare: { label: 'RARE', color: '#3b82f6', glow: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.3)' },
    epic: { label: 'EPIC', color: '#a855f7', glow: 'rgba(168,85,247,0.15)', border: 'rgba(168,85,247,0.3)' },
    legendary: { label: 'LEGENDARY', color: '#f59e0b', glow: 'rgba(245,158,11,0.2)', border: 'rgba(245,158,11,0.35)' },
} as const;

// ============================================================
// Partner Data — Blackhole (Avalanche Ecosystem)
// ============================================================

export const PARTNERS: ReputationPartner[] = [
    {
        id: 'blackhole',
        name: 'Blackhole',
        description: 'DeFi protocol on Avalanche — Swap, provide liquidity, and earn rewards.',
        logo: '🕳️',
        accentColor: '#a855f7',
        website: 'https://blackhole.money',
        badges: [
            {
                id: 'bh-first-user',
                title: 'Genesis User',
                description: 'Completed your first transaction on Blackhole. Welcome to the void.',
                points: 50,
                icon: Sparkles,
                tier: 'common',
                requirement: 'First swap or transaction on Blackhole',
            },
            {
                id: 'bh-100-trades',
                title: 'Centurion Trader',
                description: 'Executed 100 trades on Blackhole. You are a seasoned veteran of the void.',
                points: 200,
                icon: TrendingUp,
                tier: 'rare',
                requirement: '100 completed trades',
            },
            {
                id: 'bh-lp-provider',
                title: 'Liquidity Architect',
                description: 'Provided liquidity to at least one pool on Blackhole for 30+ days.',
                points: 300,
                icon: Droplets,
                tier: 'epic',
                requirement: 'Active LP position for 30+ days',
            },
            {
                id: 'bh-volume-whale',
                title: 'Volume Whale',
                description: 'Achieved $100K+ cumulative trading volume on Blackhole.',
                points: 500,
                icon: Zap,
                tier: 'legendary',
                requirement: '$100K+ total trading volume',
            },
            {
                id: 'bh-early-adopter',
                title: 'Early Adopter',
                description: 'Interacted with Blackhole within the first 30 days of launch.',
                points: 150,
                icon: Shield,
                tier: 'rare',
                requirement: 'Transaction within first 30 days of protocol launch',
            },
            {
                id: 'bh-referral',
                title: 'Void Recruiter',
                description: 'Referred 5 or more active users to the Blackhole ecosystem.',
                points: 100,
                icon: Users,
                tier: 'common',
                requirement: '5+ referred users with at least 1 transaction each',
            },
        ],
    },
];

// Helper: compute partner reputation % for the reputation matrix
export function getPartnerReputationScore(walletAddress: string): number {
    if (typeof window === 'undefined') return 0;
    const raw = localStorage.getItem(`rc_rep_claims_${walletAddress.toLowerCase()}`);
    const claimed: string[] = raw ? JSON.parse(raw) : [];
    const allBadges = PARTNERS.flatMap(p => p.badges);
    if (allBadges.length === 0) return 0;
    return Math.round((claimed.length / allBadges.length) * 100);
}

// ============================================================
// Component
// ============================================================

interface Props {
    walletAddress: string;
    isOwnProfile: boolean;
}

export default function ReputationPartnerSection({ walletAddress, isOwnProfile }: Props) {
    // Track claimed badges per wallet in localStorage (UI-only)
    const storageKey = `rc_rep_claims_${walletAddress.toLowerCase()}`;

    const getClaimedBadges = (): string[] => {
        if (typeof window === 'undefined') return [];
        const raw = localStorage.getItem(storageKey);
        return raw ? JSON.parse(raw) : [];
    };

    const [claimedBadges, setClaimedBadges] = useState<string[]>(getClaimedBadges);
    const [claimingId, setClaimingId] = useState<string | null>(null);
    const [expandedPartner, setExpandedPartner] = useState<string | null>('blackhole');

    const handleClaim = async (badgeId: string) => {
        setClaimingId(badgeId);
        // Simulate verification delay
        await new Promise(r => setTimeout(r, 1200));
        const updated = [...claimedBadges, badgeId];
        setClaimedBadges(updated);
        if (typeof window !== 'undefined') {
            localStorage.setItem(storageKey, JSON.stringify(updated));
        }
        setClaimingId(null);
    };

    const totalPoints = PARTNERS.flatMap(p => p.badges)
        .filter(b => claimedBadges.includes(b.id))
        .reduce((sum, b) => sum + b.points, 0);

    const totalBadges = PARTNERS.flatMap(p => p.badges).length;
    const claimedCount = claimedBadges.length;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-5"
        >
            {/* Section Header */}
            <div className="bg-[#0d0d0d] border border-red-500/[0.08] overflow-hidden">
                <div className="h-[2px] bg-gradient-to-r from-purple-600/40 via-purple-500/20 to-transparent" />
                <div className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-1">
                        <h3 className="text-[10px] text-white font-mono tracking-[0.15em] uppercase font-bold flex items-center gap-2">
                            <Award className="w-4 h-4 text-purple-400" /> REPUTATION PARTNERS
                        </h3>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-[9px] text-gray-600 font-mono tracking-wider">CLAIMED</span>
                                <span className="text-xs text-white font-mono font-bold">{claimedCount}<span className="text-gray-700">/{totalBadges}</span></span>
                            </div>
                            <div className="h-3 w-[1px] bg-gray-800" />
                            <div className="flex items-center gap-2">
                                <span className="text-[9px] text-gray-600 font-mono tracking-wider">POINTS</span>
                                <span className="text-xs font-mono font-bold text-purple-400">{totalPoints}</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-[10px] text-gray-600 font-mono">
                        Claim badges from Avalanche ecosystem dApps to build your on-chain reputation score.
                    </p>
                </div>
            </div>

            {/* Partner Cards */}
            <div className="mt-3 space-y-3">
                {PARTNERS.map(partner => {
                    const isExpanded = expandedPartner === partner.id;
                    const partnerClaimedCount = partner.badges.filter(b => claimedBadges.includes(b.id)).length;
                    const partnerPoints = partner.badges
                        .filter(b => claimedBadges.includes(b.id))
                        .reduce((s, b) => s + b.points, 0);

                    return (
                        <div key={partner.id} className="bg-[#0d0d0d] border border-red-500/[0.06] overflow-hidden">
                            {/* Partner Header */}
                            <button
                                onClick={() => setExpandedPartner(isExpanded ? null : partner.id)}
                                className="w-full flex items-center gap-4 px-5 py-4 hover:bg-white/[0.01] transition-colors text-left"
                            >
                                <div
                                    className="w-12 h-12 flex items-center justify-center text-2xl border shrink-0"
                                    style={{ borderColor: `${partner.accentColor}30`, backgroundColor: `${partner.accentColor}08` }}
                                >
                                    {partner.logo}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className="text-white font-mono font-bold text-sm">{partner.name}</span>
                                        {partner.website && (
                                            <a
                                                href={partner.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="text-gray-700 hover:text-purple-400 transition-colors"
                                            >
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        )}
                                    </div>
                                    <p className="text-[10px] text-gray-600 font-mono truncate">{partner.description}</p>
                                </div>
                                <div className="hidden sm:flex items-center gap-4 shrink-0">
                                    <div className="text-center">
                                        <div className="text-xs text-white font-mono font-bold">{partnerClaimedCount}<span className="text-gray-700">/{partner.badges.length}</span></div>
                                        <div className="text-[8px] text-gray-600 font-mono tracking-wider">BADGES</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xs font-mono font-bold" style={{ color: partner.accentColor }}>{partnerPoints}</div>
                                        <div className="text-[8px] text-gray-600 font-mono tracking-wider">PTS</div>
                                    </div>
                                </div>
                                {isExpanded
                                    ? <ChevronUp className="w-4 h-4 text-gray-600 shrink-0" />
                                    : <ChevronDown className="w-4 h-4 text-gray-600 shrink-0" />
                                }
                            </button>

                            {/* Badges Grid */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="border-t border-red-500/[0.04] px-5 py-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {partner.badges.map((badge, i) => {
                                                    const isClaimed = claimedBadges.includes(badge.id);
                                                    const isClaiming = claimingId === badge.id;
                                                    const tierCfg = TIER_CONFIG[badge.tier];
                                                    const BadgeIcon = badge.icon;

                                                    return (
                                                        <motion.div
                                                            key={badge.id}
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: i * 0.05 }}
                                                            className="relative border overflow-hidden transition-all"
                                                            style={{
                                                                borderColor: isClaimed ? tierCfg.border : 'rgba(239,68,68,0.04)',
                                                                backgroundColor: isClaimed ? tierCfg.glow : '#0a0a0a',
                                                            }}
                                                        >
                                                            {/* Tier accent line */}
                                                            <div
                                                                className="absolute top-0 left-0 right-0 h-[2px]"
                                                                style={{ backgroundColor: isClaimed ? tierCfg.color : 'rgba(107,114,128,0.15)' }}
                                                            />

                                                            <div className="p-4">
                                                                <div className="flex items-start gap-3">
                                                                    {/* Badge Icon */}
                                                                    <div
                                                                        className="w-10 h-10 flex items-center justify-center border shrink-0"
                                                                        style={{
                                                                            borderColor: isClaimed ? `${tierCfg.color}40` : 'rgba(107,114,128,0.15)',
                                                                            backgroundColor: isClaimed ? `${tierCfg.color}12` : 'rgba(107,114,128,0.05)',
                                                                        }}
                                                                    >
                                                                        <BadgeIcon
                                                                            className="w-5 h-5"
                                                                            style={{ color: isClaimed ? tierCfg.color : '#4b5563' }}
                                                                        />
                                                                    </div>

                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="flex items-center gap-2 mb-0.5">
                                                                            <span className={`text-xs font-mono font-bold ${isClaimed ? 'text-white' : 'text-gray-400'}`}>
                                                                                {badge.title}
                                                                            </span>
                                                                            {isClaimed && <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />}
                                                                        </div>
                                                                        <p className="text-[10px] text-gray-600 font-mono leading-relaxed mb-2">
                                                                            {badge.description}
                                                                        </p>
                                                                        <div className="flex items-center gap-3">
                                                                            <span
                                                                                className="text-[8px] font-mono font-bold tracking-[0.15em] uppercase px-1.5 py-0.5 border"
                                                                                style={{ color: tierCfg.color, borderColor: `${tierCfg.color}30`, backgroundColor: `${tierCfg.color}08` }}
                                                                            >
                                                                                {tierCfg.label}
                                                                            </span>
                                                                            <span className="text-[9px] text-gray-600 font-mono">
                                                                                +{badge.points} pts
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* Requirement + Claim Button */}
                                                                <div className="mt-3 pt-3 border-t border-gray-800/50 flex items-center justify-between gap-2">
                                                                    <div className="text-[9px] text-gray-700 font-mono flex items-center gap-1.5 min-w-0">
                                                                        <Lock className="w-3 h-3 shrink-0" />
                                                                        <span className="truncate">{badge.requirement}</span>
                                                                    </div>

                                                                    {isOwnProfile && !isClaimed && (
                                                                        <button
                                                                            onClick={() => handleClaim(badge.id)}
                                                                            disabled={isClaiming}
                                                                            className="shrink-0 px-3 py-1.5 text-[9px] font-mono font-bold tracking-wider uppercase transition-all border disabled:opacity-50"
                                                                            style={{
                                                                                color: partner.accentColor,
                                                                                borderColor: `${partner.accentColor}30`,
                                                                                backgroundColor: isClaiming ? `${partner.accentColor}15` : 'transparent',
                                                                            }}
                                                                            onMouseEnter={(e) => {
                                                                                e.currentTarget.style.backgroundColor = `${partner.accentColor}10`;
                                                                            }}
                                                                            onMouseLeave={(e) => {
                                                                                e.currentTarget.style.backgroundColor = isClaiming ? `${partner.accentColor}15` : 'transparent';
                                                                            }}
                                                                        >
                                                                            {isClaiming ? (
                                                                                <span className="flex items-center gap-1.5">
                                                                                    <span className="w-2 h-2 border border-current border-t-transparent rounded-full animate-spin" />
                                                                                    VERIFYING...
                                                                                </span>
                                                                            ) : 'CLAIM'}
                                                                        </button>
                                                                    )}

                                                                    {isClaimed && (
                                                                        <span className="shrink-0 text-[9px] font-mono font-bold text-emerald-400 tracking-wider flex items-center gap-1">
                                                                            <CheckCircle2 className="w-3 h-3" /> CLAIMED
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}

import { createWallet, inAppWallet } from "thirdweb/wallets";
import type { GovernanceConfig, LoanTenor } from "./types";

// Thirdweb wallet configuration for DAO
export const wallets = [
    inAppWallet({
        auth: {
            options: ["google", "apple", "x"],
        },
    }),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("walletConnect"),
    createWallet("me.rainbow"),
];

// Default governance parameters
export const DEFAULT_GOVERNANCE: GovernanceConfig = {
    quorum: 30,
    approvalThreshold: 60,
    votingPeriodDays: 7,
    cooldownHours: 48,
    maxActiveProposals: 5,
    reserveRatio: 20,
    minContribution: 10,
    stakeWeight: 0.6,
    reputationWeight: 0.4,
};

// Loan tenor → flat interest rate mapping
export const LOAN_TERMS: Record<LoanTenor, { months: number; rate: number; label: string }> = {
    3: { months: 3, rate: 3, label: '3 Months — 3% flat' },
    6: { months: 6, rate: 6, label: '6 Months — 6% flat' },
    9: { months: 9, rate: 9, label: '9 Months — 9% flat' },
};

// Collateral requirement
export const COLLATERAL_RATIO = 100; // 100% of loan amount

// Role display config
export const ROLE_CONFIG = {
    super_admin: { label: 'Super Admin', color: '#f59e0b', icon: '🔑' },
    admin: { label: 'Admin', color: '#8b5cf6', icon: '🛡️' },
    member: { label: 'Member', color: '#3b82f6', icon: '👤' },
    observer: { label: 'Observer', color: '#6b7280', icon: '👁️' },
} as const;

// Credit tier config
export const CREDIT_TIERS = {
    gold: { label: 'Gold', color: '#f59e0b', minScore: 800, icon: '🥇' },
    silver: { label: 'Silver', color: '#9ca3af', minScore: 600, icon: '🥈' },
    bronze: { label: 'Bronze', color: '#cd7f32', minScore: 400, icon: '🥉' },
    new: { label: 'New', color: '#6b7280', minScore: 0, icon: '⚪' },
} as const;

// Proposal risk level display
export const RISK_LEVELS = {
    low: { label: 'Low Risk', color: '#22c55e', bg: 'bg-emerald-500/10' },
    medium: { label: 'Medium Risk', color: '#f59e0b', bg: 'bg-amber-500/10' },
    high: { label: 'High Risk', color: '#ef4444', bg: 'bg-red-500/10' },
} as const;

// Proposal status display
export const STATUS_CONFIG = {
    draft: { label: 'Draft', color: '#6b7280' },
    submitted: { label: 'Submitted', color: '#3b82f6' },
    under_review: { label: 'Under Review', color: '#8b5cf6' },
    active: { label: 'Voting Open', color: '#22c55e' },
    passed: { label: 'Passed', color: '#22c55e' },
    failed: { label: 'Failed', color: '#ef4444' },
    executing: { label: 'Executing', color: '#f59e0b' },
    completed: { label: 'Completed', color: '#10b981' },
    cancelled: { label: 'Cancelled', color: '#6b7280' },
    rejected: { label: 'Rejected', color: '#ef4444' },
} as const;

// Loan status display
export const LOAN_STATUS_CONFIG = {
    requested: { label: 'Requested', color: '#3b82f6' },
    voting: { label: 'Voting', color: '#8b5cf6' },
    approved: { label: 'Approved', color: '#22c55e' },
    collateral_pending: { label: 'Collateral Pending', color: '#f59e0b' },
    funding: { label: 'Funding Open', color: '#06b6d4' },
    active: { label: 'Active', color: '#22c55e' },
    repaying: { label: 'Repaying', color: '#f59e0b' },
    repaid: { label: 'Repaid', color: '#10b981' },
    defaulted: { label: 'Defaulted', color: '#ef4444' },
    rejected: { label: 'Rejected', color: '#ef4444' },
} as const;

export const NAV_ITEMS = [
    { label: 'Dashboard', href: '/dao/dashboard', icon: 'LayoutDashboard' },
    { label: 'Treasury', href: '/dao/treasury', icon: 'Vault' },
    { label: 'Proposals', href: '/dao/proposals', icon: 'ScrollText' },
    { label: 'Loans', href: '/dao/loans', icon: 'Landmark' },
    { label: 'Signal', href: '/dao/signal', icon: 'Radar' },
] as const;

export const MORE_NAV_ITEMS = [
    { label: 'Members', href: '/dao/members', icon: 'Users' },
    { label: 'Discussion', href: '/dao/discussion', icon: 'MessagesSquare' },
] as const;

export const CACHE_DURATION = 5 * 60 * 1000;

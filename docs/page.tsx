'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Shield, Zap, Users, ArrowRight, ScrollText, Crown, User, Eye, Star, Award, Compass } from 'lucide-react';
import DaoNavbar from '../components/DaoNavbar';
import Link from 'next/link';

export default function DocsPage() {
    return (
        <div className="min-h-screen bg-[#060608]">
            {/* Background Effect */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>

            <DaoNavbar />

            <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                    <div className="text-[10px] text-red-500/60 font-mono tracking-[0.3em] uppercase mb-4">// MANIFESTO</div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
                        RedKey DAO
                        <span className="block text-red-500">Documentation</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
                        RedKey DAO is a decentralized investment and lending DAO. We pool community capital to fund promising ventures and provide peer-to-peer liquidity with transparent risk parameters.
                    </p>
                </motion.div>

                <div className="space-y-16">
                    {/* Section 1 */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <div className="flex items-center gap-3 mb-6">
                            <BookOpen className="w-6 h-6 text-red-500" />
                            <h2 className="text-2xl font-bold text-white font-mono tracking-tight uppercase">What is RedKey DAO?</h2>
                        </div>
                        <div className="bg-[#0d0d0d] border border-red-500/[0.08] p-6 md:p-8 text-gray-400 space-y-4 leading-relaxed">
                            <p>
                                RedKey DAO operates as a decentralized autonomous organization (DAO) managed entirely by smart contracts and community consensus. Instead of relying on centralized banks or legacy VCs, RedKey DAO allows community members to direct a communal treasury.
                            </p>
                            <p>
                                Every member's vote is weighed by their reputation and governance tokens. This system ensures that those who contribute the most value to the network have the loudest voice in its direction.
                            </p>
                        </div>
                    </motion.section>

                    {/* Section 2 */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <div className="flex items-center gap-3 mb-6">
                            <Zap className="w-6 h-6 text-red-500" />
                            <h2 className="text-2xl font-bold text-white font-mono tracking-tight uppercase">How It Works</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-[#0d0d0d] border border-red-500/[0.08] p-6">
                                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><ScrollText className="w-4 h-4 text-red-500" /> Investment Proposals</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    Members construct detailed proposals for treasury allocation. These range from early-stage DeFi seed rounds to NFT marketplace partnerships. If a proposal passes the 60% voting threshold, funds are programmatically deployed.
                                </p>
                            </div>
                            <div className="bg-[#0d0d0d] border border-red-500/[0.08] p-6">
                                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><Shield className="w-4 h-4 text-red-500" /> P2P Lending</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    Need liquidity? Request a loan from the community. If approved, borrowers must lock 100% collateral in a verified token. Members then crowd-fund the requested amount and earn flat interest rates upon repayment.
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    {/* Section 3 */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <div className="flex items-center gap-3 mb-6">
                            <Users className="w-6 h-6 text-red-500" />
                            <h2 className="text-2xl font-bold text-white font-mono tracking-tight uppercase">Getting Started</h2>
                        </div>
                        <div className="bg-[#0d0d0d] border border-red-500/[0.08] p-6 md:p-8">
                            <ol className="space-y-6 text-gray-400 list-decimal list-inside">
                                <li className="pl-2">
                                    <strong className="text-white">Connect Your Wallet:</strong> Use the terminal at the top right to authenticate via Thirdweb. Your wallet is your identity.
                                </li>
                                <li className="pl-2">
                                    <strong className="text-white">Build Reputation:</strong> Participate in polls, contribute to active loans, and drop insights in the comment sections to grow your on-chain reputation score.
                                </li>
                                <li className="pl-2">
                                    <strong className="text-white">Propose or Borrow:</strong> Once you hit the <span className="text-amber-500">Bronze Tier</span>, you can submit investment proposals or request capital directly from the treasury.
                                </li>
                            </ol>
                            <div className="mt-8 pt-6 border-t border-red-500/[0.08] flex justify-center">
                                <Link href="/dao/dashboard" className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-sm tracking-wider uppercase transition-colors">
                                    Enter Dashboard <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </motion.section>

                    {/* Section 4: Roles */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                        <div className="flex items-center gap-3 mb-6">
                            <Shield className="w-6 h-6 text-red-500" />
                            <h2 className="text-2xl font-bold text-white font-mono tracking-tight uppercase">Roles & Permissions</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-[#0d0d0d] border border-red-500/[0.08] p-6">
                                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><Crown className="w-4 h-4 text-red-500" /> Admin</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    Admins oversee the DAO's core parameters, including treasury smart contracts and dispute resolution. They have the authority to manage global settings and moderate high-stakes proposals.
                                </p>
                            </div>
                            <div className="bg-[#0d0d0d] border border-red-500/[0.08] p-6">
                                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><User className="w-4 h-4 text-red-500" /> Member</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    Members are active participants who can vote, submit proposals, fund loans, and engage in governance. Actions require reputation and tokens to amplify their voting power.
                                </p>
                            </div>
                            <div className="bg-[#0d0d0d] border border-red-500/[0.08] p-6">
                                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><Eye className="w-4 h-4 text-red-500" /> Observer</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    Observers have view-only access. They can monitor ongoing proposals, treasury allocations, and active loans, but cannot vote, post, or interact with smart contracts directly.
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    {/* Section 5: Reputation Tiers */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                        <div className="flex items-center gap-3 mb-6">
                            <Star className="w-6 h-6 text-red-500" />
                            <h2 className="text-2xl font-bold text-white font-mono tracking-tight uppercase">Reputation Tiers</h2>
                        </div>
                        <div className="bg-[#0d0d0d] border border-red-500/[0.08] p-6 md:p-8 space-y-4">
                            <p className="text-gray-400 leading-relaxed mb-6">
                                Your influence in RedKey DAO is determined by your Reputation Tier. Earning reputation through active participation unlocks new privileges and increases your voting weight.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="border border-red-500/[0.08] p-4 flex items-start gap-3">
                                    <Award className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-gray-200">Iron Tier</h4>
                                        <p className="text-sm text-gray-500 mt-1">Starting point for all new verified wallets. Can vote on community polls and fund small loans.</p>
                                    </div>
                                </div>
                                <div className="border border-red-500/[0.08] p-4 flex items-start gap-3">
                                    <Award className="w-5 h-5 text-amber-600 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-amber-500">Bronze Tier</h4>
                                        <p className="text-sm text-gray-500 mt-1">Unlocks the ability to create new investment proposals and request capital from the treasury.</p>
                                    </div>
                                </div>
                                <div className="border border-red-500/[0.08] p-4 flex items-start gap-3">
                                    <Award className="w-5 h-5 text-gray-300 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-gray-300">Silver Tier</h4>
                                        <p className="text-sm text-gray-500 mt-1">1.5x voting booster multiplier. Can create high-capital loan requests and act as a proposal sponsor.</p>
                                    </div>
                                </div>
                                <div className="border border-red-500/[0.08] p-4 flex items-start gap-3">
                                    <Award className="w-5 h-5 text-yellow-500 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-yellow-500">Gold Tier</h4>
                                        <p className="text-sm text-gray-500 mt-1">2x voting booster. Direct access to the DAO's core contributors channel and governance steering committee.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Section 6: Features */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                        <div className="flex items-center gap-3 mb-6">
                            <Compass className="w-6 h-6 text-red-500" />
                            <h2 className="text-2xl font-bold text-white font-mono tracking-tight uppercase">Navigating RedKey DAO</h2>
                        </div>
                        <div className="bg-[#0d0d0d] border border-red-500/[0.08] p-6 md:p-8 space-y-6">
                            <p className="text-gray-400 leading-relaxed">
                                RedKey DAO is organized logically to optimize user workflow. Here is where you can access the core features of the platform:
                            </p>

                            <div className="space-y-6 mt-6">
                                <div className="border-l-2 border-red-500 pl-4">
                                    <h3 className="text-lg font-bold text-white mb-1 tracking-wider uppercase">Dashboard <span className="text-red-500 text-sm italic normal-case font-mono">/dao/dashboard</span></h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">The command center. This screen provides a high-level overview of total treasury assets, pending high-priority votes, and global DAO activities. Use this to gauge the current health of the collective.</p>
                                </div>
                                <div className="border-l-2 border-red-500 pl-4">
                                    <h3 className="text-lg font-bold text-white mb-1 tracking-wider uppercase">Proposals <span className="text-red-500 text-sm italic normal-case font-mono">/dao/proposals</span></h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">The governance layer. Any member with a Bronze Tier or higher can submit a comprehensive investment pitch here. All members can read the pitch details and cast their "For" or "Against" votes proportional to their reputation weight.</p>
                                </div>
                                <div className="border-l-2 border-red-500 pl-4">
                                    <h3 className="text-lg font-bold text-white mb-1 tracking-wider uppercase">Loans <span className="text-red-500 text-sm italic normal-case font-mono">/dao/loans</span></h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">Our native liquidity market. Borrowers request stablecoin capital against locked collateral. Members acting as lenders evaluate the risk parameters and can fund fractional amounts of the request to earn yields upon repayment.</p>
                                </div>
                                <div className="border-l-2 border-red-500 pl-4">
                                    <h3 className="text-lg font-bold text-white mb-1 tracking-wider uppercase">Members <span className="text-red-500 text-sm italic normal-case font-mono">/dao/members</span></h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">The on-chain reputation ledger. Browse all verified internal wallets. You can view user tiers, their voting modifiers, and their historical participation in the ecosystem.</p>
                                </div>
                                <div className="border-l-2 border-red-500 pl-4">
                                    <h3 className="text-lg font-bold text-white mb-1 tracking-wider uppercase">Discussion <span className="text-red-500 text-sm italic normal-case font-mono">/dao/discussion</span></h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">The asynchronous discussion board. Members open topics, debate proposals, and align on strategy before casting on-chain votes. It is the home for long-form governance conversations ahead of future real-time chat.</p>
                                </div>
                                <div className="border-l-2 border-red-500 pl-4">
                                    <h3 className="text-lg font-bold text-white mb-1 tracking-wider uppercase">Signal <span className="text-red-500 text-sm italic normal-case font-mono">/dao/signal</span></h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">Our native smart-money tracker powered by Alchemy. Monitor whale wallets and active entity transactions across the Avalanche ecosystem. Extremely useful for conducting due-diligence before proposing an investment.</p>
                                </div>
                                <div className="border-l-2 border-red-500 pl-4">
                                    <h3 className="text-lg font-bold text-white mb-1 tracking-wider uppercase">Portfolio <span className="text-red-500 text-sm italic normal-case font-mono">/dao/portfolio</span></h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">The post-funding accountability layer. Track the performance, milestones, and real-time ROI of projects that successfully passed community governance and received treasury allocations.</p>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                </div>
            </main>
        </div>
    );
}

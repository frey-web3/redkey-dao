'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Book, Target, Shield, Coins, Users, Rocket, Network, Key, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LitepaperPage() {
    return (
        <div className="min-h-screen bg-[#060608]">
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/[0.03] rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/[0.02] rounded-full blur-[100px]" />
            </div>

            <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-24">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-16 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-[10px] uppercase tracking-[0.2em] mb-6">
                        <Book className="w-3.5 h-3.5" />
                        Litepaper v1.0
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase font-mono leading-[1.1] mb-6">
                        RedKey DAO: <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-500 to-rose-600 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                            The Protocol for <br className="hidden md:block" /> Community Capital
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 font-mono leading-relaxed max-w-2xl">
                        A decentralized collective for pooled investments, targeted peer-to-peer liquidity, and transparent, reputation-based governance.
                    </p>
                </motion.div>

                <div className="space-y-12">
                    {/* Abstract */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#0d0d0d] border border-red-500/[0.08] p-8 md:p-10 relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 opacity-5 pointer-events-none">
                            <Key className="w-32 h-32 text-red-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-white font-mono uppercase tracking-tight mb-4 flex items-center gap-3">
                            <span className="text-red-500 text-sm">01 /</span> Abstract
                        </h2>
                        <p className="text-gray-400 leading-relaxed text-sm font-mono">
                            RedKey DAO is a decentralized autonomous organization built to democratize access to high-yield investment opportunities and peer-to-peer liquidity. By replacing legacy venture capital and bank-mediated lending with transparent smart contracts and community consensus, RedKey DAO aligns the incentives of capital providers, borrowers, and investors. Governance is strictly tied to an on-chain reputation system, ensuring that active, value-adding participants direct the DAO’s treasury.
                        </p>
                    </motion.section>

                    {/* The Problem */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#0d0d0d] border border-red-500/[0.08] p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-white font-mono uppercase tracking-tight mb-4 flex items-center gap-3">
                            <span className="text-red-500 text-sm">02 /</span> The Market Problem
                        </h2>
                        <div className="space-y-6 text-sm text-gray-400 font-mono leading-relaxed">
                            <p>
                                <strong className="text-white block mb-1">Gatekept Venture Capital</strong>
                                Traditional early-stage investments are entirely gated. Retail participants have zero access to high-yield seed rounds, and early-stage founders waste months jumping through bureaucratic hoops to secure minimal liquidity.
                            </p>
                            <p>
                                <strong className="text-white block mb-1">Inefficient P2P Lending</strong>
                                Current DeFi lending protocols operate as massive, overcollateralized black holes (liquidity pools). They do not allow for targeted, peer-to-peer lending where funders can evaluate specific borrower profiles and loan contexts before committing capital.
                            </p>
                            <p>
                                <strong className="text-white block mb-1">Legacy DAO UX</strong>
                                Many first-generation DAOs suffer from terrible user experiences, forcing members to interact directly with raw smart contracts or fragmented bridging interfaces, severely stunting adoption.
                            </p>
                        </div>
                    </motion.section>

                    {/* The Solution */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#0d0d0d] border-l-4 border-l-red-500 border-t border-r border-b border-red-500/[0.08] p-8 md:p-10 shadow-[0_4px_30px_rgba(220,38,38,0.03)]">
                        <h2 className="text-2xl font-bold text-white font-mono uppercase tracking-tight mb-6 flex items-center gap-3">
                            <span className="text-red-500 text-sm">03 /</span> The RedKey Solution
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <Target className="w-5 h-5 text-red-500" />
                                    <h3 className="text-white font-bold font-mono tracking-wider uppercase">Strategic Treasury Proposals</h3>
                                </div>
                                <p className="text-xs text-gray-400 font-mono leading-relaxed">
                                    Members submit detailed investment proposals to allocate communal treasury funds. Whether it's funding a DeFi protocol, sweeping an NFT floor, or a strategic partnership, the capital is only deployed if the proposal passes a 60% community consensus threshold natively on-chain.
                                </p>
                            </div>

                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <Coins className="w-5 h-5 text-red-500" />
                                    <h3 className="text-white font-bold font-mono tracking-wider uppercase">Targeted P2P Liquidity</h3>
                                </div>
                                <p className="text-xs text-gray-400 font-mono leading-relaxed">
                                    A native lending market allows verified profiles to request loans against 100% token collateral (calculated at real-time USD value). Instead of a blind pool, lenders can view the profile, purpose, and term duration, funding fractional amounts of the loan to earn fixed interest upon repayment.
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    {/* Governance System */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-[#0d0d0d] border border-red-500/[0.08] p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-white font-mono uppercase tracking-tight mb-4 flex items-center gap-3">
                            <span className="text-red-500 text-sm">04 /</span> Reputation-Based Governance
                        </h2>
                        <p className="text-gray-400 leading-relaxed text-sm font-mono mb-8">
                            Voting power in RedKey is completely meritocratic. A member's influence scales strictly with their historical participation—voting, funding loans, discussion engagement—calculated dynamically into a fractional multiplier.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="border border-red-500/20 bg-red-500/5 p-4">
                                <h4 className="font-bold text-gray-200 text-sm font-mono uppercase mb-2">Iron Tier</h4>
                                <p className="text-[11px] text-gray-500 font-mono">1.0x Base Power</p>
                                <p className="text-[10px] mt-2 text-gray-400">Entry level. Can vote and fund minor loans.</p>
                            </div>
                            <div className="border border-red-500/20 bg-red-500/5 p-4">
                                <h4 className="font-bold text-amber-500 text-sm font-mono uppercase mb-2">Bronze Tier</h4>
                                <p className="text-[11px] text-gray-500 font-mono">1.2x Multiplier</p>
                                <p className="text-[10px] mt-2 text-gray-400">Can open proposals & request treasury capital.</p>
                            </div>
                            <div className="border border-red-500/20 bg-red-500/5 p-4">
                                <h4 className="font-bold text-gray-300 text-sm font-mono uppercase mb-2">Silver Tier</h4>
                                <p className="text-[11px] text-gray-500 font-mono">1.5x Multiplier</p>
                                <p className="text-[10px] mt-2 text-gray-400">Can act as a proposal sponsor & high-cap loan requestor.</p>
                            </div>
                            <div className="border border-red-500/20 bg-red-500/5 p-4">
                                <h4 className="font-bold text-yellow-500 text-sm font-mono uppercase mb-2">Gold Tier</h4>
                                <p className="text-[11px] text-gray-500 font-mono">2.0x Multiplier</p>
                                <p className="text-[10px] mt-2 text-gray-400">Steering committee access & protocol parameter voting.</p>
                            </div>
                        </div>
                    </motion.section>

                    {/* Architecture */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-[#0d0d0d] border border-red-500/[0.08] p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-white font-mono uppercase tracking-tight mb-4 flex items-center gap-3">
                            <span className="text-red-500 text-sm">05 /</span> Technical Architecture
                        </h2>
                        <div className="space-y-4 text-sm text-gray-400 font-mono">
                            <div className="flex items-start gap-4">
                                <Shield className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                <div>
                                    <strong className="text-white block">Identity & Auth</strong>
                                    Leveraging Thirdweb Connect, RedKey supports embedded smart wallets and standard Web3 wallets across the Avalanche ecosystem. Every user action is deterministically tied to their wallet address.
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Network className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                <div>
                                    <strong className="text-white block">State & MVP Simulation</strong>
                                    For the current MVP, logic is simulated entirely on the client, utilizing a custom local data store to generate hyper-realistic ecosystem activity. This enables a zero-cost, frictionless demonstration of UX flows (proposals, loans, and discussion boards) before shifting identical logic sequentially onto EVM smart contracts.
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Rocket className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                <div>
                                    <strong className="text-white block">Zero-Gas Front-end Engineering</strong>
                                    The entire UI is built as a highly responsive Next.js App Router application wrapped in brutalist, sci-fi themes designed to elevate the perceived value of interaction, utilizing Framer Motion for liquid transitions.
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* CTA */}
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="mt-16 text-center">
                        <Link href="/dao/dashboard" className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-sm tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] group">
                            Enter the Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <p className="font-mono text-[10px] text-gray-600 mt-4 uppercase tracking-[0.2em]">End of Document</p>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}

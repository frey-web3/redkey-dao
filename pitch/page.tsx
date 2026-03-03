'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Presentation, Target, Sparkles, TrendingUp } from 'lucide-react';
import DaoNavbar from '../components/DaoNavbar';

export default function PitchPage() {
    return (
        <div className="min-h-screen bg-[#060608]">
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>

            <DaoNavbar />

            <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                    <div className="text-[10px] text-red-500/60 font-mono tracking-[0.3em] uppercase mb-4">// INVESTOR DECK</div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
                        MVP Pitch:
                        <span className="block text-red-500">The Future of DAO Capital</span>
                    </h1>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* The Problem */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#0d0d0d] border border-red-500/[0.08] p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Target className="w-6 h-6 text-gray-400" />
                            <h2 className="text-xl font-bold text-white font-mono uppercase">The Problem</h2>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            Traditional venture capital is completely gated. Retail investors have zero access to high-yield seed rounds, and early-stage founders waste months jumping through hoops for minimal liquidity. Legacy DAOs attempted to fix this, but they suffer from terrible UI/UX, forcing users to interact with raw smart contracts and confusing bridging interfaces.
                        </p>
                    </motion.div>

                    {/* The Solution */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#0d0d0d] border border-red-500/[0.08] border-b-2 border-b-red-500 p-8 shadow-[0_4px_30px_rgba(220,38,38,0.05)]">
                        <div className="flex items-center gap-3 mb-4">
                            <Sparkles className="w-6 h-6 text-red-500" />
                            <h2 className="text-xl font-bold text-white font-mono uppercase">RedKey DAO Solution</h2>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            RedKey DAO wraps powerful DeFi investment and lending mechanics behind a world-class, futuristic interface. We've built an environment where proposing investments or requesting collateralized loans feels as easy as sending an email, with every action governed securely by DAO members and their on-chain reputation.
                        </p>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            A built-in discussion board (/dao/discussion) lets members open topics, debate strategy, and converge on decisions asynchronously, before we layer in real-time chat and fully on-chain voting in later phases.
                        </p>
                    </motion.div>

                    {/* Market Opportunity */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="md:col-span-2 bg-[#0d0d0d] border border-red-500/[0.08] p-8 mt-6">
                        <div className="flex items-center gap-3 mb-6">
                            <TrendingUp className="w-6 h-6 text-emerald-500" />
                            <h2 className="text-xl font-bold text-white font-mono uppercase">Why Now?</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div>
                                <h3 className="text-white font-bold mb-2">Mass Acceptance</h3>
                                <p className="text-xs text-gray-500">DeFi is moving past the experimental phase. Institutional adoption of stablecoins provides the perfect environment for a Web3 collective fund.</p>
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-2">P2P Lending Gap</h3>
                                <p className="text-xs text-gray-500">Current DeFi lending platforms are overcollateralized multi-asset black holes. Peer-to-peer, targeted request funding offers better UX.</p>
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-2">Design as a Moat</h3>
                                <p className="text-xs text-gray-500">Most Web3 tools are ugly. RedKey DAO acts as a honey-trap for high-value users through premium, sci-fi inspired design linguistics.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Iterative MVP Features */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-12">
                    <div className="bg-[#0d0d0d] border border-red-500/[0.08] p-8 text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 justify-center sm:justify-start">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 shrink-0">
                                <Presentation className="w-8 h-8 text-red-500" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2 font-mono uppercase tracking-tight">Iterative MVP Features</h2>
                                <p className="text-sm text-gray-400">Experience the high-fidelity proof of concept designed to demonstrate full user flows.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                            <div className="border-l-2 border-red-500/20 pl-4">
                                <h3 className="text-white font-bold mb-2">1. Connect Wallet</h3>
                                <p className="text-xs text-gray-400 leading-relaxed">Integrated with Thirdweb. Users can authenticate using supported Web3 wallets or email-based smart wallets to establish their on-chain identity within the DAO.</p>
                            </div>
                            <div className="border-l-2 border-red-500/20 pl-4">
                                <h3 className="text-white font-bold mb-2">2. Simulate Data</h3>
                                <p className="text-xs text-gray-400 leading-relaxed">The MVP bootstraps with programmatically generated, hyper-realistic simulated data (proposals, loans, and treasury stats) that persists locally for a frictionless review process.</p>
                            </div>
                            <div className="border-l-2 border-red-500/20 pl-4">
                                <h3 className="text-white font-bold mb-2">3. Zero Gas Mechanics</h3>
                                <p className="text-xs text-gray-400 leading-relaxed">Interact with core mechanics—creating proposals, voting, and funding loans—instantly without needing testnet AVAX or paying gas fees, proving the UI/UX architecture beforehand.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Coins, ArrowRight, Zap, Target, BarChart3, Users, Globe, Lock, Key } from 'lucide-react';
import Link from 'next/link';
import { NAV_ITEMS } from './config';

export default function DaoLandingPage() {
    return (
        <div className="min-h-screen bg-[#060608] relative overflow-hidden">
            {/* Ambient Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-red-600/[0.05] rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-600/[0.03] rounded-full blur-[100px]" />
            </div>

            {/* Navigation (Simple version just for landing) */}
            <nav className="relative z-20 border-b border-red-500/[0.08] bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3 group cursor-default">
                        <div className="relative w-10 h-10">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800 rotate-45 rounded-lg shadow-lg shadow-red-600/30" />
                            <div className="absolute inset-[2px] bg-[#0a0a0a] rotate-45 rounded-[6px]" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Key className="w-5 h-5 text-red-500" strokeWidth={2.5} />
                            </div>
                        </div>
                        <div>
                            <span className="text-white font-bold text-base tracking-tight font-mono uppercase">
                                Red<span className="text-red-500">Key</span>
                            </span>
                            <div className="text-[9px] text-red-500/60 font-mono tracking-[0.25em] uppercase -mt-0.5">
                                DAO
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/dao/dashboard"
                            className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold tracking-wider uppercase transition-colors rounded-none shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                        >
                            Launch App
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="relative z-10">
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20 text-center md:pt-32 md:pb-32 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6 flex flex-col items-center"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-[10px] uppercase tracking-[0.2em] mb-4">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                            Decentralized Governance Live
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase font-mono leading-[1.1]">
                            The Future of <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-500 to-rose-600 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                                Community Capital
                            </span>
                        </h1>

                        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 font-mono leading-relaxed mt-6">
                            RedKey DAO is a decentralized protocol for community-driven investments, transparent treasury management, and peer-to-peer liquidity.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 mt-12 w-full justify-center">
                            <Link
                                href="/dao/dashboard"
                                className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-sm tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                            >
                                Enter App <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/dao/docs"
                                className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-mono font-bold text-sm tracking-wider uppercase transition-all"
                            >
                                Read Manifesto
                            </Link>
                        </div>
                    </motion.div>
                </section>

                {/* Features Specs */}
                <section className="py-20 border-t border-red-500/[0.08] bg-[#0a0a0a]/50 backdrop-blur-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-900/10 to-transparent pointer-events-none" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                        <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-white font-mono tracking-tight uppercase mb-4">Next-Generation <span className="text-red-500">Financial Protocol</span></h2>
                            <p className="text-gray-400 font-mono max-w-2xl">RedKey DAO's architecture is designed for maximum capital efficiency and transparent decision-making without centralized authorities.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: Target,
                                    title: 'Strategic Proposals',
                                    description: 'Submit investment or operational proposals. Allocate treasury funds to high-yield strategies and strategic partnerships through 60% voting consensus.'
                                },
                                {
                                    icon: Coins,
                                    title: 'P2P Liquidity Market',
                                    description: 'A peer-to-peer lending system. Borrow capital by pledging collateral, or fund other borrowers to earn fixed interest rates upon repayment.'
                                },
                                {
                                    icon: Shield,
                                    title: 'Reputation Engine',
                                    description: 'Your governance influence grows with your contributions. Earn reputation points from active participation to unlock higher voting power and multipliers.'
                                },
                                {
                                    icon: BarChart3,
                                    title: 'Transparent Treasury',
                                    description: 'All DAO assets are tracked on-chain in real-time. No hidden treasuries. Our dashboard provides live metrics on fund inflows and outflows.'
                                },
                                {
                                    icon: Users,
                                    title: 'Delegated Voting',
                                    description: 'Too busy to read every proposal? Delegate part or all of your voting power to trusted entities within the community.'
                                },
                                {
                                    icon: Globe,
                                    title: 'Permissionless Setup',
                                    description: 'Anyone can join. Simply connect your wallet via a third party, build your reputation, and start shaping the direction of RedKey DAO.'
                                }
                            ].map((feature, i) => {
                                const Icon = feature.icon;
                                return (
                                    <motion.div
                                        key={feature.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ delay: i * 0.1, duration: 0.5 }}
                                        className="p-8 bg-[#0d0d0d] border border-red-500/[0.08] hover:border-red-500/30 group transition-all duration-300 relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                                            <Icon className="w-24 h-24 text-red-500" />
                                        </div>
                                        <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition-colors">
                                            <Icon className="w-6 h-6 text-red-500" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white font-mono uppercase tracking-tight mb-3">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-400 leading-relaxed text-sm font-mono relative z-10">
                                            {feature.description}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Dashboard Preview Section */}
                <section className="py-24 border-t border-red-500/[0.08] relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-600/5 blur-[100px] pointer-events-none" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="text-[10px] text-red-500/60 font-mono tracking-[0.3em] uppercase mb-4">// COMMAND CENTER</div>
                                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight uppercase font-mono mb-6">
                                    Full Control <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">In Your Hands</span>
                                </h2>
                                <p className="text-gray-400 font-mono leading-relaxed mb-8">
                                    The RedKey DAO Dashboard provides you with a professional, terminal-like interactive interface to monitor investment proposals, P2P lending activity, and a live audit trail log.
                                </p>
                                <ul className="space-y-4 font-mono text-sm text-gray-300 mb-10">
                                    <li className="flex items-center gap-3"><Zap className="w-4 h-4 text-red-500" /> Lightning-fast navigation between modules</li>
                                    <li className="flex items-center gap-3"><Zap className="w-4 h-4 text-red-500" /> Real-time Treasury metric monitoring</li>
                                    <li className="flex items-center gap-3"><Zap className="w-4 h-4 text-red-500" /> Minimalist UI focused on data efficiency</li>
                                </ul>
                                <Link
                                    href="/dao/dashboard"
                                    className="inline-flex items-center gap-2 px-6 py-3 border border-red-500/40 bg-red-500/[0.06] text-red-400 font-mono text-xs font-bold tracking-wider uppercase hover:bg-red-500/15 transition-all w-full sm:w-auto justify-center"
                                >
                                    Enter Application <ArrowRight className="w-4 h-4" />
                                </Link>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-red-500/20 to-transparent opacity-20 blur-2xl" />
                                <div className="relative rounded-lg border border-red-500/20 bg-[#0d0d0d] p-2 shadow-2xl">
                                    <div className="flex items-center gap-2 px-3 py-2 border-b border-red-500/10 mb-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                                        <div className="ml-auto text-[10px] text-gray-600 font-mono">dashboard.exe</div>
                                    </div>
                                    <div className="aspect-[4/3] bg-[#060608] rounded border border-white/5 p-4 flex flex-col gap-4 opacity-80">
                                        <div className="h-20 w-full bg-white/5 rounded" />
                                        <div className="flex gap-4 flex-1">
                                            <div className="w-2/3 flex flex-col gap-4">
                                                <div className="h-1/2 w-full bg-white/5 rounded" />
                                                <div className="h-1/2 w-full bg-white/5 rounded" />
                                            </div>
                                            <div className="w-1/3 w-full bg-white/5 rounded" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

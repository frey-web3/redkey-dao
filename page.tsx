'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Coins, ArrowRight, Zap, Target, BarChart3, Users, Globe, Key, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function DaoLandingPage() {
    return (
        <div className="min-h-screen bg-[#060608] relative overflow-hidden font-mono selection:bg-red-500/30 selection:text-red-200">
            {/* Ambient Background — Static grid + subtle glow, no animation */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
                <div className="absolute top-0 left-1/4 w-[800px] h-[600px] bg-red-600/[0.06] rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-red-900/[0.04] rounded-full blur-[120px]" />
            </div>

            {/* Navigation */}
            <nav className="relative z-50 border-b border-red-500/[0.15] bg-[#0a0a0a]/90 backdrop-blur-md sticky top-0 shadow-[0_4px_30px_rgba(239,68,68,0.05)]">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3 cursor-default">
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
                            <div className="text-[9px] text-red-500/80 font-mono tracking-[0.25em] uppercase -mt-0.5">
                                DAO
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/dao/dashboard"
                            className="relative group px-6 py-2 border border-red-500 text-red-500 font-mono text-xs font-bold tracking-[0.2em] uppercase transition-all overflow-hidden"
                        >
                            <span className="relative z-10 group-hover:text-black transition-colors duration-300">INIT SYSTEM</span>
                            <div className="absolute inset-0 bg-red-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="relative z-10">
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20 text-center md:pt-32 md:pb-32 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6 flex flex-col items-center"
                    >
                        {/* Cyber badge */}
                        <div
                            className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-[10px] uppercase tracking-[0.2em] mb-4 relative overflow-hidden"
                            style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />
                            <Terminal className="w-3 h-3" />
                            NETWORK STATUS: ONLINE
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase font-mono leading-[1.1] relative">
                            <span className="block opacity-90">THE FUTURE OF</span>
                            <span className="block mt-2 relative inline-block">
                                <span className="absolute -inset-2 bg-red-600/20 blur-xl" />
                                <span className="relative text-red-600 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)] z-10 block">
                                    COMMUNITY CAPITAL
                                </span>
                            </span>
                        </h1>

                        <div className="max-w-2xl mx-auto mt-8">
                            <p className="text-lg md:text-xl text-red-100/70 font-mono leading-relaxed">
                                RedKey DAO is a decentralized protocol for community-driven investments, transparent treasury execution, and peer-to-peer liquidity.
                            </p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="flex flex-col sm:flex-row items-center gap-6 mt-12 w-full justify-center"
                        >
                            <Link
                                href="/dao/dashboard"
                                className="group relative w-full sm:w-auto px-8 py-4 bg-[#0d0d0d] border border-red-500 hover:border-red-400 text-red-500 hover:text-red-400 font-mono font-bold text-sm tracking-widest uppercase transition-all overflow-hidden"
                                style={{ clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))' }}
                            >
                                <div className="absolute inset-0 bg-red-500/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red-500 group-hover:border-red-400 transition-colors" />
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    EXECUTE APP <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                                </span>
                            </Link>

                            <Link
                                href="/dao/docs"
                                className="group relative w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 hover:border-white/40 text-gray-400 hover:text-white font-mono font-bold text-sm tracking-widest uppercase transition-colors"
                            >
                                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="relative z-10">READ PROTOCOL</span>
                            </Link>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Divider — Static line, no animation */}
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

                {/* Features Specs */}
                <section className="py-24 bg-[#0a0a0a]/80 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[40vw] h-full bg-gradient-to-l from-red-900/10 to-transparent pointer-events-none" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="mb-16 md:mb-24 flex flex-col items-center text-center"
                        >
                            <div className="text-red-500 font-mono tracking-[0.3em] text-[10px] uppercase mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-red-500" /> SYSTEM ARCHITECTURE
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white font-mono tracking-tighter uppercase mb-6">
                                Next-Gen <span className="text-red-500 relative">
                                    Financial Engine
                                    <span className="absolute bottom-1 left-0 w-full h-2 bg-red-500/20 -z-10" />
                                </span>
                            </h2>
                            <p className="text-gray-400 font-mono max-w-2xl text-sm leading-relaxed">
                                RedKey DAO&apos;s architecture is built for maximum capital flow efficiency and deterministic decision-making without centralized bottlenecks.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { icon: Target, title: 'Strategic Props', description: 'Execute investment proposals. Allocate treasury to high-yield strategies via 60% consensus.' },
                                { icon: Coins, title: 'P2P Liquidity', description: 'Collateralized borrowing network. Fund peers to earn fixed interest upon repayment.' },
                                { icon: Shield, title: 'Reputation Core', description: 'Influence scales with participation. Earn rep points to unlock multiplier voting weight.' },
                                { icon: BarChart3, title: 'Live Treasury', description: 'On-chain verification. Real-time metrics streaming on inflows and outflows.' },
                                { icon: Users, title: 'Liquid Democracy', description: 'Delegate voting authority. Transfer your voting power dynamically to trusted agents.' },
                                { icon: Globe, title: 'Permissionless', description: 'Zero gatekeepers. Sync your wallet, build reputation, and shape the protocol immediately.' },
                            ].map((feature, i) => {
                                const Icon = feature.icon;
                                return (
                                    <motion.div
                                        key={feature.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ delay: i * 0.08 }}
                                        className="p-8 bg-[#0a0a0a] border border-red-500/20 hover:border-red-500/60 group transition-all duration-300 relative"
                                        style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)' }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-20 group-hover:text-red-500 transition-all duration-500">
                                            <Icon className="w-24 h-24" />
                                        </div>
                                        <div className="w-12 h-12 bg-[#060608] border border-red-500/30 flex items-center justify-center mb-6 relative">
                                            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-red-500" />
                                            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-red-500" />
                                            <Icon className="w-5 h-5 text-red-500" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white font-mono uppercase tracking-tight mb-3">{feature.title}</h3>
                                        <p className="text-gray-400 leading-relaxed text-xs font-mono relative z-10 group-hover:text-gray-300 transition-colors">{feature.description}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Dashboard Preview Section */}
                <section className="py-24 border-t border-red-500/[0.15] relative overflow-hidden bg-[#060608]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.05)_0%,transparent_70%)]" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="text-[10px] text-red-500/80 bg-red-500/10 inline-block px-2 py-1 border border-red-500/30 font-mono tracking-[0.3em] uppercase mb-6">
                                    // TERMINAL ACCESS
                                </div>
                                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter uppercase font-mono mb-6 leading-tight">
                                    Full Control <br />
                                    <span className="text-red-500">In Your Hands</span>
                                </h2>
                                <p className="text-gray-400 font-mono text-sm leading-relaxed mb-8 border-l-2 border-red-500/50 pl-4 bg-gradient-to-r from-red-500/5 to-transparent py-2">
                                    The RedKey dashboard provides a high-efficiency terminal interface to stream investment proposals, track P2P liquidity, and audit log trails.
                                </p>
                                <ul className="space-y-4 font-mono text-xs text-gray-300 mb-10">
                                    {[
                                        { icon: Zap, text: 'Zero latency state navigation' },
                                        { icon: Target, text: 'Real-time EVM event streaming' },
                                        { icon: Shield, text: 'Cryptographic proof tracking' },
                                    ].map(item => (
                                        <li key={item.text} className="flex items-center gap-3">
                                            <div className="w-5 h-5 bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0">
                                                <item.icon className="w-3 h-3 text-red-500" />
                                            </div>
                                            {item.text}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/dao/dashboard"
                                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold tracking-[0.2em] uppercase transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)]"
                                >
                                    <span className="relative z-10">ACCESS TERMINAL</span>
                                    <Terminal className="w-4 h-4 relative z-10" />
                                </Link>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-red-500/20 to-transparent opacity-30 blur-3xl pointer-events-none" />

                                {/* Terminal UI Mockup — No animated scanline */}
                                <div className="relative border border-red-500/30 bg-[#060608] shadow-[0_0_50px_rgba(239,68,68,0.15)]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)' }}>
                                    {/* Terminal Header */}
                                    <div className="flex items-center gap-3 px-4 py-2 border-b border-red-500/20 bg-red-500/5">
                                        <div className="flex gap-1.5">
                                            <div className="w-2.5 h-2.5 bg-red-500/80" />
                                            <div className="w-2.5 h-2.5 bg-amber-500/50" />
                                            <div className="w-2.5 h-2.5 bg-emerald-500/50" />
                                        </div>
                                        <div className="ml-auto text-[9px] text-red-500/60 font-mono tracking-widest">redkey-os_v1.0.2</div>
                                    </div>

                                    {/* Terminal Body — Static content */}
                                    <div className="p-5 font-mono text-xs space-y-4 h-[320px] relative overflow-hidden">
                                        <div className="text-red-500 opacity-80">&gt; establishing secure connection to avalanche network...</div>
                                        <div className="text-emerald-500">&gt; connection established. latency: 24ms</div>
                                        <div className="text-gray-400">&gt; verifying cryptography signatures... <span className="text-emerald-500">ok</span></div>
                                        <div className="text-gray-400">&gt; loading treasury metric stream...</div>

                                        <div className="grid grid-cols-2 gap-4 mt-4 bg-red-500/5 border border-red-500/20 p-3">
                                            <div>
                                                <div className="text-[9px] text-red-400/80 mb-1">TOTAL_TVL</div>
                                                <div className="text-white font-bold tracking-wider">$1,245,860.00</div>
                                            </div>
                                            <div>
                                                <div className="text-[9px] text-red-400/80 mb-1">ACTIVE_PROPS</div>
                                                <div className="text-white font-bold tracking-wider">14</div>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex flex-col gap-2">
                                            <div className="flex items-center gap-2 text-gray-500 text-[10px]">
                                                <span className="text-red-500">●</span> sys: parsing incoming block data...
                                            </div>
                                            <div className="h-1 w-full bg-red-500/20 overflow-hidden">
                                                <div className="h-full bg-red-500 w-[65%]" />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Corner accents */}
                                    <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden">
                                        <div className="absolute top-0 right-0 w-[2px] h-4 bg-red-500" />
                                        <div className="absolute top-0 right-0 w-4 h-[2px] bg-red-500" />
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

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Database, Code, ShieldCheck, Network } from 'lucide-react';


export default function ReadmePage() {
    return (
        <div className="min-h-screen bg-[#060608]">
            {/* Background Effect */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>



            <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                    <div className="text-[10px] text-red-500/60 font-mono tracking-[0.3em] uppercase mb-4">// ARCHITECTURE</div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
                        Technical
                        <span className="block text-red-500">README</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
                        An overview of the RedKey DAO tech stack, data flow, and how the Minimum Viable Product (MVP) operates under the hood.
                    </p>
                </motion.div>

                <div className="space-y-8">
                    {/* Stack */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#0d0d0d] border border-red-500/[0.08] p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Code className="w-6 h-6 text-red-500" />
                            <h2 className="text-xl font-bold text-white font-mono tracking-tight uppercase">Tech Stack</h2>
                        </div>
                        <ul className="space-y-4 text-sm text-gray-400 font-mono">
                            <li className="flex items-start gap-3">
                                <span className="text-red-500 font-bold mt-0.5">[{'>'}]</span>
                                <div><strong className="text-white">Framework:</strong> Next.js 15 (App Router), React 19</div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-red-500 font-bold mt-0.5">[{'>'}]</span>
                                <div><strong className="text-white">Styling:</strong> Tailwind CSS 4, Framer Motion for micro-interactions</div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-red-500 font-bold mt-0.5">[{'>'}]</span>
                                <div><strong className="text-white">Authentication:</strong> Thirdweb Connect SDK (In-app Wallets + WalletConnect)</div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-red-500 font-bold mt-0.5">[{'>'}]</span>
                                <div><strong className="text-white">Icons:</strong> Lucide React Vector Graphics</div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-red-500 font-bold mt-0.5">[{'>'}]</span>
                                <div><strong className="text-white">UI Components:</strong> Custom-built from the ground up to achieve a futuristic, brutalist aesthetic. No generic libraries.</div>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Data Model */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#0d0d0d] border border-red-500/[0.08] p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Database className="w-6 h-6 text-red-500" />
                            <h2 className="text-xl font-bold text-white font-mono tracking-tight uppercase">Data Persistence</h2>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed mb-4">
                            For this MVP phase, to provide a zero-friction demonstration without requiring a backend database or actual smart contract deployments, all state is managed client-side:
                        </p>
                        <div className="bg-black border border-red-500/[0.1] p-4 font-mono text-xs text-red-400 overflow-x-auto">
                            <code>
                                // lib/local-dao-store.ts<br />
                                const storageKeys = &#123;<br />
                                &nbsp;&nbsp;members: 'rc_members',<br />
                                &nbsp;&nbsp;treasury: 'rc_treasury',<br />
                                &nbsp;&nbsp;proposals: 'rc_proposals',<br />
                                &nbsp;&nbsp;loans: 'rc_loans',<br />
                                &nbsp;&nbsp;activity: 'rc_activity'<br />
                                &#125;;
                            </code>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed mt-4">
                            Data is persisted entirely in the browser's <code>localStorage</code>. Seed data is generated programmatically on the first load so reviewers can interact with a "live" ecosystem immediately. Creating proposals, voting, funding loans, and updating profiles are entirely functional and persist across hard reloads.
                        </p>
                    </motion.div>

                    {/* Routing Structure */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-[#0d0d0d] border border-red-500/[0.08] p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Network className="w-6 h-6 text-red-500" />
                            <h2 className="text-xl font-bold text-white font-mono tracking-tight uppercase">Application Structure</h2>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed mb-4">
                            The DAO interface is modularly split across multiple Next.js App Router endpoints, sharing state via the local store provider:
                        </p>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><strong className="text-white font-mono uppercase tracking-wider">/dao</strong> - The main operational dashboard. Aggregates treasury statistics, recent community activity, and active governance alerts.</li>
                            <li><strong className="text-white font-mono uppercase tracking-wider">/dao/proposals</strong> - The governance hub. Displays lists of community investment proposals, allows creation of new ones, and handles fractional voting based on reputation.</li>
                            <li><strong className="text-white font-mono uppercase tracking-wider">/dao/loans</strong> - The P2P DeFi lending market. Users can browse active collateralized loan requests, or submit their own requests based on their tier.</li>
                            <li><strong className="text-white font-mono uppercase tracking-wider">/dao/members</strong> - A social explorer acting as a directory of DAO participants, showcasing their accumulated power and historical contribution.</li>
                            <li><strong className="text-white font-mono uppercase tracking-wider">/dao/discussion</strong> - A lightweight discussion space where members open topics, discuss risk assumptions, and coordinate around proposals before anything moves on-chain.</li>
                            <li><strong className="text-white font-mono uppercase tracking-wider">/dao/signal</strong> - The on-chain analytics module utilizing the Alchemy API to fetch and render raw transaction histories from significant market entities inside a custom explorer UI.</li>
                            <li><strong className="text-white font-mono uppercase tracking-wider">/dao/portfolio</strong> - The treasury accountability tracker that fetches and displays real-time and structural metrics of projects previously funded by the DAO's governance mechanism.</li>
                        </ul>
                    </motion.div>

                    {/* Business Logic */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#0d0d0d] border border-red-500/[0.08] p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <ShieldCheck className="w-6 h-6 text-red-500" />
                            <h2 className="text-xl font-bold text-white font-mono tracking-tight uppercase">Lending Engine Logic</h2>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed mb-4">
                            The Lending engine simulates a fragmented collateralized debt protocol.
                        </p>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><strong>Phased State Machine:</strong> Loops through <code>requested</code> → <code>voting</code> → <code>collateral_pending</code> → <code>funding</code> → <code>active</code> → <code>repaid</code>/<code>defaulted</code>.</li>
                            <li><strong>Collateral requirement:</strong> Hardcoded to 100% logic to prevent bad debt cascades. The borrower MUST lock assets equal to the fiat/stablecoin equivalent of their request.</li>
                            <li><strong>Crowd-funding:</strong> Funders can contribute fractionally (e.g., $50 to a $1000 loan request). The system tracks each funder's percentage share and timestamps to distribute repayments or liquidations proportionally.</li>
                        </ul>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}

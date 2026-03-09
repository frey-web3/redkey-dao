'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Presentation, Users, TrendingUp, Target, Box, Flame, Zap, Database, Globe, Lightbulb } from 'lucide-react';
import Link from 'next/link';

const slides = [
    {
        id: 1,
        title: 'COVER',
        icon: Presentation,
        content: (
            <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="mb-8">
                    <p className="text-red-500 font-mono tracking-[0.5em] text-xs md:text-sm uppercase mb-6 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">RedKey DAO</p>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase font-mono leading-[1.1] mb-6">
                        Community-Powered<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-500 to-rose-600 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                            Funding Infrastructure
                        </span>
                    </h1>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-300 tracking-tight">
                        for the Avalanche Ecosystem
                    </h2>
                </div>

                <div className="space-y-2 text-lg md:text-xl text-gray-400 font-medium mb-10">
                    <p className="flex items-center justify-center gap-3">
                        <span className="text-red-500">▹</span> Funding builders.
                    </p>
                    <p className="flex items-center justify-center gap-3">
                        <span className="text-red-500">▹</span> Empowering communities.
                    </p>
                    <p className="flex items-center justify-center gap-3 text-white">
                        <span className="text-red-500">▹</span> Growing the ecosystem.
                    </p>
                </div>

                <div className="inline-flex items-center justify-center px-6 py-2.5 border border-red-500/30 bg-red-500/5 rounded-full">
                    <p className="text-red-400 font-mono text-xs tracking-widest uppercase">Founder: Frey</p>
                </div>
            </div>
        )
    },
    {
        id: 2,
        title: 'THE PROBLEM',
        icon: Target,
        content: (
            <div className="space-y-4 text-base md:text-lg text-gray-300">
                <p className="text-white text-xl md:text-2xl font-bold leading-tight">
                    Traditional venture capital is completely gated. Retail investors and early-stage founders are left behind.
                </p>
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
                    <h3 className="text-red-400 font-mono text-xs tracking-widest uppercase mb-3">Common problems in Web3 ecosystems:</h3>
                    <ul className="space-y-2 list-none pl-0">
                        <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5">▹</span>Retail participants have zero access to high-yield seed rounds</li>
                        <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5">▹</span>Early-stage founders waste months chasing minimal liquidity</li>
                        <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5">▹</span>Communities have capital but lack trusted coordination tools</li>
                        <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5">▹</span>Legacy DAOs suffer from terrible UX and raw smart contract interfaces</li>
                    </ul>
                </div>
                <div className="border-l-4 border-red-500 pl-4 mt-4">
                    <p className="text-gray-400 font-mono text-xs uppercase mb-1">Result:</p>
                    <p className="text-white font-bold text-xl">Innovation slows down. Capital stays idle.</p>
                </div>
            </div>
        )
    },
    {
        id: 3,
        title: 'THE MARKET GAP',
        icon: Database,
        content: (
            <div className="space-y-5 text-base text-gray-300">
                <p className="text-white text-xl md:text-2xl font-bold">Avalanche has billions in ecosystem value.</p>
                <p className="text-lg text-red-100">However, the ecosystem still lacks a community-driven capital coordination system that isn&apos;t a blackbox.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border border-white/10 p-4 bg-black/40 rounded-lg">
                        <h4 className="text-white font-bold mb-1 text-sm">Gatekept Venture Capital</h4>
                        <p className="text-gray-400 text-sm">Entirely gated from retail. Selective, slow, and bureaucratic for founders.</p>
                    </div>
                    <div className="border border-white/10 p-4 bg-black/40 rounded-lg">
                        <h4 className="text-white font-bold mb-1 text-sm">Inefficient DeFi Lending</h4>
                        <p className="text-gray-400 text-sm">Overcollateralized black holes. No targeted, peer-to-peer loan evaluation.</p>
                    </div>
                    <div className="border border-white/10 p-4 bg-black/40 rounded-lg">
                        <h4 className="text-white font-bold mb-1 text-sm">Legacy DAO UX</h4>
                        <p className="text-gray-400 text-sm">Terrible interfaces forcing users to interact with raw smart contracts.</p>
                    </div>
                </div>
                
                <div className="text-center bg-red-500/10 border-t border-b border-red-500/30 py-4">
                    <p className="text-red-400 font-mono text-sm uppercase tracking-wider">The missing piece is transparent, reputation-based community capital coordination.</p>
                </div>
            </div>
        )
    },
    {
        id: 4,
        title: 'OUR SOLUTION',
        icon: Lightbulb,
        content: (
            <div className="space-y-5">
                <p className="text-xl md:text-2xl text-white font-bold leading-relaxed border-b border-white/10 pb-4">
                    RedKey DAO is a decentralized autonomous organization built to democratize access to <span className="text-red-400">high-yield investments</span> and <span className="text-red-400">peer-to-peer liquidity</span> with transparent, <span className="text-red-400">reputation-based governance</span>.
                </p>
                
                <div>
                    <h3 className="text-gray-400 font-mono text-xs uppercase tracking-widest mb-4">RedKey enables:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col items-center justify-center p-5 bg-[#0d0d0d] border border-red-500/20 rounded-xl text-center">
                            <Box className="w-8 h-8 text-red-500 mb-3" />
                            <h4 className="text-white font-bold text-base mb-1">Strategic Treasury Proposals</h4>
                            <p className="text-gray-400 text-sm">Members submit investment proposals deployed only after 60% community consensus.</p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-5 bg-[#0d0d0d] border border-red-500/20 rounded-xl text-center">
                            <Users className="w-8 h-8 text-red-500 mb-3" />
                            <h4 className="text-white font-bold text-base mb-1">Targeted P2P Lending</h4>
                            <p className="text-gray-400 text-sm">Loans against 100% token collateral. Lenders fund fractionally and earn fixed interest.</p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-5 bg-[#0d0d0d] border border-red-500/20 rounded-xl text-center">
                            <Globe className="w-8 h-8 text-red-500 mb-3" />
                            <h4 className="text-white font-bold text-base mb-1">Signal Smart Money Tracker</h4>
                            <p className="text-gray-400 text-sm">Track whale wallets and smart money activity across Avalanche via Alchemy API.</p>
                        </div>
                    </div>
                </div>
                
                <p className="text-lg text-center text-white/80 italic font-serif">
                    &quot;We wrap powerful DeFi mechanics behind a world-class, futuristic interface.&quot;
                </p>
            </div>
        )
    },
    {
        id: 5,
        title: 'CORE PRODUCT',
        icon: Box,
        content: (
            <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-7 h-7 text-red-500" />
                    <h2 className="text-2xl md:text-3xl text-white font-bold tracking-tight">RedKey DAO Platform</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div className="flex gap-3">
                        <div className="w-9 h-9 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/30">
                            <Database className="w-4 h-4 text-red-400" />
                        </div>
                        <div>
                            <h3 className="text-lg text-white font-bold mb-1">DAO Treasury</h3>
                            <p className="text-gray-400 text-sm">Communal treasury deployed to fund ventures via 60% on-chain consensus threshold.</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-3">
                        <div className="w-9 h-9 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/30">
                            <Box className="w-4 h-4 text-red-400" />
                        </div>
                        <div>
                            <h3 className="text-lg text-white font-bold mb-1">Investment Proposals</h3>
                            <p className="text-gray-400 text-sm">Members construct detailed proposals for treasury allocation — from DeFi seed rounds to partnerships.</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-3">
                        <div className="w-9 h-9 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/30">
                            <Users className="w-4 h-4 text-red-400" />
                        </div>
                        <div>
                            <h3 className="text-lg text-white font-bold mb-1">Reputation Voting</h3>
                            <p className="text-gray-400 text-sm">Meritocratic voting: Iron (1.0x), Bronze (1.2x), Silver (1.5x), Gold (2.0x) multipliers.</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-3">
                        <div className="w-9 h-9 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/30">
                            <TrendingUp className="w-4 h-4 text-red-400" />
                        </div>
                        <div>
                            <h3 className="text-lg text-white font-bold mb-1">P2P Lending Market</h3>
                            <p className="text-gray-400 text-sm">Borrowers lock 100% collateral at real-time USD value. Funders contribute fractionally for fixed interest.</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-3 md:col-span-2 p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                        <div className="w-9 h-9 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 border border-red-500/50">
                            <Globe className="w-4 h-4 text-red-400" />
                        </div>
                        <div>
                            <h3 className="text-lg text-white font-bold mb-1">Signal & Portfolio</h3>
                            <p className="text-gray-400 text-sm">Signal tracks smart money and whale wallets on Avalanche. Portfolio monitors funded project milestones and ROI.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 6,
        title: 'TARGET USERS',
        icon: Users,
        content: (
            <div className="h-full flex flex-col justify-center">
                <p className="text-xl text-white mb-6 text-center text-white/80">RedKey serves three primary user personas:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="group relative bg-[#0a0a0c] p-6 border border-white/5 hover:border-red-500/50 transition-colors overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Builders</h3>
                        <div className="h-1 w-10 bg-red-500 mb-3 relative z-10" />
                        <p className="text-gray-400 text-sm leading-relaxed relative z-10">
                            Early-stage Web3 teams that need fast, flexible capital. Submit proposals or request collateralized loans without VC gatekeeping.
                        </p>
                    </div>
                    
                    <div className="group relative bg-[#0a0a0c] p-6 border border-white/5 hover:border-red-500/50 transition-colors overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Community Investors</h3>
                        <div className="h-1 w-10 bg-red-500 mb-3 relative z-10" />
                        <p className="text-gray-400 text-sm leading-relaxed relative z-10">
                            Retail participants who pool capital into the DAO treasury, vote on proposals, fund P2P loans, and earn returns — all transparently on-chain.
                        </p>
                    </div>
                    
                    <div className="group relative bg-[#0a0a0c] p-6 border border-white/5 hover:border-red-500/50 transition-colors overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Ecosystem Projects</h3>
                        <div className="h-1 w-10 bg-red-500 mb-3 relative z-10" />
                        <p className="text-gray-400 text-sm leading-relaxed relative z-10">
                            Established Avalanche protocols leveraging RedKey for community engagement, portfolio tracking, and ecosystem visibility.
                        </p>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 7,
        title: 'GO-TO-MARKET STRATEGY',
        icon: Target,
        content: (
            <div className="h-full flex flex-col justify-center">
                <div className="text-center mb-8">
                    <p className="text-2xl text-white font-bold mb-2">Ecosystem-First Growth</p>
                    <p className="text-base text-red-400 font-mono tracking-widest uppercase">Phase 1 — Builder Onboarding</p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                    <div className="flex-1 bg-black/40 border border-red-500/20 p-6 rounded-xl max-w-md">
                        <h4 className="text-gray-400 font-mono text-xs uppercase mb-4 tracking-widest">Strategic Partnerships:</h4>
                        <ul className="space-y-3 text-lg text-white font-medium">
                            <li className="flex items-center gap-3"><div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]" />Avalanche hackathons</li>
                            <li className="flex items-center gap-3"><div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]" />Early-stage Web3 teams</li>
                            <li className="flex items-center gap-3"><div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]" />Ecosystem incubators</li>
                        </ul>
                    </div>
                    
                    <div className="flex-1 max-w-[220px]">
                        <div className="border border-red-500 p-6 rounded-full aspect-square flex flex-col items-center justify-center text-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-red-500/10 group-hover:bg-red-500/20 transition-colors" />
                            <Target className="w-10 h-10 text-red-500 mb-2 relative z-10" />
                            <p className="text-red-400 font-mono text-xs uppercase tracking-wide relative z-10 mb-1">Phase 1 Goal</p>
                            <p className="text-3xl text-white font-bold relative z-10">20 - 50</p>
                            <p className="text-sm text-gray-300 relative z-10">Funded Projects</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 8,
        title: 'COMMUNITY GROWTH',
        icon: Flame,
        content: (
            <div className="space-y-5">
                <p className="text-xl text-white font-bold text-center">We grow the DAO through education & participation.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="bg-[#0a0a0c] border border-white/10 p-5 rounded-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-3xl" />
                        <h4 className="text-red-400 font-mono text-xs uppercase tracking-widest mb-4">Primary Channels</h4>
                        <ul className="space-y-3 text-base text-gray-300">
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-gray-500 rounded-full" />Twitter / X</li>
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-gray-500 rounded-full" />Discord community</li>
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-gray-500 rounded-full" />Avalanche ecosystem communities</li>
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-gray-500 rounded-full" />Developer communities & hackathons</li>
                        </ul>
                    </div>
                    
                    <div className="bg-[#0a0a0c] border border-white/10 p-5 rounded-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-3xl" />
                        <h4 className="text-red-400 font-mono text-xs uppercase tracking-widest mb-4">Early Incentives</h4>
                        <ul className="space-y-3 text-base text-gray-300">
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-gray-500 rounded-full" />Early member roles</li>
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-gray-500 rounded-full" />Governance power multipliers</li>
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-gray-500 rounded-full" />Reputation-based rewards</li>
                        </ul>
                    </div>
                </div>
                
                <div className="flex justify-center">
                    <div className="inline-flex items-center gap-4 bg-red-500/10 border border-red-500/30 px-6 py-3 rounded-full">
                        <Users className="w-6 h-6 text-red-500" />
                        <div>
                            <p className="text-xs text-red-400 font-mono uppercase tracking-widest">Initial Goal</p>
                            <p className="text-lg text-white font-bold">Onboard 1,000 active DAO members</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 9,
        title: 'ECOSYSTEM PARTNERSHIPS',
        icon: Globe,
        content: (
            <div className="space-y-5">
                <p className="text-xl text-white font-bold text-center border-b border-white/10 pb-4">
                    RedKey will collaborate with leading projects across the <span className="text-red-500">Avalanche Ecosystem</span>.
                </p>
                
                <div>
                    <h4 className="text-gray-400 font-mono text-xs uppercase tracking-widest mb-4 text-center">Future Integrations</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div className="bg-[#0d0d0d] border border-red-500/20 p-5 rounded-xl">
                            <TrendingUp className="w-8 h-8 text-red-400 mx-auto mb-3" />
                            <p className="text-white text-base font-bold">Reputation Tracking</p>
                            <p className="text-gray-400 text-sm mt-1">Verifying actions via on-chain activity indexing.</p>
                        </div>
                        <div className="bg-[#0d0d0d] border border-red-500/20 p-5 rounded-xl">
                            <Box className="w-8 h-8 text-red-400 mx-auto mb-3" />
                            <p className="text-white text-base font-bold">Signal Tracker</p>
                            <p className="text-gray-400 text-sm mt-1">Smart money and whale wallet tracking powered by Alchemy across Avalanche.</p>
                        </div>
                        <div className="bg-[#0d0d0d] border border-red-500/20 p-5 rounded-xl">
                            <Zap className="w-8 h-8 text-red-400 mx-auto mb-3" />
                            <p className="text-white text-base font-bold">Cross-Project Rewards</p>
                            <p className="text-gray-400 text-sm mt-1">Shared liquidity & participation incentives.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-red-500 text-white p-4 rounded-xl text-center shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                    <p className="text-lg font-bold tracking-wide">Creating a Shared Trust Layer Across Avalanche dApps</p>
                </div>
            </div>
        )
    },
    {
        id: 10,
        title: 'GROWTH FLYWHEEL',
        icon: Zap,
        content: (
            <div className="h-full flex flex-col items-center justify-center">
                <p className="text-xl text-white font-bold mb-8 text-center">RedKey creates a self-reinforcing ecosystem loop.</p>
                
                <div className="relative max-w-2xl w-full mx-auto">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-64 h-64 border-4 border-red-500/20 rounded-full animate-[spin_30s_linear_infinite]" />
                        <div className="absolute w-80 h-80 border-4 border-dashed border-red-500/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
                    </div>
                    
                    <div className="relative flex flex-col items-center justify-center gap-2 text-center z-10 bg-[#060608]/80 backdrop-blur-sm rounded-3xl p-8 border border-white/5 shadow-2xl">
                        <p className="text-base md:text-lg text-white font-medium">Builders submit investment proposals</p>
                        <p className="text-red-500">↓</p>
                        <p className="text-base md:text-lg text-white font-medium">DAO votes with 60% consensus threshold</p>
                        <p className="text-red-500">↓</p>
                        <p className="text-base md:text-lg text-white font-medium">Portfolio tracks milestones & ROI</p>
                        <p className="text-red-500">↓</p>
                        <p className="text-base md:text-lg text-white font-medium">Community earns returns, reputation grows</p>
                        <p className="text-red-500">↓</p>
                        <p className="text-base md:text-lg text-white font-medium">More members & capital enter the treasury</p>
                        <div className="mt-4 border-t border-red-500/30 pt-4 w-full">
                            <p className="text-red-400 font-mono text-xs uppercase mb-1">Result:</p>
                            <p className="text-2xl text-white font-bold tracking-wider">Sustainable Ecosystem Growth</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 11,
        title: 'WHY NOW',
        icon: TrendingUp,
        content: (
            <div className="space-y-5 h-full flex flex-col justify-center">
                <div className="text-center">
                    <h2 className="text-2xl md:text-3xl text-white font-bold mb-2">Three major trends make RedKey possible today.</h2>
                    <p className="text-base text-gray-400">Timing is everything in Web3 infrastructure.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="bg-[#0a0a0c] border border-red-500/20 p-5 rounded-xl">
                        <div className="w-9 h-9 bg-red-500/10 rounded-full flex items-center justify-center mb-3">
                            <span className="text-lg text-red-500 font-mono font-bold">1</span>
                        </div>
                        <p className="text-base text-white leading-relaxed">
                            <strong className="text-red-400">Bear markets</strong> are the best time to build deep, resilient infrastructure without hype distraction.
                        </p>
                    </div>
                    
                    <div className="bg-[#0a0a0c] border border-red-500/20 p-5 rounded-xl">
                        <div className="w-9 h-9 bg-red-500/10 rounded-full flex items-center justify-center mb-3">
                            <span className="text-lg text-red-500 font-mono font-bold">2</span>
                        </div>
                        <p className="text-base text-white leading-relaxed">
                            The <strong className="text-red-400">Avalanche ecosystem</strong> continues expanding globally, with enterprise and institutional adoption.
                        </p>
                    </div>
                    
                    <div className="bg-[#0a0a0c] border border-red-500/20 p-5 rounded-xl">
                        <div className="w-9 h-9 bg-red-500/10 rounded-full flex items-center justify-center mb-3">
                            <span className="text-lg text-red-500 font-mono font-bold">3</span>
                        </div>
                        <p className="text-base text-white leading-relaxed">
                            <strong className="text-red-400">Design is a moat</strong> — most Web3 tools are ugly. RedKey's premium interface attracts high-value users.
                        </p>
                    </div>
                </div>
                
                <p className="text-center text-xl text-white font-bold border-t border-white/10 pt-4">
                    The next wave of Web3 growth will be <span className="text-red-500">community coordinated</span>.
                </p>
            </div>
        )
    },
    {
        id: 12,
        title: 'VISION',
        icon: Globe,
        content: (
            <div className="flex flex-col h-full justify-center">
                <div className="bg-gradient-to-br from-[#0d0d0d] to-[#060608] border border-red-500/20 p-8 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
                    
                    <h2 className="text-2xl md:text-3xl text-white font-bold leading-tight mb-6 relative z-10 text-center max-w-4xl mx-auto">
                        Our long-term vision is for RedKey to become a <span className="text-red-500">core funding layer</span> for Avalanche builders.
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
                        <div className="text-center p-4 border border-white/5 rounded-xl bg-black/40">
                            <TrendingUp className="w-6 h-6 text-red-500 mx-auto mb-2" />
                            <p className="text-base text-gray-300">Fund <strong className="text-white">millions of dollars</strong> in promising projects globally.</p>
                        </div>
                        <div className="text-center p-4 border border-white/5 rounded-xl bg-black/40">
                            <Box className="w-6 h-6 text-red-500 mx-auto mb-2" />
                            <p className="text-base text-gray-300">Support the incubation of <strong className="text-white">new Web3 startups</strong>.</p>
                        </div>
                        <div className="text-center p-4 border border-white/5 rounded-xl bg-black/40">
                            <Users className="w-6 h-6 text-red-500 mx-auto mb-2" />
                            <p className="text-base text-gray-300"><strong className="text-white">Empower the community</strong> to own their ecosystem&apos;s success.</p>
                        </div>
                    </div>
                    
                    <p className="text-lg text-center text-white/80 italic mt-6 font-serif border-t border-white/10 pt-6">
                        &quot;We believe RedKey can become one of the next major native projects in the Avalanche ecosystem.&quot;
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 13,
        title: 'WHAT WE NEED',
        icon: Target,
        content: (
            <div className="flex flex-col h-full justify-center space-y-5">
                <div className="text-center max-w-3xl mx-auto">
                    <p className="text-xl text-white font-bold leading-relaxed">
                        To accelerate development, we are seeking support from the Avalanche ecosystem.
                    </p>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-[#0a0a0c] border-t-2 border-red-500 p-5 pt-6 rounded-b-xl">
                        <Box className="w-7 h-7 text-red-400 mb-3" />
                        <h4 className="text-base text-white font-bold mb-1">Launch</h4>
                        <p className="text-gray-400 text-sm">Migrate from MVP localStorage to on-chain smart contracts.</p>
                    </div>
                    <div className="bg-[#0a0a0c] border-t-2 border-red-500 p-5 pt-6 rounded-b-xl">
                        <Users className="w-7 h-7 text-red-400 mb-3" />
                        <h4 className="text-base text-white font-bold mb-1">Onboard</h4>
                        <p className="text-gray-400 text-sm">Bring the first 50 builders on-chain.</p>
                    </div>
                    <div className="bg-[#0a0a0c] border-t-2 border-red-500 p-5 pt-6 rounded-b-xl">
                        <Flame className="w-7 h-7 text-red-400 mb-3" />
                        <h4 className="text-base text-white font-bold mb-1">Grow</h4>
                        <p className="text-gray-400 text-sm">Scale to 1,000 active members.</p>
                    </div>
                    <div className="bg-[#0a0a0c] border-t-2 border-red-500 p-5 pt-6 rounded-b-xl">
                        <Database className="w-7 h-7 text-red-400 mb-3" />
                        <h4 className="text-base text-white font-bold mb-1">Develop</h4>
                        <p className="text-gray-400 text-sm">Deploy reputation tier system and lending engine on EVM.</p>
                    </div>
                </div>
                
                <div className="bg-red-500/10 border border-red-500/30 p-5 rounded-xl text-center max-w-4xl mx-auto w-full">
                    <p className="text-lg md:text-xl text-white font-bold tracking-tight">
                        Together, we can create a <span className="text-red-500">community-powered innovation engine</span>.
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 14,
        title: 'CLOSING',
        icon: Presentation,
        content: (
            <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="mb-10">
                    <p className="text-red-500 font-mono tracking-[0.5em] text-xs uppercase mb-4 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">RedKey DAO</p>
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                        Let&apos;s fund the next generation<br />of Web3 innovation.
                    </h1>
                </div>

                <div className="space-y-3 text-lg md:text-xl text-gray-300 font-medium">
                    <p className="flex items-center justify-center gap-4">
                        <span className="w-10 h-[1px] bg-red-500" /> Building for communities <span className="w-10 h-[1px] bg-red-500" />
                    </p>
                    <p className="flex items-center justify-center gap-4">
                        <span className="w-10 h-[1px] bg-red-500" /> Building for builders <span className="w-10 h-[1px] bg-red-500" />
                    </p>
                    <p className="flex items-center justify-center gap-4 text-white">
                        <span className="w-10 h-[2px] bg-red-500" /> Building for the future of Avalanche <span className="w-10 h-[2px] bg-red-500" />
                    </p>
                </div>

                <div className="mt-12 relative z-20">
                    <Link href="/dao/dashboard" className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-bold text-base transition-colors border border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)] mr-3">
                        Open the App
                    </Link>
                    <Link href="/dao/litepaper" className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 text-white px-8 py-3 font-bold text-base transition-colors border border-white/20">
                        View Litepaper
                    </Link>
                </div>
            </div>
        )
    }
];

export default function PresentationPage() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? prev : prev + 1));
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === 0 ? prev : prev - 1));
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'Space') {
                e.preventDefault();
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, prevSlide]);

    return (
        <div className="flex-1 w-full bg-[#060608] flex flex-col overflow-hidden relative">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[120px]" />
            </div>

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 z-30">
                <motion.div 
                    className="h-full bg-red-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* Header */}
            <div className="absolute top-0 left-0 right-0 px-6 md:px-10 py-4 flex justify-between items-center z-20">
                <span className="text-red-500 font-mono text-xs uppercase tracking-widest font-bold">RedKey DAO Deck</span>
                <span className="text-gray-500 font-mono text-sm">{currentSlide + 1} / {slides.length}</span>
            </div>

            {/* Slide Content - fills the page directly */}
            <div className="flex-1 relative min-h-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="absolute inset-0 flex flex-col px-6 md:px-12 lg:px-20 pt-14 pb-6"
                    >
                        {/* Slide Header (skip for cover and closing) */}
                        {slides[currentSlide].id !== 1 && slides[currentSlide].id !== 14 && (
                            <div className="flex items-center gap-3 mb-4 shrink-0">
                                <div className="w-10 h-10 bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0">
                                    {React.createElement(slides[currentSlide].icon, { className: "w-5 h-5 text-red-500" })}
                                </div>
                                <div>
                                    <p className="text-red-500 font-mono text-xs tracking-widest uppercase">Slide {slides[currentSlide].id}</p>
                                    <h1 className="text-2xl md:text-4xl font-bold text-white uppercase tracking-tight">
                                        {slides[currentSlide].title}
                                    </h1>
                                </div>
                            </div>
                        )}
                        
                        {/* Content area - flex-1 with max-w for readability */}
                        <div className="flex-1 w-full max-w-6xl mx-auto flex flex-col justify-center min-h-0">
                            {slides[currentSlide].content}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="absolute inset-y-0 left-0 w-20 z-20 flex items-center justify-start xl:opacity-0 xl:hover:opacity-100 transition-opacity p-3 pointer-events-none">
                <button
                    onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                    disabled={currentSlide === 0}
                    className="w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-black hover:border-red-500 hover:text-red-500 disabled:opacity-0 disabled:pointer-events-none transition-all pointer-events-auto"
                >
                    <ChevronLeft className="w-5 h-5 ml-0.5" />
                </button>
            </div>
            
            <div className="absolute inset-y-0 right-0 w-20 z-20 flex items-center justify-end xl:opacity-0 xl:hover:opacity-100 transition-opacity p-3 pointer-events-none">
                <button
                    onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                    disabled={currentSlide === slides.length - 1}
                    className="w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-black hover:border-red-500 hover:text-red-500 disabled:opacity-0 disabled:pointer-events-none transition-all pointer-events-auto"
                >
                    <ChevronRight className="w-5 h-5 mr-0.5" />
                </button>
            </div>

            {/* Transparent Click Areas */}
            <div className="absolute inset-y-0 left-0 w-1/4 z-10 cursor-w-resize" onClick={prevSlide} />
            <div className="absolute inset-y-0 right-0 w-3/4 z-10 cursor-e-resize" onClick={nextSlide} />
        </div>
    );
}

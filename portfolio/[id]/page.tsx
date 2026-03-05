'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Activity, Users, Globe, Twitter, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import DaoNavbar from '../../components/DaoNavbar';
import { mockProjects } from '../mockData';

export default function PortfolioDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = React.use(params);
    const project = mockProjects.find((p) => p.id === resolvedParams.id);

    if (!project) {
        return notFound();
    }

    const {
        name,
        fullDescription,
        category,
        status,
        fundingAmount,
        fundingTarget,
        fundingDate,
        roiPercentage,
        websiteUrl,
        twitterUrl,
        logoUrl,
        bannerUrl,
        team,
        metrics,
    } = project;

    return (
        <div className="min-h-screen bg-[#060608] font-mono text-gray-300 relative pb-20">
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                {/* Ambient Background */}
                <div className="absolute inset-0 bg-grid-red/[0.02] bg-[size:30px_30px]" />
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[120px]" />
            </div>

            <DaoNavbar />

            <main className="relative z-10">
                {/* Banner Section */}
                <div className="relative h-64 md:h-80 lg:h-96 w-full border-b border-red-500/20 bg-[#0a0a0a] overflow-hidden">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#060608] via-[#060608]/80 to-transparent" />
                    {bannerUrl ? (
                        <img src={bannerUrl} alt={name} className="w-full h-full object-cover opacity-40 mix-blend-luminosity" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-red-900/20 to-transparent" />
                    )}

                    {/* Hero Content */}
                    <div className="absolute inset-0 z-20 max-w-7xl mx-auto flex flex-col justify-end p-4 sm:p-6 lg:p-8">
                        {/* Back Link */}
                        <Link href="/dao/portfolio" className="absolute top-6 left-4 sm:left-6 lg:left-8 inline-flex items-center gap-2 text-gray-400 hover:text-red-400 text-xs font-bold uppercase tracking-widest transition-colors mb-4 group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> BACK TO PORTFOLIO
                        </Link>

                        <div className="flex flex-col md:flex-row md:items-end gap-6 relative">
                            {/* Logo */}
                            <div className="w-20 h-20 md:w-28 md:h-28 bg-[#0a0a0a] border border-red-500/40 p-3 shadow-[0_0_30px_rgba(239,68,68,0.1)] rounded-lg relative overflow-hidden group">
                                <div className="absolute inset-0 bg-red-500/10 -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                {logoUrl ? (
                                    <img src={logoUrl} alt="" className="w-full h-full object-contain relative z-10" />
                                ) : (
                                    <div className="w-full h-full bg-red-500/20" />
                                )}
                            </div>

                            {/* Titles */}
                            <div className="flex-1 pb-2">
                                <div className="text-[10px] text-red-500/60 font-mono tracking-[0.3em] uppercase mb-1">// PROJECT DETAIL</div>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight font-mono uppercase mb-4">
                                    {name}
                                </h1>
                                <div className="flex items-center gap-3 mb-4 flex-wrap">
                                    <span className="text-[10px] px-2 py-0.5 border border-red-500/30 text-red-500 bg-red-500/10 uppercase font-mono tracking-[0.1em]">
                                        {category}
                                    </span>
                                    <span className="text-[10px] px-2 py-0.5 border border-gray-500/30 text-gray-400 uppercase font-mono tracking-[0.1em] flex items-center gap-1.5">
                                        <span className={`w-1.5 h-1.5 rounded-full ${status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-500'}`} />
                                        {status}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-4 text-xs font-mono uppercase tracking-widest">
                                    {websiteUrl && (
                                        <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-red-400 hover:text-red-300 transition-colors">
                                            <Globe className="w-3.5 h-3.5" /> Website
                                        </a>
                                    )}
                                    {twitterUrl && (
                                        <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors">
                                            <Twitter className="w-3.5 h-3.5" /> Twitter
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
                    {/* Left Column (Details) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <div className="bg-[#0a0a0a] border border-red-500/20 p-6 md:p-8 relative">
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-500/30" />
                            <h2 className="text-[10px] text-white font-mono tracking-[0.15em] uppercase font-bold flex items-center gap-2 mb-4">
                                <Activity className="w-3.5 h-3.5 text-red-500" />
                                PROJECT OVERVIEW
                            </h2>
                            <div className="text-gray-400 text-sm leading-relaxed space-y-4 font-mono">
                                {fullDescription.split('\n').map((paragraph, i) => (
                                    <p key={i}>{paragraph}</p>
                                ))}
                            </div>
                        </div>

                        {/* Team */}
                        {team.length > 0 && (
                            <div className="bg-[#0a0a0a] border border-red-500/20 p-6 md:p-8 relative">
                                <h2 className="text-[10px] text-white font-mono tracking-[0.15em] uppercase font-bold flex items-center gap-2 mb-6">
                                    <Users className="w-3.5 h-3.5 text-red-500" />
                                    CORE TEAM
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {team.map((member, i) => (
                                        <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/5 p-4 hover:border-red-500/20 transition-colors">
                                            <div className="w-10 h-10 bg-red-900/20 border border-red-500/30 rounded-full flex items-center justify-center text-red-500 shrink-0 uppercase font-black text-sm">
                                                {member.avatarUrl ? (
                                                    <img src={member.avatarUrl} alt={member.name} className="w-full h-full rounded-full object-cover" />
                                                ) : (
                                                    member.name.charAt(0)
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-bold text-white text-sm">{member.name}</div>
                                                <div className="text-xs text-red-400 capitalize">{member.role}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column (Metrics & Funding) */}
                    <div className="space-y-6">
                        {/* Funding Allocation */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-[#0a0a0a] border border-red-500/20 p-6 relative"
                        >
                            <h3 className="text-[10px] text-red-500 font-mono tracking-[0.15em] uppercase font-bold mb-6 border-b border-red-500/20 pb-4">
                                TREASURY ALLOCATION
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <div className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Total Issued</div>
                                    <div className="text-3xl font-black text-white tracking-tighter">
                                        ${fundingAmount.toLocaleString()}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] uppercase tracking-widest">
                                        <span className="text-gray-500">Target</span>
                                        <span className="text-white">${fundingTarget.toLocaleString()}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-red-950/30 overflow-hidden border border-red-500/20">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min((fundingAmount / fundingTarget) * 100, 100)}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            className="h-full bg-red-500 shadow-[0_0_10px_#ef4444]"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between border-t border-red-500/10 pt-4">
                                    <div className="text-gray-500 text-[10px] uppercase tracking-widest">Est. ROI</div>
                                    <div className={`text-sm font-bold tracking-widest uppercase flex items-center gap-1 ${roiPercentage && roiPercentage > 0 ? 'text-emerald-500' : 'text-gray-400'}`}>
                                        {roiPercentage ? (
                                            <>
                                                <ArrowUpRight className="w-3.5 h-3.5" />
                                                {roiPercentage}%
                                            </>
                                        ) : 'TBA'}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-red-500/20 border-t border-l border-red-500/40" />
                        </motion.div>

                        {/* Network Metrics */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-[#0a0a0a] border border-red-500/20 p-6"
                        >
                            <h3 className="text-[10px] text-red-500 font-mono tracking-[0.15em] uppercase font-bold mb-6 border-b border-red-500/20 pb-4">
                                NETWORK STATUS
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-white/5 border border-white/5">
                                    <div className="text-gray-500 text-[10px] uppercase tracking-widest">Launch Date</div>
                                    <div className="text-xs text-white uppercase font-bold">
                                        {new Date(fundingDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                    </div>
                                </div>

                                {metrics.tvl && (
                                    <div className="flex items-center justify-between p-3 bg-white/5 border border-white/5">
                                        <div className="text-gray-500 text-[10px] uppercase tracking-widest">TVL</div>
                                        <div className="text-xs text-white font-bold tracking-widest">${metrics.tvl.toLocaleString('en-US')}</div>
                                    </div>
                                )}

                                {metrics.volume24h && (
                                    <div className="flex items-center justify-between p-3 bg-white/5 border border-white/5">
                                        <div className="text-gray-500 text-[10px] uppercase tracking-widest">24h Vol</div>
                                        <div className="text-xs text-white font-bold tracking-widest">${metrics.volume24h.toLocaleString('en-US')}</div>
                                    </div>
                                )}

                                {metrics.activeUsers && (
                                    <div className="flex items-center justify-between p-3 bg-white/5 border border-white/5">
                                        <div className="text-gray-500 text-[10px] uppercase tracking-widest">Active Users</div>
                                        <div className="text-xs text-white font-bold tracking-widest">{metrics.activeUsers.toLocaleString('en-US')}</div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight, ExternalLink, TrendingUp, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import DaoNavbar from '../components/DaoNavbar';
import { mockProjects } from './mockData';

export default function PortfolioPage() {
    return (
        <div className="min-h-screen bg-[#060608]">
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                {/* Background Base */}
                <div className="absolute inset-0 z-0 bg-grid-red/[0.02] bg-[size:30px_30px]" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />
            </div>

            <DaoNavbar />

            <main className="max-w-7xl mx-auto relative z-10 space-y-8 px-4 sm:px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <div>
                            <div className="text-[10px] text-red-500/60 font-mono tracking-[0.3em] uppercase mb-1">// INVESTMENT PORTFOLIO</div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-mono uppercase">PORTFOLIO</h1>
                            <p className="text-gray-600 mt-1 text-xs font-mono max-w-xl">
                                Track the performance and milestones.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Portfolio Grid - Responsive: 1 col on mobile, 4 cols on large screens */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {mockProjects.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link href={`/dao/portfolio/${project.id}`} className="block h-full">
                                <div className="group h-full flex flex-col bg-[#0a0a0a] border border-red-500/20 hover:border-red-500/50 transition-colors relative overflow-hidden">
                                    {/* Card Header Image Container */}
                                    <div className="relative">
                                        <div className="h-32 w-full relative bg-black/50 overflow-hidden border-b border-red-500/20">
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
                                            {project.bannerUrl ? (
                                                <img
                                                    src={project.bannerUrl}
                                                    alt={project.name}
                                                    className="w-full h-full object-cover opacity-50 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 bg-red-900/10" />
                                            )}
                                        </div>
                                        {/* Logo positioned overlapping the header and body */}
                                        <div className="absolute -bottom-6 left-5 z-20 w-12 h-12 bg-[#060608] border border-red-500/30 p-1.5 shadow-lg flex items-center justify-center">
                                            {project.logoUrl ? (
                                                <img src={project.logoUrl} alt="" className="max-w-full max-h-full object-contain" />
                                            ) : (
                                                <Briefcase className="w-5 h-5 text-red-500/50" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-5 pt-10 flex-1 flex flex-col">
                                        <div className="flex flex-col items-start gap-2 mb-2">
                                            <span className="text-[9px] px-2 py-0.5 border border-red-500/30 text-red-500 bg-red-500/5 uppercase tracking-wider font-mono">
                                                {project.category}
                                            </span>
                                            <h3 className="font-bold text-lg text-white tracking-tight uppercase leading-tight">{project.name}</h3>
                                        </div>

                                        <p className="text-xs text-gray-500 mb-6 line-clamp-2 mt-1">
                                            {project.shortDescription}
                                        </p>

                                        <div className="mt-auto space-y-4">
                                            <div className="grid grid-cols-2 gap-2 text-xs">
                                                <div className="bg-white/5 p-2 border border-white/5">
                                                    <div className="text-gray-500 text-[9px] uppercase tracking-wider mb-1">Funding</div>
                                                    <div className="font-bold text-white">${project.fundingAmount.toLocaleString('en-US')}</div>
                                                </div>
                                                <div className="bg-white/5 p-2 border border-white/5">
                                                    <div className="text-gray-500 text-[9px] uppercase tracking-wider mb-1">Est. ROI</div>
                                                    <div className={`font-bold ${project.roiPercentage && project.roiPercentage > 0 ? 'text-emerald-400' : 'text-gray-400'}`}>
                                                        {project.roiPercentage ? `+${project.roiPercentage.toFixed(1)}%` : 'TBA'}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between pt-4 border-t border-red-500/10 group-hover:border-red-500/30 transition-colors">
                                                <span className="text-[10px] text-gray-500 uppercase tracking-widest">{project.status}</span>
                                                <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 group-hover:text-white transition-all">
                                                    <ArrowRight className="w-3 h-3" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Accents */}
                                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}

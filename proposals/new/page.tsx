'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useActiveAccount } from 'thirdweb/react';
import { ScrollText, ArrowLeft, AlertTriangle, Check } from 'lucide-react';
import Link from 'next/link';
import DaoNavbar from '../../components/DaoNavbar';
import { RISK_LEVELS } from '../../config';
import { seedIfNeeded, createProposal, getMember } from '@/lib/local-dao-store';

export default function NewProposalPage() {
    const router = useRouter();
    const account = useActiveAccount();
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ title: '', description: '', requestedAmount: '', expectedROI: '', timeline: '', riskLevel: 'medium' as 'low' | 'medium' | 'high', tags: '' });

    useEffect(() => { seedIfNeeded(); }, []);
    const updateForm = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));
    const isValid = form.title.trim() && form.description.trim() && Number(form.requestedAmount) > 0 && form.timeline.trim();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValid || !account) return;
        setSubmitting(true);
        const member = getMember(account.address);
        createProposal({
            title: form.title, description: form.description, author: account.address, authorName: member?.displayName,
            requestedAmount: Number(form.requestedAmount), expectedROI: form.expectedROI ? Number(form.expectedROI) : undefined,
            timeline: form.timeline, riskLevel: form.riskLevel,
            tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        });
        await new Promise(r => setTimeout(r, 800));
        setSubmitted(true);
        setSubmitting(false);
        setTimeout(() => router.push('/dao/proposals'), 1500);
    };

    if (!account) {
        return (
            <div className="min-h-screen bg-[#060608]">
                <DaoNavbar />
                <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
                    <div className="w-14 h-14 border border-amber-500/30 bg-amber-500/[0.06] flex items-center justify-center mb-4"><AlertTriangle className="w-7 h-7 text-amber-400" /></div>
                    <h2 className="text-white text-lg font-mono font-bold mb-2">[ WALLET REQUIRED ]</h2>
                    <p className="text-gray-600 text-xs font-mono text-center max-w-sm">Connect your wallet to submit a proposal.</p>
                </div>
            </div>
        );
    }

    if (submitted) {
        return (
            <div className="min-h-screen bg-[#060608]">
                <DaoNavbar />
                <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-14 h-14 border border-emerald-500/30 bg-emerald-500/[0.06] flex items-center justify-center mb-4"><Check className="w-7 h-7 text-emerald-400" /></motion.div>
                    <h2 className="text-white text-lg font-mono font-bold mb-2">[ SUBMITTED ]</h2>
                    <p className="text-gray-600 text-xs font-mono text-center">Proposal is now open for voting.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#060608]">
            <div className="fixed inset-0 pointer-events-none overflow-hidden"><div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" /></div>
            <DaoNavbar />
            <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-8">
                <Link href="/dao/proposals" className="inline-flex items-center gap-2 text-[10px] text-gray-600 hover:text-red-400 mb-6 font-mono tracking-wider uppercase transition-colors"><ArrowLeft className="w-3.5 h-3.5" /> BACK</Link>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <div className="text-[10px] text-red-500/60 font-mono tracking-[0.3em] uppercase mb-1">// NEW ENTRY</div>
                    <h1 className="text-2xl font-bold text-white tracking-tight font-mono flex items-center gap-3"><ScrollText className="w-7 h-7 text-red-500" /> CREATE PROPOSAL</h1>
                </motion.div>

                <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-5">
                    <div className="bg-[#0d0d0d] border border-red-500/[0.08] p-5">
                        <label className="text-[10px] text-gray-500 font-mono mb-2 block tracking-wider">TITLE *</label>
                        <input type="text" value={form.title} onChange={(e) => updateForm('title', e.target.value)} placeholder="e.g. Invest in DeFi Protocol X" className="w-full bg-black border border-red-500/[0.1] px-4 py-3 text-white font-mono placeholder-gray-800 focus:outline-none focus:border-red-500/30 text-sm" maxLength={120} />
                        <span className="text-[9px] text-gray-800 font-mono mt-1 block">{form.title.length}/120</span>
                    </div>

                    <div className="bg-[#0d0d0d] border border-red-500/[0.08] p-5">
                        <label className="text-[10px] text-gray-500 font-mono mb-2 block tracking-wider">DESCRIPTION *</label>
                        <textarea value={form.description} onChange={(e) => updateForm('description', e.target.value)} placeholder="Describe the opportunity, rationale, expected outcomes..." rows={6} className="w-full bg-black border border-red-500/[0.1] px-4 py-3 text-white font-mono placeholder-gray-800 focus:outline-none focus:border-red-500/30 text-sm resize-none" />
                    </div>

                    <div className="bg-[#0d0d0d] border border-red-500/[0.08] p-5">
                        <h3 className="text-[10px] text-white font-mono tracking-[0.15em] uppercase font-bold mb-4">FINANCIAL DATA</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] text-gray-500 font-mono mb-1.5 block tracking-wider">AMOUNT (USD) *</label>
                                <input type="number" value={form.requestedAmount} onChange={(e) => updateForm('requestedAmount', e.target.value)} placeholder="20000" className="w-full bg-black border border-red-500/[0.1] px-4 py-3 text-white font-mono placeholder-gray-800 focus:outline-none focus:border-red-500/30 text-sm" />
                            </div>
                            <div>
                                <label className="text-[10px] text-gray-500 font-mono mb-1.5 block tracking-wider">EXPECTED ROI (%)</label>
                                <input type="number" value={form.expectedROI} onChange={(e) => updateForm('expectedROI', e.target.value)} placeholder="25" className="w-full bg-black border border-red-500/[0.1] px-4 py-3 text-white font-mono placeholder-gray-800 focus:outline-none focus:border-red-500/30 text-sm" />
                            </div>
                            <div>
                                <label className="text-[10px] text-gray-500 font-mono mb-1.5 block tracking-wider">TIMELINE *</label>
                                <input type="text" value={form.timeline} onChange={(e) => updateForm('timeline', e.target.value)} placeholder="6 months" className="w-full bg-black border border-red-500/[0.1] px-4 py-3 text-white font-mono placeholder-gray-800 focus:outline-none focus:border-red-500/30 text-sm" />
                            </div>
                            <div>
                                <label className="text-[10px] text-gray-500 font-mono mb-1.5 block tracking-wider">RISK LEVEL *</label>
                                <div className="flex gap-2">
                                    {(['low', 'medium', 'high'] as const).map(level => {
                                        const cfg = RISK_LEVELS[level];
                                        return (
                                            <button key={level} type="button" onClick={() => updateForm('riskLevel', level)} className={`flex-1 py-2.5 text-[10px] font-mono font-bold tracking-wider border transition-all ${form.riskLevel === level ? 'text-white' : 'text-gray-700 border-red-500/[0.06] hover:border-red-500/15'}`} style={form.riskLevel === level ? { backgroundColor: `${cfg.color}15`, borderColor: `${cfg.color}40`, color: cfg.color } : {}}>
                                                {cfg.label.toUpperCase()}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0d0d0d] border border-red-500/[0.08] p-5">
                        <label className="text-[10px] text-gray-500 font-mono mb-2 block tracking-wider">TAGS (comma-separated)</label>
                        <input type="text" value={form.tags} onChange={(e) => updateForm('tags', e.target.value)} placeholder="defi, investment, yield" className="w-full bg-black border border-red-500/[0.1] px-4 py-3 text-white font-mono placeholder-gray-800 focus:outline-none focus:border-red-500/30 text-sm" />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <Link href="/dao/proposals" className="px-6 py-3 border border-red-500/[0.1] text-gray-500 hover:text-white hover:border-red-500/20 font-mono text-xs font-bold tracking-wider transition-all">CANCEL</Link>
                        <button type="submit" disabled={!isValid || submitting} className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                            {submitting ? 'SUBMITTING...' : 'SUBMIT'}
                        </button>
                    </div>
                </motion.form>
            </main>
        </div>
    );
}

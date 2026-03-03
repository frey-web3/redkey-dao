'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useActiveAccount } from 'thirdweb/react';
import { Landmark, ArrowLeft, AlertTriangle, Check } from 'lucide-react';
import Link from 'next/link';
import DaoNavbar from '../../components/DaoNavbar';
import { LOAN_TERMS, COLLATERAL_RATIO } from '../../config';
import { seedIfNeeded, createLoan, getMember } from '@/lib/local-dao-store';
import type { LoanTenor } from '../../types';

export default function NewLoanPage() {
    const router = useRouter();
    const account = useActiveAccount();
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ amount: '', purpose: '', tenor: 3 as LoanTenor, collateralToken: 'AVAX' });

    useEffect(() => { seedIfNeeded(); }, []);

    const updateForm = (field: string, value: string | number) => setForm(prev => ({ ...prev, [field]: value }));
    const term = LOAN_TERMS[form.tenor];
    const amount = Number(form.amount) || 0;
    const interest = amount * term.rate / 100;
    const totalRepay = amount + interest;

    // Simulate current AVAX Price
    const SIMULATED_AVAX_PRICE_USD = 35.00;
    // Calculate collateral: amount (USD) / AVAX Price (USD) * Ratio
    const collateral = (amount / SIMULATED_AVAX_PRICE_USD) * (COLLATERAL_RATIO / 100);
    const isValid = amount > 0 && form.purpose.trim();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValid || !account) return;
        setSubmitting(true);
        const member = getMember(account.address);
        createLoan({
            borrower: account.address,
            borrowerName: member?.displayName || account.address.slice(0, 10),
            amount,
            purpose: form.purpose,
            tenor: form.tenor,
            collateralToken: form.collateralToken,
            collateralAmount: collateral, // Pass explicitly if needed, or update createLoan
        });
        await new Promise(r => setTimeout(r, 800));
        setSubmitted(true);
        setSubmitting(false);
        setTimeout(() => router.push('/dao/loans'), 1500);
    };

    if (!account) {
        return (
            <div className="min-h-screen bg-[#060608]">
                <DaoNavbar />
                <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
                    <div className="w-14 h-14 border border-amber-500/30 bg-amber-500/[0.06] flex items-center justify-center mb-4">
                        <AlertTriangle className="w-7 h-7 text-amber-400" />
                    </div>
                    <h2 className="text-white text-lg font-mono font-bold mb-2">[ WALLET REQUIRED ]</h2>
                    <p className="text-gray-600 text-xs font-mono text-center max-w-sm">Connect your wallet to request a loan.</p>
                </div>
            </div>
        );
    }

    if (submitted) {
        return (
            <div className="min-h-screen bg-[#060608]">
                <DaoNavbar />
                <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-14 h-14 border border-emerald-500/30 bg-emerald-500/[0.06] flex items-center justify-center mb-4">
                        <Check className="w-7 h-7 text-emerald-400" />
                    </motion.div>
                    <h2 className="text-white text-lg font-mono font-bold mb-2">[ LOAN REQUESTED ]</h2>
                    <p className="text-gray-600 text-xs font-mono text-center">Submitted for community voting.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#060608]">
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,transparent_1px),linear_gradient(90deg,rgba(239,68,68,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>
            <DaoNavbar />
            <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-8">
                <Link href="/dao/loans" className="inline-flex items-center gap-2 text-[10px] text-gray-600 hover:text-red-400 mb-6 font-mono tracking-wider uppercase transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5" /> BACK
                </Link>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <div className="text-[10px] text-red-500/60 font-mono tracking-[0.3em] uppercase mb-1">// NEW ENTRY</div>
                    <h1 className="text-2xl font-bold text-white tracking-tight font-mono flex items-center gap-3">
                        <Landmark className="w-7 h-7 text-cyan-500" /> REQUEST LOAN
                    </h1>
                </motion.div>

                <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-5">
                    {/* Amount + Tenor */}
                    <div className="bg-[#0d0d0d] border border-red-500/[0.08] p-5">
                        <h3 className="text-[10px] text-white font-mono tracking-[0.15em] uppercase font-bold mb-4">LOAN TERMS</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] text-gray-500 font-mono mb-1.5 block tracking-wider">AMOUNT (USD) *</label>
                                <input type="number" value={form.amount} onChange={(e) => updateForm('amount', e.target.value)} placeholder="1000" min={10}
                                    className="w-full bg-black border border-red-500/[0.1] px-4 py-3 text-white font-mono placeholder-gray-800 focus:outline-none focus:border-red-500/30 transition-colors text-sm" />
                            </div>
                            <div>
                                <label className="text-[10px] text-gray-500 font-mono mb-1.5 block tracking-wider">TENOR *</label>
                                <div className="flex gap-2">
                                    {([3, 6, 9] as LoanTenor[]).map(t => (
                                        <button key={t} type="button" onClick={() => updateForm('tenor', t)}
                                            className={`flex-1 py-2.5 text-[10px] font-mono font-bold tracking-wider border transition-all ${form.tenor === t ? 'text-cyan-400 border-cyan-500/40 bg-cyan-500/[0.08]' : 'text-gray-700 border-red-500/[0.06] hover:border-red-500/15 hover:text-white'}`}>
                                            {t}mo / {LOAN_TERMS[t].rate}%
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Purpose */}
                    <div className="bg-[#0d0d0d] border border-red-500/[0.08] p-5">
                        <label className="text-[10px] text-gray-500 font-mono mb-2 block tracking-wider">PURPOSE *</label>
                        <textarea value={form.purpose} onChange={(e) => updateForm('purpose', e.target.value)}
                            placeholder="Describe why you need this loan and your repayment plan..." rows={4}
                            className="w-full bg-black border border-red-500/[0.1] px-4 py-3 text-white font-mono placeholder-gray-800 focus:outline-none focus:border-red-500/30 transition-colors text-sm resize-none" />
                    </div>

                    {/* Collateral Token */}
                    <div className="bg-[#0d0d0d] border border-red-500/[0.08] p-5">
                        <h3 className="text-[10px] text-white font-mono tracking-[0.15em] uppercase font-bold mb-4">COLLATERAL</h3>
                        <p className="text-[10px] text-gray-500 font-mono mb-3">You must deposit 100% of the loan amount as collateral after approval.</p>
                        <div>
                            <label className="text-[10px] text-gray-500 font-mono mb-1.5 block tracking-wider">TOKEN</label>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => updateForm('collateralToken', 'AVAX')}
                                    className="px-4 py-2 text-[10px] font-mono font-bold tracking-wider border transition-all text-amber-400 border-amber-500/40 bg-amber-500/[0.08]"
                                >
                                    AVAX
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    {amount > 0 && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-[#0d0d0d] border border-cyan-500/[0.12] p-5">
                            <h3 className="text-[10px] text-white font-mono tracking-[0.15em] uppercase font-bold mb-3">// SUMMARY</h3>
                            <div className="space-y-2 text-[10px] font-mono">
                                {[
                                    { label: 'LOAN AMOUNT', value: `$${amount.toLocaleString()}` },
                                    { label: 'TENOR', value: `${form.tenor} months` },
                                    { label: 'INTEREST', value: `${term.rate}% flat = $${interest.toLocaleString()}` },
                                    { label: 'TOTAL REPAYMENT', value: `$${totalRepay.toLocaleString()}`, highlight: true },
                                    { label: 'SIMULATED AVAX PRICE', value: `$${SIMULATED_AVAX_PRICE_USD.toFixed(2)}` },
                                    { label: 'COLLATERAL REQUIRED', value: `${collateral.toFixed(2)} ${form.collateralToken} (100% USD Value)` },
                                ].map(row => (
                                    <div key={row.label} className="flex justify-between py-1.5 border-b border-cyan-500/[0.04] last:border-0">
                                        <span className="text-gray-600 tracking-wider">{row.label}</span>
                                        <span className={row.highlight ? 'text-cyan-400 font-bold' : 'text-white'}>{row.value}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    <div className="flex justify-end gap-3 pt-2">
                        <Link href="/dao/loans" className="px-6 py-3 border border-red-500/[0.1] text-gray-500 hover:text-white hover:border-red-500/20 font-mono text-xs font-bold tracking-wider transition-all">CANCEL</Link>
                        <button type="submit" disabled={!isValid || submitting} className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                            {submitting ? 'SUBMITTING...' : 'REQUEST LOAN'}
                        </button>
                    </div>
                </motion.form>
            </main>
        </div>
    );
}

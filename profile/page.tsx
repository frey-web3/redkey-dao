'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useActiveAccount } from 'thirdweb/react';
import { UserCircle, Save, X, Link as LinkIcon, Twitter, Github, Linkedin, Globe, AlertTriangle } from 'lucide-react';
import DaoNavbar from '../components/DaoNavbar';
import { seedIfNeeded, getMember, updateMember, addMember } from '@/lib/local-dao-store';
import type { DaoMember } from '../types';

export default function ProfilePage() {
    const account = useActiveAccount();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Form state
    const [form, setForm] = useState({
        displayName: '',
        avatar: '',
        bio: '',
        twitter: '',
        github: '',
        linkedin: '',
        website: ''
    });

    useEffect(() => {
        seedIfNeeded();
        if (account) {
            const member = getMember(account.address);
            if (member) {
                setForm({
                    displayName: member.displayName || '',
                    avatar: member.avatar || '',
                    bio: member.bio || '',
                    twitter: member.twitter || '',
                    github: member.github || '',
                    linkedin: member.linkedin || '',
                    website: member.website || ''
                });
            } else {
                // If member doesn't exist yet in local storage, initialize with blanks
                setForm(prev => ({ ...prev, displayName: account.address.slice(0, 6) + '...' + account.address.slice(-4) }));
            }
        }
        setLoading(false);
    }, [account]);

    const updateField = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

    const handleSave = async () => {
        if (!account || !form.displayName.trim()) return;
        setSaving(true);

        // Check if member exists, otherwise create basic profile
        const existing = getMember(account.address);
        if (existing) {
            updateMember(account.address, {
                displayName: form.displayName,
                avatar: form.avatar,
                bio: form.bio,
                twitter: form.twitter,
                github: form.github,
                linkedin: form.linkedin,
                website: form.website
            });
        } else {
            const newMember: DaoMember = {
                walletAddress: account.address,
                displayName: form.displayName,
                avatar: form.avatar,
                bio: form.bio,
                twitter: form.twitter,
                github: form.github,
                linkedin: form.linkedin,
                website: form.website,
                role: 'observer',
                reputation: 0,
                creditTier: 'new',
                totalContribution: 0,
                votingPower: 0,
                joinedAt: Date.now(),
                lastActiveAt: Date.now(),
                proposalsSubmitted: 0,
                votesCount: 0,
                isActive: true
            };
            addMember(newMember);
        }

        // Simulating network delay for save effect
        await new Promise(r => setTimeout(r, 800));
        setSaving(false);
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
                    <p className="text-gray-600 text-xs font-mono text-center max-w-sm">Connect your wallet to view and edit your profile.</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#060608]">
                <DaoNavbar />
                <div className="flex items-center justify-center h-[60vh]">
                    <span className="text-gray-600 font-mono text-xs animate-pulse">LOADING PROFILE...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#060608]">
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>

            <DaoNavbar />

            <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex justify-between items-end">
                    <div>
                        <div className="text-[10px] text-red-500/60 font-mono tracking-[0.3em] uppercase mb-1">// IDENTITY MODULE</div>
                        <h1 className="text-3xl font-bold text-white tracking-tight font-mono flex items-center gap-3">
                            <UserCircle className="w-8 h-8 text-red-500" /> MY PROFILE
                        </h1>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={saving || !form.displayName.trim()}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-mono text-xs font-bold tracking-wider transition-all"
                    >
                        {saving ? 'SAVING...' : <><Save className="w-3.5 h-3.5" /> SAVE CHANGES</>}
                    </button>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Column: Avatar & Basic Info */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="md:col-span-1 space-y-6">
                        <div className="bg-[#0d0d0d] border border-red-500/[0.08] p-5 flex flex-col items-center text-center">
                            <div className="relative w-32 h-32 mb-4 group cursor-pointer">
                                <div className="absolute inset-0 bg-[#111] border border-red-500/[0.15] flex items-center justify-center overflow-hidden">
                                    {form.avatar ? (
                                        <img src={form.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-4xl font-bold text-red-400 font-mono">
                                            {form.displayName?.charAt(0)?.toUpperCase() || '?'}
                                        </span>
                                    )}
                                </div>
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-[10px] text-white font-mono tracking-wider">EDIT URL</span>
                                </div>
                            </div>

                            <div className="w-full">
                                <label className="text-[9px] text-gray-500 font-mono mb-1.5 block tracking-wider text-left">AVATAR URL</label>
                                <input
                                    type="text"
                                    value={form.avatar}
                                    onChange={(e) => updateField('avatar', e.target.value)}
                                    placeholder="https://..."
                                    className="w-full bg-black border border-red-500/[0.1] px-3 py-2 text-white font-mono placeholder-gray-800 focus:outline-none focus:border-red-500/30 text-[10px]"
                                />
                            </div>
                        </div>

                        <div className="bg-[#0d0d0d] border border-red-500/[0.08] p-4 text-center">
                            <div className="text-[9px] text-gray-500 font-mono tracking-wider mb-1">CONNECTED WALLET</div>
                            <div className="text-xs text-red-400 font-mono break-all">{account.address}</div>
                        </div>
                    </motion.div>

                    {/* Right Column: Editing Fields */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="md:col-span-2 space-y-6">

                        <div className="bg-[#0d0d0d] border border-red-500/[0.08] p-6 space-y-5">
                            <div>
                                <label className="text-[10px] text-gray-500 font-mono mb-2 block tracking-wider">DISPLAY NAME *</label>
                                <input
                                    type="text"
                                    value={form.displayName}
                                    onChange={(e) => updateField('displayName', e.target.value)}
                                    placeholder="Your alias"
                                    className="w-full bg-black border border-red-500/[0.1] px-4 py-3 text-white font-mono placeholder-gray-800 focus:outline-none focus:border-red-500/30 text-sm"
                                    maxLength={30}
                                />
                                {!form.displayName.trim() && <span className="text-[9px] text-red-500 font-mono mt-1 block">Name is required</span>}
                            </div>

                            <div>
                                <label className="text-[10px] text-gray-500 font-mono mb-2 block tracking-wider">BIO</label>
                                <textarea
                                    value={form.bio}
                                    onChange={(e) => updateField('bio', e.target.value)}
                                    placeholder="Tell the DAO about your skills and interests..."
                                    rows={4}
                                    className="w-full bg-black border border-red-500/[0.1] px-4 py-3 text-white font-mono placeholder-gray-800 focus:outline-none focus:border-red-500/30 text-sm resize-none"
                                />
                            </div>
                        </div>

                        <div className="bg-[#0d0d0d] border border-red-500/[0.08] p-6">
                            <h3 className="text-[10px] text-white font-mono tracking-[0.15em] uppercase font-bold mb-5 flex items-center gap-2">
                                <LinkIcon className="w-3.5 h-3.5 text-red-500" /> SOCIAL LINKS
                            </h3>

                            <div className="space-y-4">
                                <div className="flex bg-black border border-red-500/[0.1] focus-within:border-red-500/30 transition-colors">
                                    <div className="flex items-center justify-center w-12 border-r border-red-500/[0.1]">
                                        <Twitter className="w-4 h-4 text-gray-500" />
                                    </div>
                                    <input
                                        type="text"
                                        value={form.twitter}
                                        onChange={(e) => updateField('twitter', e.target.value)}
                                        placeholder="Username (without @)"
                                        className="flex-1 bg-transparent px-3 py-2.5 text-white font-mono placeholder-gray-800 focus:outline-none text-xs"
                                    />
                                </div>

                                <div className="flex bg-black border border-red-500/[0.1] focus-within:border-red-500/30 transition-colors">
                                    <div className="flex items-center justify-center w-12 border-r border-red-500/[0.1]">
                                        <Github className="w-4 h-4 text-gray-500" />
                                    </div>
                                    <input
                                        type="text"
                                        value={form.github}
                                        onChange={(e) => updateField('github', e.target.value)}
                                        placeholder="GitHub username"
                                        className="flex-1 bg-transparent px-3 py-2.5 text-white font-mono placeholder-gray-800 focus:outline-none text-xs"
                                    />
                                </div>

                                <div className="flex bg-black border border-red-500/[0.1] focus-within:border-red-500/30 transition-colors">
                                    <div className="flex items-center justify-center w-12 border-r border-red-500/[0.1]">
                                        <Linkedin className="w-4 h-4 text-gray-500" />
                                    </div>
                                    <input
                                        type="text"
                                        value={form.linkedin}
                                        onChange={(e) => updateField('linkedin', e.target.value)}
                                        placeholder="LinkedIn username"
                                        className="flex-1 bg-transparent px-3 py-2.5 text-white font-mono placeholder-gray-800 focus:outline-none text-xs"
                                    />
                                </div>

                                <div className="flex bg-black border border-red-500/[0.1] focus-within:border-red-500/30 transition-colors">
                                    <div className="flex items-center justify-center w-12 border-r border-red-500/[0.1]">
                                        <Globe className="w-4 h-4 text-gray-500" />
                                    </div>
                                    <input
                                        type="text"
                                        value={form.website}
                                        onChange={(e) => updateField('website', e.target.value)}
                                        placeholder="https://your-website.com"
                                        className="flex-1 bg-transparent px-3 py-2.5 text-white font-mono placeholder-gray-800 focus:outline-none text-xs"
                                    />
                                </div>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </main>
        </div>
    );
}

'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useActiveAccount } from 'thirdweb/react';
import { MessageCircle, MessageSquarePlus, Users, Clock, ArrowRight, Plus, Terminal } from 'lucide-react';
import DaoNavbar from '../components/DaoNavbar';
import {
    seedIfNeeded,
    getForumTopics,
    getForumReplies,
    createForumTopic,
    addForumReply,
    getMember,
} from '@/lib/local-dao-store';
import type { ForumTopic, ForumReply } from '../types';

function formatTimeAgo(timestamp: number): string {
    const diff = Date.now() - timestamp;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
}

function displayNameFromAddress(address: string | undefined, fallback?: string) {
    if (fallback) return fallback;
    if (!address) return 'Unknown';
    return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export default function ForumPage() {
    const account = useActiveAccount();
    const [topics, setTopics] = useState<ForumTopic[]>([]);
    const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
    const [replies, setReplies] = useState<ForumReply[]>([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [replying, setReplying] = useState(false);

    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [replyContent, setReplyContent] = useState('');

    useEffect(() => {
        seedIfNeeded();
        const all = getForumTopics();
        setTopics(all);
        if (all.length > 0) {
            const firstId = all[0].id;
            setSelectedTopicId(firstId);
            setReplies(getForumReplies(firstId));
        }
        setLoading(false);
    }, []);

    const selectedTopic = useMemo(
        () => topics.find(t => t.id === selectedTopicId) || null,
        [topics, selectedTopicId],
    );

    const canPost = Boolean(account);

    function handleSelectTopic(id: string) {
        setSelectedTopicId(id);
        setReplies(getForumReplies(id));
        setReplyContent('');
    }

    async function handleCreateTopic(e: React.FormEvent) {
        e.preventDefault();
        if (!canPost || !account) return;
        if (!newTitle.trim() || !newContent.trim()) return;
        setCreating(true);
        try {
            const member = getMember(account.address || '');
            const topic = createForumTopic({
                title: newTitle.trim(),
                content: newContent.trim(),
                author: account.address || '',
                authorName: member?.displayName,
            });
            const updated = getForumTopics();
            setTopics(updated);
            setNewTitle('');
            setNewContent('');
            setSelectedTopicId(topic.id);
            setReplies([]);
        } finally {
            setCreating(false);
        }
    }

    async function handleAddReply(e: React.FormEvent) {
        e.preventDefault();
        if (!canPost || !account || !selectedTopic) return;
        if (!replyContent.trim()) return;
        setReplying(true);
        try {
            const member = getMember(account.address || '');
            addForumReply(selectedTopic.id, account.address || '', member?.displayName, replyContent.trim());
            setReplies(getForumReplies(selectedTopic.id));
            setTopics(getForumTopics());
            setReplyContent('');
        } finally {
            setReplying(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#060608]">
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/[0.03] rounded-full blur-[150px]" />
            </div>

            <DaoNavbar />

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8">
                {/* Header — matches DAO style */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <div>
                            <div className="text-[10px] text-red-500/60 font-mono tracking-[0.3em] uppercase mb-1">// COMMUNITY FORUM</div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-mono">DISCUSSION</h1>
                            <p className="text-gray-600 mt-1 text-xs font-mono">
                                {topics.length} topics · Structured debate before on-chain voting
                            </p>
                        </div>
                        {!canPost && (
                            <p className="text-[10px] text-gray-600 font-mono tracking-wider">
                                CONNECT WALLET TO POST
                            </p>
                        )}
                    </div>
                </motion.div>

                {/* Stats bar */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-6 mb-6 py-3 px-5 bg-[#0d0d0d] border border-red-500/[0.06]"
                >
                    <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-red-500" />
                        <span className="text-[10px] text-gray-500 font-mono tracking-wider uppercase">TOPICS</span>
                        <span className="text-xs text-white font-mono font-bold">{topics.length}</span>
                    </div>
                    <div className="h-4 border-l border-red-500/[0.1]" />
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-500 font-mono tracking-wider uppercase">REPLIES</span>
                        <span className="text-xs text-red-400 font-mono font-bold">
                            {topics.reduce((sum, t) => sum + t.repliesCount, 0)}
                        </span>
                    </div>
                    <div className="h-4 border-l border-red-500/[0.1]" />
                    <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-gray-600" />
                        <span className="text-[10px] text-gray-500 font-mono tracking-wider uppercase">MEMBERS ONLY</span>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
                    {/* Topics list */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="lg:col-span-1 bg-[#0d0d0d] border border-red-500/[0.08] max-h-[32rem] overflow-y-auto"
                    >
                        <div className="px-5 py-3 border-b border-red-500/[0.06]">
                            <h2 className="text-[10px] font-mono text-white tracking-[0.15em] uppercase font-bold flex items-center gap-2">
                                <MessageCircle className="w-3.5 h-3.5 text-red-500" />
                                TOPICS
                            </h2>
                        </div>

                        {loading ? (
                            <div className="p-4 space-y-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-16 bg-white/[0.02] border border-red-500/[0.06] animate-pulse" />
                                ))}
                            </div>
                        ) : topics.length === 0 ? (
                            <div className="text-center py-10 text-gray-700 text-xs font-mono">
                                No topics yet
                            </div>
                        ) : (
                            <div className="divide-y divide-red-500/[0.04]">
                                {topics.map(topic => {
                                    const isActive = topic.id === selectedTopicId;
                                    return (
                                        <button
                                            key={topic.id}
                                            onClick={() => handleSelectTopic(topic.id)}
                                            className={`w-full text-left px-4 py-3 text-xs font-mono transition-colors ${isActive
                                                ? 'bg-red-500/[0.06] border-l-2 border-l-red-500'
                                                : 'hover:bg-red-500/[0.03] border-l-2 border-l-transparent'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between gap-2 mb-1">
                                                <span className="font-semibold text-white">{topic.title}</span>
                                                <span className="text-[9px] text-gray-600 flex items-center gap-1 shrink-0">
                                                    <Clock className="w-2.5 h-2.5" />
                                                    {formatTimeAgo(topic.lastActivityAt)}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="text-[10px] text-gray-600 truncate">
                                                    {displayNameFromAddress(topic.author, topic.authorName)}
                                                </span>
                                                <span className="text-[10px] text-gray-500 flex items-center gap-1 shrink-0">
                                                    <MessageCircle className="w-2.5 h-2.5" />
                                                    {topic.repliesCount}
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </motion.section>

                    {/* Topic detail + replies */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2 space-y-4"
                    >
                        <div className="bg-[#0d0d0d] border border-red-500/[0.08] min-h-[16rem]">
                            {selectedTopic ? (
                                <>
                                    {/* Topic header */}
                                    <div className="px-5 py-4 border-b border-red-500/[0.06]">
                                        <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wide mb-1">
                                            {selectedTopic.title}
                                        </h2>
                                        <p className="text-[10px] text-gray-600 font-mono">
                                            by <span className="text-gray-400">{displayNameFromAddress(selectedTopic.author, selectedTopic.authorName)}</span>
                                            {' '}· {formatTimeAgo(selectedTopic.createdAt)}
                                            {' '}· <MessageCircle className="w-2.5 h-2.5 inline" /> {selectedTopic.repliesCount} replies
                                        </p>
                                    </div>

                                    {/* Topic content */}
                                    <div className="px-5 py-4">
                                        <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-wrap font-mono">
                                            {selectedTopic.content}
                                        </p>
                                    </div>

                                    {/* Replies */}
                                    <div className="border-t border-red-500/[0.06]">
                                        <div className="px-5 py-3 border-b border-red-500/[0.04]">
                                            <h3 className="text-[10px] text-white font-mono tracking-[0.15em] uppercase font-bold flex items-center gap-2">
                                                <MessageCircle className="w-3 h-3 text-red-500" />
                                                THREAD ({replies.length})
                                            </h3>
                                        </div>
                                        {replies.length === 0 ? (
                                            <p className="text-[10px] text-gray-700 font-mono px-5 py-6 text-center">
                                                No replies yet — start the conversation
                                            </p>
                                        ) : (
                                            <div className="divide-y divide-red-500/[0.04] max-h-72 overflow-y-auto">
                                                {replies.map(r => (
                                                    <div key={r.id} className="px-5 py-3 hover:bg-red-500/[0.02] transition-colors">
                                                        <div className="flex items-center justify-between mb-1.5">
                                                            <span className="font-mono text-[10px] text-gray-400 font-medium">
                                                                {displayNameFromAddress(r.author, r.authorName)}
                                                            </span>
                                                            <span className="text-[9px] text-gray-700 font-mono">
                                                                {formatTimeAgo(r.createdAt)}
                                                            </span>
                                                        </div>
                                                        <p className="text-[11px] text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
                                                            {r.content}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                                    <MessageCircle className="w-8 h-8 mb-3 text-gray-800" />
                                    <p className="text-gray-700 font-mono text-xs">Select a topic or create one below</p>
                                </div>
                            )}
                        </div>

                        {/* Reply composer */}
                        {selectedTopic && (
                            <div className="bg-[#0d0d0d] border border-red-500/[0.08] p-5">
                                <h3 className="text-[10px] text-white font-mono tracking-[0.15em] uppercase font-bold flex items-center gap-2 mb-3">
                                    <MessageSquarePlus className="w-3.5 h-3.5 text-red-500" />
                                    REPLY
                                    {!canPost && <span className="text-gray-600 font-normal ml-2">· connect wallet</span>}
                                </h3>
                                <form onSubmit={handleAddReply} className="space-y-3">
                                    <textarea
                                        value={replyContent}
                                        onChange={e => setReplyContent(e.target.value)}
                                        placeholder="Share your perspective..."
                                        disabled={!canPost}
                                        className="w-full bg-[#111] border border-red-500/[0.1] text-xs text-gray-100 font-mono p-3 min-h-[80px] focus:outline-none focus:border-red-500/30 disabled:opacity-40 placeholder:text-gray-700 transition-colors"
                                    />
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={!canPost || !replyContent.trim() || replying}
                                            className="inline-flex items-center gap-2 px-4 py-2.5 border border-red-500/40 bg-red-500/[0.06] text-red-400 font-mono text-xs font-bold tracking-wider uppercase hover:bg-red-500/15 disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.98] transition-all"
                                        >
                                            <ArrowRight className="w-3 h-3" />
                                            POST REPLY
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </motion.section>
                </div>

                {/* New topic composer */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="mt-6 bg-[#0d0d0d] border border-red-500/[0.08] p-5"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[10px] text-white font-mono tracking-[0.15em] uppercase font-bold flex items-center gap-2">
                            <Plus className="w-3.5 h-3.5 text-red-500" />
                            OPEN NEW TOPIC
                        </h3>
                        {!canPost && (
                            <span className="text-[9px] text-gray-600 font-mono tracking-wider">
                                WALLET REQUIRED
                            </span>
                        )}
                    </div>

                    <form onSubmit={handleCreateTopic} className="space-y-3">
                        <input
                            type="text"
                            value={newTitle}
                            onChange={e => setNewTitle(e.target.value)}
                            placeholder="Topic title..."
                            className="w-full bg-[#111] border border-red-500/[0.1] text-xs text-gray-100 font-mono px-4 py-3 focus:outline-none focus:border-red-500/30 placeholder:text-gray-700 transition-colors"
                            disabled={!canPost}
                        />
                        <textarea
                            value={newContent}
                            onChange={e => setNewContent(e.target.value)}
                            placeholder="Describe the topic in detail so other members can respond thoughtfully..."
                            className="w-full bg-[#111] border border-red-500/[0.1] text-xs text-gray-100 font-mono px-4 py-3 min-h-[120px] focus:outline-none focus:border-red-500/30 placeholder:text-gray-700 transition-colors"
                            disabled={!canPost}
                        />
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={!canPost || !newTitle.trim() || !newContent.trim() || creating}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold tracking-wider uppercase disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.98] transition-all"
                            >
                                <MessageCircle className="w-3.5 h-3.5" />
                                PUBLISH TOPIC
                            </button>
                        </div>
                    </form>
                </motion.section>
            </main>
        </div>
    );
}

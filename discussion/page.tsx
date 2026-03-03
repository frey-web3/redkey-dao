'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useActiveAccount } from 'thirdweb/react';
import { MessageCircle, MessageSquarePlus, Users, Clock, ArrowRight, Plus } from 'lucide-react';
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
            </div>

            <DaoNavbar />

            <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-16">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
                    <div className="text-[10px] text-red-500/60 font-mono tracking-[0.3em] uppercase mb-3">// COMMUNITY DISCUSSION</div>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                                RedKey DAO <span className="text-red-500">Discussion</span>
                            </h1>
                            <p className="mt-3 text-sm text-gray-400 max-w-xl">
                                Asynchronous discussion space for members to open topics, debate proposals, and align before on-chain voting.
                                Real-time chat will ship in a later phase — this is where structured topics live today.
                            </p>
                        </div>
                        {!canPost && (
                            <p className="text-[11px] text-gray-500 font-mono max-w-xs">
                                Connect your wallet in the top-right to start new topics and reply. Browsing is open to everyone.
                            </p>
                        )}
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    {/* Topics list */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-1 bg-[#0d0d0d] border border-red-500/[0.08] p-4 md:p-5 max-h-[32rem] overflow-y-auto"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-xs font-mono text-white tracking-[0.15em] uppercase font-bold flex items-center gap-2">
                                <MessageCircle className="w-4 h-4 text-red-500" />
                                Topics
                            </h2>
                            <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                                <Users className="w-3 h-3" />
                                <span>Member discussions</span>
                            </div>
                        </div>

                        {loading ? (
                            <div className="space-y-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-16 bg-white/[0.02] border border-red-500/[0.06] animate-pulse rounded-sm" />
                                ))}
                            </div>
                        ) : topics.length === 0 ? (
                            <div className="text-center py-10 text-gray-600 text-sm font-mono">
                                No topics yet. Be the first to open a discussion.
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {topics.map(topic => {
                                    const isActive = topic.id === selectedTopicId;
                                    return (
                                        <button
                                            key={topic.id}
                                            onClick={() => handleSelectTopic(topic.id)}
                                            className={`w-full text-left px-3 py-3 border text-xs font-mono transition-colors ${isActive
                                                ? 'border-red-500/60 bg-red-500/5 text-red-100'
                                                : 'border-red-500/[0.08] bg-[#060608] text-gray-300 hover:border-red-500/40 hover:bg-red-500/5'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between gap-2 mb-1.5">
                                                <span className="font-semibold truncate">{topic.title}</span>
                                                <span className="text-[10px] text-gray-500 flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {formatTimeAgo(topic.lastActivityAt)}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="text-[10px] text-gray-500 truncate">
                                                    by {displayNameFromAddress(topic.author, topic.authorName)}
                                                </span>
                                                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                                                    <MessageCircle className="w-3 h-3" />
                                                    {topic.repliesCount} replies
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
                        transition={{ delay: 0.15 }}
                        className="lg:col-span-2 space-y-4"
                    >
                        <div className="bg-[#0d0d0d] border border-red-500/[0.08] p-5 md:p-6 min-h-[16rem]">
                            {selectedTopic ? (
                                <>
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <div>
                                            <h2 className="text-lg md:text-xl font-bold text-white font-mono uppercase tracking-tight mb-1">
                                                {selectedTopic.title}
                                            </h2>
                                            <p className="text-[11px] text-gray-500 font-mono">
                                                Opened by{' '}
                                                <span className="text-gray-200">
                                                    {displayNameFromAddress(
                                                        selectedTopic.author,
                                                        selectedTopic.authorName,
                                                    )}
                                                </span>{' '}
                                                · {formatTimeAgo(selectedTopic.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-200 leading-relaxed mb-6 whitespace-pre-wrap">
                                        {selectedTopic.content}
                                    </p>

                                    <div className="border-t border-red-500/[0.08] pt-4 mt-2">
                                        <h3 className="text-[11px] text-gray-400 font-mono tracking-[0.18em] uppercase mb-3 flex items-center gap-2">
                                            <MessageCircle className="w-3.5 h-3.5 text-red-500" />
                                            Thread Replies
                                        </h3>
                                        {replies.length === 0 ? (
                                            <p className="text-[11px] text-gray-600 font-mono">
                                                No replies yet. Start the conversation.
                                            </p>
                                        ) : (
                                            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                                                {replies.map(r => (
                                                    <div
                                                        key={r.id}
                                                        className="border border-red-500/[0.08] bg-[#060608] p-3 text-xs text-gray-200"
                                                    >
                                                        <div className="flex items-center justify-between mb-1.5">
                                                            <span className="font-mono text-[11px] text-gray-300">
                                                                {displayNameFromAddress(r.author, r.authorName)}
                                                            </span>
                                                            <span className="text-[10px] text-gray-600">
                                                                {formatTimeAgo(r.createdAt)}
                                                            </span>
                                                        </div>
                                                        <p className="text-[11px] text-gray-200 whitespace-pre-wrap">
                                                            {r.content}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center py-10 text-gray-600 text-sm font-mono">
                                    <MessageCircle className="w-8 h-8 mb-3 text-red-500" />
                                    <p>Select a topic from the left, or create a new one.</p>
                                </div>
                            )}
                        </div>

                        {/* Reply composer */}
                        <div className="bg-[#0d0d0d] border border-red-500/[0.08] p-4 md:p-5">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-[11px] text-gray-300 font-mono tracking-[0.18em] uppercase flex items-center gap-2">
                                    <MessageSquarePlus className="w-3.5 h-3.5 text-red-500" />
                                    Reply
                                </h3>
                                {!canPost && (
                                    <span className="text-[10px] text-gray-500 font-mono">
                                        Connect wallet to reply
                                    </span>
                                )}
                            </div>
                            <form onSubmit={handleAddReply} className="space-y-3">
                                <textarea
                                    value={replyContent}
                                    onChange={e => setReplyContent(e.target.value)}
                                    placeholder={
                                        selectedTopic
                                            ? 'Share your perspective, ask a question, or propose next steps...'
                                            : 'Select a topic first.'
                                    }
                                    disabled={!canPost || !selectedTopic}
                                    className="w-full bg-black/40 border border-red-500/[0.15] text-xs text-gray-100 font-mono p-3 min-h-[80px] focus:outline-none focus:border-red-500/60 disabled:opacity-40"
                                />
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={!canPost || !selectedTopic || !replyContent.trim() || replying}
                                        className="inline-flex items-center gap-2 px-4 py-2 border border-red-500/40 bg-red-500/[0.08] text-[11px] text-red-300 font-mono tracking-[0.18em] uppercase disabled:opacity-40 hover:bg-red-500/[0.16] transition-all"
                                    >
                                        <ArrowRight className="w-3 h-3" />
                                        Post Reply
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.section>
                </div>

                {/* New topic composer */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-8 bg-[#0d0d0d] border border-red-500/[0.12] p-5 md:p-6"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 border border-red-500/40 bg-red-500/10 flex items-center justify-center">
                                <Plus className="w-4 h-4 text-red-500" />
                            </div>
                            <div>
                                <h3 className="text-sm text-white font-mono uppercase tracking-[0.18em]">
                                    Open New Topic
                                </h3>
                                <p className="text-[11px] text-gray-500">
                                    Use the discussion board for structured interaction. Quick, synchronous chat will be added later.
                                </p>
                            </div>
                        </div>
                        {!canPost && (
                            <span className="text-[10px] text-gray-500 font-mono">
                                Wallet connection required to create topics
                            </span>
                        )}
                    </div>

                    <form onSubmit={handleCreateTopic} className="space-y-3">
                        <input
                            type="text"
                            value={newTitle}
                            onChange={e => setNewTitle(e.target.value)}
                            placeholder="Proposal pre-discussion, risk question, or governance idea title"
                            className="w-full bg-black/40 border border-red-500/[0.15] text-xs text-gray-100 font-mono px-3 py-2.5 focus:outline-none focus:border-red-500/60"
                            disabled={!canPost}
                        />
                        <textarea
                            value={newContent}
                            onChange={e => setNewContent(e.target.value)}
                            placeholder="Describe the topic in detail so other members can respond thoughtfully."
                            className="w-full bg-black/40 border border-red-500/[0.15] text-xs text-gray-100 font-mono px-3 py-2.5 min-h-[120px] focus:outline-none focus:border-red-500/60"
                            disabled={!canPost}
                        />
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={!canPost || !newTitle.trim() || !newContent.trim() || creating}
                                className="inline-flex items-center gap-2 px-5 py-2.5 border border-red-500/60 bg-red-600 text-[11px] text-white font-mono tracking-[0.18em] uppercase hover:bg-red-500 disabled:opacity-40 transition-all"
                            >
                                <MessageCircle className="w-3.5 h-3.5" />
                                Publish Topic
                            </button>
                        </div>
                    </form>
                </motion.section>
            </main>
        </div>
    );
}


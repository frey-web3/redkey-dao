'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface NewsArticle {
    id: string;
    title: string;
    body: string;
    imageUrl: string;
    url: string;
    source: string;
    publishedAt: number;
    categories: string;
}

function timeAgo(ms: number): string {
    const diff = Date.now() - ms;
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h`;
    return `${Math.floor(hrs / 24)}d`;
}

export default function AvaxNewsSection() {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await fetch('/api/avax-news');
                if (!res.ok) throw new Error('Failed');
                const data = await res.json();
                setArticles(data.articles || []);
            } catch {
                // silently fail
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    if (!loading && articles.length === 0) return null;

    return (
        <div>
            <div className="flex items-center justify-between mb-4 border-b border-red-500/[0.08] pb-2">
                <h2 className="text-xs text-white font-mono tracking-[0.15em] uppercase font-bold flex items-center gap-2">
                    <Newspaper className="w-3.5 h-3.5 text-red-500" /> LATEST NEWS
                </h2>
            </div>

            <div className="flex flex-col gap-3">
                {loading
                    ? [...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="p-4 bg-[#0d0d0d] border border-red-500/[0.06] animate-pulse"
                            style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)' }}
                        >
                            <div className="h-3 bg-[#1a1a1a] rounded w-3/4 mb-2" />
                            <div className="h-2 bg-[#1a1a1a] rounded w-1/4" />
                        </div>
                    ))
                    : articles.map((article, idx) => (
                        <Link
                            key={article.id}
                            href={`/dao/news/${article.id}`}
                            className="block group"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 * idx }}
                                className="relative bg-[#0d0d0d] border border-red-500/[0.08] overflow-hidden transition-all hover:border-red-500/25"
                                style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)' }}
                            >
                                {/* Top accent bar */}
                                <div className="h-[1px] bg-gradient-to-r from-red-600/40 via-red-500/20 to-transparent" />

                                <div className="p-4">
                                    <div className="flex justify-between items-start gap-4">
                                        <h3 className="text-sm font-medium text-white leading-snug group-hover:text-red-400 transition-colors">
                                            {article.title}
                                        </h3>
                                        <ExternalLink className="w-3.5 h-3.5 text-gray-500 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="flex items-center gap-3 mt-3 text-xs">
                                        <span className="text-[9px] text-red-400 font-mono font-bold px-1.5 py-0.5 bg-red-500/10 border border-red-500/20">
                                            {article.source}
                                        </span>
                                        <span className="text-[10px] text-gray-500 font-mono">
                                            {timeAgo(article.publishedAt)}
                                        </span>
                                    </div>
                                </div>

                                {/* Corner cut accent */}
                                <div className="absolute top-0 right-0 w-3 h-3">
                                    <div className="absolute top-[1px] right-[12px] w-[1px] h-2 bg-red-500/30" />
                                    <div className="absolute top-[12px] right-[1px] w-2 h-[1px] bg-red-500/30" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
            </div>
        </div>
    );
}

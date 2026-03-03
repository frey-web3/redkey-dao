'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
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
    const scrollRef = useRef<HTMLDivElement>(null);

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

    const scroll = (dir: 'left' | 'right') => {
        if (!scrollRef.current) return;
        const cardWidth = 320;
        scrollRef.current.scrollBy({
            left: dir === 'left' ? -cardWidth : cardWidth,
            behavior: 'smooth',
        });
    };

    if (!loading && articles.length === 0) return null;

    return (
        <div>
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-mono text-white tracking-[0.15em] uppercase font-bold flex items-center gap-2">
                    <Newspaper className="w-3.5 h-3.5 text-red-500" /> AVAX NEWS
                </h2>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => scroll('left')}
                        className="p-1.5 text-gray-600 hover:text-red-400 transition-colors border border-red-500/[0.08] bg-[#0d0d0d] hover:bg-red-500/5"
                    >
                        <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="p-1.5 text-gray-600 hover:text-red-400 transition-colors border border-red-500/[0.08] bg-[#0d0d0d] hover:bg-red-500/5"
                    >
                        <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {loading
                    ? [...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="min-w-[280px] lg:min-w-0 lg:w-[calc(25%-9px)] shrink-0 h-56 bg-[#0d0d0d] border border-red-500/[0.06] animate-pulse snap-start"
                        />
                    ))
                    : articles.map((article, idx) => (
                        <Link
                            key={article.id}
                            href={`/dao/news/${article.id}`}
                            className="min-w-[280px] lg:min-w-0 lg:w-[calc(25%-9px)] shrink-0 snap-start group"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 * idx }}
                                className="bg-[#0d0d0d] border border-red-500/[0.06] hover:border-red-500/[0.15] transition-all h-full flex flex-col overflow-hidden"
                            >
                                {/* Image */}
                                <div className="relative h-28 bg-[#111] overflow-hidden shrink-0">
                                    {article.imageUrl && (
                                        <img
                                            src={article.imageUrl}
                                            alt={article.title}
                                            className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-300"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
                                    <div className="absolute bottom-2 left-3 flex items-center gap-2">
                                        <span className="text-[8px] text-red-400 font-mono font-bold px-1.5 py-0.5 bg-red-500/10 border border-red-500/20">
                                            {article.source}
                                        </span>
                                        <span className="text-[8px] text-gray-500 font-mono">
                                            {timeAgo(article.publishedAt)}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-3 flex-1 flex flex-col">
                                    <h3 className="text-[11px] text-white font-medium leading-snug line-clamp-2 group-hover:text-red-300 transition-colors">
                                        {article.title}
                                    </h3>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
            </div>
        </div>
    );
}

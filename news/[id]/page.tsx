'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Loader2 } from 'lucide-react';
import DaoNavbar from '../../components/DaoNavbar';

interface NewsArticle {
    id: string;
    title: string;
    body: string;
    imageUrl: string;
    url: string;
    source: string;
    publishedAt: number;
}

export default function NewsDetailPage() {
    const params = useParams();
    const newsId = params?.id as string;
    const [article, setArticle] = useState<NewsArticle | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await fetch('/api/avax-news');
                if (!res.ok) throw new Error('Failed');
                const data = await res.json();
                const found = data.articles?.find((a: NewsArticle) => String(a.id) === String(newsId));
                setArticle(found || null);
            } catch {
                // silently fail
            } finally {
                setLoading(false);
            }
        };
        fetchArticle();
    }, [newsId]);

    return (
        <div className="min-h-screen bg-[#060608]">
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-red-600/[0.03] rounded-full blur-[150px]" />
            </div>

            <DaoNavbar />

            <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8">
                <Link
                    href="/dao/dashboard"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-red-400 transition-colors text-[10px] font-mono tracking-wider uppercase mb-6"
                >
                    <ArrowLeft className="w-3.5 h-3.5" /> BACK TO DASHBOARD
                </Link>

                {loading && (
                    <div className="text-center py-20 bg-[#0d0d0d] border border-red-500/[0.06]">
                        <Loader2 className="w-8 h-8 text-red-500/40 mx-auto mb-4 animate-spin" />
                        <p className="text-gray-600 font-mono text-xs">Loading article...</p>
                    </div>
                )}

                {!loading && !article && (
                    <div className="text-center py-20 bg-[#0d0d0d] border border-red-500/[0.06]">
                        <p className="text-gray-600 font-mono text-xs">Article not found</p>
                    </div>
                )}

                {!loading && article && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="bg-[#0d0d0d] border border-red-500/[0.08] overflow-hidden">
                            <div className="h-[1px] bg-gradient-to-r from-red-600/40 via-red-500/20 to-transparent" />
                            <div className="p-6 md:p-8">
                                {/* Meta */}
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-[9px] text-red-400 font-mono font-bold px-2 py-1 bg-red-500/10 border border-red-500/20 tracking-[0.1em] uppercase">
                                        {article.source}
                                    </span>
                                    <span className="text-[10px] text-gray-600 font-mono">
                                        {new Date(article.publishedAt).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </span>
                                </div>

                                {/* Title */}
                                <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-8">
                                    {article.title}
                                </h1>

                                {/* Body */}
                                <div className="text-sm text-gray-300 leading-relaxed font-mono whitespace-pre-wrap mb-10">
                                    {article.body || 'No content provided by the source feed.'}
                                </div>

                                {/* Source Link */}
                                <div className="border-t border-red-500/[0.06] pt-6">
                                    <a
                                        href={article.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-5 py-3 border border-red-500/30 bg-red-500/[0.06] text-red-400 font-mono text-xs font-bold tracking-wider uppercase hover:bg-red-500/15 active:scale-[0.98] transition-all cursor-pointer"
                                    >
                                        <ExternalLink className="w-3.5 h-3.5" /> READ ORIGINAL ARTICLE
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </main>
        </div>
    );
}

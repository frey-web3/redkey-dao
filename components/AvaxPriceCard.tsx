'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, YAxis, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, Mountain } from 'lucide-react';

interface AvaxData {
    price: number;
    change24h: number;
    marketCap: number;
    sparkline: { i: number; val: number }[];
}

const formatCompact = (n: number) => {
    if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
    if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
    return `$${n.toLocaleString()}`;
};

export default function AvaxPriceCard() {
    const [data, setData] = useState<AvaxData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchAvax = async () => {
            try {
                const res = await fetch(
                    'https://api.coingecko.com/api/v3/coins/avalanche-2?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true'
                );
                if (!res.ok) throw new Error('Failed to fetch');
                const json = await res.json();
                const md = json.market_data;
                setData({
                    price: md.current_price.usd,
                    change24h: md.price_change_percentage_24h,
                    marketCap: md.market_cap.usd,
                    sparkline: md.sparkline_7d.price.map((val: number, i: number) => ({ i, val })),
                });
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchAvax();
    }, []);

    const isPositive = (data?.change24h ?? 0) >= 0;
    const accentColor = isPositive ? '#22c55e' : '#ef4444';

    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-[#0d0d0d] border border-red-500/[0.08] p-5"
            >
                <h3 className="text-[10px] text-white font-mono tracking-[0.15em] uppercase font-bold flex items-center gap-2 mb-3">
                    <Mountain className="w-3.5 h-3.5 text-red-500" /> AVALANCHE
                </h3>
                <p className="text-[10px] text-gray-700 font-mono">Unable to load price data</p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#0d0d0d] border border-red-500/[0.08] p-5 overflow-hidden"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-[10px] text-white font-mono tracking-[0.15em] uppercase font-bold flex items-center gap-2">
                    <Mountain className="w-3.5 h-3.5 text-red-500" /> AVALANCHE
                </h3>
                <span className="text-[9px] text-gray-600 font-mono tracking-wider">AVAX / USD</span>
            </div>

            {loading ? (
                <div className="space-y-3 animate-pulse">
                    <div className="h-6 w-28 bg-white/[0.04] rounded" />
                    <div className="h-4 w-20 bg-white/[0.04] rounded" />
                    <div className="h-[100px] w-full bg-white/[0.04] rounded mt-2" />
                </div>
            ) : data && (
                <>
                    {/* Price & Change */}
                    <div className="flex items-end justify-between mb-1">
                        <div>
                            <div className="text-xl font-bold text-white font-mono tracking-tight">
                                ${data.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                        </div>
                        <div className={`flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-bold ${isPositive ? 'text-green-400 bg-green-500/10' : 'text-red-400 bg-red-500/10'}`}>
                            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {Math.abs(data.change24h).toFixed(2)}%
                        </div>
                    </div>

                    {/* Market Cap */}
                    <div className="flex items-center justify-between mb-3 border-b border-red-500/[0.04] pb-3">
                        <span className="text-[10px] text-gray-600 font-mono tracking-wider">MCAP</span>
                        <span className="text-[10px] text-gray-400 font-mono font-bold">{formatCompact(data.marketCap)}</span>
                    </div>

                    {/* 7-Day Chart */}
                    <div className="text-[9px] text-gray-600 font-mono tracking-wider mb-1.5">7D CHART</div>
                    <div className="h-[100px] -mx-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data.sparkline}>
                                <defs>
                                    <linearGradient id="avaxGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor={accentColor} stopOpacity={0.3} />
                                        <stop offset="100%" stopColor={accentColor} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <YAxis domain={['dataMin', 'dataMax']} hide />
                                <Tooltip
                                    contentStyle={{
                                        background: '#111',
                                        border: '1px solid rgba(239,68,68,0.15)',
                                        borderRadius: 0,
                                        fontSize: '10px',
                                        fontFamily: 'monospace',
                                        color: '#fff',
                                        padding: '4px 8px',
                                    }}
                                    labelFormatter={() => ''}
                                    formatter={(value: number) => [`$${value.toFixed(2)}`, 'AVAX']}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="val"
                                    stroke={accentColor}
                                    strokeWidth={1.5}
                                    fill="url(#avaxGradient)"
                                    dot={false}
                                    isAnimationActive={true}
                                    animationDuration={1000}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </>
            )}
        </motion.div>
    );
}

'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Vault, ScrollText, Users, Menu, X, Landmark, UserCircle, MessagesSquare, Key, Radar, ChevronDown, Briefcase } from 'lucide-react';
import { ConnectButton } from 'thirdweb/react';
import { avalanche } from 'thirdweb/chains';
import { thirdwebClient } from '@/lib/thirdweb';
import { wallets, NAV_ITEMS, MORE_NAV_ITEMS } from '../config';

const iconMap: Record<string, React.ElementType> = {
    LayoutDashboard,
    Vault,
    ScrollText,
    Landmark,
    Briefcase,
    Users,
    MessagesSquare,
    Radar,
};

export default function DaoNavbar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [moreOpen, setMoreOpen] = useState(false);
    const moreRef = useRef<HTMLDivElement>(null);

    // Close "More" dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
                setMoreOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const isMoreActive = MORE_NAV_ITEMS.some(
        (item) => pathname === item.href || pathname?.startsWith(`${item.href}/`)
    );

    return (
        <>
            <nav className="sticky top-0 z-50 border-b border-red-500/[0.08] bg-[#0a0a0a]/90 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/dao" className="flex items-center gap-3 group">
                            <div className="relative w-10 h-10">
                                <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800 rotate-45 rounded-lg shadow-lg shadow-red-600/30" />
                                <div className="absolute inset-[2px] bg-[#0a0a0a] rotate-45 rounded-[6px]" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Key className="w-5 h-5 text-red-500" strokeWidth={2.5} />
                                </div>
                            </div>
                            <div>
                                <span className="text-white font-bold text-base tracking-tight font-mono uppercase">
                                    Red<span className="text-red-500">Key</span>
                                </span>
                                <div className="text-[9px] text-red-500/60 font-mono tracking-[0.25em] uppercase -mt-0.5">
                                    DAO
                                </div>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-0.5">
                            {NAV_ITEMS.map((item) => {
                                const Icon = iconMap[item.icon];
                                const isActive = pathname === item.href || (pathname?.startsWith(`${item.href}/`));
                                const isSignal = item.label === 'Signal';
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`relative flex items-center gap-2 px-4 py-2 text-sm font-mono uppercase tracking-wider transition-all duration-200 ${isActive
                                            ? 'text-red-400'
                                            : 'text-gray-500 hover:text-white'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span className="text-xs">{item.label}</span>
                                        {isSignal && (
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                                            </span>
                                        )}
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-indicator"
                                                className="absolute bottom-0 left-2 right-2 h-[2px] bg-red-500"
                                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}

                            {/* More Dropdown */}
                            <div className="relative" ref={moreRef}>
                                <button
                                    onClick={() => setMoreOpen(!moreOpen)}
                                    className={`relative flex items-center gap-1.5 px-4 py-2 text-sm font-mono uppercase tracking-wider transition-all duration-200 ${isMoreActive ? 'text-red-400' : 'text-gray-500 hover:text-white'
                                        }`}
                                >
                                    <span className="text-xs">More</span>
                                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`} />
                                    {isMoreActive && (
                                        <motion.div
                                            layoutId="nav-indicator"
                                            className="absolute bottom-0 left-2 right-2 h-[2px] bg-red-500"
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </button>

                                <AnimatePresence>
                                    {moreOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -4 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute top-full right-0 mt-1 w-48 bg-[#111] border border-red-500/[0.12] shadow-xl shadow-black/50 z-50"
                                        >
                                            {MORE_NAV_ITEMS.map((item) => {
                                                const Icon = iconMap[item.icon];
                                                const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                                                return (
                                                    <Link
                                                        key={item.href}
                                                        href={item.href}
                                                        onClick={() => setMoreOpen(false)}
                                                        className={`flex items-center gap-3 px-4 py-3 text-xs font-mono uppercase tracking-wider transition-all ${isActive
                                                            ? 'text-red-400 bg-red-500/5'
                                                            : 'text-gray-500 hover:text-white hover:bg-white/[0.03]'
                                                            }`}
                                                    >
                                                        <Icon className="w-4 h-4" />
                                                        {item.label}
                                                    </Link>
                                                );
                                            })}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="flex items-center gap-3">
                            <ConnectButton
                                client={thirdwebClient}
                                chain={avalanche}
                                wallets={wallets}
                                connectButton={{
                                    label: '[ CONNECT ]',
                                    style: {
                                        background: 'transparent',
                                        color: '#ef4444',
                                        border: '1px solid rgba(239, 68, 68, 0.4)',
                                        borderRadius: '4px',
                                        padding: '8px 16px',
                                        fontSize: '11px',
                                        fontWeight: '700',
                                        fontFamily: 'monospace',
                                        letterSpacing: '0.1em',
                                        textTransform: 'uppercase' as const,
                                        cursor: 'pointer',
                                    },
                                }}
                                detailsButton={{
                                    style: {
                                        background: 'rgba(239, 68, 68, 0.08)',
                                        color: '#fca5a5',
                                        border: '1px solid rgba(239, 68, 68, 0.2)',
                                        borderRadius: '4px',
                                        padding: '8px 14px',
                                        fontSize: '11px',
                                        fontFamily: 'monospace',
                                    },
                                }}
                            />

                            <Link href="/dao/profile" className="hidden md:flex p-2 text-gray-500 hover:text-red-400 transition-colors border border-transparent hover:border-red-500/20 rounded bg-[#111] hover:bg-red-500/5">
                                <UserCircle className="w-5 h-5" />
                            </Link>

                            <button
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className="md:hidden p-2 text-gray-500 hover:text-red-400 transition-colors"
                            >
                                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>
                {/* Scan line effect */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden fixed top-16 left-0 right-0 z-40 border-b border-red-500/[0.08] bg-[#0a0a0a]/95 backdrop-blur-xl"
                    >
                        <div className="px-4 py-3 space-y-1">
                            {NAV_ITEMS.map((item) => {
                                const Icon = iconMap[item.icon];
                                const isActive = pathname === item.href || (pathname?.startsWith(`${item.href}/`));
                                const isSignal = item.label === 'Signal';
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 text-xs font-mono uppercase tracking-wider transition-all ${isActive
                                            ? 'text-red-400 border-l-2 border-red-500 bg-red-500/5'
                                            : 'text-gray-500 hover:text-white border-l-2 border-transparent'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {item.label}
                                        {isSignal && (
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}

                            {/* Separator */}
                            <div className="border-t border-red-500/[0.06] my-2" />
                            <div className="px-4 py-1">
                                <span className="text-[9px] text-gray-700 font-mono tracking-[0.2em] uppercase">More</span>
                            </div>

                            {MORE_NAV_ITEMS.map((item) => {
                                const Icon = iconMap[item.icon];
                                const isActive = pathname === item.href || (pathname?.startsWith(`${item.href}/`));
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 text-xs font-mono uppercase tracking-wider transition-all ${isActive
                                            ? 'text-red-400 border-l-2 border-red-500 bg-red-500/5'
                                            : 'text-gray-500 hover:text-white border-l-2 border-transparent'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {item.label}
                                    </Link>
                                );
                            })}

                            <Link
                                href="/dao/profile"
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 text-xs font-mono uppercase tracking-wider transition-all ${pathname === '/dao/profile'
                                    ? 'text-red-400 border-l-2 border-red-500 bg-red-500/5'
                                    : 'text-gray-500 hover:text-white border-l-2 border-transparent'
                                    }`}
                            >
                                <UserCircle className="w-4 h-4" />
                                Profile
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

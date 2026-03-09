import React from 'react';
import Link from 'next/link';
import { Key } from 'lucide-react';

export default function DaoFooter() {
    return (
        <footer className="border-t border-red-500/[0.08] bg-[#0a0a0a] py-8 mt-12 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="relative w-6 h-6">
                            <div className="absolute inset-0 bg-red-600 rotate-45 rounded shadow-[0_0_8px_rgba(220,38,38,0.3)]" />
                            <div className="absolute inset-[2px] bg-[#0a0a0a] rotate-45 rounded-[2px]" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Key className="w-3.5 h-3.5 text-red-500" strokeWidth={2.5} />
                            </div>
                        </div>
                        <span className="text-white font-bold text-sm tracking-tight font-mono uppercase">
                            Red<span className="text-red-500">Key</span> <span className="text-red-500/60 font-mono text-[9px] tracking-[0.2em]">DAO</span>
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs font-mono uppercase tracking-wider">
                        <Link href="/dao/docs" className="text-gray-500 hover:text-red-400 transition-colors">Documentation</Link>
                        <Link href="/dao/readme" className="text-gray-500 hover:text-red-400 transition-colors">Technical README</Link>
                        <Link href="/dao/litepaper" className="text-gray-500 hover:text-red-400 transition-colors">Litepaper</Link>
                        <Link href="/dao/pitch" className="text-gray-500 hover:text-red-400 transition-colors">MVP Pitch</Link>
                        <Link href="/dao/presentation" className="text-gray-500 hover:text-red-400 transition-colors font-bold text-gray-400">Presentation Deck</Link>
                    </div>

                    <div className="text-[10px] text-gray-600 font-mono tracking-wider">
                        &copy; {new Date().getFullYear()} RedKey DAO. All rights reserved.
                    </div>
                </div>
            </div>
            {/* Scan line effect */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
        </footer>
    );
}

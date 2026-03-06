'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useActiveAccount } from 'thirdweb/react';
import { Vault, ArrowUpRight, ArrowDownRight, Clock, Plus, ExternalLink } from 'lucide-react';
import DaoNavbar from '../components/DaoNavbar';
import TreasuryCard from '../components/TreasuryCard';
import { seedIfNeeded, getTreasury, getTransactions, addContribution, getMember } from '@/lib/local-dao-store';
import { getTreasuryContributions } from '@/libs/alchemy';
import { prepareTransaction, toWei, getContract, prepareContractCall, readContract } from "thirdweb";
import { useSendTransaction, useReadContract, useWalletBalance } from "thirdweb/react";
import { avalanche } from "thirdweb/chains";
import { thirdwebClient } from "@/lib/thirdweb";
import type { TreasurySummary, TreasuryTransaction, TransactionType } from '../types';

const TX_STYLE: Record<TransactionType, { icon: React.ElementType; color: string; sign: string }> = {
    deposit: { icon: ArrowDownRight, color: '#22c55e', sign: '+' },
    withdrawal: { icon: ArrowUpRight, color: '#ef4444', sign: '-' },
    allocation: { icon: ArrowUpRight, color: '#f59e0b', sign: '-' },
    return: { icon: ArrowDownRight, color: '#22c55e', sign: '+' },
    loan_disbursement: { icon: ArrowUpRight, color: '#06b6d4', sign: '-' },
    loan_repayment: { icon: ArrowDownRight, color: '#06b6d4', sign: '+' },
};

function formatDate(ts: number): string { return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
function formatTime(ts: number): string { return new Date(ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }); }

export default function TreasuryPage() {
    const account = useActiveAccount();
    const [treasury, setTreasury] = useState<TreasurySummary | null>(null);
    const [transactions, setTransactions] = useState<TreasuryTransaction[]>([]);
    const [showContribute, setShowContribute] = useState(false);
    const [contributeAmount, setContributeAmount] = useState('');
    const [filter, setFilter] = useState<'all' | TransactionType>('all');
    const [logTab, setLogTab] = useState<'demo' | 'onchain'>('demo');
    const [loading, setLoading] = useState(true);
    const [fetchingOnchain, setFetchingOnchain] = useState(false);
    const [onchainTransactions, setOnchainTransactions] = useState<any[]>([]);
    const [selectedToken, setSelectedToken] = useState<'USD' | 'USDC' | 'USDT' | 'AVAX'>('USD');
    const [avaxPrice, setAvaxPrice] = useState<number>(0);
    const { mutateAsync: sendTx, isPending: isSendingTx } = useSendTransaction();

    const TREASURY_ADDRESS = "0xF2ff40197C882d83c3A22f6A0b2655875eC103a3";
    const USDC_ADDRESS = "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E";
    const USDT_ADDRESS = "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7";

    // Prepare USDC Contract
    const usdcContract = getContract({
        client: thirdwebClient,
        chain: avalanche,
        address: USDC_ADDRESS,
    });

    // Prepare USDT Contract
    const usdtContract = getContract({
        client: thirdwebClient,
        chain: avalanche,
        address: USDT_ADDRESS,
    });

    // Use token based on selection
    const activeContract = selectedToken === 'USDC' ? usdcContract :
        selectedToken === 'USDT' ? usdtContract : undefined;

    // --- Balances ---
    const { data: avaxUserBalanceData } = useWalletBalance({
        client: thirdwebClient,
        chain: avalanche,
        address: account?.address || "0x0000000000000000000000000000000000000000"
    });

    const { data: avaxTreasuryBalanceData } = useWalletBalance({
        client: thirdwebClient,
        chain: avalanche,
        address: TREASURY_ADDRESS
    });

    const { data: usdcBalanceData } = useReadContract({
        contract: usdcContract,
        method: "function balanceOf(address account) view returns (uint256)",
        params: [account?.address || "0x0000000000000000000000000000000000000000"],
    });

    const { data: usdtBalanceData } = useReadContract({
        contract: usdtContract,
        method: "function balanceOf(address account) view returns (uint256)",
        params: [account?.address || "0x0000000000000000000000000000000000000000"],
    });

    const { data: treasuryUsdcBalanceData } = useReadContract({
        contract: usdcContract,
        method: "function balanceOf(address account) view returns (uint256)",
        params: [TREASURY_ADDRESS],
    });

    const { data: treasuryUsdtBalanceData } = useReadContract({
        contract: usdtContract,
        method: "function balanceOf(address account) view returns (uint256)",
        params: [TREASURY_ADDRESS],
    });

    const parsedUsdcBalance = usdcBalanceData ? Number(usdcBalanceData) / 1e6 : 0;
    const parsedUsdtBalance = usdtBalanceData ? Number(usdtBalanceData) / 1e6 : 0;
    const parsedAvaxBalance = avaxUserBalanceData ? Number(avaxUserBalanceData.displayValue) : 0;

    const parsedTreasuryUsdcBalance = treasuryUsdcBalanceData ? Number(treasuryUsdcBalanceData) / 1e6 : 0;
    const parsedTreasuryUsdtBalance = treasuryUsdtBalanceData ? Number(treasuryUsdtBalanceData) / 1e6 : 0;
    const parsedTreasuryAvaxBalance = avaxTreasuryBalanceData ? Number(avaxTreasuryBalanceData.displayValue) : 0;

    // Balance for active token UI
    const isOnchainToken = selectedToken === 'USDC' || selectedToken === 'USDT' || selectedToken === 'AVAX';
    const activeUserBalance = selectedToken === 'AVAX' ? parsedAvaxBalance :
        selectedToken === 'USDC' ? parsedUsdcBalance :
            selectedToken === 'USDT' ? parsedUsdtBalance : 0;

    const onchainUsdBalance = parsedTreasuryUsdcBalance + parsedTreasuryUsdtBalance + (parsedTreasuryAvaxBalance * avaxPrice);

    const reload = () => {
        setTreasury(getTreasury());
        setTransactions(getTransactions());
    };

    useEffect(() => {
        seedIfNeeded();
        reload();
        setLoading(false);

        // Fetch AVAX price
        fetch('https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=usd')
            .then(res => res.json())
            .then(data => setAvaxPrice(data['avalanche-2'].usd))
            .catch(console.error);

        fetchOnchainData();
    }, []);

    const fetchOnchainData = async () => {
        setFetchingOnchain(true);
        try {
            const data = await getTreasuryContributions(TREASURY_ADDRESS);
            setOnchainTransactions(data);
        } catch (e) {
            console.error("Failed to fetch onchain data", e);
        }
        setFetchingOnchain(false);
    };

    const handleContribute = () => {
        if (!account || !contributeAmount || Number(contributeAmount) <= 0) return;
        const member = getMember(account.address);
        addContribution(account.address, Number(contributeAmount), member ? `Contribution — ${member.displayName}` : 'Treasury contribution');
        setContributeAmount('');
        setShowContribute(false);
        reload();
    };

    const handleOnchainContribute = async () => {
        if (!account || !contributeAmount || Number(contributeAmount) <= 0) return;

        try {
            if (selectedToken === 'AVAX') {
                const tx = prepareTransaction({
                    to: TREASURY_ADDRESS,
                    chain: avalanche,
                    client: thirdwebClient,
                    value: toWei(contributeAmount.toString()),
                });
                await sendTx(tx);
            } else if (activeContract) {
                // Both USDC and USDT use 6 decimals on Avalanche
                const amountInMwei = BigInt(Math.floor(Number(contributeAmount) * 1e6));

                const tx = prepareContractCall({
                    contract: activeContract,
                    method: "function transfer(address to, uint256 amount) returns (bool)",
                    params: [TREASURY_ADDRESS, amountInMwei],
                });

                await sendTx(tx);
            }
            setContributeAmount('');
            setShowContribute(false);
            setTimeout(fetchOnchainData, 3000);
        } catch (error) {
            console.error("Transaction failed:", error);
        }
    };

    const filtered = filter === 'all' ? transactions : transactions.filter(tx => tx.type === filter);

    return (
        <div className="min-h-screen bg-[#060608]">
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>
            <DaoNavbar />
            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <div>
                            <div className="text-[10px] text-red-500/60 font-mono tracking-[0.3em] uppercase mb-1">// FINANCIAL CORE</div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-mono flex items-center gap-3"><Vault className="w-8 h-8 text-red-500" />TREASURY</h1>
                            <p className="text-gray-600 mt-1 text-xs font-mono">Fund overview & transaction history</p>
                        </div>
                        {account && (
                            <button onClick={() => setShowContribute(!showContribute)} className="inline-flex items-center gap-2 px-5 py-2.5 border border-emerald-500/40 bg-emerald-500/[0.06] text-emerald-400 font-mono text-xs font-bold tracking-wider uppercase hover:bg-emerald-500/15 active:scale-[0.98] transition-all">
                                <Plus className="w-3.5 h-3.5" />CONTRIBUTE
                            </button>
                        )}
                    </div>
                </motion.div>

                <div className="mb-8"><TreasuryCard treasury={loading ? null : treasury} loading={loading} onchainUsdBalance={onchainUsdBalance} /></div>

                {showContribute && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-8">
                        <div className="bg-[#0d0d0d] border border-emerald-500/20 p-6">
                            <h3 className="text-xs text-white font-mono tracking-[0.15em] uppercase font-bold mb-4">// CONTRIBUTE</h3>
                            <div className="flex items-center gap-2 mb-4">
                                <button
                                    onClick={() => setSelectedToken('USD')}
                                    className={`px-3 py-1.5 text-[10px] font-mono font-bold tracking-wider uppercase transition-all border ${selectedToken === 'USD' ? 'text-white border-emerald-500/50 bg-emerald-500/[0.1]' : 'text-gray-500 border-emerald-500/[0.06] hover:text-gray-300'}`}
                                >
                                    USD
                                </button>
                                <div className="w-px h-5 bg-gray-800 mx-1" />
                                <button
                                    onClick={() => setSelectedToken('USDC')}
                                    className={`px-3 py-1.5 text-[10px] font-mono font-bold tracking-wider uppercase transition-all border ${selectedToken === 'USDC' ? 'text-white border-blue-500/50 bg-blue-500/[0.1]' : 'text-gray-500 border-blue-500/[0.06] hover:text-gray-300'}`}
                                >
                                    USDC
                                </button>
                                <button
                                    onClick={() => setSelectedToken('USDT')}
                                    className={`px-3 py-1.5 text-[10px] font-mono font-bold tracking-wider uppercase transition-all border ${selectedToken === 'USDT' ? 'text-white border-green-500/50 bg-green-500/[0.1]' : 'text-gray-500 border-green-500/[0.06] hover:text-gray-300'}`}
                                >
                                    USDT
                                </button>
                                <button
                                    onClick={() => setSelectedToken('AVAX')}
                                    className={`px-3 py-1.5 text-[10px] font-mono font-bold tracking-wider uppercase transition-all border ${selectedToken === 'AVAX' ? 'text-white border-red-500/50 bg-red-500/[0.1]' : 'text-gray-500 border-red-500/[0.06] hover:text-gray-300'}`}
                                >
                                    AVAX
                                </button>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="text-[10px] text-gray-600 font-mono tracking-wider">AMOUNT</label>
                                        {isOnchainToken && (
                                            <span className="text-[10px] text-gray-500 font-mono tracking-wider">
                                                WALLET BALANCE: <span className="text-white">{activeUserBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })} {selectedToken}</span>
                                            </span>
                                        )}
                                    </div>
                                    <input type="number" value={contributeAmount} onChange={(e) => setContributeAmount(e.target.value)} placeholder="0.00" className="w-full bg-black border border-red-500/[0.1] px-4 py-3 text-white font-mono placeholder-gray-800 focus:outline-none focus:border-red-500/30 text-sm" />
                                </div>
                                <div className="flex items-end shrink-0">
                                    {selectedToken === 'USD' ? (
                                        <button onClick={handleContribute} disabled={!contributeAmount || Number(contributeAmount) <= 0} className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold tracking-wider transition-colors disabled:opacity-50">DEMO (USD)</button>
                                    ) : (
                                        <button onClick={handleOnchainContribute} disabled={isSendingTx || !contributeAmount || Number(contributeAmount) <= 0 || Number(contributeAmount) > activeUserBalance} className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold tracking-wider transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                                            {isSendingTx ? "SENDING..." : `ONCHAIN (${selectedToken})`}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#0d0d0d] border border-red-500/[0.08] overflow-hidden">
                    <div className="flex border-b border-red-500/[0.06]">
                        <button onClick={() => setLogTab('demo')} className={`px-5 py-4 text-[10px] font-mono tracking-[0.15em] uppercase font-bold transition-colors ${logTab === 'demo' ? 'text-white border-b-2 border-red-500' : 'text-gray-600 hover:text-gray-400'}`}>
                            TRANSACTION LOG
                        </button>
                        <button onClick={() => setLogTab('onchain')} className={`px-5 py-4 text-[10px] font-mono tracking-[0.15em] uppercase font-bold transition-colors ${logTab === 'onchain' ? 'text-white border-b-2 border-red-500' : 'text-gray-600 hover:text-gray-400'}`}>
                            ONCHAIN LOG
                        </button>
                    </div>

                    {logTab === 'demo' ? (
                        <>
                            {filtered.length > 0 ? (
                                <div className="divide-y divide-red-500/[0.04]">
                                    {filtered.map(tx => {
                                        const style = TX_STYLE[tx.type];
                                        const Icon = style.icon;
                                        return (
                                            <div key={tx.id} className="flex items-center gap-4 px-5 py-4 hover:bg-red-500/[0.02] transition-colors">
                                                <div className="w-8 h-8 border flex items-center justify-center shrink-0" style={{ borderColor: `${style.color}25`, backgroundColor: `${style.color}08` }}>
                                                    <Icon className="w-3.5 h-3.5" style={{ color: style.color }} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-xs text-white font-medium">{tx.description}</div>
                                                    <div className="text-[9px] text-gray-600 font-mono flex items-center gap-2 mt-0.5"><Clock className="w-2.5 h-2.5" />{formatDate(tx.timestamp)} · {formatTime(tx.timestamp)}</div>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-sm font-mono font-bold" style={{ color: style.color }}>{style.sign}${tx.amount.toLocaleString()}</span>
                                                    <div className="text-[8px] text-gray-700 font-mono tracking-wider uppercase mt-0.5">{tx.type.replace('_', ' ')}</div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-12"><p className="text-gray-700 font-mono text-xs">No transactions</p></div>
                            )}
                        </>
                    ) : (
                        <>
                            {fetchingOnchain ? (
                                <div className="text-center py-12"><p className="text-gray-700 font-mono text-xs animate-pulse">Fetching onchain data...</p></div>
                            ) : onchainTransactions.length > 0 ? (
                                <div className="divide-y divide-red-500/[0.04]">
                                    {onchainTransactions.map(tx => {
                                        const date = new Date(tx.metadata?.blockTimestamp || Date.now());
                                        const isDeposit = tx.to && tx.to.toLowerCase() === TREASURY_ADDRESS.toLowerCase();
                                        const Icon = isDeposit ? ArrowDownRight : ArrowUpRight;
                                        const color = isDeposit ? '#22c55e' : '#ef4444';
                                        const sign = isDeposit ? '+' : '-';

                                        let assetDisplay = tx.asset || "Token";
                                        if (tx.rawContract && tx.rawContract.address) {
                                            if (tx.rawContract.address.toLowerCase() === USDC_ADDRESS.toLowerCase()) assetDisplay = "USDC";
                                            if (tx.rawContract.address.toLowerCase() === USDT_ADDRESS.toLowerCase()) assetDisplay = "USDT";
                                        }

                                        const displayValue = tx.value ? tx.value.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '0';

                                        return (
                                            <a key={tx.hash} href={`https://snowtrace.io/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 px-5 py-4 hover:bg-red-500/[0.02] transition-colors group">
                                                <div className="w-8 h-8 border flex items-center justify-center shrink-0" style={{ borderColor: `${color}25`, backgroundColor: `${color}08` }}>
                                                    <Icon className="w-3.5 h-3.5" style={{ color: color }} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-xs text-white font-medium flex items-center gap-2">
                                                        {isDeposit ? `Received ${assetDisplay}` : `Sent ${assetDisplay}`}
                                                        <ExternalLink className="w-3 h-3 text-gray-600 group-hover:text-red-400 transition-colors" />
                                                    </div>
                                                    <div className="text-[9px] text-gray-600 font-mono flex items-center gap-2 mt-0.5">
                                                        <Clock className="w-2.5 h-2.5" />
                                                        {formatDate(date.getTime())} · {formatTime(date.getTime())}
                                                        <span className="hidden sm:inline">· {isDeposit ? `From: ${tx.from.slice(0, 6)}...${tx.from.slice(-4)}` : `To: ${tx.to.slice(0, 6)}...${tx.to.slice(-4)}`}</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-sm font-mono font-bold" style={{ color: color }}>
                                                        {sign}{displayValue} {assetDisplay}
                                                    </span>
                                                    <div className="text-[8px] text-gray-700 font-mono tracking-wider uppercase mt-0.5">ONCHAIN</div>
                                                </div>
                                            </a>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-12"><p className="text-gray-700 font-mono text-xs">No onchain transactions found</p></div>
                            )}
                        </>
                    )}
                </motion.div>
            </main>
        </div>
    );
}

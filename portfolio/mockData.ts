export interface Project {
    id: string;
    name: string;
    shortDescription: string;
    fullDescription: string;
    category: 'DeFi' | 'NFT' | 'Gaming' | 'Infrastructure' | 'Social';
    status: 'Funded' | 'Active' | 'Completed';
    fundingAmount: number;
    fundingTarget: number;
    fundingDate: string; // ISO string
    roiPercentage?: number;
    websiteUrl?: string;
    twitterUrl?: string;
    logoUrl?: string;
    bannerUrl?: string;
    team: { name: string; role: string; avatarUrl?: string }[];
    metrics: {
        tvl?: number;
        activeUsers?: number;
        volume24h?: number;
    };
}

export const mockProjects: Project[] = [
    {
        id: "project-1",
        name: "Avax Yield Aggregator",
        shortDescription: "Automated yield farming across the Avalanche ecosystem.",
        fullDescription: "Avax Yield Aggregator auto-compounds yields from various DEXes and lending protocols on Avalanche, maximizing returns for users with minimal gas fees and slippage. Built with security-first architecture, it ensures funds are strictly deployed to audited smart contracts.",
        category: "DeFi",
        status: "Active",
        fundingAmount: 250000,
        fundingTarget: 250000,
        fundingDate: "2024-05-15T00:00:00Z",
        roiPercentage: 14.5,
        websiteUrl: "https://example.com/yield",
        twitterUrl: "https://twitter.com/avaxyield",
        logoUrl: "https://assets.coingecko.com/coins/images/12559/standard/Avalanche_Circle_RedWhite_Trans.png",
        bannerUrl: "https://images.unsplash.com/photo-1621504450181-5d356f61d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        team: [
            { name: "Alice Nakamoto", role: "Lead Dev" },
            { name: "Bob", role: "Strategy" }
        ],
        metrics: {
            tvl: 1250000,
            activeUsers: 3400,
            volume24h: 450000
        }
    },
    {
        id: "project-2",
        name: "Neon Rush",
        shortDescription: "Cyberpunk racing game with real-economy mechanics.",
        fullDescription: "Neon Rush is a fully on-chain racing game where players assemble, upgrade, and race cybernetic vehicles. The game economy is driven by players, with parts being distinct NFTs and rewards distributed based on complex race algorithms running directly on a specialized Avalanche Subnet.",
        category: "Gaming",
        status: "Active",
        fundingAmount: 500000,
        fundingTarget: 500000,
        fundingDate: "2024-08-22T00:00:00Z",
        roiPercentage: 5.2,
        websiteUrl: "https://example.com/neonrush",
        twitterUrl: "https://twitter.com/neonrush_game",
        logoUrl: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png",
        bannerUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        team: [
            { name: "Charlie", role: "Game Director" },
            { name: "Dana", role: "Lead Artist" }
        ],
        metrics: {
            activeUsers: 12500,
            volume24h: 89000
        }
    },
    {
        id: "project-3",
        name: "Subnet Explorer",
        shortDescription: "Analytics dashboard for custom Avalanche subnets.",
        fullDescription: "An essential infrastructure tool for the growing Avalanche Subnet ecosystem. Subnet Explorer provides real-time tracking of validators, transactions, TVL flows, and bridging activity across all active subnets, democratizing data access for developers and end-users.",
        category: "Infrastructure",
        status: "Completed",
        fundingAmount: 150000,
        fundingTarget: 150000,
        fundingDate: "2024-11-10T00:00:00Z",
        roiPercentage: 22.0,
        websiteUrl: "https://example.com/explorer",
        twitterUrl: "https://twitter.com/subnet_exp",
        logoUrl: "https://assets.coingecko.com/coins/images/13397/standard/Graph_Token.png",
        bannerUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        team: [
            { name: "Eve", role: "Data Engineer" }
        ],
        metrics: {
            activeUsers: 45000
        }
    },
    {
        id: "project-4",
        name: "RedKey Identity",
        shortDescription: "Decentralized identity and reputation protocol.",
        fullDescription: "A self-sovereign identity solution that aggregates on-chain actions across Avalanche to build verifiable reputation scores. RedKey Identity allows users to prove credentials for undercollateralized loans, DAO voting weights, and exclusive NFT mints without revealing personal information.",
        category: "Social",
        status: "Funded",
        fundingAmount: 300000,
        fundingTarget: 300000,
        fundingDate: "2025-01-05T00:00:00Z",
        websiteUrl: "https://example.com/identity",
        logoUrl: "https://cryptologos.cc/logos/chainlink-link-logo.png",
        bannerUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        team: [
            { name: "Frank", role: "Cryptography" },
            { name: "Grace", role: "Product" }
        ],
        metrics: {}
    }
];

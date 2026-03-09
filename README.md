# 🔑 RedKey DAO

**Decentralized Investment & Lending Protocol Governed by Community Consensus**

RedKey DAO is a next-generation decentralized autonomous organization (DAO) built as a mini app on the Avalanche C-Chain. It empowers communities to collectively manage a treasury, vote on investment proposals, and participate in peer-to-peer lending — all through a sleek, terminal-inspired dark UI.

> Built for the Avalanche ecosystem. Designed for transparency. Governed by its members.

---

## ✨ Features

### 🏠 Landing Page
A stunning, animated landing page introducing the DAO's vision and core value propositions with smooth Framer Motion animations and a cyberpunk-inspired aesthetic.

### 📊 Dashboard
A command-center style dashboard providing real-time overview of:
- Treasury balance & metrics
- Active proposals and loan activity
- Live audit trail log with color-coded action types
- AVAX price tracking with live market data
- Latest Avalanche ecosystem news feed

### 🏦 Treasury & Onchain Execution
Full transparency into DAO finances with live Avalanche C-Chain integration:
- 🚀 **LIVE SHOWCASE: Onchain Contributions** — Connect your wallet and send actual USDC, USDT, or AVAX directly to the RedKey DAO treasury smart contract on the Avalanche network.
- 🚀 **LIVE SHOWCASE: Onchain Transaction Log** — Real-time verification of on-chain treasury movements fetched directly from the blockchain via Alchemy API.
- **Onchain Treasury Dashboard** (`/dao/treasury/onchain`) — A dedicated command center displaying individual AVAX, USDC, and USDT balances with live USD equivalents (AVAX price via CoinGecko).
- Comprehensive fund overview: Total balance, allocated funds, and available funds.
- Contribution tracking per member and reserve ratio monitoring.

### 📜 Proposals
Community-driven investment governance:
- Create and submit investment proposals with risk assessment
- Configurable voting parameters (quorum, approval threshold, voting period)
- Real-time voting progress with weighted voting power
- Proposal lifecycle tracking (Draft → Submitted → Voting → Passed/Failed → Executing → Completed)
- Comment and discussion threads per proposal

### 💼 Portfolio
Post-funding transparency and performance tracking:
- Track deployed capital and actual performance of funded projects
- Detailed metrics including ROI, stage, and ecosystem impact
- Verifiable links to project smart contracts and social spaces

### 💰 Loans (P2P Lending)
A peer-to-peer liquidity market:
- Request loans with flexible tenors (3, 6, or 9 months)
- Flat interest rates tied to tenor (3% / 6% / 9%)
- 100% collateral requirement for borrower protection
- Community-funded lending — any member can fund a portion of a loan
- Full loan lifecycle management with credit tier system (Gold / Silver / Bronze / New)

### 📡 Signal
Smart money tracking on the Avalanche network:
- Track whale and smart money wallet addresses
- View the latest 100 transactions per address via Alchemy API
- Analyze on-chain activity patterns

### 👥 Identity & Reputation System
Comprehensive member directory and progression system:
- **Public Profiles** (`/dao/profile/[address]`) — Searchable public member profiles displaying identity metrics, customizable bio, social links, and a visual Reputation Matrix.
- **Private Profiles** (`/dao/profile`) — Personal command center with inline editing allowing members to manage their DAO identity.
- **Partner Reputation Integration** — Members can claim reputation badges based on their activity in other Avalanche ecosystem dApps (e.g., Blackhole protocol). Claimed badges directly calculate into an aggregated "Partner Reputation" score displayed on the profile matrix.
- Role-based access (Super Admin, Admin, Member, Observer).
- Voting power calculation (60% stake weight + 40% reputation weight).
- Credit tier tracking for P2P lending eligibility.

### 💬 Discussion
Community forum for open dialogue:
- Create discussion topics
- Threaded replies
- Member activity tracking

### 📄 Docs & Litepaper
In-app documentation including the DAO manifesto and litepaper for onboarding new members.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router, Turbopack) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **UI Library** | [React 19](https://react.dev/) |
| **Styling** | [TailwindCSS 4](https://tailwindcss.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Charts** | [Recharts](https://recharts.org/) |
| **UI Primitives** | [Radix UI](https://www.radix-ui.com/) (Dialog, Dropdown, Tabs, Tooltip, etc.) |
| **Web3 SDK** | [Thirdweb v5](https://thirdweb.com/) (Wallet connection, in-app wallets, contract interaction) |
| **Blockchain** | [Avalanche C-Chain](https://www.avax.network/) |
| **Blockchain Data** | [Alchemy API](https://www.alchemy.com/) (Transaction history) |
| **Backend/DB** | [Firebase](https://firebase.google.com/) |
| **Notifications** | [Sonner](https://sonner.emilkowal.dev/) (Toast notifications) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📁 Project Structure

```
dao/
├── components/
│   ├── AvaxNewsSection.tsx    # Avalanche ecosystem news feed
│   ├── AvaxPriceCard.tsx      # Live AVAX price widget
│   ├── DaoFooter.tsx          # App footer
│   ├── DaoNavbar.tsx          # Navigation bar with wallet connect
│   ├── LoanCard.tsx           # Loan request card component
│   ├── LoanFundingPanel.tsx   # P2P loan funding interface
│   ├── MemberCard.tsx         # Member profile card
│   ├── ProposalCard.tsx       # Proposal overview card
│   ├── TreasuryCard.tsx       # Treasury metric card
│   └── VotingPanel.tsx        # Voting interface component
├── dashboard/                 # Dashboard page
├── discussion/                # Community forum
├── docs/                      # DAO documentation
├── litepaper/                 # Litepaper page
├── loans/                     # P2P lending module
├── members/                   # Member directory
├── news/                      # News page
├── pitch/                     # Pitch deck
├── portfolio/                 # Post-funding portfolio tracking
├── profile/                   # User profile
├── proposals/                 # Investment proposals
├── signal/                    # Smart money tracker
├── treasury/                  # Treasury management
├── config.ts                  # DAO configuration & constants
├── types.ts                   # TypeScript type definitions
├── layout.tsx                 # Root layout with ThirdwebProvider
├── page.tsx                   # Landing page
└── README.md
```

---

## ⚙️ Governance Parameters

| Parameter | Value |
|---|---|
| Quorum | 30% |
| Approval Threshold | 60% |
| Voting Period | 7 days |
| Cooldown Period | 48 hours |
| Max Active Proposals | 5 |
| Treasury Reserve Ratio | 20% |
| Min Contribution | 10 AVAX |
| Stake Weight | 0.6 (60%) |
| Reputation Weight | 0.4 (40%) |

---

## 🔐 Wallet Support

RedKey DAO supports multiple wallet connection methods:

- **In-App Wallet** — Sign in with Google, Apple, or X (Twitter)
- **Core**
- **MetaMask**
- **Coinbase Wallet**
- **WalletConnect**
- **Rainbow**

Powered by [Thirdweb SDK v5](https://thirdweb.com/) for seamless Web3 authentication.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Thirdweb Client ID
- Alchemy API Key
- Firebase project credentials

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/redkey-dao.git
cd redkey-dao

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

```env
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_thirdweb_client_id
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

### Development

```bash
npm run dev
```

The app will be available at [http://localhost:3000/dao](http://localhost:3000/dao).

### Build

```bash
npm run build
```

---

## 🎨 Design Philosophy

RedKey DAO features a **terminal-inspired cyberpunk aesthetic** with:

- Deep black background (`#060608`) with red accent color palette
- Monospace typography with uppercase tracking
- Sharp, non-rounded corners for a rigid, military-grade feel
- Subtle grid overlay and ambient glow effects
- Smooth micro-animations powered by Framer Motion
- Fully responsive design for mobile and desktop

---

## 📊 Credit Tier System

| Tier | Min Score | Icon |
|---|---|---|
| 🥇 Gold | 800 | Highest trust level |
| 🥈 Silver | 600 | Established member |
| 🥉 Bronze | 400 | Active participant |
| ⚪ New | 0 | New member |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🔗 Links

- **Live App**: [RedKey DAO](https://redkeydao.xyz)
- **Avalanche**: [avax.network](https://www.avax.network/)
- **Thirdweb**: [thirdweb.com](https://thirdweb.com/)

---

<p align="center">
  Built with ❤️ by the <strong>RedKey DAO</strong> community on <strong>Avalanche</strong>
</p>

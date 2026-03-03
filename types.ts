// RedKey DAO Types

// === Enums & Constants ===

export type DaoRole = 'super_admin' | 'admin' | 'member' | 'observer';

export type ProposalStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'active'     // voting open
  | 'passed'
  | 'failed'
  | 'executing'
  | 'completed'
  | 'cancelled'
  | 'rejected';

export type VoteChoice = 'for' | 'against' | 'abstain';

export type TransactionType = 'deposit' | 'withdrawal' | 'allocation' | 'return' | 'loan_disbursement' | 'loan_repayment';

export type CreditTier = 'gold' | 'silver' | 'bronze' | 'new';

export type LoanStatus =
  | 'requested'
  | 'voting'
  | 'approved'
  | 'collateral_pending'
  | 'funding'
  | 'active'
  | 'repaying'
  | 'repaid'
  | 'defaulted'
  | 'rejected';

export type LoanTenor = 3 | 6 | 9;

// === Member ===

export interface DaoMember {
  walletAddress: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
  website?: string;
  role: DaoRole;
  reputation: number;          // 0-1000
  creditTier: CreditTier;
  totalContribution: number;   // total deposited to treasury
  votingPower: number;         // calculated: stake * 0.6 + reputation * 0.4
  joinedAt: number;            // timestamp
  lastActiveAt: number;
  proposalsSubmitted: number;
  votesCount: number;
  isActive: boolean;
}

// === Treasury ===

export interface TreasurySummary {
  totalBalance: number;
  allocatedFunds: number;
  availableFunds: number;
  totalContributions: number;
  totalReturns: number;
  memberCount: number;
  reserveRatio: number;        // percentage
}

export interface TreasuryTransaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  fromAddress?: string;
  toAddress?: string;
  proposalId?: string;
  loanId?: string;
  timestamp: number;
  recordedBy: string;          // admin/system wallet address
}

// === Proposals ===

export interface Proposal {
  id: string;
  title: string;
  description: string;
  author: string;              // wallet address
  authorName?: string;
  status: ProposalStatus;

  // Financials
  requestedAmount: number;
  expectedROI?: number;        // percentage
  timeline: string;            // e.g. "3 months"
  riskLevel: 'low' | 'medium' | 'high';

  // Voting
  votesFor: number;
  votesAgainst: number;
  votesAbstain: number;
  totalVotingPower: number;    // sum of all voting power cast
  quorumRequired: number;      // percentage
  approvalThreshold: number;   // percentage

  // Timestamps
  createdAt: number;
  submittedAt?: number;
  votingStartsAt?: number;
  votingEndsAt?: number;
  completedAt?: number;

  // Metadata
  supportingDocs?: string[];   // URLs
  tags?: string[];
  commentsCount: number;
}

export interface Vote {
  id: string;
  proposalId?: string;
  loanId?: string;
  voter: string;               // wallet address
  voterName?: string;
  choice: VoteChoice;
  votingPower: number;
  timestamp: number;
}

export interface ProposalComment {
  id: string;
  proposalId: string;
  author: string;              // wallet address
  authorName?: string;
  content: string;
  timestamp: number;
}

// === Forum ===

export interface ForumTopic {
  id: string;
  title: string;
  content: string;
  author: string;              // wallet address
  authorName?: string;
  createdAt: number;
  lastActivityAt: number;
  repliesCount: number;
}

export interface ForumReply {
  id: string;
  topicId: string;
  author: string;              // wallet address
  authorName?: string;
  content: string;
  createdAt: number;
}

// === Loans ===

export interface LoanRequest {
  id: string;
  borrower: string;            // wallet address
  borrowerName?: string;
  amount: number;              // requested amount
  purpose: string;             // description
  tenor: LoanTenor;            // 3, 6, or 9 months
  interestRate: number;        // flat: 3% / 6% / 9%
  totalRepayment: number;      // amount + (amount * interestRate / 100)
  status: LoanStatus;

  // Collateral (100% of loan amount)
  collateralToken: string;     // e.g. "USDC", "USDT", "AVAX"
  collateralAmount: number;    // = amount (100%)
  collateralTxHash?: string;   // on-chain tx hash
  collateralConfirmed: boolean;

  // Voting
  votesFor: number;
  votesAgainst: number;
  votesAbstain: number;
  totalVotingPower: number;
  quorumRequired: number;
  approvalThreshold: number;

  // Funding
  fundedAmount: number;        // how much contributed so far
  funders: LoanFunder[];       // list of contributors
  fundingDeadline?: number;    // timestamp

  // Timestamps
  createdAt: number;
  votingStartsAt?: number;
  votingEndsAt?: number;
  approvedAt?: number;
  collateralDepositedAt?: number;
  fundedAt?: number;           // fully funded timestamp
  repaidAt?: number;

  commentsCount: number;
}

export interface LoanFunder {
  address: string;
  name?: string;
  amount: number;
  timestamp: number;
}

// === Governance ===

export interface GovernanceConfig {
  quorum: number;              // percentage (e.g. 30)
  approvalThreshold: number;   // percentage (e.g. 60)
  votingPeriodDays: number;    // days
  cooldownHours: number;       // hours before voting starts
  maxActiveProposals: number;
  reserveRatio: number;        // minimum treasury percentage liquid
  minContribution: number;     // minimum deposit amount
  stakeWeight: number;         // voting power weight (e.g. 0.6)
  reputationWeight: number;    // voting power weight (e.g. 0.4)
}

// === Audit ===

export interface AuditLogEntry {
  id: string;
  action: string;              // e.g. 'proposal.created', 'vote.cast', 'treasury.deposit'
  actor: string;               // wallet address
  actorName?: string;
  details: Record<string, unknown>;
  timestamp: number;
}

// === Tab & UI Types ===

export type DaoTab = 'dashboard' | 'treasury' | 'proposals' | 'loans' | 'members' | 'forum';
export type ProposalFilterTab = 'all' | 'active' | 'passed' | 'failed' | 'draft';
export type LoanFilterTab = 'all' | 'voting' | 'funding' | 'active' | 'repaid' | 'defaulted';

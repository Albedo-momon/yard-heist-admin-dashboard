// Dummy data for the admin panel

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  ip: string;
  registeredAt: string;
  status: 'Active' | 'Blocked' | 'Pending';
  userType: 'admin' | 'user' | 'both';
}

export interface Transaction {
  id: string;
  type: 'Deposit' | 'Withdrawal';
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
  date: string;
  wallet: string;
  userId: string;
  username: string;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  username: string;
  amount: number;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  wallet: string;
}

export interface ApprovedRequest {
  id: string;
  userId: string;
  username: string;
  amount: number;
  date: string;
  status: 'Approved' | 'Completed';
  wallet: string;
  approvedAt: string;
}

export interface GameHistory {
  id: string;
  userId: string;
  gameType: string;
  betAmount: number;
  winAmount: number;
  date: string;
  result: 'Win' | 'Loss';
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar: string;
  walletBalance: number;
  totalWins: number;
  totalGames: number;
  registeredAt: string;
  status: 'Active' | 'Blocked' | 'Pending';
}

export const dummyUsers: User[] = [
  {
    id: '1',
    username: 'john_doe',
    email: 'john@example.com',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=22c55e&color=ffffff',
    ip: '192.168.1.1',
    registeredAt: '2024-01-15T10:30:00Z',
    status: 'Active',
    userType: 'admin',
  },
  {
    id: '2',
    username: 'jane_smith',
    email: 'jane@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=22c55e&color=ffffff',
    ip: '192.168.1.2',
    registeredAt: '2024-01-14T09:15:00Z',
    status: 'Active',
    userType: 'user',
  },
  {
    id: '3',
    username: 'mike_wilson',
    email: 'mike@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Mike+Wilson&background=22c55e&color=ffffff',
    ip: '192.168.1.3',
    registeredAt: '2024-01-13T14:45:00Z',
    status: 'Blocked',
    userType: 'user',
  },
  {
    id: '4',
    username: 'sarah_connor',
    email: 'sarah@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Connor&background=22c55e&color=ffffff',
    ip: '192.168.1.4',
    registeredAt: '2024-01-12T11:20:00Z',
    status: 'Pending',
    userType: 'both',
  },
  {
    id: '5',
    username: 'alex_brown',
    email: 'alex@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Alex+Brown&background=22c55e&color=ffffff',
    ip: '192.168.1.5',
    registeredAt: '2024-01-11T16:30:00Z',
    status: 'Active',
    userType: 'both',
  },
];

export const dummyTransactions: Transaction[] = [
  {
    id: 'TXN001',
    type: 'Deposit',
    amount: 1500.00,
    status: 'Completed',
    date: '2024-01-15T10:30:00Z',
    wallet: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    userId: '1',
    username: 'john_doe',
  },
  {
    id: 'TXN002',
    type: 'Withdrawal',
    amount: 850.50,
    status: 'Pending',
    date: '2024-01-15T09:15:00Z',
    wallet: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
    userId: '2',
    username: 'jane_smith',
  },
  {
    id: 'TXN003',
    type: 'Deposit',
    amount: 2000.00,
    status: 'Completed',
    date: '2024-01-14T14:45:00Z',
    wallet: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
    userId: '3',
    username: 'mike_wilson',
  },
  {
    id: 'TXN004',
    type: 'Withdrawal',
    amount: 500.00,
    status: 'Failed',
    date: '2024-01-14T11:20:00Z',
    wallet: '3JvL6Ymt8MVWiCNHC7oWU6nLeHNJKLZGLN',
    userId: '4',
    username: 'sarah_connor',
  },
  {
    id: 'TXN005',
    type: 'Deposit',
    amount: 750.25,
    status: 'Completed',
    date: '2024-01-13T16:30:00Z',
    wallet: '1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX',
    userId: '5',
    username: 'alex_brown',
  },
];

export const dummyWithdrawals: WithdrawalRequest[] = [
  {
    id: 'WTH001',
    userId: '2',
    username: 'jane_smith',
    amount: 850.50,
    date: '2024-01-15T09:15:00Z',
    status: 'Pending',
    wallet: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
  },
  {
    id: 'WTH002',
    userId: '1',
    username: 'john_doe',
    amount: 1200.00,
    date: '2024-01-14T15:30:00Z',
    status: 'Pending',
    wallet: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
  },
  {
    id: 'WTH003',
    userId: '5',
    username: 'alex_brown',
    amount: 600.75,
    date: '2024-01-13T12:45:00Z',
    status: 'Approved',
    wallet: '1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX',
  },
];

export const dummyApproved: ApprovedRequest[] = [
  {
    id: 'APP001',
    userId: '5',
    username: 'alex_brown',
    amount: 600.75,
    date: '2024-01-13T12:45:00Z',
    status: 'Approved',
    wallet: '1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX',
    approvedAt: '2024-01-13T16:30:00Z',
  },
  {
    id: 'APP002',
    userId: '3',
    username: 'mike_wilson',
    amount: 900.00,
    date: '2024-01-12T10:15:00Z',
    status: 'Completed',
    wallet: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
    approvedAt: '2024-01-12T14:20:00Z',
  },
];

export const dummyGameHistory: GameHistory[] = [
  {
    id: 'GAME001',
    userId: '2',
    gameType: 'Slot Machine',
    betAmount: 50.00,
    winAmount: 150.00,
    date: '2024-01-15T08:30:00Z',
    result: 'Win',
  },
  {
    id: 'GAME002',
    userId: '2',
    gameType: 'Blackjack',
    betAmount: 100.00,
    winAmount: 200.00,
    date: '2024-01-14T16:45:00Z',
    result: 'Win',
  },
  {
    id: 'GAME003',
    userId: '2',
    gameType: 'Roulette',
    betAmount: 75.00,
    winAmount: 225.00,
    date: '2024-01-13T20:15:00Z',
    result: 'Win',
  },
  {
    id: 'GAME004',
    userId: '1',
    gameType: 'Poker',
    betAmount: 200.00,
    winAmount: 800.00,
    date: '2024-01-14T14:20:00Z',
    result: 'Win',
  },
  {
    id: 'GAME005',
    userId: '1',
    gameType: 'Slot Machine',
    betAmount: 25.00,
    winAmount: 125.00,
    date: '2024-01-13T11:30:00Z',
    result: 'Win',
  },
  {
    id: 'GAME006',
    userId: '5',
    gameType: 'Blackjack',
    betAmount: 150.00,
    winAmount: 450.00,
    date: '2024-01-12T19:45:00Z',
    result: 'Win',
  },
];

export const dummyUserProfiles: UserProfile[] = [
  {
    id: '1',
    username: 'john_doe',
    email: 'john@example.com',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=22c55e&color=ffffff',
    walletBalance: 2850.00,
    totalWins: 15,
    totalGames: 28,
    registeredAt: '2024-01-15T10:30:00Z',
    status: 'Active',
  },
  {
    id: '2',
    username: 'jane_smith',
    email: 'jane@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=22c55e&color=ffffff',
    walletBalance: 1925.50,
    totalWins: 12,
    totalGames: 22,
    registeredAt: '2024-01-14T09:15:00Z',
    status: 'Active',
  },
  {
    id: '3',
    username: 'mike_wilson',
    email: 'mike@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Mike+Wilson&background=22c55e&color=ffffff',
    walletBalance: 750.25,
    totalWins: 8,
    totalGames: 18,
    registeredAt: '2024-01-13T14:45:00Z',
    status: 'Blocked',
  },
  {
    id: '4',
    username: 'sarah_connor',
    email: 'sarah@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Connor&background=22c55e&color=ffffff',
    walletBalance: 1200.00,
    totalWins: 10,
    totalGames: 25,
    registeredAt: '2024-01-12T11:20:00Z',
    status: 'Pending',
  },
  {
    id: '5',
    username: 'alex_brown',
    email: 'alex@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Alex+Brown&background=22c55e&color=ffffff',
    walletBalance: 3150.75,
    totalWins: 18,
    totalGames: 32,
    registeredAt: '2024-01-11T16:30:00Z',
    status: 'Active',
  },
];

export const chartData = {
  userRegistrations: [
    { name: 'Jan', users: 400 },
    { name: 'Feb', users: 300 },
    { name: 'Mar', users: 500 },
    { name: 'Apr', users: 278 },
    { name: 'May', users: 189 },
    { name: 'Jun', users: 239 },
    { name: 'Jul', users: 349 },
  ],
  urlVisits: [
    { name: 'Jan', visits: 4000 },
    { name: 'Feb', visits: 3000 },
    { name: 'Mar', visits: 5000 },
    { name: 'Apr', visits: 2780 },
    { name: 'May', visits: 1890 },
    { name: 'Jun', visits: 2390 },
    { name: 'Jul', visits: 3490 },
  ],
};
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, ArrowUpDown, ArrowDown, ArrowUp, Search, Loader2, AlertCircle, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTransactions, TransactionData } from '@/hooks/useTransactions';
import { Transaction } from '@/data/dummyData'; // Keep for legacy compatibility

export default function Transactions() {
  const { data, loading, error, filters, updateFilters, refetch, goToPage } = useTransactions();
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const transactions = data?.transactions || [];
  const pagination = data?.pagination;

  // Apply local filters (API handles pagination, we handle additional client-side filtering)
  const filteredTransactions = transactions.filter((transaction: TransactionData) => {
    const matchesType = typeFilter === 'all' || transaction.type.toLowerCase() === typeFilter.toLowerCase();
    const matchesStatus = statusFilter === 'all' || transaction.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch = searchQuery === '' ||
      transaction.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.id.toString().includes(searchQuery.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  const getStatusVariant = (status: string) => {
    switch (status.toUpperCase()) {
      case 'COMPLETED':
        return 'default';
      case 'PENDING':
        return 'secondary';
      case 'FAILED':
      case 'CANCELLED':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toUpperCase()) {
      case 'DEPOSIT':
      case 'WIN':
        return <ArrowDown className="h-4 w-4 text-green-500" />;
      case 'WITHDRAWAL':
      case 'BET':
        return <ArrowUp className="h-4 w-4 text-red-500" />;
      default:
        return <ArrowUpDown className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatTransactionType = (type: string) => {
    return type.charAt(0) + type.slice(1).toLowerCase();
  };

  const formatTransactionStatus = (status: string) => {
    return status.charAt(0) + status.slice(1).toLowerCase();
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const TransactionDetailsModal = ({ transaction }: { transaction: TransactionData }) => (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Transaction Details</DialogTitle>
        <DialogDescription>
          Complete information for transaction {transaction.id}
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Transaction ID</label>
            <p className="text-sm font-mono">{transaction.id}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Type</label>
            <div className="flex items-center gap-2">
              {getTypeIcon(transaction.type)}
              <span className="text-sm">{formatTransactionType(transaction.type)}</span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Amount</label>
            <p className="text-sm font-semibold">{formatAmount(transaction.amount)}</p>
            {transaction.amount_crypto && (
              <p className="text-xs text-muted-foreground">Crypto: {transaction.amount_crypto}</p>
            )}
            {transaction.gems_amount && (
              <p className="text-xs text-muted-foreground">Gems: {transaction.gems_amount}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Status</label>
            <Badge variant={getStatusVariant(transaction.status)} className="text-xs">
              {formatTransactionStatus(transaction.status)}
            </Badge>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">User</label>
            <p className="text-sm">{transaction.user.username}</p>
            <p className="text-xs text-muted-foreground">{transaction.user.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Date</label>
            <p className="text-sm">{new Date(transaction.createdAt).toLocaleString()}</p>
          </div>
        </div>
        {transaction.wallet_address && (
          <div>
            <label className="text-sm font-medium text-muted-foreground">Wallet Address</label>
            <p className="text-xs font-mono bg-muted p-2 rounded break-all mt-1">
              {transaction.wallet_address}
            </p>
          </div>
        )}
        {transaction.transaction_hash && (
          <div>
            <label className="text-sm font-medium text-muted-foreground">Transaction Hash</label>
            <p className="text-xs font-mono bg-muted p-2 rounded break-all mt-1">
              {transaction.transaction_hash}
            </p>
          </div>
        )}
      </div>
    </DialogContent>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground mt-2">
            Monitor all platform transactions
          </p>
        </div>
        <Button
          variant="outline"
          onClick={refetch}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Loading State */}
      {loading && (
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mr-2" />
            <span>Loading transactions...</span>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
            <Button
              variant="outline"
              size="sm"
              onClick={refetch}
              className="ml-2"
            >
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Search and Filters */}
      {!loading && (
      <Card>
        <CardHeader>
          <CardTitle>Search & Filters</CardTitle>
          <CardDescription>Search by user name or transaction ID, and filter by type and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 justify-between">

            {/* Filters */}
            <div className="flex gap-4">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="deposit">Deposit</SelectItem>
                  <SelectItem value="withdrawal">Withdrawal</SelectItem>
                  <SelectItem value="bet">Bet</SelectItem>
                  <SelectItem value="win">Win</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search Bar */}
            <div className="relative w-1/5">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by user name or transaction ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      )}

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transactions ({filteredTransactions.length})</CardTitle>
          <CardDescription>List of all platform transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(transaction.type)}
                      <span>{formatTransactionType(transaction.type)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{transaction.user.username}</p>
                      <p className="text-xs text-muted-foreground">{transaction.user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {formatAmount(transaction.amount)}
                    {transaction.amount_crypto && (
                      <p className="text-xs text-muted-foreground">+{transaction.amount_crypto} crypto</p>
                    )}
                    {transaction.gems_amount && (
                      <p className="text-xs text-muted-foreground">+{transaction.gems_amount} gems</p>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(transaction.status)}>
                      {formatTransactionStatus(transaction.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <TransactionDetailsModal transaction={transaction} />
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
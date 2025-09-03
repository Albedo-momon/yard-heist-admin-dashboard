import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Eye, Clock, XCircle } from 'lucide-react';
import { dummyWithdrawals, WithdrawalRequest } from '@/data/dummyData';

export default function Withdrawals() {
  const navigate = useNavigate();
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(dummyWithdrawals);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<WithdrawalRequest | null>(null);

  const handleViewDetails = (id: string) => {
    navigate(`/withdrawals/${id}`);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'default';
      case 'Pending':
        return 'secondary';
      case 'Rejected':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const WalletActivityModal = ({ withdrawal }: { withdrawal: WithdrawalRequest }) => (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Wallet Activity</DialogTitle>
        <DialogDescription>
          Activity details for {withdrawal.username}'s wallet
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Request ID</label>
            <p className="text-sm font-mono">{withdrawal.id}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">User</label>
            <p className="text-sm">{withdrawal.username}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Amount</label>
            <p className="text-sm font-semibold">{formatAmount(withdrawal.amount)}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Status</label>
            <Badge variant={getStatusVariant(withdrawal.status)} className="text-xs">
              {withdrawal.status}
            </Badge>
          </div>
          <div className="col-span-2">
            <label className="text-sm font-medium text-muted-foreground">Date</label>
            <p className="text-sm">{new Date(withdrawal.date).toLocaleString()}</p>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Wallet Address</label>
          <p className="text-xs font-mono bg-muted p-2 rounded break-all mt-1">
            {withdrawal.wallet}
          </p>
        </div>
        <div className="pt-4 border-t">
          <h4 className="text-sm font-medium mb-2">Recent Activity</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Withdrawal request submitted</span>
              <span className="text-muted-foreground ml-auto">
                {new Date(withdrawal.date).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span>Under review</span>
              <span className="text-muted-foreground ml-auto">Pending</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Withdrawal Requests</h1>
          <p className="text-muted-foreground mt-2">
            Review and approve withdrawal requests
          </p>
        </div>
      </div>

      {/* Withdrawals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Withdrawal Requests ({withdrawals.length})</CardTitle>
          <CardDescription>List of all withdrawal requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {withdrawals.map((withdrawal) => (
                <TableRow key={withdrawal.id}>
                  <TableCell className="font-mono text-sm">{withdrawal.id}</TableCell>
                  <TableCell>{withdrawal.username}</TableCell>
                  <TableCell className="font-semibold">
                    {formatAmount(withdrawal.amount)}
                  </TableCell>
                  <TableCell>
                    {new Date(withdrawal.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(withdrawal.status)}>
                      {withdrawal.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(withdrawal.id)}
                        className="flex items-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        View Details
                      </Button>
                    </div>
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
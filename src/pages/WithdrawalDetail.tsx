import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ArrowLeft, CheckCircle, Wallet, Trophy, GamepadIcon } from 'lucide-react';
import { dummyWithdrawals, dummyUserProfiles, dummyGameHistory, WithdrawalRequest, UserProfile, GameHistory } from '@/data/dummyData';
import { useToast } from '@/hooks/use-toast';

export default function WithdrawalDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [withdrawal, setWithdrawal] = useState<WithdrawalRequest | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);

  useEffect(() => {
    if (id) {
      const foundWithdrawal = dummyWithdrawals.find(w => w.id === id);
      if (foundWithdrawal) {
        setWithdrawal(foundWithdrawal);

        // Find user profile
        const profile = dummyUserProfiles.find(u => u.id === foundWithdrawal.userId);
        setUserProfile(profile || null);

        // Filter game history for wins only
        const userGameHistory = dummyGameHistory.filter(
          game => game.userId === foundWithdrawal.userId && game.result === 'Win'
        );
        setGameHistory(userGameHistory);
      }
    }
  }, [id]);

  const handleApprove = () => {
    if (withdrawal) {
      // Update withdrawal status (in real app, this would be an API call)
      toast({
        title: 'Withdrawal Approved',
        description: `Withdrawal request ${withdrawal.id} has been approved successfully.`,
      });

      // Navigate back to withdrawals page
      navigate('/withdrawals');
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
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

  if (!withdrawal || !userProfile) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Withdrawal request not found.</p>
      </div>
    );
  }

  const totalWinnings = gameHistory.reduce((sum, game) => sum + game.winAmount, 0);

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className='flex justify-between items-center'>
        <div className=" items-center gap-4">


          <h1 className="text-3xl font-bold text-foreground">Withdrawal Details</h1>

          <p className="text-muted-foreground mt-1">
            Request ID: {withdrawal.id}
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/withdrawals')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Withdrawals
        </Button>

      </div>

      {/* User Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={userProfile.avatar} alt={userProfile.username} />
              <AvatarFallback>{userProfile.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{userProfile.username}</h2>
              <p className="text-sm text-muted-foreground">{userProfile.email}</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Wallet Balance */}
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="p-2 bg-green-100 rounded-full">
                <Wallet className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-800">Wallet Balance</p>
                <p className="text-lg font-bold text-green-900">{formatAmount(userProfile.walletBalance)}</p>
              </div>
            </div>

            {/* Total Wins */}
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="p-2 bg-blue-100 rounded-full">
                <Trophy className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-800">Total Wins</p>
                <p className="text-lg font-bold text-blue-900">{userProfile.totalWins}</p>
              </div>
            </div>

            {/* Total Games */}
            <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="p-2 bg-purple-100 rounded-full">
                <GamepadIcon className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-purple-800">Total Games</p>
                <p className="text-lg font-bold text-purple-900">{userProfile.totalGames}</p>
              </div>
            </div>

            {/* Account Status */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <p className="text-sm font-medium text-gray-800">Account Status</p>
                <Badge variant={userProfile.status === 'Active' ? 'default' : 'secondary'} className="mt-1">
                  {userProfile.status}
                </Badge>
              </div>
            </div>
          </div>

          {/* Withdrawal Request Details */}
          <div className="mt-6 p-4  rounded-lg border border-yellow-200">
            <h3 className="font-semibold text-white mb-3">Withdrawal Request</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-white">Amount</p>
                <p className="text-lg font-bold text-white">{formatAmount(withdrawal.amount)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Status</p>
                <Badge variant={getStatusVariant(withdrawal.status)} className="mt-1">
                  {withdrawal.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Request Date</p>
                <p className="text-sm text-white">{new Date(withdrawal.date).toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-sm font-medium text-white">Wallet Address</p>
              <p className="text-xs font-mono rounded mt-1 break-all text-white">
                {withdrawal.wallet}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Game History Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Game History - Wins Only
          </CardTitle>
          <CardDescription>
            Showing all winning games for {userProfile.username} (Total Winnings: {formatAmount(totalWinnings)})
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col justify-between items-end gap-5'>
          {gameHistory.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Game ID</TableHead>
                  <TableHead>Game Type</TableHead>
                  <TableHead>Bet Amount</TableHead>
                  <TableHead>Win Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Result</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gameHistory.map((game) => (
                  <TableRow key={game.id}>
                    <TableCell className="font-mono text-sm">{game.id}</TableCell>
                    <TableCell>{game.gameType}</TableCell>
                    <TableCell className="font-semibold">{formatAmount(game.betAmount)}</TableCell>
                    <TableCell className="font-semibold text-green-600">{formatAmount(game.winAmount)}</TableCell>
                    <TableCell>{new Date(game.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        {game.result}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No winning games found for this user.</p>
            </div>
          )}
          {/* Approval Section */}
          {withdrawal.status === 'Pending' && (
            <div className="p-4 shadow-lg ">
              <div className="max-w-7xl mx-auto flex justify-center">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="lg" className="px-8 py-3 text-lg">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Approve Withdrawal Request
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Approve Withdrawal Request</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to approve this withdrawal request for {formatAmount(withdrawal.amount)}
                        from user "{userProfile.username}"?
                        <br /><br />
                        <strong>User Details:</strong>
                        <br />• Current Wallet Balance: {formatAmount(userProfile.walletBalance)}
                        <br />• Total Winnings: {formatAmount(totalWinnings)}
                        <br />• Total Games Won: {userProfile.totalWins}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleApprove}>
                        Approve Request
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          )}
        </CardContent>
      </Card>


    </div>
  );
}
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { CheckCircle2 } from 'lucide-react';
import { dummyApproved, ApprovedRequest } from '@/data/dummyData';
import { useToast } from '@/hooks/use-toast';

export default function Approved() {
  const [approvedRequests, setApprovedRequests] = useState<ApprovedRequest[]>(dummyApproved);
  const { toast } = useToast();

  const handleFinalApprove = (requestId: string) => {
    setApprovedRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === requestId
          ? { ...request, status: 'Completed' as ApprovedRequest['status'] }
          : request
      )
    );

    toast({
      title: 'Final Approval Complete',
      description: 'The request has been completed and funds have been transferred.',
    });
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'secondary';
      case 'Completed':
        return 'default';
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Approved Requests</h1>
          <p className="text-muted-foreground mt-2">
            Final approval and completion of withdrawal requests
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Approved
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {approvedRequests.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Requests awaiting final approval
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Amount
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatAmount(
                approvedRequests
                  .filter(req => req.status === 'Approved')
                  .reduce((sum, req) => sum + req.amount, 0)
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Total pending final approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed Amount
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatAmount(
                approvedRequests
                  .filter(req => req.status === 'Completed')
                  .reduce((sum, req) => sum + req.amount, 0)
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Total completed transfers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Approved Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Approved Requests ({approvedRequests.length})</CardTitle>
          <CardDescription>List of all approved withdrawal requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Approved Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvedRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-mono text-sm">{request.id}</TableCell>
                  <TableCell>{request.username}</TableCell>
                  <TableCell className="font-semibold">
                    {formatAmount(request.amount)}
                  </TableCell>
                  <TableCell>
                    {new Date(request.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(request.approvedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(request.status)}>
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {request.status === 'Approved' && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" className="h-8">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Final Approve
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Final Approval</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to complete this request and transfer {formatAmount(request.amount)} 
                              to user "{request.username}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleFinalApprove(request.id)}
                            >
                              Complete Transfer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                    {request.status === 'Completed' && (
                      <Badge variant="outline" className="text-success border-success">
                        Completed
                      </Badge>
                    )}
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, TrendingUp, Activity, DollarSign, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
// Chart imports removed - will be added back when API provides chart data
import { useDashboard } from '@/hooks/useDashboard';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Dashboard() {
  const { data, loading, error, refetch } = useDashboard();

  // Show loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Monitor your platform's performance and growth
            </p>
          </div>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={refetch}
              className="ml-4"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Use API data or fallback to default values
  const summaryCards = [
    {
      title: 'Total Users',
      value: data?.users?.total?.toLocaleString() || '0',
      change: data?.users?.growth || '+0%',
      icon: Users,
      trend: 'up',
    },
    {
      title: 'Active Users',
      value: data?.users?.active?.toLocaleString() || '0',
      change: data?.users?.growth || '+0%',
      icon: Activity,
      trend: 'up',
    },
    {
      title: 'Transaction Volume',
      value: data?.transactions?.volume ? `$${data.transactions.volume.toLocaleString()}` : '$0',
      change: data?.transactions?.growth || '+0%',
      icon: DollarSign,
      trend: 'up',
    },
    {
      title: 'Total Games',
      value: data?.games?.total?.toLocaleString() || '0',
      change: `${data?.games?.today || 0} today`,
      icon: TrendingUp,
      trend: 'up',
    },
  ];

  // For now, we'll show a message that charts are coming soon
  // since the API doesn't provide chart data yet
  const showCharts = false;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Monitor your platform's performance and growth
          </p>
        </div>
        <Button
          variant="outline"
          onClick={refetch}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <card.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{card.value}</div>
              <p className="text-xs text-success mt-1">
                {card.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      {showCharts ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Charts will be implemented when API provides chart data */}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Analytics Charts</CardTitle>
            <CardDescription>
              Detailed analytics charts will be available soon
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-64 text-center">
              <div>
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Charts Coming Soon</h3>
                <p className="text-muted-foreground">
                  Advanced analytics and trend charts will be available in the next update.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
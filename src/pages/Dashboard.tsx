import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Users, TrendingUp, Activity, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { chartData } from '@/data/dummyData';

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('7d');
  const [datasetType, setDatasetType] = useState('registrations');

  const summaryCards = [
    {
      title: 'Total Users',
      value: '12,345',
      change: '+12.5%',
      icon: Users,
      trend: 'up',
    },
    {
      title: 'Total Visits',
      value: '45,678',
      change: '+8.2%',
      icon: Activity,
      trend: 'up',
    },
    {
      title: 'Revenue',
      value: '$98,765',
      change: '+15.3%',
      icon: DollarSign,
      trend: 'up',
    },
    {
      title: 'Growth Rate',
      value: '23.1%',
      change: '+2.4%',
      icon: TrendingUp,
      trend: 'up',
    },
  ];

  const currentData = datasetType === 'registrations' ? chartData.userRegistrations : chartData.urlVisits;
  const chartTitle = datasetType === 'registrations' ? 'User Registrations' : 'URL Visits';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Monitor your platform's performance and growth
          </p>
        </div>
        <div className="flex gap-4">
          <Select value={datasetType} onValueChange={setDatasetType}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select dataset" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="registrations">User Registrations</SelectItem>
              <SelectItem value="visits">URL Visits</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Day</SelectItem>
              <SelectItem value="7d">Week</SelectItem>
              <SelectItem value="15d">15 Days</SelectItem>
              <SelectItem value="30d">Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{chartTitle} - Line Chart</CardTitle>
            <CardDescription>
              Showing {chartTitle.toLowerCase()} over the last 7 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="name"
                  className="text-muted-foreground"
                  fontSize={12}
                />
                <YAxis
                  className="text-muted-foreground"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey={datasetType === 'registrations' ? 'users' : 'visits'}
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{chartTitle} - Bar Chart</CardTitle>
            <CardDescription>
              Monthly comparison of {chartTitle.toLowerCase()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="name"
                  className="text-muted-foreground"
                  fontSize={12}
                />
                <YAxis
                  className="text-muted-foreground"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar
                  dataKey={datasetType === 'registrations' ? 'users' : 'visits'}
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
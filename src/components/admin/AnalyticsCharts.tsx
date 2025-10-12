import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, Calendar, Mail, MailOpen } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { getEmailStats } from '@/services/emailService';
import { useMemo } from 'react';

export default function AnalyticsCharts() {
  const { demoRequests } = useAppContext();
  const emailStats = getEmailStats();

  const stats = useMemo(() => {
    const total = demoRequests.length;
    const thisMonth = demoRequests.filter(req => {
      const date = new Date(req.createdAt);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length;
    
    const completed = demoRequests.filter(req => req.status === 'completed').length;
    const conversionRate = total > 0 ? ((completed / total) * 100).toFixed(0) : '0';
    
    return [
      { title: 'Total Demo Requests', value: total.toString(), change: `${thisMonth} this month`, icon: Users, color: 'text-[#00E0FF]' },
      { title: 'Conversion Rate', value: `${conversionRate}%`, change: `${completed} completed`, icon: TrendingUp, color: 'text-[#947EFF]' },
      { title: 'Emails Sent', value: emailStats.sent.toString(), change: `${emailStats.openRate}% open rate`, icon: Mail, color: 'text-blue-400' },
      { title: 'Emails Opened', value: emailStats.opened.toString(), change: `${emailStats.sent - emailStats.opened} pending`, icon: MailOpen, color: 'text-green-400' },
    ];
  }, [demoRequests, emailStats]);

  const chartData = useMemo(() => {
    const monthlyData: Record<string, number> = {};
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Initialize last 8 months
    const now = new Date();
    for (let i = 7; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = months[date.getMonth()];
      monthlyData[monthKey] = 0;
    }
    
    // Count requests per month
    demoRequests.forEach(req => {
      const date = new Date(req.createdAt);
      const monthKey = months[date.getMonth()];
      if (monthlyData.hasOwnProperty(monthKey)) {
        monthlyData[monthKey]++;
      }
    });
    
    return Object.entries(monthlyData).map(([month, requests]) => ({ month, requests }));
  }, [demoRequests]);

  const maxValue = Math.max(...chartData.map(d => d.requests), 1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx} className="bg-[#0F1520] border-[#00E0FF]/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-[#0F1520] border-[#00E0FF]/20">
        <CardHeader>
          <CardTitle className="text-white">Demo Requests Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between gap-2">
            {chartData.map((data, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="relative w-full flex items-end justify-center">
                  {data.requests > 0 && (
                    <span className="absolute -top-6 text-xs text-[#00E0FF] font-semibold">{data.requests}</span>
                  )}
                  <div 
                    className="w-full bg-gradient-to-t from-[#00E0FF] to-[#947EFF] rounded-t transition-all hover:opacity-80 cursor-pointer"
                    style={{ height: `${(data.requests / maxValue) * 200}px`, minHeight: data.requests > 0 ? '20px' : '0px' }}
                    title={`${data.month}: ${data.requests} requests`}
                  />
                </div>
                <span className="text-xs text-gray-400">{data.month}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, Settings, LogOut, BarChart3 } from 'lucide-react';
import DemoRequestsTable from '@/components/admin/DemoRequestsTable';
import AnalyticsCharts from '@/components/admin/AnalyticsCharts';
import ClientAccounts from '@/components/admin/ClientAccounts';
import SettingsPanel from '@/components/admin/SettingsPanel';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#0A0F1A]">
      {/* Header */}
      <header className="bg-[#0F1520] border-b border-[#00E0FF]/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#00E0FF] to-[#947EFF] rounded-lg flex items-center justify-center">
              <LayoutDashboard className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Innobiz AI Admin</h1>
              <p className="text-xs text-gray-400">DataSense Management</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-white font-medium">{user?.name}</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="border-[#00E0FF]/30">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-[#0F1520] border border-[#00E0FF]/20">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#00E0FF]/20">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="requests" className="data-[state=active]:bg-[#00E0FF]/20">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Demo Requests
            </TabsTrigger>
            <TabsTrigger value="clients" className="data-[state=active]:bg-[#00E0FF]/20">
              <Users className="h-4 w-4 mr-2" />
              Clients
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-[#00E0FF]/20">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <AnalyticsCharts />
          </TabsContent>

          <TabsContent value="requests">
            <div className="bg-[#0F1520] border border-[#00E0FF]/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Demo Requests</h2>
              <DemoRequestsTable />
            </div>
          </TabsContent>

          <TabsContent value="clients">
            <ClientAccounts />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsPanel />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

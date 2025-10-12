import { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppContext } from '@/contexts/AppContext';
import { Mail, MailOpen, Phone } from 'lucide-react';

export default function DemoRequestsTable() {
  const { demoRequests, updateDemoRequestStatus } = useAppContext();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const filteredData = useMemo(() => {
    let result = demoRequests.filter(item => 
      (statusFilter === 'all' || item.status === statusFilter) &&
      (item.name.toLowerCase().includes(search.toLowerCase()) || 
       item.email.toLowerCase().includes(search.toLowerCase()) ||
       item.company.toLowerCase().includes(search.toLowerCase()))
    );

    return result.sort((a, b) => {
      if (sortBy === 'date') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [demoRequests, search, statusFilter, sortBy]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'contacted': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'scheduled': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 flex-wrap">
        <Input
          placeholder="Search by name, email, or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm bg-[#0A0F1A] border-[#00E0FF]/30 text-white"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 bg-[#0A0F1A] border-[#00E0FF]/30 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-40 bg-[#0A0F1A] border-[#00E0FF]/30 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Sort by Date</SelectItem>
            <SelectItem value="name">Sort by Name</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border border-[#00E0FF]/20 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#0F1520] border-[#00E0FF]/20">
              <TableHead className="text-[#00E0FF]">Name</TableHead>
              <TableHead className="text-[#00E0FF]">Email</TableHead>
              <TableHead className="text-[#00E0FF]">Company</TableHead>
              <TableHead className="text-[#00E0FF]">Phone</TableHead>
              <TableHead className="text-[#00E0FF]">Date</TableHead>
              <TableHead className="text-[#00E0FF]">Email Status</TableHead>
              <TableHead className="text-[#00E0FF]">Status</TableHead>
              <TableHead className="text-[#00E0FF]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-gray-400 py-8">
                  No demo requests found
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((item) => (
                <TableRow key={item.id} className="border-[#00E0FF]/10">
                  <TableCell className="text-white font-medium">{item.name}</TableCell>
                  <TableCell className="text-gray-400">{item.email}</TableCell>
                  <TableCell className="text-gray-400">{item.company}</TableCell>
                  <TableCell className="text-gray-400 flex items-center gap-1">
                    <Phone size={14} />
                    {item.phone}
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {new Date(item.createdAt).toLocaleDateString('es-ES')}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {item.emailSent ? (
                        <>
                          {item.emailOpened ? (
                            <MailOpen size={16} className="text-green-400" title="Email opened" />
                          ) : (
                            <Mail size={16} className="text-blue-400" title="Email sent" />
                          )}
                        </>
                      ) : (
                        <Mail size={16} className="text-gray-500" title="Email not sent" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={item.status} 
                      onValueChange={(value) => updateDemoRequestStatus(item.id, value as any)}
                    >
                      <SelectTrigger className={`w-32 text-xs border ${getStatusColor(item.status)}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs border-[#00E0FF]/30 hover:bg-[#00E0FF]/10"
                      onClick={() => window.open(`mailto:${item.email}`)}
                    >
                      Contact
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

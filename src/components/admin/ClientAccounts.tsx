import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Client {
  id: number;
  name: string;
  email: string;
  company: string;
  plan: string;
}

export default function ClientAccounts() {
  const [clients, setClients] = useState<Client[]>([
    { id: 1, name: 'María González', email: 'maria@techcorp.com', company: 'TechCorp', plan: 'Enterprise' },
    { id: 2, name: 'Carlos Ruiz', email: 'carlos@innovagroup.com', company: 'InnovaGroup', plan: 'Professional' },
    { id: 3, name: 'Ana Martínez', email: 'ana@startuplab.com', company: 'StartupLab', plan: 'Starter' },
  ]);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSave = (client: Client) => {
    if (editingClient) {
      setClients(clients.map(c => c.id === client.id ? client : c));
      toast({ title: 'Client updated successfully' });
    } else {
      setClients([...clients, { ...client, id: Date.now() }]);
      toast({ title: 'Client added successfully' });
    }
    setIsDialogOpen(false);
    setEditingClient(null);
  };

  const handleDelete = (id: number) => {
    setClients(clients.filter(c => c.id !== id));
    toast({ title: 'Client deleted successfully' });
  };

  return (
    <Card className="bg-[#0F1520] border-[#00E0FF]/20">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white">Client Accounts</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#00E0FF] hover:bg-[#00E0FF]/80" onClick={() => setEditingClient(null)}>
              <Plus className="h-4 w-4 mr-2" /> Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0F1520] border-[#00E0FF]/20">
            <DialogHeader>
              <DialogTitle className="text-white">{editingClient ? 'Edit' : 'Add'} Client</DialogTitle>
            </DialogHeader>
            <ClientForm client={editingClient} onSave={handleSave} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-[#00E0FF]/20">
              <TableHead className="text-[#00E0FF]">Name</TableHead>
              <TableHead className="text-[#00E0FF]">Email</TableHead>
              <TableHead className="text-[#00E0FF]">Company</TableHead>
              <TableHead className="text-[#00E0FF]">Plan</TableHead>
              <TableHead className="text-[#00E0FF]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id} className="border-[#00E0FF]/10">
                <TableCell className="text-white">{client.name}</TableCell>
                <TableCell className="text-gray-400">{client.email}</TableCell>
                <TableCell className="text-gray-400">{client.company}</TableCell>
                <TableCell className="text-gray-400">{client.plan}</TableCell>
                <TableCell className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => { setEditingClient(client); setIsDialogOpen(true); }}>
                    <Pencil className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(client.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function ClientForm({ client, onSave }: { client: Client | null; onSave: (client: Client) => void }) {
  const [formData, setFormData] = useState(client || { id: 0, name: '', email: '', company: '', plan: 'Starter' });

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="space-y-4">
      <div>
        <Label className="text-white">Name</Label>
        <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
          className="bg-[#0A0F1A] border-[#00E0FF]/30 text-white" required />
      </div>
      <div>
        <Label className="text-white">Email</Label>
        <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
          className="bg-[#0A0F1A] border-[#00E0FF]/30 text-white" required />
      </div>
      <div>
        <Label className="text-white">Company</Label>
        <Input value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} 
          className="bg-[#0A0F1A] border-[#00E0FF]/30 text-white" required />
      </div>
      <div>
        <Label className="text-white">Plan</Label>
        <Input value={formData.plan} onChange={(e) => setFormData({ ...formData, plan: e.target.value })} 
          className="bg-[#0A0F1A] border-[#00E0FF]/30 text-white" required />
      </div>
      <Button type="submit" className="w-full bg-[#00E0FF] hover:bg-[#00E0FF]/80">Save</Button>
    </form>
  );
}

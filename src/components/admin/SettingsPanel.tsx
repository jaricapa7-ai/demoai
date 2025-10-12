import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPanel() {
  const [settings, setSettings] = useState({
    apiKey: 'ds_live_••••••••••••••••',
    webhookUrl: 'https://api.innobiz.io/webhooks',
    emailNotifications: true,
    autoResponse: true,
    maxDemoRequests: '100',
    responseTemplate: 'Thank you for your interest in DataSense. Our team will contact you within 24 hours.',
  });
  const { toast } = useToast();

  const handleSave = () => {
    toast({ title: 'Settings saved successfully', description: 'Your DataSense configuration has been updated.' });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-[#0F1520] border-[#00E0FF]/20">
        <CardHeader>
          <CardTitle className="text-white">API Configuration</CardTitle>
          <CardDescription className="text-gray-400">Manage DataSense API settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-white">API Key</Label>
            <Input 
              value={settings.apiKey} 
              onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
              className="bg-[#0A0F1A] border-[#00E0FF]/30 text-white mt-2"
            />
          </div>
          <div>
            <Label className="text-white">Webhook URL</Label>
            <Input 
              value={settings.webhookUrl} 
              onChange={(e) => setSettings({ ...settings, webhookUrl: e.target.value })}
              className="bg-[#0A0F1A] border-[#00E0FF]/30 text-white mt-2"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#0F1520] border-[#00E0FF]/20">
        <CardHeader>
          <CardTitle className="text-white">Notification Settings</CardTitle>
          <CardDescription className="text-gray-400">Configure demo request notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-white">Email Notifications</Label>
            <Switch 
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-white">Auto Response</Label>
            <Switch 
              checked={settings.autoResponse}
              onCheckedChange={(checked) => setSettings({ ...settings, autoResponse: checked })}
            />
          </div>
          <div>
            <Label className="text-white">Response Template</Label>
            <Textarea 
              value={settings.responseTemplate}
              onChange={(e) => setSettings({ ...settings, responseTemplate: e.target.value })}
              className="bg-[#0A0F1A] border-[#00E0FF]/30 text-white mt-2"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#0F1520] border-[#00E0FF]/20">
        <CardHeader>
          <CardTitle className="text-white">Limits & Quotas</CardTitle>
          <CardDescription className="text-gray-400">Set system limits</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Label className="text-white">Max Demo Requests per Month</Label>
            <Input 
              type="number"
              value={settings.maxDemoRequests}
              onChange={(e) => setSettings({ ...settings, maxDemoRequests: e.target.value })}
              className="bg-[#0A0F1A] border-[#00E0FF]/30 text-white mt-2"
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full bg-gradient-to-r from-[#00E0FF] to-[#947EFF] hover:opacity-90">
        Save All Settings
      </Button>
    </div>
  );
}

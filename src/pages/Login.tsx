import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const success = await login(email, password);
    
    if (success) {
      toast({ title: 'Login successful', description: 'Welcome to Innobiz AI Admin' });
      navigate('/admin');
    } else {
      toast({ title: 'Login failed', description: 'Invalid credentials', variant: 'destructive' });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0F1A] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#0F1520] border border-[#00E0FF]/20 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Innobiz AI</h1>
            <p className="text-gray-400">Admin Dashboard Login</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#0A0F1A] border-[#00E0FF]/30 text-white mt-2"
                placeholder="admin@innobiz.io"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#0A0F1A] border-[#00E0FF]/30 text-white mt-2"
                placeholder="••••••••"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-[#00E0FF] to-[#947EFF] hover:opacity-90"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-6">
            Demo: admin@innobiz.io / datasense2025
          </p>
        </div>
      </div>
    </div>
  );
}

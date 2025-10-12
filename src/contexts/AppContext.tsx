import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';
import { sendDemoConfirmationEmail, sendAdminNotificationEmail } from '@/services/emailService';

export interface DemoRequest {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  status: 'pending' | 'contacted' | 'scheduled' | 'completed';
  createdAt: string;
  emailSent: boolean;
  emailOpened: boolean;
}

interface AppContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  demoRequests: DemoRequest[];
  addDemoRequest: (request: Omit<DemoRequest, 'id' | 'status' | 'createdAt' | 'emailSent' | 'emailOpened'>) => Promise<void>;
  updateDemoRequestStatus: (id: string, status: DemoRequest['status']) => void;
}


const defaultAppContext: AppContextType = {
  sidebarOpen: false,
  toggleSidebar: () => {},
  demoRequests: [],
  addDemoRequest: async () => {},
  updateDemoRequestStatus: () => {},
};

const AppContext = createContext<AppContextType>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [demoRequests, setDemoRequests] = useState<DemoRequest[]>(() => {
    const saved = localStorage.getItem('demoRequests');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('demoRequests', JSON.stringify(demoRequests));
  }, [demoRequests]);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const addDemoRequest = async (request: Omit<DemoRequest, 'id' | 'status' | 'createdAt' | 'emailSent' | 'emailOpened'>) => {
    const newRequest: DemoRequest = {
      ...request,
      id: uuidv4(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      emailSent: false,
      emailOpened: false,
    };

    setDemoRequests(prev => [newRequest, ...prev]);

    // Send emails
    try {
      const [confirmSent, adminSent] = await Promise.all([
        sendDemoConfirmationEmail(newRequest),
        sendAdminNotificationEmail(newRequest)
      ]);

      if (confirmSent && adminSent) {
        setDemoRequests(prev => 
          prev.map(req => req.id === newRequest.id ? { ...req, emailSent: true } : req)
        );
      }
    } catch (error) {
      console.error('Error sending emails:', error);
    }
  };

  const updateDemoRequestStatus = (id: string, status: DemoRequest['status']) => {
    setDemoRequests(prev => 
      prev.map(req => req.id === id ? { ...req, status } : req)
    );
  };

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        demoRequests,
        addDemoRequest,
        updateDemoRequestStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};


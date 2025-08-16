import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { AdminPanel } from './components/AdminPanel';
import { MainApp } from './components/MainApp';

type View = 'login' | 'register' | 'admin' | 'main';

function AppContent() {
  const { isAuthenticated, user, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState<View>('login');

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin') {
        setCurrentView('admin');
      } else if (user.role === 'user' && user.status === 'approved') {
        setCurrentView('main');
      } else {
        setCurrentView('login');
      }
    } else {
      setCurrentView('login');
    }
  }, [isAuthenticated, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading application...</div>
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'login':
        return (
          <LoginForm 
            onShowRegister={() => setCurrentView('register')}
          />
        );
      case 'register':
        return (
          <RegisterForm 
            onShowLogin={() => setCurrentView('login')}
          />
        );
      case 'admin':
        return <AdminPanel />;
      case 'main':
        return <MainApp />;
      default:
        return (
          <LoginForm 
            onShowRegister={() => setCurrentView('register')}
          />
        );
    }
  };

  return renderView();
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
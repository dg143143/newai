import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { AdminPanel } from './components/AdminPanel';
import { MainApp } from './components/MainApp';

type View = 'login' | 'register' | 'admin' | 'main';

function AppContent() {
  const { isAuthenticated, user } = useAuth();
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
import React, { useState, useEffect } from 'react';
import { Rocket, LogOut, Shield, TrendingUp, Users, BarChart3, Database } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const MainApp: React.FC = () => {
  const { logout, user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 mb-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">SmartSignal Pro v2</h1>
                <p className="text-slate-300">
                  Welcome back, {user?.username}! Your account is approved and active. 
                  <span className="ml-2 text-blue-300">
                    {currentTime.toLocaleTimeString()}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-slate-300">Logged in as</p>
                <p className="text-white font-semibold capitalize">{user?.role}</p>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Backend Connection Status */}
        <div className="bg-green-100 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-green-600" />
            <p className="text-green-800 font-medium">
              ✅ Connected to Backend Database | 
              Role: <span className="capitalize font-bold">{user?.role}</span> | 
              Status: <span className="capitalize font-bold">{user?.status}</span> |
              User ID: <span className="font-mono text-sm">{user?.id}</span>
            </p>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-200 cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-green-400 text-sm font-medium">+12.5%</span>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Signal Analytics</h3>
            <p className="text-slate-300 text-sm">
              Advanced trading signal analysis with real-time market data and predictive algorithms.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-200 cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-blue-400 text-sm font-medium">Live</span>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Market Dashboard</h3>
            <p className="text-slate-300 text-sm">
              Real-time market monitoring with customizable charts and technical indicators.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-200 cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-yellow-400 text-sm font-medium">Pro</span>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Community Hub</h3>
            <p className="text-slate-300 text-sm">
              Connect with other traders, share insights, and access premium signal channels.
            </p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-6">
              <Rocket className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Welcome to SmartSignal Pro v2
            </h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Your account has been approved by the admin and you now have full access to all premium features. 
              All your data is securely stored in our central backend database and synced in real-time.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-left">
                <h3 className="text-white font-semibold mb-2">🎯 Smart Signals</h3>
                <p className="text-slate-400 text-sm">
                  AI-powered trading signals with 85%+ accuracy rate and real-time notifications from our backend.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-left">
                <h3 className="text-white font-semibold mb-2">📊 Advanced Analytics</h3>
                <p className="text-slate-400 text-sm">
                  Comprehensive market analysis tools with data stored and processed on our secure servers.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-left">
                <h3 className="text-white font-semibold mb-2">🔔 Real-time Alerts</h3>
                <p className="text-slate-400 text-sm">
                  Instant notifications for market opportunities synced across all your devices via our API.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-left">
                <h3 className="text-white font-semibold mb-2">👥 Premium Support</h3>
                <p className="text-slate-400 text-sm">
                  24/7 dedicated support team with your account data securely managed in our central database.
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-600/20 border border-blue-500/30 rounded-lg">
              <p className="text-blue-200 text-sm">
                🔒 <strong>Secure Backend Integration:</strong> All your account data, preferences, and activity 
                are stored securely in our central database. Changes made by admins are instantly reflected 
                across all connected clients.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
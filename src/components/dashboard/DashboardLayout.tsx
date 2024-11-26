import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount, useDisconnect } from 'wagmi';
import {
  FiHome,
  FiUser,
  FiKey,
  FiMenu,
  FiX,
  FiLogOut,
  FiClock,
  FiBox,
  FiStar,
  FiTrendingUp
} from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AgoricCredentialSystem } from './AgoricCredentialSystem';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);

  const menuItems = [
    {
      name: 'Overview',
      href: '/dashboard',
      icon: FiHome,
      gradient: 'from-neon-blue to-neon-purple',
    },
    {
      name: 'Time Capsules',
      href: '/dashboard/time-capsules',
      icon: FiClock,
      gradient: 'from-neon-purple to-neon-pink',
    },
    {
      name: 'Profile',
      href: '/dashboard/profile',
      icon: FiUser,
      gradient: 'from-neon-pink to-neon-yellow',
    },
    {
      name: 'Credentials',
      href: '/dashboard/credentials',
      icon: FiKey,
      gradient: 'from-neon-yellow to-neon-green',
      component: AgoricCredentialSystem,
    },
  ];

  const handleDisconnect = () => {
    setShowDisconnectModal(true);
  };

  const confirmDisconnect = () => {
    disconnect();
    toast.success('Wallet disconnected');
    navigate('/');
    setShowDisconnectModal(false);
  };

  return (
    <div className="min-h-screen bg-dark-900 bg-cyber-grid bg-[size:50px_50px] relative overflow-hidden">
      {/* Animated background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-neon-blue/10 via-neon-purple/5 to-neon-pink/10 animate-gradient-shift" />
      <div className="fixed inset-0 bg-cyber-grid bg-[size:50px_50px] opacity-30" />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-50" />
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-neon-purple to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-pink to-transparent opacity-50" />
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-neon-yellow to-transparent opacity-50" />
      </div>

      {/* Mobile menu button */}
      <motion.button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-dark-800/90 backdrop-blur-sm border border-neon-blue/20 
                   text-neon-blue rounded-xl shadow-neon-glow"
        whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(96, 165, 250, 0.5)' }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isSidebarOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isSidebarOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </motion.div>
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="fixed top-0 left-0 h-screen w-[280px] bg-dark-800/50 backdrop-blur-xl 
                     border-r border-dark-600 shadow-neon-glow z-40"
          >
            <div className="flex flex-col h-full">
              <div className="p-6">
                <motion.h2 
                  className="font-cyber text-2xl font-bold bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink 
                           bg-clip-text text-transparent animate-text-gradient"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Time Capsule
                </motion.h2>
                <motion.p 
                  className="text-dark-200 mt-2 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Secure your digital legacy
                </motion.p>
              </div>

              <nav className="flex-1 px-4 space-y-2">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.href}
                    onClick={() => navigate(item.href)}
                    className={`group flex items-center w-full p-3 rounded-xl transition-all
                             hover:bg-dark-700/50 relative overflow-hidden ${
                               location.pathname === item.href ? 'bg-dark-700/50' : ''
                             }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Hover effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />

                    {/* Icon container */}
                    <motion.div 
                      className={`p-2 rounded-lg bg-gradient-to-r ${item.gradient} shadow-neon-glow
                               relative z-10`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <item.icon className="w-5 h-5 text-dark-900" />
                    </motion.div>

                    {/* Menu text */}
                    <span className="ml-3 font-medium text-dark-100 group-hover:text-neon-blue 
                                   transition-colors relative z-10">
                      {item.name}
                    </span>

                    {/* Active indicator */}
                    {location.pathname === item.href && (
                      <motion.div
                        className="absolute right-2 w-1.5 h-1.5 rounded-full bg-neon-blue"
                        layoutId="activeIndicator"
                      />
                    )}
                  </motion.button>
                ))}
              </nav>

              {/* Stats Card */}
              <div className="p-4">
                <motion.div 
                  className="p-4 rounded-xl bg-dark-700/50 border border-dark-600 backdrop-blur-lg
                           relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 bg-cyber-grid bg-[size:20px_20px] opacity-10" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-3">
                      <motion.div 
                        className="p-2 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple shadow-neon-glow"
                        whileHover={{ scale: 1.1, rotate: 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FiTrendingUp className="w-5 h-5 text-dark-900" />
                      </motion.div>
                      <h3 className="ml-3 font-cyber font-semibold text-dark-100">Quick Stats</h3>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-dark-300">Active Capsules</span>
                        <motion.span 
                          className="font-medium text-neon-blue"
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          12
                        </motion.span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-dark-300">Total Storage</span>
                        <motion.span 
                          className="font-medium text-neon-purple"
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        >
                          2.4 GB
                        </motion.span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-dark-300">Network Status</span>
                        <div className="flex items-center gap-2">
                          <motion.div
                            className="w-2 h-2 rounded-full bg-neon-green"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <span className="text-sm text-neon-green">Online</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* User Profile */}
              <div className="p-4 mt-auto">
                <motion.div
                  className="flex items-center gap-3 p-3 rounded-xl bg-dark-700/50 border border-dark-600
                           hover:bg-dark-600/50 transition-all cursor-pointer group relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDisconnect}
                >
                  {/* Hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />

                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple
                                  flex items-center justify-center shadow-neon-glow">
                      <FiUser className="w-5 h-5 text-dark-900" />
                    </div>
                  </div>

                  <div className="flex-1 relative z-10">
                    <div className="text-sm font-medium text-dark-100">
                      {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'}
                    </div>
                    <div className="text-xs text-dark-300">Click to disconnect</div>
                  </div>

                  <motion.div
                    className="relative z-10"
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiLogOut className="w-5 h-5 text-dark-300 group-hover:text-neon-red transition-colors" />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <motion.main
        className={`min-h-screen ${isSidebarOpen ? 'lg:pl-[280px]' : ''} relative z-10`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex-1 p-8">
          <div className="relative z-10">
            {location.pathname === '/dashboard/credentials' ? (
              <AgoricCredentialSystem />
            ) : (
              children
            )}
          </div>
        </div>
      </motion.main>

      {/* Disconnect Modal */}
      <AnimatePresence>
        {showDisconnectModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark-900/80 backdrop-blur-lg z-50 flex items-center justify-center p-4"
            onClick={() => setShowDisconnectModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark-800/90 backdrop-blur-xl rounded-xl p-6 max-w-md w-full
                       border border-neon-blue/20 shadow-neon-glow"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-cyber font-bold mb-4">Disconnect Wallet</h3>
              <p className="text-dark-200 mb-6">
                Are you sure you want to disconnect your wallet? You will need to reconnect to access your dashboard.
              </p>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowDisconnectModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg bg-dark-700 text-dark-200
                           hover:bg-dark-600 transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={confirmDisconnect}
                  className="flex-1 px-4 py-2 rounded-lg bg-dark-800 border border-neon-red
                           text-neon-red hover:bg-dark-700 transition-all shadow-neon-red"
                >
                  Disconnect
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

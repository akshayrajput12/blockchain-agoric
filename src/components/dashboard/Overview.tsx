import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiShield, 
  FiClock, 
  FiKey, 
  FiLock, 
  FiUnlock,
  FiTrendingUp,
  FiActivity,
  FiDatabase
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';

export default function Overview() {
  const navigate = useNavigate();
  const { address } = useAccount();

  const stats = [
    {
      icon: FiKey,
      label: 'Active Credentials',
      value: '12',
      gradient: 'from-neon-blue to-neon-purple',
    },
    {
      icon: FiClock,
      label: 'Time Capsules',
      value: '8',
      gradient: 'from-neon-purple to-neon-pink',
    },
    {
      icon: FiLock,
      label: 'Locked',
      value: '5',
      gradient: 'from-neon-pink to-neon-yellow',
    },
    {
      icon: FiUnlock,
      label: 'Unlocked',
      value: '3',
      gradient: 'from-neon-yellow to-neon-green',
    },
  ];

  const activities = [
    {
      type: 'credential',
      title: 'New Credential Issued',
      description: 'Academic Degree verification from University XYZ',
      time: '2 hours ago',
      icon: FiShield,
      gradient: 'from-neon-blue to-neon-purple',
    },
    {
      type: 'capsule',
      title: 'Time Capsule Created',
      description: 'Digital memories locked until 2025',
      time: '5 hours ago',
      icon: FiClock,
      gradient: 'from-neon-purple to-neon-pink',
    },
    {
      type: 'unlock',
      title: 'Capsule Unlocked',
      description: 'Message from past self now available',
      time: '1 day ago',
      icon: FiUnlock,
      gradient: 'from-neon-pink to-neon-yellow',
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-cyber font-bold bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
          Welcome Back
        </h1>
        <p className="text-dark-200 mt-2">
          {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect your wallet to continue'}
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-dark-800/50 backdrop-blur-xl rounded-xl p-6 border border-dark-600 relative overflow-hidden group"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-cyber-grid bg-[size:20px_20px] opacity-10" />
            
            {/* Glowing border */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              initial={false}
              animate={{ 
                boxShadow: [
                  '0 0 0px rgba(96, 165, 250, 0)',
                  '0 0 20px rgba(96, 165, 250, 0.5)',
                  '0 0 0px rgba(96, 165, 250, 0)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            <div className="relative z-10">
              <motion.div 
                className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.gradient} flex items-center justify-center mb-4 shadow-neon-glow`}
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <stat.icon className="w-6 h-6 text-dark-900" />
              </motion.div>
              
              <motion.h3 
                className="text-3xl font-cyber font-bold text-white mb-2"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {stat.value}
              </motion.h3>
              <p className="text-dark-300">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Activity and Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-dark-800/50 backdrop-blur-xl rounded-xl p-6 border border-dark-600 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-cyber-grid bg-[size:20px_20px] opacity-10" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-cyber font-bold">Recent Activity</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-dark-300 hover:text-neon-blue transition-colors"
              >
                View All
              </motion.button>
            </div>

            <div className="space-y-4">
              {activities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-lg bg-dark-700/50 hover:bg-dark-700 transition-colors group relative overflow-hidden"
                >
                  {/* Hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />

                  <motion.div 
                    className={`p-2 rounded-lg bg-gradient-to-r ${activity.gradient} relative z-10`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    <activity.icon className="w-5 h-5 text-dark-900" />
                  </motion.div>

                  <div className="flex-1 relative z-10">
                    <h3 className="font-medium text-white group-hover:text-neon-blue transition-colors">
                      {activity.title}
                    </h3>
                    <p className="text-sm text-dark-300">{activity.description}</p>
                    <p className="text-xs text-dark-400 mt-1">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Network Stats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-dark-800/50 backdrop-blur-xl rounded-xl p-6 border border-dark-600 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-cyber-grid bg-[size:20px_20px] opacity-10" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                className="p-2 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple shadow-neon-glow"
                whileHover={{ scale: 1.1, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <FiActivity className="w-5 h-5 text-dark-900" />
              </motion.div>
              <h2 className="text-xl font-cyber font-bold">Network Stats</h2>
            </div>

            <div className="space-y-6">
              {/* Storage Usage */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-dark-300">Storage Usage</span>
                  <span className="text-neon-blue">2.4 GB / 5 GB</span>
                </div>
                <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
                    initial={{ width: 0 }}
                    animate={{ width: '48%' }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Network Status */}
              <div className="flex items-center justify-between">
                <span className="text-dark-300">Network Status</span>
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-neon-green"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-neon-green">Connected</span>
                </div>
              </div>

              {/* Data Transfer */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-dark-300">Data Transfer</span>
                  <motion.span 
                    className="text-neon-purple"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    1.2 MB/s
                  </motion.span>
                </div>
                <div className="flex items-center gap-2">
                  <FiTrendingUp className="w-4 h-4 text-neon-purple" />
                  <motion.div
                    className="flex-1 h-1 bg-dark-700 rounded-full overflow-hidden"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  >
                    <motion.div
                      className="h-full w-full bg-gradient-to-r from-neon-purple to-neon-pink"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </motion.div>
                </div>
              </div>

              {/* Database Status */}
              <div className="flex items-center justify-between">
                <span className="text-dark-300">Database Status</span>
                <div className="flex items-center gap-2">
                  <FiDatabase className="w-4 h-4 text-neon-blue" />
                  <motion.span 
                    className="text-neon-blue"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    Synced
                  </motion.span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

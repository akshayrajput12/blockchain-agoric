import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Hero() {
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isConnected) {
      navigate('/dashboard');
    } else {
      open();
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const glowVariants = {
    initial: { scale: 1, opacity: 0.5 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 0 15px rgb(99, 102, 241)",
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: { scale: 0.95 },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_70%)]" />
      </motion.div>

      {/* Floating shapes */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl"
        animate={{
          y: [0, 30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-xl"
        animate={{
          y: [0, -40, 0],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 container mx-auto px-6 py-16 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Glowing circle behind title */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl"
          variants={glowVariants}
          initial="initial"
          animate="animate"
        />

        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500"
          variants={itemVariants}
        >
          Secure Your Digital Legacy
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Transform how you manage and transfer digital assets with our innovative blockchain solution.
        </motion.p>

        <motion.button
          onClick={handleGetStarted}
          className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold flex items-center justify-center mx-auto space-x-2 hover:bg-indigo-700 transition-colors"
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
        >
          <span>Get Started</span>
          <ChevronRight className="w-5 h-5" />
        </motion.button>

        {/* Animated features grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { title: "Secure", desc: "Military-grade encryption" },
            { title: "Decentralized", desc: "Powered by blockchain" },
            { title: "User-Friendly", desc: "Intuitive interface" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(31, 41, 55, 0.7)",
                transition: { duration: 0.2 },
              }}
            >
              <h3 className="text-xl font-semibold mb-2 text-indigo-400">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
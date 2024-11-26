import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Key, Shield } from 'lucide-react';

const steps = [
  {
    icon: <Lock className="w-8 h-8" />,
    title: 'Create Your Vault',
    description: 'Set up your secure digital vault with military-grade encryption.',
  },
  {
    icon: <Key className="w-8 h-8" />,
    title: 'Add Digital Assets',
    description: 'Store your cryptocurrencies, NFTs, and digital credentials.',
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Set Up Transfer',
    description: 'Define conditions for asset transfer to your beneficiaries.',
  },
];

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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.2,
    },
  },
};

export default function HowItWorks() {
  return (
    <section className="py-20 relative overflow-hidden" id="how-it-works">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-indigo-500/20 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500"
            variants={itemVariants}
          >
            How It Works
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Secure your digital legacy in three simple steps
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Connecting lines */}
          <motion.div
            className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-indigo-500/50 to-purple-500/50"
            variants={lineVariants}
          />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(31, 41, 55, 0.7)",
                transition: { duration: 0.2 },
              }}
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white"
                variants={iconVariants}
                whileHover="hover"
              >
                {step.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 text-indigo-400">
                {step.title}
              </h3>
              <p className="text-gray-400">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
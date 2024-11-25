import React from 'react';
import { Shield, Link, Lock, Globe, Wallet } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Decentralized and Secure',
    description: 'Your identity, fully owned and protected by you.',
  },
  {
    icon: Link,
    title: 'Cross-Chain Compatibility',
    description: 'Seamlessly interact with multiple blockchain ecosystems.',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'Zero-Knowledge Proofs ensure data privacy.',
  },
  {
    icon: Globe,
    title: 'Global Standards',
    description: 'Built on W3C DID and Verifiable Credentials.',
  },
  {
    icon: Wallet,
    title: 'Ease of Use',
    description: 'User-friendly wallet for managing your credentials effortlessly.',
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-black/30">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">Why Choose UIMS?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group"
            >
              <feature.icon className="w-12 h-12 mb-6 text-blue-400 group-hover:text-purple-400 transition-colors duration-300" />
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import UseCases from './components/UseCases';
import Security from './components/Security';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ConnectWallet from './components/shared/ConnectWallet';
import DIDGenerator from './components/auth/DIDGenerator';
import CredentialWallet from './components/credentials/CredentialWallet';
import { useAuthStore } from './lib/store';

function App() {
  const { isAuthenticated, did } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="fixed top-4 right-4 z-50">
        <ConnectWallet />
      </div>
      <Hero />
      <Features />
      <HowItWorks />
      {isAuthenticated && !did && (
        <div className="container mx-auto px-6 py-12">
          <DIDGenerator />
        </div>
      )}
      {isAuthenticated && did && (
        <CredentialWallet />
      )}
      <UseCases />
      <Security />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
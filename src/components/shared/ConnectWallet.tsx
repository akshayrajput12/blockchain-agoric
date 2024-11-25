import React from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';
import { useAuthStore } from '../../lib/store';

export default function ConnectWallet() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { setAuth, clearAuth } = useAuthStore();

  React.useEffect(() => {
    if (isConnected && address) {
      setAuth(address);
    } else {
      clearAuth();
    }
  }, [isConnected, address, setAuth, clearAuth]);

  return (
    <button
      onClick={() => open()}
      className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold 
                hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
    >
      {isConnected ? 'Connected' : 'Connect Wallet'}
    </button>
  );
}
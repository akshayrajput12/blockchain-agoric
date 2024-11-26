import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { mainnet, hardhat } from 'viem/chains';

// Get projectId at https://cloud.walletconnect.com
const projectId = 'e81f503a854c7cd03cb88213ce45ba67';

// Create custom hardhat chain configuration
const localHardhat = {
  ...hardhat,
  id: 31337,
  name: 'Hardhat Local',
  network: 'hardhat',
  nativeCurrency: {
    name: 'Hardhat Ether',
    symbol: 'hETH',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:8545'],
    },
    public: {
      http: ['http://127.0.0.1:8545'],
    },
  },
};

// Create wagmiConfig
const metadata = {
  name: 'UIMS Platform',
  description: 'UIMS Platform Web3 Integration',
  url: typeof window !== 'undefined' ? window.location.origin : '',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

// Add all supported chains
const chains = [localHardhat, mainnet];

// Create wagmiConfig
export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

// Initialize modal
createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-font-family': 'Roboto, sans-serif',
    '--w3m-accent-color': '#6366f1',
    '--w3m-bg-color': '#1e1e1e',
    '--w3m-overlay-backdrop-filter': 'blur(5px)',
  }
});

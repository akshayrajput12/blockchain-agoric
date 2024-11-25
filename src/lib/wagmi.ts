import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { mainnet } from 'wagmi/chains'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = 'e81f503a854c7cd03cb88213ce45ba67'

// 2. Create wagmiConfig
const metadata = {
  name: 'UIMS Platform',
  description: 'UIMS Platform Web3 Integration',
  url: window.location.origin,
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet]

// Configure connectors
const connectors = [
  new MetaMaskConnector({ chains }),
  new WalletConnectConnector({
    chains,
    options: {
      projectId,
      metadata,
      qrcode: true
    },
  })
]

export const wagmiConfig = defaultWagmiConfig({ 
  chains, 
  projectId, 
  metadata,
  connectors
})

// 3. Create modal
createWeb3Modal({ 
  wagmiConfig, 
  projectId, 
  chains,
  defaultChain: mainnet,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-font-family': 'Roboto, sans-serif',
    '--w3m-accent-color': '#6366f1'
  }
})

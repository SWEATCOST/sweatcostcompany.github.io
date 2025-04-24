// src/main.js
import { Web3Modal } from '@web3modal/standalone'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { configureChains, createClient } from '@wagmi/core'
import { bsc } from '@wagmi/chains'
import { ethers } from 'ethers'

// 1) WalletConnect Cloud 에서 발급받은 Project ID
const projectId = 'YOUR_PROJECT_ID_HERE'

// 2) Wagmi + Web3Modal 세팅
const chains = [bsc]
const { provider } = configureChains(chains, [ w3mProvider({ projectId }) ])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  provider
})

// 3) Web3Modal 초기화
const ethereumClient = new EthereumClient(wagmiClient, chains)
const web3Modal      = new Web3Modal({
  projectId,
  theme:    'dark',
  ethereumClient
})

// 4) 버튼 클릭 시 모달 열고, 주소 표시
const btn     = document.getElementById('connectWalletBtn')
const display = document.getElementById('walletDisplay')

btn.addEventListener('click', async () => {
  await web3Modal.openModal()
  const signer  = await wagmiClient.getSigner()
  const address = await signer.getAddress()
  const short   = address.slice(0,6) + '...' + address.slice(-4)

  display.innerText    = 'Connected: ' + short
  btn.style.background = '#00ffc8'
  btn.style.color      = '#000'
})

import { Web3Modal } from '@web3modal/standalone';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { configureChains, createClient } from '@wagmi/core';
import { mainnet, bsc } from '@wagmi/chains';
import { ethers } from 'ethers';

// 1️⃣ WalletConnect에서 받은 Project ID 입력
const projectId = 'b443e684791b762596a5fd2ab87605b7';

// 2️⃣ 연결할 체인 설정 (BSC 또는 mainnet 등)
const chains = [bsc];

// 3️⃣ wagmi 클라이언트 구성
const { provider } = configureChains(chains, [
  w3mProvider({ projectId })
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  provider
});

const ethereumClient = new EthereumClient(wagmiClient, chains);

// 4️⃣ Web3Modal 초기화
const web3Modal = new Web3Modal({
  projectId,
  theme: 'dark',
  accentColor: 'default',
  ethereumClient
});

// 5️⃣ 버튼 연결 및 이벤트 처리
const connectBtn = document.getElementById('connectWalletBtn');
const displayEl = document.getElementById('walletDisplay');

connectBtn.addEventListener('click', async () => {
  await web3Modal.openModal();
  const signer = await wagmiClient.getSigner();
  const address = await signer.getAddress();
  const short = address.slice(0, 6) + '...' + address.slice(-4);

  displayEl.innerText = 'Connected: ' + short;
  connectBtn.style.background = '#00ffc8';
  connectBtn.style.color = '#000';
});

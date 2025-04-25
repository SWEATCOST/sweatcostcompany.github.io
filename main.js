import { Web3Modal }        from "@web3modal/standalone";
import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { configureChains, createClient } from "wagmi";
import { bsc }              from "@wagmi/chains";
import { ethers }           from "ethers";
// … 여러분의 DApp 초기화/이벤트 코드 …

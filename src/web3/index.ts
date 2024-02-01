import Onboard from '@/pkg/core'
import coinbaseWalletModule from "@web3-onboard/coinbase";
import walletConnectModule from "@web3-onboard/walletconnect";
import trustModule from '@web3-onboard/trust'
import rgiModule from '../pkg/rgi-wallet'

const coinbaseWalletSdk = coinbaseWalletModule();
const walletConnect = walletConnectModule();
const trustConnect = trustModule();
const rgiConnect = rgiModule();

const chains = [
    {
        id: "0x1", // chain ID must be in hexadecimel
        token: "ETH",
        label: "Ethereum Mainnet",
        rpcUrl: 'https://mainnet.infura.io/v3/36006d2f61414df3a295c69ae8b59e50'
    },
    {
        id: "0x3",
        token: "tROP",
        label: "Ethereum Ropsten Testnet",
        rpcUrl: 'https://mainnet.infura.io/v3/36006d2f61414df3a295c69ae8b59e50'
    },
    {
        id: "0x4",
        token: "rETH",
        label: "Ethereum Rinkeby Testnet",
        rpcUrl: 'https://mainnet.infura.io/v3/36006d2f61414df3a295c69ae8b59e50'
    }
];

export const web3Onboard = Onboard({
    wallets: [rgiConnect, walletConnect, coinbaseWalletSdk, trustConnect],
    chains,
    theme: "dark",
    connect: {
        showSidebar: false,
        autoConnectAllPreviousWallet: true
    },
    accountCenter: {
        desktop: {
            enabled: false,
        },
        mobile: {
            enabled: false,
        }
    },
    appMetadata: {
        name: 'RoboGlobal Investment',
        description: 'RoboGlobal Investment',
        agreement: {
            version: '1.0.0',
            termsUrl: 'https://roboglobal.info/term',
            privacyUrl: 'https://roboglobal.info/'
        }
    }
});

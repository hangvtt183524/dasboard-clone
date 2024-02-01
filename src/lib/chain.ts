import {IChainData} from "@/lib/type";

const supportedChains: IChainData[] = [
    {
        name: 'Ethereum Mainnet',
        short_name: 'eth',
        chain: 'ETH',
        network: 'mainnet',
        chain_id: 1,
        network_id: 1,
        rpc_url: 'https://mainnet.infura.io/v3/%API_KEY%',
        native_currency: {
            symbol: 'ETH',
            name: 'Ethereum',
            decimals: '18',
            contractAddress: '',
            balance: '',
        },
    },
    {
        name: 'Binance Smart Chain',
        short_name: 'bsc',
        chain: 'smartchain',
        network: 'mainnet',
        chain_id: 56,
        network_id: 56,
        rpc_url: 'https://bsc-dataseed1.defibit.io/',
        native_currency: {
            symbol: 'BNB',
            name: 'BNB',
            decimals: '18',
            contractAddress: '',
            balance: '',
        },
    },
]

export default supportedChains

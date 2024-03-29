import {IChainData} from "@/lib/type";
import supportedChains from "@/lib/chain";

export function getChainData(chainId?: number): IChainData | null {
    if (!chainId) {
        return null
    }
    const chainData = supportedChains.filter(
        (chain: any) => chain.chain_id === chainId
    )[0]

    if (!chainData) {
        throw new Error('ChainId missing or not supported')
    }

    const API_KEY = '36006d2f61414df3a295c69ae8b59e50'

    if (
        chainData.rpc_url.includes('infura.io') &&
        chainData.rpc_url.includes('%API_KEY%') &&
        API_KEY
    ) {
        const rpcUrl = chainData.rpc_url.replace('%API_KEY%', API_KEY)

        return {
            ...chainData,
            rpc_url: rpcUrl,
        }
    }

    return chainData
}

export function ellipseAddress(address = '', width = 10): string {
    if (!address) {
        return ''
    }
    return `${address.slice(0, width)}...${address.slice(-width)}`
}

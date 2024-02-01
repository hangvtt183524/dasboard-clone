import type { WalletInit, EIP1193Provider } from '@web3-onboard/common'
import { RgiCustomWindow } from './types'

declare const window: RgiCustomWindow

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

function rgiWallet(): WalletInit {
    if (typeof window === 'undefined') return () => null

    return () => {
        return {
            label: 'RGI Wallet',
            // @ts-ignore
            getIcon: async () => (await import('./icon')).default,
            getInterface: async () => {
                const ethereumInjectionExists = window.hasOwnProperty('ethereum')

                let provider: EIP1193Provider

                if (ethereumInjectionExists && window['ethereum']) {
                    provider = window['ethereum']

                    return {
                        provider
                    }
                } else if (window['roboinu']) {
                    provider = window['roboinu']

                    return {
                        provider
                    }
                } else {
                    isMobile
                        ? window.open(`https://eclaim.roboglobal.info/links/${process.env.VUE_APP_WEB_URL}`, '_blank')
                        : window.open('https://chrome.google.com/webstore/detail/robo-wallet-testnet/namdenejojopbnekajecohieicljpcgb/', '_blank')

                    throw new Error('Please Install RGI Wallet to use this wallet')
                }
            }
        }
    }
}

export default rgiWallet;
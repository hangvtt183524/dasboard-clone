import { EIP1193Provider } from '@web3-onboard/common'
export interface RgiCustomWindow extends Window {
    ethereum: EIP1193Provider & {
        isRoboInu?: boolean
    }
    roboinu: EIP1193Provider
}
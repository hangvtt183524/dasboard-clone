import { web3Onboard } from "@/web3";

export interface State {
    web3Onboard: typeof web3Onboard;
    provider: undefined;
    isEnable: boolean;
    holder: boolean;
    idToken: string;
    address: string | null;
    connectedWallet: object | null;
    signature: string | null;
    processing: boolean;
}

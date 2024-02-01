import {EventVote, WalletInfo} from "@/entities/ProposalDetail";
import {getAddressVoted} from "@/api/dao/vote";
import MockEvent from "@/mock/address_vote.json"
import {ethers} from "ethers";

export class VoteAddressInfoUseCase {
    data: Map<EventVote, WalletInfo[]>;

    constructor() {
        this.data = new Map<EventVote, WalletInfo[]>;
    }

    async getData(pId: number, _type: EventVote) {
        const results = await getAddressVoted(pId, _type);
        let walletInfo: WalletInfo[] = []
        for (let index in results) {
            walletInfo.push({
                address: results[index].address,
                value: ethers.utils.formatUnits(results[index].value, process.env.VUE_APP_MAIN_TOKEN_DECIMAL).toString()
            })
        }
        this.data.set(_type, walletInfo)

    }

    async GetMockData() {
        const walletInfo: WalletInfo[] = MockEvent
        for (let index in walletInfo) {
            walletInfo[index].value = ethers.utils.formatUnits(walletInfo[index].value, process.env.VUE_APP_MAIN_TOKEN_DECIMAL).toString()
        }
        this.data.set(EventVote.Options_2, walletInfo)
        this.data.set(EventVote.Options_1, walletInfo)
    }

    getDataFromAPI(_type: EventVote): WalletInfo[] | undefined {
        return this.data.get(_type);
    }

}

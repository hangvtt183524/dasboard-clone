import {IAirDropInfo} from '@/entities/GetAirDropInfo'
import {getAirdropHolder, updateAirdropHolder} from "@/api/airdrop/airdrop";

export class AirDropInfoUseCase {
    data: IAirDropInfo;

    constructor() {
        this.data = {};
    }

    async getData(address: string, times: number) {
        const result = await getAirdropHolder(address, times)

        if (result == undefined) {
            return;
        }
        this.data.address = result.address;
        this.data.amount = result.amount;
        this.data.reward = result.reward;
        this.data.action = result.action;
        this.data.received = result.received;
        this.data.id = result.times;
        this.data.merkleproof = result.merkleProof;
    }

    async updateActionHolder(address: string) {
        const result = await updateAirdropHolder(address)
        return result != undefined;
    }

    getDataFromAPI(): IAirDropInfo {
        return this.data;
    }
}

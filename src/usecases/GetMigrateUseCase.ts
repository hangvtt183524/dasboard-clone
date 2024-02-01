import {IMigrationAirdrop} from "@/entities/GetMigration";
import {getMigrateHolder} from "@/api/migrate/airdrop";

export class MigrateInfoUseCase {
    data: IMigrationAirdrop;

    constructor() {
        this.data = {};
    }

    async getData(address: string) {
        const result = await getMigrateHolder(address)

        if (result == undefined) {
            return;
        }
        this.data.Id = 2;
        this.data.claimed = result.claimed;
        this.data.address = result.address;
        this.data.amount = result.amount;
        this.data.bonus = result.bonus
        this.data.signature = result.signature
    }

    getDataFromAPI(): IMigrationAirdrop {
        return this.data;
    }
}

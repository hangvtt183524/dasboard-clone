import {IPriceToken} from "@/entities/PriceToken";
import {getPriceToken} from "@/api/price/price";

export class PriceTokenUseCase {
    data: IPriceToken;

    constructor() {
        this.data = {symbol: "0x0e6fa9c050c8a707e7f56a2b3695665e4f9eac9b"};
    }

    async getData() {
        const result = await getPriceToken()

        if (result == undefined) {
            return;
        }
        this.data.symbol = result.symbol;
        this.data.price = result.price;
    }

    getDataFromAPI() {
        return this.data;
    }
}

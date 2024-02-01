import {ICardMetrics} from '@/entities/CardMetrics'
import {getCardMMC} from '@/api/transaction/get'

export class CardMetricsUseCase {
    cards: ICardMetrics;

    constructor() {
        this.cards = {};
    }

    async getData() {
        const data = await getCardMMC()
        if (data == undefined) {
            return;
        }
        this.cards.dailyVolumeETH = data.data.dailyVolumeETH.toString().replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        this.cards.dailyVolumeToken = data.data.dailyVolumeToken.toString().replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        this.cards.dailyVolumeUSD = data.data.dailyVolumeUSD.toString().replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        this.cards.priceUSD = '$ ' + data.data.priceUSD.toFixed(15).toString();
    }

    getDataFromAPI(): ICardMetrics {
        return this.cards;
    }
}

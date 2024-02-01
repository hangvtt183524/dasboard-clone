import {ICardMechanics} from '@/entities/CardMechanics'
import {getCirculate} from "@/api/holder/circulate";

export class CardMechanicsUseCase {
    cards: ICardMechanics;
    Trillion: number;

    constructor() {
        this.cards = {};
        this.Trillion = 1000000000000;
    }

    async getData() {
        const data = await getCirculate()
        if (data == undefined) {
            return;
        }
        this.cards.burn = data.burn
        this.cards.burnPercent = data.burnPercent
        this.cards.circulating = data.circulating
        this.cards.circulatingPercent = data.circulatingPercent
    }

    getDataFromAPI(): ICardMechanics {
        const dataCard = this.cards
        dataCard.burn = Math.floor((Number(dataCard.burn) / this.Trillion)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        dataCard.circulating = Math.floor((Number(dataCard.circulating) / this.Trillion)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return dataCard
    }
}

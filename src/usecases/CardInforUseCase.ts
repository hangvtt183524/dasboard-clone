import {ICardInfor} from '@/entities/CardInfor'
import nameOfCard from '@/data/nameCards'
import {getPortfolioHolder} from "@/api/portfolio/portfolio";

export class cardInforUseCase {
    cards: Array<ICardInfor> = [];

    constructor() {
    }

    async getDataCurrency(wallet: string) {
        const cardData = await getPortfolioHolder(wallet);
        if(cardData == undefined) {
            return;
        }
        let i = 0;
        for (const index in cardData) {
            this.pushDataCard({
                title: nameOfCard[i],
                value: cardData[index].toString().replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
            });
            i = i + 1;
        }
    }

    pushDataCard(cardData: ICardInfor) {
        this.cards.push(cardData);
    }

    resetDataCart() {
        this.cards.splice(0);
    }
    getDataFromAPI() {
        return this.cards;
    }
}

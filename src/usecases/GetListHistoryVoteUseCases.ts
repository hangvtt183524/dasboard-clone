import {getListHistoryVote} from "@/api/transaction/get"
import {IListHistoryVote} from "@/entities/GetListHistoryVote"


export class getListHistoryVoteUseCases {
    list: Array<IListHistoryVote> = []

    constructor() {}

    async getDataListHistory(offset: number, limit: number, eventid: number) {
        const dataEvent = await getListHistoryVote(offset, limit, eventid);
        if (dataEvent == undefined) {
            return;
        }
        this.list = dataEvent.data;
    }

    getDataFromAPI() {
        return this.list
    }
}
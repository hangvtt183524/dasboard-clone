import {IGetListContent} from "@/entities/GetListContent"
import {getListContent} from "@/api/transaction/get"

export class GetListContentUseCases {
    list: Array<IGetListContent> = []

    constructor() {}

    async getDataListHistory(offset: number, limit: number, eventid: number) {
        const dataEvent = await getListContent(offset, limit, eventid);
        if (dataEvent == undefined) {
            return;
        }
        this.list = dataEvent.data;
    }

    getDataFromAPI() {
        return this.list
    }
}
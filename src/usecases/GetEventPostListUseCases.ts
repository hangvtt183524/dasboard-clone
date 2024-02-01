import { IGetEventPost } from "@/entities/GetEventPostList"
import { getEventPostList } from "@/api/transaction/get"


export class GetEventPostListUseCases {
    list: Array<IGetEventPost> = []

    constructor(){}

    async getDataListHistory(offset: number, limit: number, eventid: number) {
        const dataEvent = await getEventPostList(offset, limit, eventid);
        if (dataEvent == undefined) {
            return;
        }
        this.list = dataEvent.data;
    }


    getDataFromAPI() {
        return this.list
    }
}
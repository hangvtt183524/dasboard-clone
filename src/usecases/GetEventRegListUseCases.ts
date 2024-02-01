import {IEventRegList} from "@/entities/GetEventRegList"
import {getEventRegList} from "@/api/transaction/get"

export class GetEventRegListUseCases {
    list: Array<IEventRegList> = [];

    constructor() {
    }

    async getDataListHistory(offset: number, limit: number, eventid: number) {
        const dataEvent = await getEventRegList(offset, limit, eventid);
        if (dataEvent == undefined) {
            return;
        }
        this.list = dataEvent.data;
    }

    getDataFromAPI(): IEventRegList {
        if (this.list.length > 0) {
            return this.list[0];
        } else {
            // @ts-ignore
            return;
        }
    }
}

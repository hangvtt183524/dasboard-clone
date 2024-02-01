import { IListEvents } from '@/entities/ListEvent'
import { getListEvent } from '@/api/transaction/get'
import { dateTimeToUTC } from "@/helper/format-date";

export class listEventsUseCases {
    list: Array<IListEvents> = [];

    constructor() { }

    async getDataListEvent(offset: number, limit: number) {
        const dataEvent = await getListEvent(offset, limit);
        if (dataEvent == undefined) {
            return;
        }
        this.list = dataEvent.data;
    }

    formatData(list: Array<IListEvents>) {
        let defautTime = "0001-01-01T00:00:00Z";
        for(const index in list) {
            if(list[index].event_start === defautTime) {
                list[index].event_start = "-";
            }
            else {
                list[index].event_start = dateTimeToUTC(list[index].event_start);
            }
            if(list[index].event_end === defautTime) {
                list[index].event_end = "-";
            }
            else {
                list[index].event_end = dateTimeToUTC(list[index].event_end);
            }
        }
    }


    getDataFromAPI() {
        this.formatData(this.list);
        return this.list
    }
}
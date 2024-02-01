import {getHisRef} from "@/api/transaction/get";
import {IHistoryRef} from "@/entities/GetHistoryRef";

export class GetHistoryRefUseCases {
    list: Array<IHistoryRef> = [];

    constructor() {}

    async getDataListHistory(offset: number, limit: number) {
        const dataEvent = await getHisRef(offset, limit);
        if (dataEvent == undefined) {
            return;
        }
        this.list = dataEvent.data;
    }

    getDataFromAPI() {
        return this.list
    }
}
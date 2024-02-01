import {getTypeEvent} from "@/api/transaction/get";
import {IGetTypeEvent} from "@/entities/GetTypeEvent";
import * as defineType from "@/define/event-type";

export class GetTypeEventUseCases {
    data: IGetTypeEvent;

    constructor() {
        this.data = {};
    }

    async getDataFromAPI(event_id: number) {
        const api = await getTypeEvent(event_id);
        if (api) {
            this.data = api.data;
        }
    }

    getData() {
        return this.data;
    }

    async checkTypeEvent(id: number) {
        await this.getDataFromAPI(id);
        let result = this.getData();
        if (result == null) {
            return defineType.EVENT_NONE;
        }
        return result.event_type;
    }
}

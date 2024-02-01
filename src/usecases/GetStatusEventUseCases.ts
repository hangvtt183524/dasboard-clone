import {getStatusEvent} from "@/api/transaction/get";
import {IGetStatusEvent} from "@/entities/GetStatusEvent";
import * as defineStatus from "@/define/event-status";


export class GetStatusEventUseCases {
    data: IGetStatusEvent;

    constructor() {
        this.data = {}
    }

    async getDataFromAPI(event_id: number) {
        const api = await getStatusEvent(event_id);
        if (api) {
            this.data = api.data;
        }

    }

    getData() {
        return this.data;
    }

    async checkStatusEvent(id: number) {
        await this.getDataFromAPI(id);
        let result = this.getData()
        if (result == null) {
            return defineStatus.EVENT_NONE
        }
        return result.event_status;
    }
}

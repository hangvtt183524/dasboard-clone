import {getCheckRef} from "@/api/transaction/get";
import {ICheckRef} from "@/entities/GetCheckRef";

export class GetCheckRefUseCases {
    data: ICheckRef;

    constructor() {
        this.data = {};
    }

    async getDataFromAPI() {
        const api = await getCheckRef();
        if (api == undefined) {
            return;
        }
        if (api.data == null) {
            this.data.event_id = -1;
            this.data.updated_at = "";
            this.data.name = "";
            this.data.ref_code = "";
            this.data.event_name = "";
            return;
        }
        this.data.event_id = api.data.event_id;
        this.data.updated_at = api.data.updated_at;
        this.data.name = api.data.name;
        this.data.ref_code = api.data.ref_code;
        this.data.event_name = api.data.event_name;
    }

    getData() {
        return this.data;
    }
}
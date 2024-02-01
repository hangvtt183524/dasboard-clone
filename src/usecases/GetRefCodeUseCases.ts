import {IGetRefCode} from "@/entities/GetRefCode";
import {getRefCode} from "@/api/transaction/get"
import {PostIDToGetCodeRefUseCases} from "@/usecases/PostIDToGetRefCodeUseCases";

export class GetRefCodeUseCases {
    api: IGetRefCode;

    constructor() {
        this.api = {};
    }

    async getData(event_id: number) {
        let data = await getRefCode(event_id)
        if (data == undefined) {
            return;
        }
        if (data.data == null) {
            let post = new PostIDToGetCodeRefUseCases();
            post.getEventID(event_id);
            await post.postData();
            data = await getRefCode(event_id);
        }
        this.api.event_id = data.data.event_id;
        this.api.event_name = data.data.event_name;
        this.api.ref_code = data.data.ref_code;
        this.api.time_active = data.data.time_active;
        this.api.time_end = data.data.time_end;
    }

    getDataFromAPI() {
        return this.api;
    }
}
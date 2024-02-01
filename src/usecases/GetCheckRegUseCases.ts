import {getCheckReg} from "@/api/transaction/get";
import {IGetCheckReg} from "@/entities/GetCheckReg";

export class GetCheckRegUseCases {
    isReg: IGetCheckReg;

    constructor() {
        this.isReg = {}
    }

    async getDataFromAPI(event_id: number) {
        const api = await getCheckReg(event_id);
        if (api == undefined) {
            return;
        }
        this.isReg.message = api.message;

    }

    getData(){
        return this.isReg.message;
    }
}
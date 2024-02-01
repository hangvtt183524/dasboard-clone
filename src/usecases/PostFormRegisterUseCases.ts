import { IEventReg } from '../entities/EventReg'
import { postUserProfileRegister } from '../api/transaction/post'

export class EventRegUseCases {
    data: IEventReg;

    constructor() {
        this.data = {
            event_id: 0,
            telegram: "",
            twitter: "",
            reddit: "",
        };
    }

    getDataFromForm(form: IEventReg) {
        this.data = form;
    }

    async postData() {
        await postUserProfileRegister(this.data);
    }
}
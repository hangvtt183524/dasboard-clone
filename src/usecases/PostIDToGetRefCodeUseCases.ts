import {IPostIDToGetCodeRef} from "@/entities/PostIDToGetCodeRef"
import {postIDToGetCodeRef} from "@/api/transaction/post"

export class PostIDToGetCodeRefUseCases {
    data: IPostIDToGetCodeRef;

    constructor(){
        this.data = {}
    }

    getEventID(event_id: number) {
        this.data.event_id = event_id;
    }

    async postData() {
        await postIDToGetCodeRef(this.data);
    }
}

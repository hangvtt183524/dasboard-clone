import {IPostRef} from "@/entities/PostRef"
import {postRef} from "@/api/transaction/post"

export class PostRefUseCases {
    data: IPostRef;

    constructor() {
        this.data = {};
    }

    getDataFromForm(walletid: IPostRef) {
        this.data = walletid;
        this.data.ref_code = this.data.ref_code?.toUpperCase();
    }

    async postData() {
        await postRef(this.data);
    }
}

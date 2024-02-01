import {IPostLinkReg} from "@/entities/postLinkReg"
import {postLinkReg} from "@/api/transaction/post"

export class PostLinkRegUseCases {
    data: IPostLinkReg;

    constructor(){
        this.data = {}
    }

    getDataFromForm(form: IPostLinkReg) {
        this.data = form;
    }

    async postData() {
        await postLinkReg(this.data);
    }
}

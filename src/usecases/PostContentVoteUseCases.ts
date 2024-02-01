import {postContentVote} from "@/api/transaction/post"
import {IContentVote} from "@/entities/postVoteContent"

export class PostContentVoteUseCases {
    data: IContentVote;

    constructor(){
        this.data = {}
    }

    getDataFromForm(form: IContentVote) {
        this.data = form;
    }

    async postData() {
        await postContentVote(this.data);
    }
}
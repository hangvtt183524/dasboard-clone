import {IProposalList, OptionResultType} from "@/entities/ProposalDetail";
import {getHotProposal, getVoteProposal} from "@/api/dao/vote";
import MockEvent from "@/mock/vote_event.json"

export class VoteInfoUseCase {
    data: IProposalList[];
    hotProposal: number;

    constructor() {
        this.data = [];
        this.hotProposal = 0;
    }

    async getData() {
        const hotProposal = await getHotProposal();
        this.hotProposal = hotProposal.id;

        const results = await getVoteProposal();
        for (let index in results) {
            let result = results[index]
            this.data.push(
                {
                    id: result.id,
                    event_name: result.event_name,
                    publisher: result.publisher,
                    description: result.description,
                    event_stage: result.event_stage,
                    is_voted: result.is_voted,
                    yesCount: result.yesCount,
                    yesCount_percent: result.yesCount_percent,
                    yesAddr: [],
                    noCount: result.noCount,
                    noCount_percent: result.noCount_percent,
                    noAddr: [],
                    time_to_end: result.time_to_end,
                    OptionsVote: result.type_vote,
                }
            )
        }

    }

    async GetMockData() {
        this.hotProposal = 0;
        for (let index in MockEvent) {
            let result = MockEvent[index]
            this.data.push(
                {
                    noAddr: [],
                    yesAddr: [],
                    id: result.id,
                    event_name: result.event_name,
                    event_stage: result.event_stage,
                    is_voted: result.is_voted,
                    yesCount: result.yesCount || 0,
                    yesCount_percent: result.yesCount_percent || 0,
                    noCount: result.noCount || 0,
                    noCount_percent: result.noCount_percent || 0,
                    publisher: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
                    time_to_end: result.time_to_end,
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\n\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                    OptionsVote: OptionResultType.YesNoQuestion,
                }
            )
        }
    }

    getDataFromAPI(): IProposalList[] {
        return this.data;
    }

    getProposalFromAPI(): number {
        return this.hotProposal - 1;
    }
}

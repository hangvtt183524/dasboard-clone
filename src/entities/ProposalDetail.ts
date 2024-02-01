export interface IProposalList {
    id: number,
    publisher: string,
    description?: string,
    event_name: string,
    time_to_end: number,
    event_stage: number,
    yesCount: number,
    yesCount_percent: number,
    yesAddr: WalletInfo[],
    noCount: number,
    noCount_percent: number,
    noAddr: WalletInfo[],
    is_voted: boolean,
    OptionsVote: OptionResultType,
}

export interface WalletInfo {
    address: string,
    value: string,
}

export enum EventVote {
    None = 0,
    Options_1 = 1,
    Options_2 = 2,
    Total = 3,
}

export enum EventState {
    None = 0,
    Open = 1,
    Expired = 2,
    Total = 3
}

export enum OptionResultYesNoVote {
    None = "None",
    InFavor = "In Favor",
    Against = "Against"
}

export enum OptionResultChooseVote {
    None = "None",
    Option1 = "Option 1",
    Option2 = "Option 2"
}


export enum OptionResultType {
    YesNoQuestion = 1,
    Choose = 2,
}

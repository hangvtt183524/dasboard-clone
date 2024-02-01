<template>
    <div class="robo-dao-wrapper">
        <div v-if="isExactActive">
            <Header></Header>
            <BreadCrumb></BreadCrumb>
            <div class="main-container" id="container">
                <div class="overlay"></div>
                <div class="search-overlay"></div>
                <SideBar></SideBar>
                <div id="content" class="main-content">
                    <div class="layout-px-spacing">
                        <div class="row header">
                            <div class="col-lg-7 col-12 title-wrapper">
                                <h1 class="title">Stake RBIF - Vote - Earn Rewards</h1>
                                <p class="description">Welcome to Robo Global DAO Voting. This place is implemented for
                                    our RBIF holders to help us improve the projects better.
                                </p>
                            </div>
                            <div class="col-lg-5 col-12 text-center position-relative">
                                <img src="../../assets/svg/robo-dao-header.svg" alt="Robo Icon">
                                <div class="header-bg-dao"></div>
                            </div>
                        </div>
                        <div class="loading" v-if="isFetch"></div>

                        <div class="row hot-proposals layout-top-spacing" v-if="!isFetch">
                            <h2 class="col-12 title"> Hot Proposals <img src="../../assets/svg/fire-hot-proposals.svg"
                                                                         alt="Icon Hot Proposals"/>
                            </h2>

                            <Proposal :event="getHotProposal()" :symbol="symbol"
                                      :eventStage="getEventStageProposal(hotProposal)"
                                      :Option_1="getOption1(getHotProposal())"
                                      :Option_2="getOption2(getHotProposal())"
                                      v-if="!isFetch"></Proposal>
                        </div>
                        <div class="proposals layout-top-spacing" v-if="!isFetch">
                            <div class="row">
                                <h2 class="col-12 title">
                                    List Proposals
                                </h2>
                            </div>
                            <div class="row mt-3 mb-4">
                                <div class="col-lg-8 col-12 key-search d-none d-lg-flex">
                                    <div class="item-search" :class="{ active: index === current_stage_search }"
                                         @click="current_stage_search = index" v-for="(key, index) in list_stage"
                                         :key="index">{{ key }}
                                    </div>
                                </div>
                                <div class="col-lg-8 col-12 mb-3 key-search d-flex d-lg-none">
                                    <swiper class="swiper" :options="swiperOption">
                                        <swiper-slide class="item-search"
                                                      :class="{ active: index === current_stage_search }"
                                                      @click.native="current_stage_search = index"
                                                      v-for="(key, index) in list_stage" :key="index">{{ key }}
                                        </swiper-slide>
                                    </swiper>
                                </div>
                                <div class="col-lg-4 col-12">
                                    <input type="text" class="search-proposals" placeholder="Enter Proposals Title..."
                                           v-model="searchEventsName">
                                </div>
                            </div>
                            <div class="row" v-for="(item, index) in resultQuery" :key="index">
                                <Proposal :event="item"
                                          :symbol="symbol"
                                          :eventStage="item.event_stage"
                                          :Option_1="getOption1(item)"
                                          :Option_2="getOption2(item)"
                                ></Proposal>
                            </div>
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        </div>
        <router-view ref="rvdao"></router-view>
    </div>
</template>

<script lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import SideBar from "@/components/SideBar.vue";
import BreadCrumb from "@/components/BreadCrumb.vue";
import Proposal from "@/components/vote/Proposal.vue";
import VotingABI from '@/abi/Voting.json'

import isMobile from "@/helper/platform";
import {Swiper, SwiperSlide, directive} from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import {
    EventState,
    IProposalList,
    OptionResultChooseVote,
    OptionResultType,
    OptionResultYesNoVote
} from "@/entities/ProposalDetail";
import {mapGetters} from "vuex";
import {MOUDLE_WEB3_NAME} from "@/store/modules/web3/constant";
import {ethers} from "ethers";
import {VoteInfoUseCase} from "@/usecases/GetVoteInfoUseCase";
import {getCirculate} from "@/api/holder/circulate";

export default {
    components: {
        Proposal,
        Header,
        Footer,
        SideBar,
        BreadCrumb,
        Swiper,
        SwiperSlide
    },
    directives: {
        swiper: directive
    },
    data() {
        return {
            isMobile,
            swiperOption: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            isFetch: true,
            searchEventsName: "",
            list_stage: ["All", "Open", "Expired"],
            hotProposal: 0,
            list_event: Array<IProposalList>,
            current_stage_search: 0,
            isExactActive: true,
            vote_info: new VoteInfoUseCase(),
            symbol: "RBIF",
            totalSupply: ethers.utils.parseEther("1000000"),
            contract: null,
            contractAddr: process.env.VUE_APP_DAO_CONTRACT,
        };
    },
    methods: {
        getOption1(event: IProposalList) {
            if (event.OptionsVote == OptionResultType.YesNoQuestion) {
                return OptionResultYesNoVote.InFavor
            }
            return OptionResultChooseVote.Option1
        },
        getOption2(event: IProposalList) {
            if (event.OptionsVote == OptionResultType.YesNoQuestion) {
                return OptionResultYesNoVote.Against
            }
            return OptionResultChooseVote.Option2
        },
        async createContractObj() {
            const signer = this.getProvider.getSigner();
            this.contract = new ethers.Contract(this.contractAddr, VotingABI, signer)
        },
        getHotProposal: function (): IProposalList {
            return this.list_event[this.hotProposal];
        },
        getEventStageProposal: function (id: any): number {
            let eventStage = EventState.None;
            try {
                eventStage = this.list_event[id].event_stage;
            } catch (e) {
                eventStage = EventState.None;
            }
            return eventStage;
        },
        getProposalList: async function () {
            // await this.vote_info.GetMockData();
            await this.vote_info.getData().then(() => {
                this.list_event = this.vote_info.getDataFromAPI();
                this.hotProposal = this.vote_info.getProposalFromAPI();
            });
        },
        getDAOInfo: async function () {
            await this.getProposalList();
            await getCirculate().then((result) => {
                this.totalSupply = ethers.utils.parseEther(result.circulating);
            })
            for (const event of this.list_event) {
                await this.contract.getProposal(event.id).then(async (result: any) => {
                    event.event_name = result[1];
                    event.time_to_end = result[3].toString();
                    await this.getEventStage(event);
                    await this.getVote(event);
                });
                await this.contract.isVotingOpen(event.id).then((isVote: boolean) => {
                    event.is_voted = isVote;
                });
            }
            this.isFetch = false;
        },
        getEventStage: async function (event: IProposalList) {
            event.event_stage = EventState.None
            const timeNow = new Date().getTime();
            const timeDifference = event.time_to_end * 1000 - timeNow;
            if (timeDifference < 0) {
                event.event_stage = EventState.Expired
            } else {
                event.event_stage = EventState.Open
            }
        },
        getVote: async function (event: IProposalList) {
            await this.contract.votingPercentages(event.id, this.totalSupply).then((result: number[]) => {
                event.noCount_percent = +ethers.utils.formatUnits(result[0].toString(), 2).toString();
                event.noCount = +ethers.utils.formatUnits(result[1].toString(), process.env.VUE_APP_MAIN_TOKEN_DECIMAL).toString()
                event.yesCount_percent = +ethers.utils.formatUnits(result[2].toString(), 2).toString()
                event.yesCount = +ethers.utils.formatUnits(result[3].toString(), process.env.VUE_APP_MAIN_TOKEN_DECIMAL).toString()
            }).catch(() => {
                event.noCount_percent = event.noCount = 0;
                event.yesCount_percent = event.yesCount = 0;
            })
        }
    },
    computed: {
        ...mapGetters(MOUDLE_WEB3_NAME, ['getProvider']),
        checkPlatform() {
            return isMobile();
        },

        resultQuery(): Array<IProposalList> {
            if (this.searchEventsName
            ) {
                if (this.current_stage_search === 0) {
                    return this.list_event.filter((item: IProposalList) => {
                        return this.searchEventsName
                            .toLowerCase()
                            .split(" ")
                            .every((v: string) => item.event_name.toLowerCase().includes(v));
                    });
                }
                return this.list_event.filter((item: IProposalList) => {
                    return this.searchEventsName
                        .toLowerCase()
                        .split(" ")
                        .every((v: string) => item.event_name.toLowerCase().includes(v) && item.event_stage === this.current_stage_search);
                });

            } else {
                if (this.current_stage_search === 0) {
                    return this.list_event;
                }
                return this.list_event.filter((item: IProposalList) => {
                    return item.event_stage === this.current_stage_search;
                })

            }
        },
    },
    watch: {},
    created() {
    },
    updated() {
        this.isExactActive = typeof this.$refs.rvdao === 'undefined';
    },
    mounted() {
        if (this.getProvider) {
            this.createContractObj().then(async () => {
                await this.getDAOInfo();
            })
        }
        this.isExactActive = typeof this.$refs.rvdao === 'undefined';
    },
};
</script>

<style scoped>

</style>

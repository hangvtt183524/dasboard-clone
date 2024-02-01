<template>
    <div class="dao-detail-wrapper">
        <div class="dao-overlay" v-if="is_open || is_open_confirm"></div>
        <ShowInfo v-if="is_open" @hideModal="hideModal" ref="modal">
            <template #title>
                Addresses Voted in option
                “{{ modal_selected_list_vote === Option_1 ? Option_1 : Option_2 }}”
            </template>
            <template #content>
                <table>
                    <tbody class="ch_body">
                    <tr v-for="(item, index) in modalGetListVote" :key="index">
                        <td class="address">
                            <img src="../../assets/svg/point.svg" alt="Point">
                            {{ sliceWalletID(item.address) }}
                        </td>
                        <td>{{ formatNumber(item.value) }} {{ symbol }}</td>
                    </tr>
                    </tbody>
                </table>
            </template>
        </ShowInfo>
        <ShowInfo v-if="is_open_confirm" @hideModal="hideModalConfirm" ref="modalconfirm">
            <template #title>
                Confirm your vote
            </template>
            <template #content>
                <table>
                    <tbody class="">
                    <tr>
                        <td class="">
                            Choice
                        </td>
                        <td>{{ selected_vote === Option_1 ? Option_1 : Option_2 }}</td>
                    </tr>
                    <tr>
                        <td class="">
                            Vote block
                        </td>
                        <td>
                            <span style="text-decoration: underline;">{{ current_block }}</span>
                            <img src="../../assets/svg/arrow-up.svg" alt="">
                        </td>
                    </tr>
                    <tr>
                        <td class="">
                            Your voting power
                        </td>
                        <td>{{ formatNumber(current_amount) }} {{ symbol }}</td>
                    </tr>
                    </tbody>
                </table>
            </template>
            <template #footer>
                <div class="dao-footer">
                    <button class="btn button-custom btn-bg-trans" @click="hideModalConfirm">
                        Cancel
                    </button>
                    <button class="btn button-custom bg-btn" @click="confirmVote">
                        Confirm
                    </button>
                </div>
            </template>
        </ShowInfo>
        <Header></Header>
        <BreadCrumb></BreadCrumb>
        <div class="main-container" id="container">
            <div class="overlay"></div>
            <div class="search-overlay"></div>
            <SideBar></SideBar>
            <div id="content" class="main-content">
                <div class="layout-px-spacing">
                    <div class="row header">
                        <div class="col-12">
                            <p class="back" @click="handleBack"><img src="../../assets/svg/arrow-left.svg" alt="Arrow">
                                Back</p>
                            <p class="title">{{ event.event_name }}</p>
                        </div>
                        <div class="col-lg-6 col-12 info-wallet-wrapper">
                            <div class="info-detail">
                                <img src="../../assets/svg/iconRBIF.svg" alt="Icon RBIF">
                                <div class="content">
                                    <p class="title">{{ event.publisher }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 col-12 event-time-block">
                            <div class="time-block" :class="{ end: !event.is_voted }">
                                <p class="time-text" :class="{ end: !event.is_voted }">
                                    <img src="../../assets/svg/timer.svg" alt="Timer" v-if="event.is_voted">
                                    {{ getTimeEstimate }}
                                </p>
                            </div>
                            <button class="btn btn-size" :class="CssEventStage(event.event_stage).class">{{
                                CssEventStage(event.event_stage).name
                                }}
                            </button>
                        </div>
                    </div>
                    <div class="row body-wrapper">
                        <div class="description col-lg-4 col-12">
                            <div class="widget widget-account-invoice-three">
                                <div class="widget-heading widget-padding">
                                    <div v-html="event.description" class="description">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="result-block col-lg-8 col-12">
                            <div class="row vote-block mb-3">
                                <div class="current-results col-lg-6 col-12">
                                    <div class="widget widget-account-invoice-three">
                                        <div class="widget-heading widget-padding">
                                            <div class="content-card">
                                                <div class="row mb-2">
                                                    <div class="col-12">
                                                        <p class="text-title">Current Results</p>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="data-item">
                                                            <div class="description">
                                                                <p class="text">{{ Option_1 }}</p>
                                                                <p class="text">
                                                                    {{ formatNumber(event.yesCount) }} {{ symbol }}
                                                                    <span class="percent">{{
                                                                        event.yesCount_percent
                                                                        }}%</span>
                                                                </p>
                                                            </div>
                                                            <div class="bar">
                                                                <div class="bar-fill" :style="{
                                                                    width: event.yesCount_percent + '%',
                                                                }">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="data-item">
                                                            <div class="description">
                                                                <p class="text">{{ Option_2 }}</p>
                                                                <p class="text">{{ formatNumber(event.noCount) }}
                                                                    {{ symbol }} <span
                                                                            class="percent">{{
                                                                      event.noCount_percent
                                                                        }}%</span></p>
                                                            </div>
                                                            <div class="bar">
                                                                <div class="bar-fill" :style="{
                                                                    width: event.noCount_percent + '%',
                                                                }">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="current-vote col-lg-6 col-12">
                                    <div class="widget widget-account-invoice-three">
                                        <div class="widget-heading widget-padding">
                                            <div class="content-card">
                                                <div class="row mb-2">
                                                    <div class="col-6">
                                                        <p class="text-title mb-0">Cast your vote</p>
                                                        <p class="sub-text">(Single choice voting)</p>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="option-vote"
                                                             :class="{ voted: selected_vote === Option_1 }"
                                                             @click="selectedVote(Option_1)">
                                                            <div class="">
                                                                <p class="mb-0">{{ Option_1 }}</p>
                                                            </div>
                                                            <div class="tick"
                                                                 v-if="selected_vote === Option_1">
                                                                <img src="../../assets/svg/tick-circle.svg" alt="Tick">
                                                            </div>
                                                        </div>
                                                        <div class="option-vote"
                                                             :class="{ voted: selected_vote === Option_2 }"
                                                             @click="selectedVote(Option_2)">
                                                            <div class="">
                                                                <p class="mb-0">{{ Option_2 }}</p>
                                                            </div>
                                                            <div class="tick"
                                                                 v-if="selected_vote === Option_2">
                                                                <img src="../../assets/svg/tick-circle.svg" alt="Tick">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12">
                                                        <button
                                                                class="bg-grandient-black button-custom _disabled btn w-100"
                                                                v-if="!event.is_voted">
                                                            Voted has been closed.
                                                        </button>
                                                        <button
                                                                class="bg-grandient-black button-custom _disabled btn w-100"
                                                                v-else-if="!isCanVote">
                                                            Voted
                                                        </button>
                                                        <button @click="showErrorHolder"
                                                                class="button-custom bg-btn btn w-100"
                                                                v-else-if="!IsWalletHolder">
                                                            Vote
                                                        </button>
                                                        <button @click="handleVote"
                                                                class="btn button-custom bg-btn w-100" v-else>
                                                            Vote
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row addresses-voted">
                                <div class="col-12">
                                    <div class="widget widget-account-invoice-three">
                                        <div class="widget-heading widget-padding">
                                            <div class="content-card">
                                                <div class="row mb-3">
                                                    <div class="col-12">
                                                        <p class="text-title mb-0">Addresses Voted ({{
                                                            formatNumber(event.yesCount + event.noCount)
                                                            }})
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12 dao-vote-list d-none d-lg-flex">
                                                        <div class="w-100">
                                                            <table>
                                                                <thead>
                                                                <tr>
                                                                    <th class="header">“{{ Option_1 }}” Voted ({{
                                                                        event.yesCount
                                                                        }})
                                                                    </th>
                                                                </tr>
                                                                </thead>
                                                                <tbody class="ch_body">
                                                                <tr v-for="(item, index) in event.yesAddr"
                                                                    :key="index">
                                                                    <td class="address">
                                                                        <img src="../../assets/svg/point.svg"
                                                                             alt="Point">
                                                                        {{ sliceWalletID(item.address) }}
                                                                    </td>
                                                                    <td>{{ formatNumber(item.value) }} {{ symbol }}</td>
                                                                </tr>
                                                                </tbody>
                                                                <tfoot>
                                                                <tr>
                                                                    <td class="view-more"
                                                                        @click="showModal(Option_1)">
                                                                        VIEW MORE
                                                                    </td>
                                                                </tr>
                                                                </tfoot>
                                                            </table>
                                                        </div>
                                                        <div class="border-divide"></div>
                                                        <div class="w-100">
                                                            <table>
                                                                <thead>
                                                                <tr>
                                                                    <th class="header">“{{ Option_2 }} Voted ({{
                                                                        event.noCount
                                                                        }})
                                                                    </th>
                                                                </tr>
                                                                </thead>
                                                                <tbody class="ch_body">
                                                                <tr v-for="(item, index) in event.noAddr"
                                                                    :key="index">
                                                                    <td class="address">
                                                                        <img src="../../assets/svg/point.svg"
                                                                             alt="Point">
                                                                        {{ sliceWalletID(item.address) }}
                                                                    </td>
                                                                    <td>{{ formatNumber(item.value) }} {{ symbol }}</td>
                                                                </tr>
                                                                </tbody>
                                                                <tfoot>
                                                                <tr>
                                                                    <td class="view-more"
                                                                        @click="showModal(Option_2)">
                                                                        VIEW MORE
                                                                    </td>
                                                                </tr>
                                                                </tfoot>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div class="col-12 dao-vote-list mobile d-flex d-lg-none">
                                                        <div class="w-100">
                                                            <table>
                                                                <thead>
                                                                <tr>
                                                                    <th class="header"
                                                                        :class="{ active: selected_list_vote === Option_1 }"
                                                                        @click="selectedListVote(Option_1)">
                                                                        “{{ Option_1 }}” ({{
                                                                        event.yesCount
                                                                        }})
                                                                    </th>
                                                                    <th class="header"
                                                                        :class="{ active: selected_list_vote === Option_2 }"
                                                                        @click="selectedListVote(Option_2)">
                                                                        ”{{ Option_2 }}”({{
                                                                        event.noCount
                                                                        }})
                                                                    </th>
                                                                </tr>
                                                                </thead>
                                                                <tbody class="ch_body">
                                                                <tr v-for="(item, index) in showListVote"
                                                                    :key="index">
                                                                    <td class="address">
                                                                        <img src="../../assets/svg/point.svg"
                                                                             alt="Point">
                                                                        {{ sliceWalletID(item.address) }}
                                                                    </td>
                                                                    <td>{{ item.value }} {{ symbol }}</td>
                                                                </tr>
                                                                </tbody>
                                                                <tfoot>
                                                                <tr class="justify-content-center">
                                                                    <td class="view-more"
                                                                        @click="showModal(selected_list_vote)">
                                                                        VIEW MORE
                                                                    </td>
                                                                </tr>
                                                                </tfoot>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import SideBar from "@/components/SideBar.vue";
import BreadCrumb from "@/components/BreadCrumb.vue";
import ShowInfo from "@/modal/ShowInfo.vue";
import {sliceWalletID} from "@/helper/slice-content";
import {toastMessage} from "@/lib/toast";
import {PropType} from "vue";
import {EventVote, IProposalList, OptionResultYesNoVote} from "@/entities/ProposalDetail";
import {CssEventStage, startTimerList} from "@/helper/dao";
import {ethers} from "ethers";
import VotingABI from "@/abi/Voting.json";
import ERC20ABI from "@/abi/ERC20.json";
import {mapGetters} from "vuex";
import {MOUDLE_WEB3_NAME} from "@/store/modules/web3/constant";
import formatNumber from "@/helper/number";
import {VoteAddressInfoUseCase} from "@/usecases/GetVoteAddressInfoUseCase";

export default {
    components: {
        Header,
        Footer,
        SideBar,
        BreadCrumb,
        ShowInfo,
    },
    props: {
        event: {
            type: Object as PropType<IProposalList>,
            required: true,
        },
        symbol: {
            type: String,
            required: true,
        },
        Option_1: {
            type: String,
            required: false,
            default: OptionResultYesNoVote.InFavor,
        },
        Option_2: {
            type: String,
            required: false,
            default: OptionResultYesNoVote.Against,
        },
    },
    data() {
        return {
            sliceWalletID,
            CssEventStage,
            startTimerList,
            formatNumber,
            selected_vote: OptionResultYesNoVote.None,
            selected_list_vote: this.Option_1,
            modal_selected_list_vote: "",
            is_open: false,
            is_open_confirm: false,
            vote_detail: new VoteAddressInfoUseCase(),
            current_block: 0,
            current_amount: 0,
            timerOutput: "",
            isCanVote: false,
            contract: null,
            token: null,
            contractTokenAddr: process.env.VUE_APP_MAIN_TOKEN_CONTRACT,
            contractAddr: process.env.VUE_APP_DAO_CONTRACT,
        }
    },
    mounted() {
        if (this.getProvider) {
            this.createContractObj().then(() => {
                this.getVoteDetail();
                this.getAmountHolder();
                this.getAddressVote();
            })
        }
        setInterval(() => {
            this.timerOutput = this.startTimerList();
        }, 1000);
    },
    methods: {
        async createContractObj() {
            const signer = this.getProvider.getSigner();
            this.current_block = await this.getProvider.getBlockNumber();
            this.contract = new ethers.Contract(this.contractAddr, VotingABI, signer);
            this.contractTokenAddr = new ethers.Contract(this.contractTokenAddr, ERC20ABI, signer);
        },
        getVoteDetail: async function () {
            this.isCanVote = await this.contract.canVote(this.event.id, this.getAddress);
        },
        getAmountHolder: async function () {
            const decimal: number = Number(process.env.VUE_APP_MAIN_TOKEN_DECIMAL);
            this.current_amount = await this.contractTokenAddr.balanceOf(this.getAddress);
            this.current_amount = ethers.utils.formatUnits(this.current_amount.toString(), decimal)
        },
        getAddressVote: async function () {
            // await this.vote_detail.GetMockData()
            await this.vote_detail.getData(this.event.id, EventVote.Options_1)
            await this.vote_detail.getData(this.event.id, EventVote.Options_2)
            this.event.yesAddr = this.vote_detail.getDataFromAPI(EventVote.Options_1)
            this.event.noAddr = this.vote_detail.getDataFromAPI(EventVote.Options_2)
        },
        async handleVote(e: Event) {
            e.preventDefault();
            let self = this;
            if (this.selected_vote == "") {
                return this.showErrorChoose();
            }
            let action = EventVote.None;

            if (this.selected_vote == this.Option_1) {
                action = EventVote.Options_1
            } else if (this.selected_vote == this.Option_2) {
                action = EventVote.Options_2
            }

            await this.contract.vote(this.event.id, action).then(function () {
                self.showModalConfirm();
            }).catch(function () {
                self.showErrorVoteResult();
            });
        },
        handleBack() {
            this.$router.push({name: 'DAO'})
        },

        confirmVote() {
            this.$eventBus.$emit("showNoti", {
                title: toastMessage.vote_success.title,
                description: toastMessage.vote_success.description,
                type: "success",
                duration: 5000,
            });
            this.hideModalConfirm();
            this.handleBack();
        },
        showErrorHolder() {
            this.$eventBus.$emit("showNoti", {
                title: toastMessage.vote_error_holder.title,
                description: toastMessage.vote_error_holder.description,
                type: "error",
                duration: 5000,
            });
        },
        showErrorChoose() {
            this.$eventBus.$emit("showNoti", {
                title: toastMessage.vote_error_choose.title,
                description: toastMessage.vote_error_choose.description,
                type: "error",
                duration: 5000,
            });
        },
        showErrorVoteResult() {
            this.$eventBus.$emit("showNoti", {
                title: toastMessage.vote_error_result.title,
                description: toastMessage.vote_error_result.description,
                type: "error",
                duration: 5000,
            });
        },
        selectedVote(name: string | undefined) {
            this.selected_vote = name;
        },
        selectedListVote(name: string | undefined) {
            this.selected_list_vote = name;
        },
        showModal(name: string | undefined) {
            this.modal_selected_list_vote = name;
            this.is_open = true;
            document.getElementsByTagName('body')[0].style.overflow = "hidden";
        },
        hideModal() {
            this.is_open = false;
            document.getElementsByTagName('body')[0].style.overflow = "";
        },
        showModalConfirm() {
            this.is_open_confirm = true;
            document.getElementsByTagName('body')[0].style.overflow = "hidden";
        },
        hideModalConfirm() {
            this.is_open_confirm = false;
            document.getElementsByTagName('body')[0].style.overflow = "";
        },
    },
    computed: {
        ...mapGetters(MOUDLE_WEB3_NAME, ['getAddress', 'getProvider', 'IsWalletHolder']),
        getTimeEstimate() {
            return this.timerOutput
        },
        showListVote() {
            let rs = [];
            rs = this.event.yesAddr;
            if (this.selected_list_vote === this.Option_2) {
                rs = this.event.noAddr;
            }
            return rs;
        },
        modalGetListVote() {
            let rs = [];
            if (this.modal_selected_list_vote === this.Option_1) {
                rs = this.event.yesAddr;
            }
            if (this.modal_selected_list_vote === this.Option_2) {
                rs = this.event.noAddr;
            }
            return rs;
        },
    },
}
</script>

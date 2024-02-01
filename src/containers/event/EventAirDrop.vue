<template>
    <div class="airdrop-wrapper">
        <!-- modal confirm -->
        <ShowInfo v-if="open_confirm" @hideModal="hideModal(0)">
            <template #title>
                Confirmation
            </template>
            <template #content>
                <div class="claim-content">
                    <img src="../../assets/svg/claim.svg" alt="Icon Claim">
                    <div class="main-value">
                        <p class="title-airdrop neue-regular">You will receive:</p>
                        <p class="m-0">
                            <img src="../../assets/svg/iconRBIF.svg" alt="Icon RBIF" width="24"> {{
                            formatNumber(range_claim) || '-'
                            }}
                            RBIF
                        </p>
                    </div>
                    <div class="main-value">
                        <p class="title-airdrop neue-regular">You will burn:</p>
                        <p class="m-0">
                            <img src="../../assets/svg/iconRBIF.svg" alt="Icon RBIF" width="24">
                            {{ formatNumber(range_burn) || '-' }}
                            RBIF
                        </p>
                    </div>
                    <div class="main-value">
                        <p class="title-airdrop neue-regular">You will contribute:</p>
                        <p class="m-0">
                            <img src="../../assets/svg/iconRBIF.svg" alt="Icon RBIF" width="24"> {{
                            formatNumber(range_contribute) ||
                            '-'
                            }} RBIF
                        </p>
                    </div>
                    <div class="text">
                        <p class="m-0"><span class="gotham-bold">Note:</span> According to our tokenomics, transferring
                            tax is 10%
                            thus when you claim the airdrop, you will be losing 10%</p>
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="claim-footer">
                    <button class="btn button-custom bg-btn" @click="handleConfirm">
                        Confirm
                    </button>
                </div>
            </template>
        </ShowInfo>
        <!-- modal done -->
        <ShowInfo v-if="open_done" @hideModal="hideModal(1)">
            <template #title>
                {{ isClaimMT50 ? 'Successful Claimed!' : 'You are one of the most genuine RoboWarriors' }}
            </template>
            <template #content>
                <div class="row">
                    <div class="col-12">
                        <div class="icon-burn" v-if="!isClaimMT50">
                            <div class="bg"></div>
                            <img src="../../assets/svg/icon-burn-confirm.svg" alt="Icon Burn">
                        </div>
                        <ClaimInfo :data="claimData"></ClaimInfo>
                        <div class="next">
                            <p class="highlight">What’s next?</p>
                            <p>Check RBIF balance in your wallet {{ isClaimMT50 ? '.' : ' (if you claim).' }}</p>
                            <p>Thank you for being part of this exciting journey. Don’t forget to follow all of our <a
                                    href="https://twitter.com/RGI_info" class="twit" target="_blank">Social Media
                                Channels</a> so that you
                                don’t miss any breaking news in 2023</p>

                        </div>
                    </div>
                </div>
            </template>
        </ShowInfo>
        <!-- modal error -->
        <ShowInfo v-if="open_error" @hideModal="hideModal(2)">
            <template #title>
                <div>
                    <img src="../../assets/svg/airdrop-error.svg" alt="Error">
                </div>
            </template>
            <template #content>
                <div class="err-content">
                    <p class="err gotham-bold">Error</p>
                    <p class="err-text neue-regular">
                        Sorry for the inconvenience caused, please contact our administrator via <span
                            class="gotham-bold"> social media channels </span> for support.
                    </p>
                </div>
            </template>
            <template #footer>
                <div class="err-footer">
                    <button class="btn button-custom bg-btn" @click="contact">
                        Contact
                    </button>
                </div>
            </template>
        </ShowInfo>
        <div class="loading" v-if="showLoading"></div>
        <template v-else>
            <div class="row header">
                <div class="col-12">
                    <p class="back" @click="handleBack"><img src="../../assets/svg/arrow-left.svg" alt="Arrow">
                        Back</p>
                    <img src="../../assets/img/banner-detail.png" alt="Banner" class="banner">
                </div>
            </div>
            <div class="content-block">
                <div class="row">
                    <div class="col-12 layout-spacing">
                        <div class="widget widget-account-invoice-three">
                            <div class="widget-heading widget-padding">
                                <div class="content-card">
                                    <div class="row">
                                        <div class="col-12 text-left" v-if="detail_airdrop.is_eligible">
                                            <template v-if="detail_airdrop.action === 0">
                                                <div class="info-wrapper mb-2">
                                                    <h4 class="title">Congratulation!</h4>
                                                    <div class="mt-4">
                                                        <p class="description neue-regular">Thank you for holding RBIF
                                                            tokens! You are eligible to
                                                            receive an airdrop of <span class="neue-bold">{{
                                                              this.formatNumber(detail_airdrop.reward)
                                                                }}
                                RBIF</span>.
                                                            These tokens will be claimed in 3 times based on
                                                            our Terms. <span class="neue-bold">You will be able to receive 30% at this time. Below is
                                your wallet’s holding
                                captured at the time we reached 5,000 holders:</span>
                                                        </p>
                                                    </div>
                                                    <div class="info-block mt-4">
                                                        <div class="item">
                                                            <p class="note neue-regular">(Please note that your total
                                                                RBIF
                                                                tokens
                                                                was recorded at the time we
                                                                reached 5,000 Holders).</p>
                                                        </div>
                                                        <div class="item">
                                                            <p class="name neue-medium">Total RBIF tokens in your
                                                                wallet</p>
                                                            <p class="value neue-medium">{{
                                                                this.formatNumber(detail_airdrop.amount)
                                                                }} RBIF</p>
                                                        </div>
                                                        <div class="item">
                                                            <p class="name neue-medium">Amount of Airdropped tokens</p>
                                                            <p class="value neue-medium">
                                                                {{ this.formatNumber(detail_airdrop.reward) }} RBIF</p>
                                                        </div>
                                                        <div class="item">
                                                            <p class="name neue-medium">Amount of Airdropped tokens can
                                                                be received this time (30%)
                                                            </p>
                                                            <p class="value neue-medium">{{
                                                                this.formatNumber(detail_airdrop.received)
                                                                }} RBIF</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="range-block">
                                                    <p class="title neue-medium">Enter amount that you would like to use
                                                        your
                                                        airdrop winning for:</p>
                                                    <div class="action mt-4 row">
                                                        <div class="item col-lg-3 col-12 p-0">
                                                            <div class="title-block">
                                                                <div class="title-tooltip">
                                                                    <p class="title neue-medium">Claim</p>
                                                                    <div class="ch_tooltip">
                                                                        <img src="../../assets/svg/info-circle.svg"
                                                                             alt="">
                                                                        <span class="ch_tooltiptext ch_tooltip-top ch_tooltiptext-burn">The amount of tokens
                                      you
                                      want to claim.</span>
                                                                    </div>
                                                                </div>
                                                                <p class="title neue-medium text-white"
                                                                   v-if="range_claim == 0">
                                                                    {{
                                                                    this.formatNumber(this.remainingReward)
                                                                    }}
                                                                    RBIF</p>
                                                            </div>
                                                            <div class="range-value">
                                                                <input type="range" min="0"
                                                                       :max="detail_airdrop.received" value="0"
                                                                       class="input-range"
                                                                       id="range_claim" v-model="range_claim"
                                                                       @input="handleRange">
                                                                <output for="range_claim" id="claim_tooltip"
                                                                        :value="range_claim"
                                                                        class="range-slider-tooltip">{{
                                                                    ((range_claim / detail_airdrop.received) * 100).toFixed(0)
                                                                    }}%
                                                                </output>
                                                            </div>
                                                            <div class="input-value mt-2">
                                                                <input type="text" class="text neue-medium text-white"
                                                                       placeholder="0.00" id="in_claim"
                                                                       v-model="in_claim" @input="handleRange">
                                                                <p class="text neue-medium m-0 pointer"
                                                                   @click="onClickMax('in_claim')">MAX</p>
                                                            </div>
                                                        </div>
                                                        <div class="border-divide"></div>
                                                        <div class="item col-lg-3 col-12 p-0">
                                                            <div class="title-block">
                                                                <div class="title-tooltip">
                                                                    <p class="title neue-medium">Burn</p>
                                                                    <div class="ch_tooltip">
                                                                        <img src="../../assets/svg/info-circle.svg"
                                                                             alt="">
                                                                        <span class="ch_tooltiptext ch_tooltip-top ch_tooltiptext-burn">The
                                      amount of tokens you want to burn.</span>
                                                                    </div>
                                                                </div>
                                                                <p class="title neue-medium text-white"
                                                                   v-if="range_burn == 0">
                                                                    {{
                                                                    this.formatNumber(this.remainingReward)
                                                                    }}
                                                                    RBIF</p>
                                                            </div>
                                                            <div class="range-value">
                                                                <input type="range" min="0"
                                                                       :max="detail_airdrop.received" value="0"
                                                                       class="input-range"
                                                                       id="range_burn" v-model="range_burn"
                                                                       @input="handleRange">
                                                                <output for="range_burn" id="burn_tooltip"
                                                                        :value="range_burn"
                                                                        class="range-slider-tooltip">{{
                                                                    ((range_burn /
                                                                        detail_airdrop.received) * 100).toFixed(0)
                                                                    }}%
                                                                </output>
                                                            </div>
                                                            <div class="input-value mt-2">
                                                                <input type="text" class="text neue-medium text-white"
                                                                       placeholder="0.00" id="in_burn"
                                                                       v-model="in_burn" @input="handleRange">
                                                                <p class="text neue-medium m-0 pointer"
                                                                   @click="onClickMax('in_burn')">MAX</p>
                                                            </div>
                                                            <!-- <p class="error mt-1 neue-regular" :style="{ visibility: isLowBurn }">Burn at least 10% of
                                                              total
                                                              airdrop</p> -->
                                                        </div>
                                                        <div class="border-divide"></div>
                                                        <div class="item col-lg-3 col-12 p-0">
                                                            <div class="title-block">
                                                                <div class="title-tooltip">
                                                                    <p class="title neue-medium">Contribute</p>
                                                                    <div class="ch_tooltip">
                                                                        <img src="../../assets/svg/info-circle.svg"
                                                                             alt="">
                                                                        <span
                                                                                class="ch_tooltiptext ch_tooltip-top ch_tooltiptext-burn ch_tooltiptext-contribute">Tokens
                                      will be remained to support
                                      community’s shilling effort.</span>
                                                                    </div>
                                                                </div>
                                                                <p class="title neue-medium text-white"
                                                                   v-if="range_contribute == 0">{{
                                                                    this.formatNumber(this.remainingReward)
                                                                    }}
                                                                    RBIF</p>
                                                            </div>
                                                            <div class="range-value">
                                                                <input type="range" min="0"
                                                                       :max="detail_airdrop.received" value="0"
                                                                       class="input-range"
                                                                       id="range_contribute" v-model="range_contribute"
                                                                       @input="handleRange">
                                                                <output for="range_contribute" id="contribute_tooltip"
                                                                        :value="range_contribute"
                                                                        class="range-slider-tooltip">{{
                                                                    ((range_contribute / detail_airdrop.received) *
                                                                        100).toFixed(0)
                                                                    }}%
                                                                </output>
                                                            </div>
                                                            <div class="input-value mt-2">
                                                                <input type="text" class="text neue-medium text-white"
                                                                       placeholder="0.00"
                                                                       id="in_contribute" v-model="in_contribute"
                                                                       @input="handleRange">
                                                                <p class="text neue-medium m-0 pointer"
                                                                   @click="onClickMax('in_contribute')">MAX</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="footer mt-4">
                                                    <div class="mobile-btn">
                                                        <button class="btn button-custom btn-bg-trans resize"
                                                                @click="openModalConfirm"
                                                                v-if="isContinue">
                                                            Continue
                                                        </button>
                                                        <button class="btn button-custom bg-grandient-black _disabled resize"
                                                                v-else>
                                                            Continue
                                                        </button>
                                                    </div>
                                                </div>
                                            </template>
                                            <template v-else>
                                                <div class="claimed">
                                                    <div class="row">
                                                        <div class="col-12">
                                                            <h4 class="title gotham-bold">Your airdrop tokens have
                                                                already claimed!</h4>
                                                        </div>
                                                    </div>
                                                    <div class="row mt-4 mb-4">
                                                        <div class="col-lg-9 col-12">
                                                            <p class="description neue-regular">
                                                                Thank you for holding RBIF tokens. You have already
                                                                claimed the first round of airdrop
                                                                event. Please following our <a
                                                                    href="https://roboglobal.info/linktree"
                                                                    class="social"
                                                                    target="_blank">
                                                                Social Media
                                                                Channels</a> to update newest informations about the
                                                                next airdrop and our projects in 2023.
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-lg-6 col-12">
                                                            <!-- TODO: Now we dont have enough data to show it
                                                             <ClaimInfo :data="this.claimData"></ClaimInfo>
                                                             -->
                                                        </div>
                                                    </div>
                                                </div>
                                            </template>
                                        </div>
                                        <div class="col-12 text-left" v-else>
                                            <h4 class="title">Sorry, you are not eligible for this airdrop event.!</h4>
                                            <div class="mt-4">
                                                <p class="description">Thank you for trusting Robo Finance! Don’t worry.
                                                    There will be plenty of opportunities to earn RBIF in the future.
                                                    Get involved in the Robo Ecosystem today by following our <a
                                                            href="https://roboglobal.info/linktree" class="social"
                                                            target="_blank">
                                                        Social Media Channels</a> so you don’t miss any breaking news in
                                                    2023.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import {sliceWalletID} from "@/helper/slice-content";
import isMobile from "@/helper/platform";
import ShowInfo from "@/modal/ShowInfo.vue";
import {AirDropInfoUseCase} from "@/usecases/GetAirDropInfoUseCase";
import ClaimInfo from "@/components/airdrop/ClaimInfo.vue";
import {ethers} from "ethers";
import {mapGetters} from "vuex";
import {MOUDLE_WEB3_NAME} from "@/store/modules/web3/constant";
import AirdropABI from '@/abi/AirdropDistributor.json'
import formatNumber from "@/helper/number";
import {IAirDropInfo} from "@/entities/GetAirDropInfo";

export default {
    components: {
        ShowInfo,
        ClaimInfo
    },
    data() {
        return {
            sliceWalletID,
            formatNumber,
            event_detail: {
                id: 1,
                is_eligible: false,
                banner_home: "banner-home",
                banner_detail: "banner-detail",
                wallet: {
                    address: "",
                    hold: "",
                    quantity: "",
                    claim_burn: "",
                },
                btn_claim: true,
                btn_burn: true,
            },
            open_confirm: false,
            open_done: false,
            open_error: false,
            opened: [],
            airdrop_info: new AirDropInfoUseCase(),
            detail_airdrop: {} as IAirDropInfo,
            range_claim: 0,
            in_claim: "",
            range_burn: 0,
            in_burn: "",
            range_contribute: 0,
            in_contribute: "",
            showLoading: true,
            contract: null,
            isSubmitTransaction: false,
        }
    },
    create() {
    },
    mounted() {
        if (this.getProvider) {
            this.createContractObj().then(() => {
                this.getAirDropInfo();
            })
        }
    },

    computed: {
        ...mapGetters(MOUDLE_WEB3_NAME, ['IsLogin', 'getAddress', 'getProvider']),
        checkPlatform() {
            return isMobile();
        },
        remainingReward(): number {
            let rs = this.detail_airdrop.received;
            if (this.detail_airdrop.received === undefined || this.detail_airdrop.received === null || this.detail_airdrop.received === "") {
                return 0
            }
            return rs - parseInt(this.range_claim) - parseInt(this.range_burn) - parseInt(this.range_contribute);
        },
        isContinue() {
            return parseInt(this.totalUse) === parseInt(this.detail_airdrop.received) && this.detail_airdrop.action === 0 && !this.isSubmitTransaction;
        },
        totalUse() {
            return Number(this.range_burn) + Number(this.range_claim) + Number(this.range_contribute);
        },
        claimData() {
            const rs = {
                claim: this.range_claim,
                burn: this.range_burn,
                contribute: this.range_contribute,
            };
            return rs;
        },
        isClaimMT50() {
            return this.range_claim >= (this.detail_airdrop.received / 2).toFixed(0);
        }

    },
    watch: {
        'range_claim': function () {
            const sliderElement = document.getElementById('range_claim');
            const tooltipElement = document.getElementById('claim_tooltip');

            let percentage = 100 / this.detail_airdrop.received * this.range_claim;
            if ((sliderElement != null) && (tooltipElement != null)) {
                let sliderWidth = sliderElement.offsetWidth;
                let tooltipWidth = tooltipElement.offsetWidth;
                let calc = sliderWidth - tooltipWidth;
                let positionCalc = (percentage / 100) * calc;
                tooltipElement.style.left = positionCalc + 'px';
            }

        },
        'range_burn': function () {
            const sliderElement = document.getElementById('range_burn');
            const tooltipElement = document.getElementById('burn_tooltip');
            if ((sliderElement != null) && (tooltipElement != null)) {
                let percentage = 100 / this.detail_airdrop.received * this.range_burn;
                let sliderWidth = sliderElement.offsetWidth;
                let tooltipWidth = tooltipElement.offsetWidth;
                let calc = sliderWidth - tooltipWidth;
                let positionCalc = (percentage / 100) * calc;
                tooltipElement.style.left = positionCalc + 'px';
            }

        },
        'range_contribute': function () {
            const sliderElement = document.getElementById('range_contribute');
            const tooltipElement = document.getElementById('contribute_tooltip');

            let percentage = 100 / this.detail_airdrop.received * this.range_contribute;
            if ((sliderElement != null) && (tooltipElement != null)) {
                let sliderWidth = sliderElement.offsetWidth;
                let tooltipWidth = tooltipElement.offsetWidth;
                let calc = sliderWidth - tooltipWidth;
                let positionCalc = (percentage / 100) * calc;
                tooltipElement.style.left = positionCalc + 'px';
            }
        },
        'detail_airdrop': function () {
            if (this.detail_airdrop && Object.keys(this.detail_airdrop).length !== 0) {
                this.showLoading = !this.showLoading;
            }
        },
    },
    methods: {
        eventID() {
            return parseInt(this.$route.params.eventID);
        },
        async createContractObj() {
            const signer = this.getProvider.getSigner();
            this.contract = new ethers.Contract(process.env.VUE_APP_AIRDROP_CONTRACT || "", AirdropABI, signer)
        },
        async getAirDropInfo() {
            await this.airdrop_info.getData(this.getAddress, parseInt(this.eventID()));
            this.detail_airdrop = this.airdrop_info.getDataFromAPI();
            this.detail_airdrop.is_eligible = this.detail_airdrop.address !== "" && this.detail_airdrop.amount !== "" && this.detail_airdrop.reward !== "" && this.detail_airdrop.received !== "";
            if (this.detail_airdrop.id !== this.eventID()) {
                return await this.$router.push({path: "/"})
            }
        },
        toggle(id: number) {
            const index = this.opened.indexOf(id);
            if (index > -1) {
                this.opened.splice(index, 1)
            } else {
                this.opened.push(id)
            }
        },
        handleBack() {
            this.$router.push({name: "Events"});
        },
        openModalConfirm() {
            this.open_confirm = true;
        },
        handleConfirm(e: Event) {
            e.preventDefault();
            this.hideModal(0);
            this.isSubmitTransaction = true;
            this.handleClaimContract();
        },
        async handleClaimContract() {
            let self = this
            this.contract.claim(
                Number(this.range_claim), Number(this.range_burn), Number(this.range_contribute), this.detail_airdrop.merkleproof,
            ).then(function () {
                self.detail_airdrop.action = 1;
                self.open_done = true;
                self.airdrop_info.updateActionHolder(self.getAddress);
            }).catch(function () {
                self.open_error = true;
            });

        },
        hideModal(type: number) {
            // type
            // 0: confirm
            // 1: done
            // 2: error
            switch (type) {
                case 0:
                    this.open_confirm = false;
                    break;
                case 1:
                    this.open_done = false;
                    this.getAirDropInfo();
                    this.isSubmitTransaction = false;
                    break;
                case 2:
                    this.open_error = false;
                    this.getAirDropInfo();
                    this.isSubmitTransaction = false;
                    break;
            }
        },
        handleRange(e: Event) {
            let model = (e.target as HTMLInputElement).id;
            let value = (e.target as HTMLInputElement).value;

            switch (model) {
                case "range_claim":
                    this.in_claim = value;
                    if (this.totalUse > this.detail_airdrop.received) {
                        this.handleMaxReceived("range_claim");
                    }
                    this.handleInput('in_claim');
                    break;
                case "in_claim":
                    this.range_claim = value === "" ? 0 : value.toString().replace(/[^0-9]/g, '');
                    if (this.totalUse > this.detail_airdrop.received) {
                        this.handleMaxReceived("range_claim");
                    }
                    this.handleInput('in_claim');
                    break;
                case "range_burn":
                    this.in_burn = value;
                    if (this.totalUse > this.detail_airdrop.received) {
                        this.handleMaxReceived("range_burn");
                    }
                    this.handleInput('in_burn');
                    break;
                case "in_burn":
                    this.range_burn = value === "" ? 0 : value.toString().replace(/[^0-9]/g, '');
                    if (this.totalUse > this.detail_airdrop.received) {
                        this.handleMaxReceived("range_burn");
                    }
                    this.handleInput('in_burn');
                    break;
                case "range_contribute":
                    this.in_contribute = value;
                    if (this.totalUse > this.detail_airdrop.received) {
                        this.handleMaxReceived("range_contribute");
                    }
                    this.handleInput('in_contribute');
                    break;
                case "in_contribute":
                    this.range_contribute = value === "" ? 0 : value.toString().replace(/[^0-9]/g, '');
                    if (this.totalUse > this.detail_airdrop.received) {
                        this.handleMaxReceived("range_contribute");
                    }
                    this.handleInput('in_contribute');
                    break;
            }
        },
        handleMaxReceived(model: string) {
            switch (model) {
                case "range_claim":
                    this.in_claim = this.detail_airdrop.received - this.range_burn - this.range_contribute;
                    this.range_claim = this.in_claim;
                    break;
                case "range_burn":
                    this.in_burn = this.detail_airdrop.received - this.range_claim - this.range_contribute;
                    this.range_burn = this.in_burn;
                    break;
                case "range_contribute":
                    this.in_contribute = this.detail_airdrop.received - this.range_burn - this.range_claim;
                    this.range_contribute = this.in_contribute;
                    break;
            }
        },
        handleInput(model: string) {
            if (this[model] == 0) {
                this[model] = "";
                return;
            }
            this[model] += ".";
            this[model] = this[model].replace(/[^0-9.]/g, '').replace(/(\d)(?=(\d{3})+\.)/g, '$1,').slice(0, -1);
        },
        onClickMax(model: string) {
            switch (model) {
                case "in_claim": {
                    let max = this.detail_airdrop.received - this.range_burn - this.range_contribute;
                    this.in_claim = max;
                    let prams = {
                        target: {
                            id: "in_claim",
                            value: max
                        }
                    };
                    this.handleRange(prams);
                    break;
                }
                case "in_burn": {
                    let max = this.detail_airdrop.received - this.range_claim - this.range_contribute;
                    this.in_burn = max;
                    let prams = {
                        target: {
                            id: "in_burn",
                            value: max
                        }
                    };
                    this.handleRange(prams);
                    break;
                }
                case "in_contribute": {
                    let max = this.detail_airdrop.received - this.range_burn - this.range_claim;
                    this.in_contribute = max;
                    let prams = {
                        target: {
                            id: "in_contribute",
                            value: max
                        }
                    };
                    this.handleRange(prams);
                    break;
                }
            }
        },
        contact() {
            window.open("https://roboglobal.info/linktree", "_blank");
            this.hideModal(2);
        }
    },
}

</script>

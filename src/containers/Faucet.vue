<template>
    <div>
        <Header></Header>
        <BreadCrumb></BreadCrumb>
        <div class="main-container" id="container">
            <div class="overlay"></div>
            <div class="search-overlay"></div>
            <SideBar></SideBar>
            <div id="content" class="main-content">
                <div class="layout-px-spacing">
                    <div class="row">
                        <div class="col-12 layout-spacing">
                            <div class="widget widget-account-invoice-three">
                                <div class="widget-heading widget-padding">
                                    <div class="content-card">
                                        <div class="title-card">
                                            <h4 class="">Claim Token</h4>
                                        </div>
                                        <p class="">Amount: {{ amount }} MKT</p>
                                        <p class="">Contract: {{ contractAddr }}</p>
                                        <p class="">Time: 30min</p>

                                    </div>
                                    <button
                                            class="btn button-custom bg-btn"
                                            @click="handleClaim"
                                    >
                                        Claim
                                    </button>
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
import {toastMessage} from "@/lib/toast";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import SideBar from "@/components/SideBar.vue";
import BreadCrumb from "@/components/BreadCrumb.vue";
import {ethers} from "ethers";
import FaucetABI from "@/abi/Faucet.json";
import {mapGetters} from "vuex";
import {MOUDLE_WEB3_NAME} from "@/store/modules/web3/constant";

export default {
    components: {
        Header,
        Footer,
        SideBar,
        BreadCrumb,
    },
    data: function () {
        return {
            contractAddr: process.env.VUE_APP_MAIN_TOKEN_CONTRACT,
            amount: 1_000,
            contract: null,
        };
    },
    methods: {
        async createContractObj() {
            const signer = this.getProvider.getSigner();
            this.contract = new ethers.Contract(this.contractAddr, FaucetABI, signer)
        },
        showToastDone() {
            this.$toast.open({
                message: toastMessage.claimFaucetSuccess,
                type: "success",
                position: "top-right",
                duration: 5000,
            });
        },
        showToastError() {
            this.$toast.open({
                message: toastMessage.claimFaucetError,
                type: "error",
                position: "top-right",
                duration: 5000,
            });
        },
        async handleClaim(e: Event) {
            e.preventDefault();
            let self = this;
            await this.contract.requestTokens().then(function () {
                self.showToastDone();
            }).catch(function () {
                self.showToastError();
            });
        },

    },
    async created() {
    },
    async mounted() {
        if (this.getProvider) {
            await this.createContractObj();
        }
    }
    ,
    computed: {
        ...mapGetters(MOUDLE_WEB3_NAME, ['IsLogin', 'getAddress', 'getProvider']),
    },

    watch: {}
}
</script>

<style scoped>
.icons8-copy {
    display: inline-block;
    width: 15px;
    height: 15px;
    background: url('../assets/img/icons8-copy-48.png') 50% 50% no-repeat;
    background-size: 100%;
    cursor: pointer;
}

select {
    border-radius: 10px;
}
</style>

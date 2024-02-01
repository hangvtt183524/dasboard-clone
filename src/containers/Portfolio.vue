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
                    <h1>My Portfolio</h1>
                    <div class="row layout-top-spacing">
                        <div class="loading" v-if="showLoading"></div>
                        <DetailsCurrency
                                v-for="(value, index) in detailsCurr"
                                :key="index"
                                :title="value.title"
                                :value="value.value"
                                :currency="value.currency"
                        ></DetailsCurrency>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {cardInforUseCase} from "@/usecases/CardInforUseCase";
import BreadCrumb from "@/components/BreadCrumb.vue";
import DetailsCurrency from "@/components/DetailsCurrency.vue";
import SideBar from "@/components/SideBar.vue";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import {mapGetters} from "vuex";
import {MOUDLE_WEB3_NAME} from "@/store/modules/web3/constant";

export default {
    components: {
        Header,
        Footer,
        SideBar,
        DetailsCurrency,
        BreadCrumb,
    },
    data: function () {
        return {
            detailsCurr: [],
            cardInfo: new cardInforUseCase(),
            showLoading: false,
        };
    },
    mounted: function () {
        this.getPortfolio();
    },
    computed: {
        ...mapGetters(MOUDLE_WEB3_NAME, ['getAddress']),

    },
    methods: {
        async getPortfolio() {
            this.showLoading = true
            this.cardInfo.resetDataCart();
            await this.cardInfo.getDataCurrency(this.getAddress);
            this.detailsCurr = this.cardInfo.getDataFromAPI()
        }
    }
    ,
    watch: {
        detailsCurr: function () {
            if (this.detailsCurr.length !== 0) {
                this.showLoading = !this.showLoading;
            }
        }
        ,
    }
    ,
}
;
</script>

<style scoped>
@import "../assets/css/dashboard/dash_1.css";
</style>

<template>
    <div>
        <Header></Header>
        <BreadCrumb></BreadCrumb>
        <!--  END NAVBAR  -->
        <!--  BEGIN MAIN CONTAINER  -->
        <div class="main-container" id="container">
            <div class="overlay"></div>
            <div class="search-overlay"></div>
            <!--  BEGIN SIDEBAR  -->
            <SideBar></SideBar>
            <!--  END SIDEBAR  -->
            <!--  BEGIN CONTENT AREA  -->
            <div id="content" class="main-content">
                <div class="layout-px-spacing">
                    <div class="row">
                        <div class="col-12 layout-spacing">
                            <div class="widget widget-account-invoice-three">
                                <div class="widget-heading">
                                    <div class="coming-soon-wrapper">
                                        <p class="title gotham-bold">Coming soon</p>
                                        <p class="description neue-regular">Thank you for your attention. Get
                                            started in the Robo Ecosystem today by following our <a
                                                href="https://roboglobal.info/linktree" class="social neue-medium"
                                                target="_blank">
                                                Social Media
                                                Channels</a> so you don’t miss any breaking news in {{ year }}.</p>
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
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import SideBar from "../components/SideBar.vue";
import BreadCrumb from "../components/BreadCrumb.vue";

export default {
    components: {
        Header,
        Footer,
        SideBar,
        BreadCrumb,
    },
    data() {
        return {
            year: ""
        }
    },
    mounted() {
        let date = new Date();
        this.year = date.getFullYear();
    }
}
</script>

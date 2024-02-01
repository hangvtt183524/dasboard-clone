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
          <CardListEvent />
        </div>
        <Footer></Footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Header from "../../components/Header.vue";
import Footer from "../../components/Footer.vue";
import SideBar from "../../components/SideBar.vue";
import BreadCrumb from "../../components/BreadCrumb.vue";
import CardListEvent from "../../components/CardListEvent.vue";


export default {
  components: {
    Header,
    Footer,
    SideBar,
    BreadCrumb,
    CardListEvent,
  },
}
</script>

<style scoped>
</style>

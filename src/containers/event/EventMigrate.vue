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
                formatNumber(detail_airdrop.amount) || '-'
              }}
              RBIF
            </p>
          </div>
          <div class="text">
            <p class="m-0"><span class="gotham-bold">Note:</span> After successful claim, import our new contract
              address
              into your wallet</p>
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
    <ShowInfo v-if="open_done" @hideModal="hideModal(1)">
      <template #title>
        Successful Claimed!
      </template>
      <template #content>
        <div class="row">
          <div class="col-12">
            <div class="next">
              <p class="highlight">What’s next?</p>
              <p>Check RBIF balance in your wallet.</p>
              <p>Thank you for being part of this exciting journey. Don’t forget to follow all of our <a
                  href="https://twitter.com/RGI_info" class="twit" target="_blank">Social Media Channels</a> so that you
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
          <img src="../../assets/img/airdrop-migrate-contract.png" alt="Banner" class="banner">
        </div>
      </div>
      <div class="content-block">
        <div class="row">
          <div class="col-12 layout-spacing">
            <div class="widget widget-account-invoice-three">
              <div class="widget-heading widget-padding">
                <div class="content-card">
                  <div class="row">
                    <div class="col-12 text-left">
                      <template v-if="detail_airdrop.claimed === true">
                        <div class="claimed">
                          <div class="row">
                            <div class="col-12">
                              <h4 class="title gotham-bold">Your airdrop tokens have already claimed!</h4>
                            </div>
                          </div>
                          <div class="row mt-4 mb-4">
                            <div class="col-lg-9 col-12">
                              <p class="description neue-regular">
                                Congratulations. You have successfully claimed a new token.
                              </p>
                            </div>
                          </div>
                        </div>
                      </template>
                      <template v-else-if="detail_airdrop.signature == '' || detail_airdrop.signature == undefined">
                        <h4 class="title">Sorry. The event is not open yet.!</h4>
                        <div class="mt-4">
                          <p class="description">New contract will be a necessary condition to create strong development
                            in the near future. Everything remains unchanged except for tokenomics, it will be 0% buying
                            tax and 5% selling tax (1% to holders, 2% to marketing and 2% to buyback).</p>
                        </div>
                      </template>
                      <template v-else>
                        <div class="info-wrapper mb-2">
                          <h4 class="title">Congratulation!</h4>
                          <div class="mt-4">
                            <p class="description neue-regular">Thank you for your holdings of RBIF. Below is the
                              number of your tokens that were snapshotted at the time we switched to the new
                              contract.</p>
                          </div>
                          <div class="info-block mt-4">
                            <div class="item">
                              <p class="note neue-regular">(Please note that your total
                                RBIF
                                tokens
                                was recorded at the time we snapshot).</p>
                            </div>
                            <div class="item">
                              <p class="name neue-medium">Total RBIF tokens in your
                                wallet:</p>
                              <p class="value neue-medium">{{
                                  this.formatNumber(detail_airdrop.amount - detail_airdrop.bonus)
                                }} RBIF</p>
                            </div>
                            <div class="item">
                              <p class="name neue-medium">The amount of RBIF tokens will be added to your wallet to
                                offset the gas fee:</p>
                              <p class="value neue-medium">
                                {{ this.formatNumber(detail_airdrop.bonus) }} RBIF</p>
                            </div>
                            <div class="item">
                              <p class="name neue-medium">Total RBIF tokens you will receive:
                              </p>
                              <p class="value neue-medium">{{
                                  this.formatNumber(detail_airdrop.amount)
                                }} RBIF</p>
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
import isMobile from "@/helper/platform";
import ShowInfo from "@/modal/ShowInfo.vue";
import {mapGetters} from "vuex";
import {MOUDLE_WEB3_NAME} from "@/store/modules/web3/constant";
import MigrationABI from '@/abi/Migration.json'
import formatNumber from "@/helper/number";
import {MigrateInfoUseCase} from "@/usecases/GetMigrateUseCase";
import {IMigrationAirdrop} from "@/entities/GetMigration";
import {ethers} from "ethers";

export default {
  components: {
    ShowInfo,
  },
  data() {
    return {
      formatNumber,
      open_confirm: false,
      open_done: false,
      open_error: false,
      opened: [],
      airdrop_info: new MigrateInfoUseCase(),
      detail_airdrop: {} as IMigrationAirdrop,
      showLoading: true,
      contract: null,
      isSubmitTransaction: false,
    }
  },
  mounted() {
    if (this.getProvider) {
      this.createContractObj().then(() => {
        this.getMigrationInfo();
      })
    }
  },
  computed: {
    ...mapGetters(MOUDLE_WEB3_NAME, ['IsLogin', 'getAddress', 'getProvider']),
    checkPlatform() {
      return isMobile();
    },
    isContinue() {
      return this.detail_airdrop.claimed === false && !this.isSubmitTransaction;
    },
  },
  watch: {
    'detail_airdrop': function () {
      if (this.detail_airdrop && Object.keys(this.detail_airdrop).length !== 0) {
        this.showLoading = !this.showLoading;
      }
    },
  },
  methods: {
    async createContractObj() {
      const signer = this.getProvider.getSigner();
      this.contract = new ethers.Contract(process.env.VUE_APP_MIGRATE_CONTRACT || "", MigrationABI, signer)
    },
    async getMigrationInfo() {
      await this.airdrop_info.getData(this.getAddress);
      this.detail_airdrop = this.airdrop_info.getDataFromAPI();
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
      let self = this;
      let claimAmount = ethers.utils.parseUnits(this.detail_airdrop.amount, 9);
      await this.contract.claim(claimAmount, Number(this.detail_airdrop.Id), this.detail_airdrop.signature).then(function () {
        self.detail_airdrop.claimed = true;
        self.open_done = true;
      }).catch(function (error: any) {
        console.error(error)
        self.open_error = true;
      });

    },
    hideModal(type: number) {
      switch (type) {
        case 0:
          this.open_confirm = false;
          break;
        case 1:
          this.open_done = false;
          this.getMigrationInfo();
          this.isSubmitTransaction = false;
          break;
        case 2:
          this.open_error = false;
          this.getMigrationInfo();
          this.isSubmitTransaction = false;
          break;
      }
    },
    contact() {
      window.open("https://roboglobal.info/linktree", "_blank");
      this.hideModal(2);
    }
  },
}

</script>

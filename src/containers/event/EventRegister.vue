<template>
  <div class="layout-px-spacing">
    <div class="row">
      <div class="col-12 layout-spacing">
        <div class="widget widget-account-invoice-three">
          <div class="widget-heading widget-padding">
            <div class="content-card">
              <div class="title-card">
                <h4 class="">Register Event Form</h4>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Telegram</label>
                <div class="col-sm-10">
                  <input
                      type="url"
                      class="form-control"
                      placeholder="Please enter your telegram"
                      v-model.trim="userProfile.telegram"
                      :readonly="isDisable"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Twitter</label>
                <div class="col-sm-10">
                  <input
                      type="url"
                      class="form-control"
                      placeholder="Please enter your twitter"
                      v-model.trim="userProfile.twitter"
                      :readonly="isDisable"
                  />
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Reddit</label>
              <div class="col-sm-10">
                <input
                    type="url"
                    class="form-control"
                    placeholder="Please enter your reddit"
                    v-model.trim="userProfile.reddit"
                    :readonly="isDisable"
                />
              </div>
            </div>
            <p
                v-if="checkEnterInfor"
                class="text-danger animate__animated animate__fadeInDown"
            >
              Please enter at least 1 information
            </p>

            <button
                class="btn button-custom bg-btn"
                @click="submitRegister()"
                :disabled="isDisable"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {EventRegUseCases} from "@/usecases/PostFormRegisterUseCases";
import {toastMessage} from "@/lib/toast"
import isMobile from "@/helper/platform"

export default {
  components: {},
  data() {
    return {
      userProfile: {
        event_id: 0,
        telegram: "",
        twitter: "",
        reddit: "",
      },
      inputTele: false,
      inputTwitter: false,
      inputReddit: false,
      data: new EventRegUseCases(),
      opened: [],
      isDisable: false,
    };
  },
  methods: {
    checkNullInput() {
      this.inputTele = this.userProfile.telegram === "";
      this.inputTwitter = this.userProfile.twitter === "";
      this.inputReddit = this.userProfile.reddit === "";
    },
    async submitRegister() {
      if (!this.checkEnterInfor) {
        this.getEventID();
        this.isDisable = true;
        this.data.getDataFromForm(this.userProfile);
        await this.data
            .postData()
            .then(() => {
              this.showToastDone();
              this.$router.go();
            })
            .catch(() => {
              this.showToastErr()
              this.isDisable = false;
            }).finally(() => {
              this.userProfile.telegram = "";
              this.userProfile.twitter = "";
              this.userProfile.reddit = "";
            });
      }
    },
    getEventID() {
      this.userProfile.event_id = Number(this.$route.params.eventID);
    },
    showToastErr() {
      this.$toast.open({
        message: toastMessage.err,
        type: "error",
        position: "top-right",
        duration: 5000,
      });
    },
    showToastDone() {
      this.$toast.open({
        message: toastMessage.registerSuccess,
        type: "success",
        position: "top-right",
        duration: 5000,
      });
    },
  },
  async created() {
  },
  watch: {},
  computed: {
    checkPlatform() {
      return isMobile();
    },
    checkEnterInfor() {
      this.checkNullInput();
      if (this.inputTwitter && this.inputReddit && this.inputTele)
        return true;
      return false;
    },
  },
};
</script>

<style>
.icons8-more {
  display: inline-block;
  width: 34px;
  height: 34px;
  background: url('../../assets/img/icons8-plus-+-64.png') 50% 50% no-repeat;
  background-size: 100%;
}
</style>

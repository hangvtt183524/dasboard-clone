<template>
  <div>
    <EventRegister v-if="showRegister"></EventRegister>
    <div class="layout-px-spacing" v-if="showPostForm">
      <div class="row">
        <RegisterInfo></RegisterInfo>
        <div class="col-12 layout-spacing">
          <div class="widget widget-account-invoice-three">
            <div class="widget-heading widget-padding">
              <div class="content-card">
                <div class="title-card">
                  <h4 class="">Post</h4>
                </div>
                <div class="form-group row">
                  <label class="col-sm-2 col-form-label">Link</label>
                  <div class="col-sm-10">
                    <input
                        type="url"
                        class="form-control"
                        :placeholder="placeHolderInput"
                        v-model="postData.content"
                        :readonly="isReadOnly"
                    />
                  </div>
                </div>
              </div>
              <p
                  v-if="inputBlank"
                  class="text-danger animate__animated animate__fadeInDown"
              >
                Please enter your link
              </p>
              <button
                  class="btn button-custom bg-btn"
                  @click="register(isDisable, showToastErr, showToastDone)"
                  :disabled="isDisable"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div class="col-12 layout-spacing">
          <div class="widget widget-account-invoice-three">
            <div class="widget-heading widget-padding">
              <div class="content-card">
                <div class="title-card">
                  <h4 class="">Your List</h4>
                </div>
                <div class="table-content">
                  <table class="flag" v-if="!checkPlatform">
                    <colgroup>
                      <col span="1" style="width: 5%"/>
                      <col span="1" style="width: 65%"/>
                      <col span="1" style="width: 30%"/>
                    </colgroup>
                    <thead>
                    <tr class="flag">
                      <th class="flag">ID</th>
                      <th class="flag">Link</th>
                      <th class="flag">Post At</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr
                        class="border-table flag"
                        v-for="(value, index) in history"
                        :key="index"
                    >
                      <td class="flag">{{ index + 1 }}</td>
                      <td class="flag"><a :href="value.content" target="_blank">{{ sliceContentMobile(value) }}</a></td>
                      <td class="flag">{{ value.UpdatedAt }}</td>
                    </tr>
                    </tbody>
                  </table>
                  <table class="flag" v-else>
                    <colgroup>
                      <col span="1" style="width: 5%"/>
                      <col span="1" style="width: 85%"/>
                      <col span="1" style="width: 10%"/>
                    </colgroup>
                    <thead>
                    <tr class="flag">
                      <th class="flag">ID</th>
                      <th class="flag">Post At</th>
                    </tr>
                    </thead>
                    <tbody>
                    <template v-for="(value, index) in history">
                      <tr
                          :key="index"
                          @click="toggle(index)"
                      >
                        <td class="flag">{{ index + 1 }}</td>
                        <td class="flag">{{ value.UpdatedAt }}</td>
                        <td>
                          <div class="icons8-more"></div>
                        </td>
                      </tr>
                      <tr
                          class="border-table flag"
                          :key="index"
                          v-if="opened.includes(index)"
                      >
                        <td colspan="3">
                          <a :href="value.content" target="_blank">{{ sliceContentMobile(value) }}</a>
                        </td>
                      </tr>
                    </template>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {PostLinkRegUseCases} from "@/usecases/PostLinkRegUseCases";
import {GetEventPostListUseCases} from "@/usecases/GetEventPostListUseCases";
import {toastMessage} from "@/lib/toast";
import {formatDate} from "@/helper/format-date";
import {sliceContentMobile} from "@/helper/slice-content"
import isMobile from "@/helper/platform";
import RegisterInfo from "@/containers/event/RegisterInfo.vue";
import EventRegister from "@/containers/event/EventRegister.vue";

import {GetCheckRegUseCases} from "@/usecases/GetCheckRegUseCases";
import * as defineType from "@/define/event-type";
import {validateRouter} from "@/helper/router-condition";

export default {
  components: {
    EventRegister,
    RegisterInfo
  },
  data() {
    return {
      inputBlank: false,
      link: new PostLinkRegUseCases(),
      postData: {
        content: "",
        event_id: 0,
      },
      list: new GetEventPostListUseCases(),
      history: [],
      isDisable: false,
      opened: [],
      isReadOnly: false,
      placeHolderInput: 'Please enter your link',
      checkReg: new GetCheckRegUseCases(),
      isReg: undefined,
    };
  },
  methods: {
    toggle(id: number) {
      const index = this.opened.indexOf(id);
      if (index > -1) {
        this.opened.splice(index, 1)
      } else {
        this.opened.push(id)
      }
    },
    checkNullInput() {
      this.inputBlank = this.postData.content === "";
    },
    async register(isDisable: boolean, err: any, done: any) {
      this.checkNullInput();
      if (this.postData.content) {
        this.isDisable = true;
        this.postData.event_id = Number(this.$route.params.eventID);
        this.link.getDataFromForm(this.postData);
        await this.link
            .postData()
            .then(() => {
              done();
              this.getHistory().finally(() => {
                isDisable = this.history.length >= 3;
              });
            })
            .catch(() => {
              err();
              isDisable = false;
            }).finally(() => {
              this.postData.content = "";
            });
        this.isDisable = isDisable;
      }
    },
    async getHistory() {
      await this.list.getDataListHistory(0, 100, Number(this.$route.params.eventID));
      this.history = this.list.getDataFromAPI();
      formatDate(this.history);
    },
    sliceContentMobile(obj: any) {
      return sliceContentMobile(obj)
    },
    async getCheckReg() {
      await this.checkReg.getDataFromAPI(Number(this.$route.params.eventID));
      this.isReg = this.checkReg.getData();
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
        message: toastMessage.postSuccess,
        type: "success",
        position: "top-right",
        duration: 5000,
      });
    },
    showToastLogin() {
      this.$toast.open({
        message: toastMessage.login,
        type: "error",
        position: "top-right",
        duration: 5000,
      });
    },
    showToastHolder() {
      this.$toast.open({
        message: toastMessage.holder,
        type: "error",
        position: "top-right",
        duration: 5000,
      });
    },
  },

  async created() {
    if(!await validateRouter(Number(this.$route.params.eventID), defineType.EVENT_POST)){
      return this.$router.push('/403');
    }
    await this.getCheckReg();
    if (this.isReg) {
      await this.getHistory();
    }
  },
  watch: {
    history: function () {
      if (this.history !== null) {
        if (this.history.length >= 3) {
          this.isDisable = true;
          this.isReadOnly = true;
          this.placeHolderInput = "You have reached the limit of 3 contents"
        }
      }
    },
  },
  computed: {
    showRegister() {
      if (this.isReg === undefined)
        return false;
      return !this.isReg;
    },
    showPostForm() {
      if (this.isReg === undefined)
        return false;
      return this.isReg;
    },
    checkPlatform() {
      return isMobile();
    },
  },
};
</script>

<style>
</style>

<template>
  <div class="eventlist-wrapper">
    <div class="parent-view" v-if="isExactActive">
      <div class="row" v-if="isEventsPage && isHighlightBanner">
        <div class="col-12">
          <div @click="onClickBanner">
            <img src="../assets/img/airdrop-migrate-contract.png" alt="Banner" class="banner-airdrop">
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12 layout-spacing">
          <div class="widget widget-account-invoice-three">
            <div class="widget-heading widget-padding vote-list">
              <div class="content-card">
                <div class="title-card">
                  <h4 class="">List Of Events</h4>
                </div>
                <div class="search">
                  <div class="input-group input-group-sm w-30">
                    <input class="form-control" type="text" placeholder="Search by name"
                           v-model="searchEventsName"/>
                  </div>
                </div>
                <div class="table-content">
                  <table class="flag" v-if="!checkPlatform">
                    <colgroup>
                      <col span="1" style="width: 2%"/>
                      <col span="1" style="width: 20%"/>
                      <col span="1" style="width: 30%"/>
                      <col span="1" style="width: 8%"/>
                      <col span="1" style="width: 20%"/>
                      <col span="1" style="width: 20%"/>
                    </colgroup>
                    <thead>
                    <tr class="flag text-center">
                      <th class="flag">ID</th>
                      <th class="flag">Name</th>
                      <th class="flag">Description</th>
                      <th class="flag">Status</th>
                      <th class="flag">Start</th>
                      <th class="flag">End</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="border-table flag" v-for="(value, index) in resultQuery"
                        :key="index">
                      <td class="flag">{{ index + 1 }}</td>
                      <td class="flag" v-if="value.event_type === 3">
                        <a :href="value.event_announcement" target="_blank">{{
                            value.event_name
                          }}</a>
                      </td>
                      <td class="flag" v-else-if="value.event_status_id === 0">
                        <a @click="showToast" href="javascript:void(0);">{{
                            value.event_name
                          }}</a>
                      </td>
                      <td class="flag" v-else>
                        <router-link
                            :to="{ name: eventRouter(value.event_type, value.event_status_id), params: { eventID: value.event_id }}">
                          {{ value.event_name }}
                        </router-link>
                      </td>
                      <td class="flag">
                        {{ value.event_description }}
                      </td>
                      <td class="flag flag-center" v-if="value.event_type === 3">
                        <a class="badge badge-pill badge-success"
                           :href="value.event_announcement"
                           target="_blank">Ongoing</a>
                      </td>
                      <td class="flag flag-center" v-else-if="value.event_status_id === 0">
                        <a :class="statusColor[value.event_status_id]" @click="showToast"
                           href="javascript:void(0);">{{
                            statusCode[value.event_status_id]
                          }}</a>
                      </td>
                      <td class="flag flag-center" v-else>
                        <router-link :class="statusColor[value.event_status_id]"
                                     :to="{ name: eventRouter(value.event_type, value.event_status_id),params: { eventID: value.event_id },}">
                          {{ statusCode[value.event_status_id] }}
                        </router-link>
                      </td>
                      <td class="flag flag-center">
                        {{ value.event_start }}
                      </td>
                      <td class="flag flag-center">
                        {{ value.event_end }}
                      </td>
                    </tr>
                    </tbody>
                  </table>
                  <table class="flag" v-else>
                    <colgroup>
                      <col span="1" style="width: 10%"/>
                      <col span="1" style="width: 35%"/>
                      <col span="1" style="width: 35%"/>
                      <col span="1" style="width: 20%"/>
                    </colgroup>
                    <thead>
                    <tr class="flag text-center">
                      <th class="flag">ID</th>
                      <th class="flag">Name</th>
                      <th class="flag">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    <template v-for="(value, index) in resultQuery">
                      <tr :key="index" @click="toggle(index)">
                        <td class="flag">{{ index + 1 }}</td>
                        <!--event_type = 3 : event on social example: twitter/tele/...-->
                        <td class="flag" v-if="value.event_type === 3">
                          <a :href="value.event_announcement">{{ value.event_name }}</a>
                        </td>
                        <td class="flag" v-else-if="value.event_status_id === 0">
                          <a @click="showToast" href="javascript:void(0);">{{
                              value.event_name
                            }}</a>
                        </td>
                        <td class="flag" v-else>
                          <router-link
                              :to="{name: eventRouter(value.event_type, value.event_status_id), params: { eventID: value.event_id }}">
                            {{ value.event_name }}
                          </router-link>
                        </td>
                        <td class="flag flag-center" v-if="value.event_type === 3">
                          <a class="badge badge-pill badge-success"
                             :href="value.event_announcement">Ongoing</a>
                        </td>
                        <td class="flag flag-center" v-else-if="value.event_status_id === 0">
                          <a :class="statusColor[value.event_status_id]" @click="showToast"
                             href="javascript:void(0);">{{
                              statusCode[value.event_status_id]
                            }}</a>
                        </td>
                        <td class="flag flag-center" v-else>
                          <router-link :class="statusColor[value.event_status_id]" :to="{
                              name: eventRouter(value.event_type, value.event_status_id),
                              params: { eventID: value.event_id },
                            }">{{ statusCode[value.event_status_id] }}
                          </router-link>
                        </td>
                        <td>
                          <div class="icons8-more"></div>
                        </td>
                      </tr>
                      <tr class="border-table flag" :key="index" v-if="opened.includes(index)">
                        <td colspan="4">
                          <p><b><u>Description:</u></b> {{ value.event_description }}</p>
                          <p><b><u>Start:</u></b> {{ value.event_start }}</p>
                          <p><b><u>End:</u></b> {{ value.event_end }}</p>
                        </td>
                      </tr>
                    </template>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="text-white not-found" v-if="detailsListEvent.length === 0">
                Event Not Found
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view ref="rv"></router-view>
  </div>
</template>

<script lang="ts">
import {listEventsUseCases} from "@/usecases/ListEventUseCases";
import isMobile from "@/helper/platform";
import {toastMessage} from "@/lib/toast";
import * as defineStatus from "@/define/event-status";
import * as defineType from "@/define/event-type";
import {IListEvents} from "@/entities/ListEvent";

export default {
  data() {
    return {
      searchEventsName: "",
      statusCode: ["Finished", "Opening", "Voting"],
      statusColor: [
        "badge badge-pill badge-warning",
        "badge badge-pill badge-primary",
        "badge badge-pill badge-success",
      ],
      detailsListEvent: [],
      listEvent: new listEventsUseCases(),
      isPC: true,
      isExactActive: true,
      isHighlightBanner: true,
      opened: [],
      event_detail: {
        id: 3,
        banner_home: "banner-home",
        banner_detail: "banner-detail",
        wallet: [
          {
            address: "",
            quantity: ""
          },
        ],
      }
    };
  },
  computed: {
    resultQuery() {
      if (this.searchEventsName) {
        return this.detailsListEvent.filter((item: IListEvents) => {
          return this.searchEventsName
              .toLowerCase()
              .split(" ")
              .every((v: string) => (item.event_name || "").toLowerCase().includes(v));
        });
      } else {
        return this.detailsListEvent;
      }
    },
    checkPlatform() {
      return isMobile();
    },
    isEventsPage() {
      return this.$route.name === "Events";
    }
  },
  methods: {
    onClickBanner() {
      this.$router.push({name: 'Migration'})
      // this.$router.push({name: 'Air Drop', params: {eventID: this.event_detail.id}})
    },
    toggle(id
               :
               number
    ) {
      const index = this.opened.indexOf(id);
      if (index > -1) {
        this.opened.splice(index, 1)
      } else {
        this.opened.push(id)
      }
    }
    ,
    async getListEvent() {
      await this.listEvent.getDataListEvent(0, 10);
      this.detailsListEvent = this.listEvent.getDataFromAPI();
    }
    ,
    showToast() {
      this.$toast.open({
        message: toastMessage.eventFinished,
        type: "error",
        position: "top-right",
        duration: 5000,
      });
    }
    ,
    eventRouter(type
                    :
                    number, status
                    :
                    number
    ) {
      switch (status) {
        case defineStatus.EVENT_OPEN: {
          if (type === defineType.EVENT_POST) {
            return "Post";
          }
          return "Reference Code"
        }
        case defineStatus.EVENT_VOTE:
          return "vote";
      }

    }
    ,
  },
  async created() {
    await this.getListEvent();
  },
  updated() {
    this.isExactActive = typeof this.$refs.rv === 'undefined';
  },
  mounted() {
    this.isExactActive = typeof this.$refs.rv === 'undefined';
  },
  watch: {},
};
</script>

<style scoped>
@import "../assets/css/scrollbar/scrollbar.css";

.search {
  display: flex;
  justify-content: flex-end;
}

.w-30 {
  width: 30%;
}

.not-found {
  font-weight: bold;
  font-size: 20px;
  margin-top: 50px;
}

.badge {
  width: 70px;
}
</style>

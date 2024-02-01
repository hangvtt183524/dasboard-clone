<template>
    <div class="layout-px-spacing">
        <div class="row">
            <div class="col-12 layout-spacing">
                <div class="widget widget-account-invoice-three">
                    <div class="widget-heading widget-padding vote-list">
                        <div class="content-card">
                            <div class="title-card">
                                <h4 class="">Vote List Of Content</h4>
                            </div>
                            <div class="table-content">
                                <table class="flag vote">
                                    <colgroup>
                                        <col span="1" style="width: 90%"/>
                                        <col span="1" style="width: 10%"/>
                                    </colgroup>
                                    <thead>
                                    <tr class="flag">
                                        <th class="flag">Link</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr
                                            class="border-table flag"
                                            v-for="(value, index) in listContentVote"
                                            :key="index"
                                    >
                                        <td class="flag vote">
                                            <a :href="value.content" target="_blank">{{
                                                sliceContentMobile(value)
                                                }}</a>
                                        </td>
                                        <td>
                                            <button
                                                    type="button"
                                                    class="btn button-custom"
                                                    :class="changeClassBtn(value)"
                                                    @click="submitVote(value, showToastErr, showToastDone)"
                                                    :disabled="isDisable || value.is_vote"
                                            >
                                                {{ changeTextBtn(value) }}
                                            </button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 layout-spacing">
                <div class="widget widget-account-invoice-three">
                    <div class="widget-heading widget-padding">
                        <div class="content-card">
                            <div class="title-card">
                                <h4 class="">Voted List</h4>
                            </div>
                            <div class="table-content">
                                <table class="flag" v-if="!checkPlatform">
                                    <colgroup>
                                        <col span="1" style="width: 5%"/>
                                        <col span="1" style="width: 15%"/>
                                        <col span="1" style="width: 50%"/>
                                        <col span="1" style="width: 30%"/>
                                    </colgroup>
                                    <thead>
                                    <tr class="flag">
                                        <th class="flag">ID</th>
                                        <th class="flag name">Event Name</th>
                                        <th class="flag">Link</th>
                                        <th class="flag">Vote At</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr
                                            class="border-table flag"
                                            v-for="(value, index) in listHistory"
                                            :key="index"
                                    >
                                        <td class="flag">{{ index + 1 }}</td>
                                        <td class="flag name">{{ value.event_name }}</td>
                                        <td class="flag vote">
                                            <a :href="value.event_post_content" target="_blank">{{
                                                sliceContentMobileHistory(value)
                                                }}</a>
                                        </td>
                                        <td class="flag">{{ value.updated_at }}</td>
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
                                        <th class="flag name">Event Name</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <template
                                            v-for="(value, index) in listHistory"
                                    >
                                        <tr
                                                :key="index"
                                                @click="toggle(index)"
                                        >
                                            <td class="flag">{{ index + 1 }}</td>
                                            <td class="flag name">{{ value.event_name }}</td>
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
                                                <p><b><u>Link:</u></b><a :href="value.event_post_content"
                                                                         target="_blank"> {{
                                                    sliceContentMobileHistory(value)
                                                    }}</a>
                                                </p>
                                                <p><b><u>Vote At:</u></b> {{ value.updated_at }}</p>
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
</template>

<script lang="ts">
import {GetListContentUseCases} from "@/usecases/GetListContentUseCases";
import {PostContentVoteUseCases} from "@/usecases/PostContentVoteUseCases";
import {getListHistoryVoteUseCases} from "@/usecases/GetListHistoryVoteUseCases";
import isMobile from "@/helper/platform";
import {toastMessage} from "@/lib/toast"
import {formatDateLowerCase} from '@/helper/format-date'
import {sliceContentMobile} from "@/helper/slice-content";
import * as defineStatus from "@/define/event-status";
import {GetStatusEventUseCases} from "@/usecases/GetStatusEventUseCases";
import {IGetListContent} from "@/entities/GetListContent";
import {IListHistoryVote} from "@/entities/GetListHistoryVote";

export default {
    components: {},
    data() {
        return {
            contentVote: new GetListContentUseCases(),
            listContentVote: [],
            postContentVote: new PostContentVoteUseCases(),
            postVote: {
                content: 1,
                event_id: 0,
                event_post_id: 0,
            },
            voteHistory: new getListHistoryVoteUseCases(),
            listHistory: [],
            isDisable: false,
            opened: [],
            statusEvent: new GetStatusEventUseCases(),
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
        async getListVote() {
            await this.contentVote.getDataListHistory(
                0,
                100,
                Number(this.$route.params.eventID)
            );
            this.listContentVote = this.contentVote.getDataFromAPI();
        },
        async submitVote(value: IGetListContent, err: any, done: any) {
            this.postVote.event_id = value.event_id;
            this.postVote.event_post_id = value.event_post_id;
            this.postContentVote.getDataFromForm(this.postVote);
            value.is_vote = true;
            await this.postContentVote
                .postData()
                .then(function () {
                    done();
                })
                .catch(function () {
                    err();
                    value.is_vote = false;
                });
            await this.getListHistory();
        },
        async getListHistory() {
            await this.voteHistory.getDataListHistory(
                0,
                100,
                Number(this.$route.params.eventID)
            );
            this.listHistory = this.voteHistory.getDataFromAPI();
            formatDateLowerCase(this.listHistory);
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
                message: toastMessage.voteSuccess,
                type: "success",
                position: "top-right",
                duration: 5000,
            });
        },
        sliceContentMobile(obj: any) {
            return sliceContentMobile(obj);
        },
        sliceContentMobileHistory(obj: IListHistoryVote) {
            if (isMobile()) {
                let temp = obj.event_post_content;
                if (temp.length > 30)
                    return temp = temp.slice(0, 30) + "...";
                return temp;
            }
            return obj.event_post_content;
        },
        changeClassBtn(value: IGetListContent) {
            if (value.is_vote) {
                return "btn-success";
            } else {
                if (!this.isDisable) {
                    return "btn-primary";
                } else
                    return "btn-secondary";
            }
        },
        changeTextBtn(value: IGetListContent) {
            if (value.is_vote) {
                return "Voted";
            } else
                return "vote";
        }
    },
    async created() {
        if (await this.statusEvent.checkStatusEvent(Number(this.$route.params.eventID)) !== defineStatus.EVENT_VOTE) {
            return this.$router.push('/403');
        }

        await Promise.all([this.getListVote(), this.getListHistory()]);
    },
    watch: {
        listHistory: function () {
            if (this.listHistory !== null) {
                if (this.listHistory.length >= 3) {
                    this.isDisable = true;
                }
            }
        },
    },
    computed: {
        checkPlatform() {
            return isMobile();
        },
    },
};
</script>

<style scoped>
@import "../../assets/css/scrollbar/scrollbar.css";

td button {
    margin: 3px 0;
}

.w-5 {
    width: 5%;
}

.w-45 {
    width: 45%;
}

.w-25 {
    width: 25%;
}

.btn:disabled {
    opacity: 1;
}

.btn {
    width: 85px;
}

.btn-secondary, .btn-secondary:disabled {
    background-color: #6c757d;
    border-color: #6c757d;
}
</style>

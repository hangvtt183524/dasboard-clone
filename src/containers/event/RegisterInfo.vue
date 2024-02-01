<template>
    <div class="col-12 layout-spacing">
        <div class="widget widget-account-invoice-three">
            <div class="widget-heading widget-padding">
                <div class="content-card">
                    <div class="title-card">
                        <h4 class="">Register Event Information</h4>
                    </div>
                    <div class="infor-reg">
                        <div style="text-align: left">
                            <p>You registered this event with information below:</p>
                            <p v-if="listHistoryReg.telegram !== ''"><b><u>Telegram:</u></b> {{
                                listHistoryReg.telegram
                                }}</p>
                            <p v-if="listHistoryReg.twitter !== ''"><b><u>Twitter:</u></b> {{ listHistoryReg.twitter }}
                            </p>
                            <p v-if="listHistoryReg.reddit !== ''"><b><u>Reddit:</u></b> {{ listHistoryReg.reddit }}</p>
                            <p><b><u>Registered at:</u></b> {{ listHistoryReg.updated_at }}</p>
                        </div>
                    </div>
                    <small style="text-align: right">If this information is wrong, please contact <a
                            class="contact-admin" href="https://roboinu.io/linktree/"
                            target="_blank"><strong><u>admin</u></strong></a> for support.</small>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {GetEventRegListUseCases} from "@/usecases/GetEventRegListUseCases";
import {formatDateLowerCaseObj} from "@/helper/format-date";

export default {
    data() {
        return {
            historyReg: new GetEventRegListUseCases(),
            listHistoryReg: {},
        }
    },
    methods: {
        async getHistoryReg() {
            await this.historyReg.getDataListHistory(0, 100, Number(this.$route.params.eventID));
            this.listHistoryReg = this.historyReg.getDataFromAPI();
            formatDateLowerCaseObj(this.listHistoryReg);
        },
    },
    async created() {
        await this.getHistoryReg();
    }
}
</script>

<style scoped>
.infor-reg {
    display: flex;
    justify-content: center;
}

.contact-admin {
    color: ghostwhite;
}

.contact-admin:hover {
    color: grey;
}
</style>

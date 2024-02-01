<template>
    <div class="col-12 card-info">
        <div class="voted-tag" v-if="event.is_voted">
            <div class="square">
                <p class="text">Voted</p>
            </div>
            <div class="triangle"></div>
        </div>
        <div class="widget widget-account-invoice-three">
            <div class="widget-heading widget-padding">
                <div class="content-card">
                    <div class="row title-card">
                        <div class="col-lg-8 col-12" style="cursor: pointer;">
                            <router-link tag="h4" class="text-white" :to="{
                                name: 'DAO Vote',
                                params: {id: event.id, event: this.event, symbol: this.symbol, Option_1: this.Option_1, Option_2: this.Option_2}
                            }">
                                {{ event.event_name }}
                            </router-link>
                        </div>

                        <div class="col-lg-4 col-12 event-time-block">
                            <div class="time-block">
                                <p class="time-text"><img src="../../assets/svg/timer.svg" alt="Timer">
                                    {{ getTimeEstimate }}
                                </p>
                            </div>
                            <button class="btn btn-size" :class="CssEventStage(getEventStage).class"
                                    @click="goToDetails(event.id)">
                                {{ CssEventStage(getEventStage).name }}
                            </button>
                        </div>
                    </div>
                    <div class="card-vote d-lg-block d-none">
                        <div class="data-container" style="gap: 8px 0;">
                            <div class="data-item">
                                <div class="bar">
                                    <div class="bar-fill" :style="{ width: event.yesCount_percent + '%' }">
                                    </div>
                                    <div class="description">
                                        <p class="text">
                                            <img src="../../assets/svg/cup.svg" alt="Cup"
                                                 v-if="getResultWinner() === EventVote.Options_1">
                                            {{ Option_1 }} {{ formatNumber(event.yesCount) }} {{ symbol }}
                                        </p>
                                        <p class="text">
                                            {{ event.yesCount_percent }}%
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="data-item">
                                <div class="bar">
                                    <div class="bar-fill" :style="{ width: event.noCount_percent + '%' }">
                                    </div>
                                    <div class="description">
                                        <p class="text">
                                            <img src="../../assets/svg/cup.svg" alt="Cup"
                                                 v-if="getResultWinner() === EventVote.Options_2">
                                            {{ Option_2 }} {{ formatNumber(event.noCount) }} {{ symbol }}</p>
                                        <p class="text">
                                            {{ event.noCount_percent }}%</p>
                                    </div>
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

import {EventState, EventVote, IProposalList, OptionResultYesNoVote} from "@/entities/ProposalDetail";
import {PropType} from "vue";
import {CssEventStage, startTimerList} from "@/helper/dao";
import formatNumber from "@/helper/number";

export default {
    computed: {
        EventVote() {
            return EventVote
        },
        getTimeEstimate() {
            return this.timerOutput
        },
        getEventStage() {
            return this.eventStage
        }
    },
    data() {
        return {
            CssEventStage,
            startTimerList,
            timerOutput: "",
        };
    },
    props: {
        event: {
            type: Object as PropType<IProposalList>,
            required: true,
        },
        symbol: {
            type: String,
            required: true,
        },
        eventStage: {
            type: Number,
            required: true,
            default: EventState.None,
        },
        Option_1: {
            type: String,
            required: false,
            default: OptionResultYesNoVote.InFavor,
        },
        Option_2: {
            type: String,
            required: false,
            default: OptionResultYesNoVote.Against,
        },

    },
    watch: {},
    mounted() {
        setInterval(() => {
            this.timerOutput = this.startTimerList();
        }, 1000);
    },
    methods: {
        formatNumber,
        getResultWinner() {
            if (!this.event.is_voted) {
                if (this.event.yesCount_percent > this.event.noCount_percent) {
                    return EventVote.Options_1;
                } else {
                    return EventVote.Options_2;
                }
            }
            return EventVote.None;
        },

        goToDetails(id: number) {
            this.$router.push({
                name: "DAO Vote",
                params: {
                    id: id,
                    event: this.event,
                    symbol: this.symbol,
                    Option_1: this.Option_1,
                    Option_2: this.Option_2,
                }
            });
        },
    }
}
</script>

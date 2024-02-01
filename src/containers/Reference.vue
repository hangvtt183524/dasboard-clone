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
                    <div class="row">
                        <div class="col-12 layout-spacing">
                            <div class="widget widget-account-invoice-three">
                                <div class="widget-heading widget-padding">
                                    <div class="content-card">
                                        <div class="title-card">
                                            <h4 class="">Enter reference code</h4>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-sm-2 col-form-label">Reference code</label>
                                            <div class="col-sm-10">
                                                <input
                                                        type="url"
                                                        class="form-control"
                                                        :placeholder="isDisable?'You entered reference code':'Enter reference code'"
                                                        v-model="inputWalletID.ref_code"
                                                        :readonly="isDisable"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <p v-if="inputBlank" class="text-danger animate__animated animate__fadeInDown">
                                        Please enter reference code
                                    </p>
                                    <button
                                            class="btn button-custom bg-btn"
                                            @click="submit()"
                                            :disabled="isDisable"
                                            v-else
                                    >
                                        Submit
                                    </button>
                                    <div v-if="showHistory"><p>You have confirmed refer from: {{ CheckRef.ref_code }} <a
                                            @click="copyStringToClipboard(CheckRef.ref_code)" class="icons8-copy"></a>
                                        at {{ CheckRef.updated_at }}</p></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 layout-spacing">
                            <div class="widget widget-account-invoice-three">
                                <div class="widget-heading widget-padding">
                                    <div class="content-card">
                                        <div class="title-card">
                                            <h4 class="">Referral list</h4>
                                        </div>
                                        <div class="search text-right">
                                            <select v-model="selectMonth" style="background: #1b2e4b;">
                                                <option v-for="(value, index) in listMonth" :key="index">{{
                                                    value
                                                    }}
                                                </option>
                                            </select>
                                        </div>
                                        <div class="table-content">
                                            <table class="flag" v-if="!checkPlatform">
                                                <colgroup>
                                                    <col span="1" style="width: 5%"/>
                                                    <col span="1" style="width: 30%"/>
                                                    <col span="1" style="width: 30%"/>
                                                    <col span="1" style="width: 35%"/>
                                                </colgroup>
                                                <thead>
                                                <tr class="flag">
                                                    <th class="flag">ID</th>
                                                    <th class="flag">Name</th>
                                                    <th class="flag">Event</th>
                                                    <th class="flag">Enter At</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr
                                                        class="border-table flag"
                                                        v-for="(value, index) in resultQuery"
                                                        :key="index"
                                                >
                                                    <td class="flag">{{ index + 1 }}</td>
                                                    <td class="flag" @click="copyStringToClipboard(value.name)">{{
                                                        value.name
                                                        }}
                                                    </td>
                                                    <td class="flag">{{ value.event_name }}</td>
                                                    <td class="flag">{{ formatDateObj(value.updated_at) }}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                            <table class="flag" v-else>
                                                <colgroup>
                                                    <col span="1" style="width: 5%"/>
                                                    <col span="1" style="width: 80%"/>
                                                    <col span="1" style="width: 15%"/>
                                                </colgroup>
                                                <thead>
                                                <tr class="flag">
                                                    <th class="flag">ID</th>
                                                    <th class="flag">Name</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <template v-for="(value, index) in resultQuery">
                                                    <tr
                                                            :key="index"
                                                            @click="toggle(index)"
                                                    >
                                                        <td class="flag">{{ index + 1 }}</td>
                                                        <td class="flag" @click="copyStringToClipboard(value.name)">{{
                                                            value.name
                                                            }}
                                                        </td>
                                                        <td>
                                                            <div class="icons8-more"></div>
                                                        </td>
                                                    </tr>
                                                    <tr
                                                            class="border-table flag"
                                                            :key="index"
                                                            v-if="opened.includes(index)">
                                                        <td colspan="3">
                                                            <p><b><u>Event:</u></b> {{ value.event_name }}</p>
                                                            <p><b><u>Entered at:</u></b>
                                                                {{ formatDateObj(value.updated_at) }}</p>
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
import {toastMessage} from "@/lib/toast";
import {PostRefUseCases} from "@/usecases/PostRefUseCases";
import {GetCheckRefUseCases} from "@/usecases/GetCheckRefUseCases";
import {formatDateObj} from "@/helper/format-date"
import {GetHistoryRefUseCases} from "@/usecases/GetHistoryRefUseCases";
import moment from 'moment';
import isMobile from "@/helper/platform";
import {IHistoryRef} from "@/entities/GetHistoryRef";
import {IGetEventPost} from "@/entities/GetEventPostList";

export default {
    components: {
        Header,
        Footer,
        SideBar,
        BreadCrumb,
    },
    data: function () {
        return {
            inputBlank: false,
            inputWalletID: {
                ref_code: ''
            },
            isDisable: false,
            showHistory: false,
            postRefUC: new PostRefUseCases(),
            getCheckRef: new GetCheckRefUseCases(),
            CheckRef: [],
            history: new GetHistoryRefUseCases(),
            listHistory: [],
            selectMonth: '',
            listMonth: ["all", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12",],
            opened: [],
            listEventName: ["all", "01", "02"],
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
        copyStringToClipboard(str: string) {
            this.showToastCopy();
            var el = document.createElement('textarea');
            el.value = str;
            el.setAttribute('readonly', '');
            el.style.cssText = 'position: absolute, left: -9999px';
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        },
        checkNullInput() {
            this.inputBlank = this.inputWalletID.ref_code === "";
        },
        submit: async function () {
            this.checkNullInput();
            if (this.inputWalletID.ref_code) {
                this.isDisable = true;
                this.postRefUC.getDataFromForm(this.inputWalletID);
                await this.postRefUC.postData()
                    .then(async () => {
                        await this.getHisCheckRef().finally(() => {
                            if (this.CheckRef.event_id !== -1) {
                                this.showToastDone();
                            } else {
                                this.showToastErr(toastMessage.refMySelf);
                                this.isDisable = false;
                            }
                        });
                    })
                    .catch((error: any) => {
                        if (error.data.code === 4005) {
                            this.showToastErr(toastMessage.refMySelf)
                        } else {
                            this.showToastErr(toastMessage.err);
                        }
                        this.isDisable = false;
                    }).finally(() => {
                        this.inputWalletID.ref_code = "";
                    });
            }
        },
        async getHisCheckRef() {
            await this.getCheckRef.getDataFromAPI();
            this.CheckRef = this.getCheckRef.getData();
            if (this.CheckRef.event_id !== -1) {
                this.isDisable = true;
                this.showHistory = true;
                this.CheckRef.updated_at = formatDateObj(this.CheckRef.updated_at);
            }
        },
        async getHistory() {
            await this.history.getDataListHistory(0, 100);
            this.listHistory = this.history.getDataFromAPI();
        },
        formatDateObj(list: string) {
            return formatDateObj(list);
        },
        showToastErr(text: string) {
            this.$toast.open({
                message: text,
                type: "error",
                position: "top-right",
                duration: 5000,
            });
        },
        showToastCopy() {
            this.$toast.open({
                message: toastMessage.copy,
                type: "success",
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
    },
    async created() {
        await this.getHistory();
        await this.getHisCheckRef();
    },
    computed: {
        resultQuery() {
            if (this.selectMonth !== "all" && this.selectMonth) {
                return this.listHistory.filter((item: IGetEventPost) => {
                    let check = moment(item.UpdatedAt).utc();
                    return this.selectMonth === check.format('MM')
                });
            } else {
                return this.listHistory;
            }
        },

        checkPlatform() {
            return isMobile();
        },
    },
    watch: {
        listHistory: function () {
            if (this.listHistory !== null) {
                this.listHistory.filter((e: IHistoryRef) => {
                    if (!this.listEventName.includes(e.event_name)) {
                        this.listEventName.push(e.event_name);
                    }
                })
            }
        },
    }
}
</script>

<style scoped>
.icons8-copy {
    display: inline-block;
    width: 15px;
    height: 15px;
    background: url('../assets/img/icons8-copy-48.png') 50% 50% no-repeat;
    background-size: 100%;
    cursor: pointer;
}

select {
    border-radius: 10px;
}
</style>

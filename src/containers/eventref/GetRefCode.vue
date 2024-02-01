<template>
    <div>
        <EventRegister v-if="showRegister"></EventRegister>
        <div class="layout-px-spacing" v-if="showRefCode">
            <div class="row">
                <RegisterInfo></RegisterInfo>
                <div class="col-12 layout-spacing">
                    <div class="widget widget-account-invoice-three">
                        <div class="widget-heading widget-padding">
                            <div class="content-card">
                                <div class="title-card">
                                    <h4 class="">Your reference code</h4>
                                </div>
                                <div class="form-inline">
                                    <label class="col-sm-2">Reference code</label>
                                    <div class="col-sm-10">
                                        <input
                                                type="text"
                                                class="form-control w-90"
                                                :value="refCode.ref_code"
                                                readonly
                                                ref="getCode"
                                                @click="copyStringToClipboard"
                                        />
                                        <button class="btn btn-copy" @click="copyStringToClipboard"></button>
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

<script type="ts">
import {GetRefCodeUseCases} from "@/usecases/GetRefCodeUseCases";
import EventRegister from "@/containers/event/EventRegister";
import {GetCheckRegUseCases} from "@/usecases/GetCheckRegUseCases";
import {toastMessage} from "@/lib/toast";
import * as defineType from "@/define/event-type";
import RegisterInfo from "@/containers/event/RegisterInfo";
import {validateRouter} from "@/helper/router-condition";

export default {
    components: {
        EventRegister,
        RegisterInfo
    },
    data: function () {
        return {
            refCode: [],
            getCode: new GetRefCodeUseCases(),
            checkReg: new GetCheckRegUseCases(),
            isReg: undefined,
        };
    },
    methods: {
        copyStringToClipboard() {
            this.showToastCopy();
            let el = document.createElement('textarea');
            el.value = this.$refs.getCode.value;
            el.setAttribute('readonly', '');
            el.style.cssText = 'position: absolute, left: -9999px';
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        },
        async getRefCode() {
            await this.getCode.getData(Number(this.$route.params.eventID));
            this.refCode = this.getCode.getDataFromAPI();
        },
        async getCheckReg() {
            await this.checkReg.getDataFromAPI(Number(this.$route.params.eventID));
            this.isReg = this.checkReg.getData();
        },
        showToastCopy() {
            this.$toast.open({
                message: toastMessage.copy,
                type: "success",
                position: "top-right",
                duration: 5000,
            });
        },
    },
    async created() {
        if (!await validateRouter(Number(this.$route.params.eventID), defineType.EVENT_REF)) {
            return this.$router.push('/403');
        }
        await this.getCheckReg();
        if (this.isReg) {
            await this.getRefCode();
        }
    },
    computed: {
        showRegister() {
            if (this.isReg === undefined)
                return false;
            return !this.isReg;
        },
        showRefCode() {
            if (this.isReg === undefined)
                return false;
            return this.isReg;
        },
    },
    watch: {},
}
</script>

<style scoped>
.btn-copy {
    display: inline-block;
    width: 48px;
    height: 48px;
    background: url('../../assets/img/icons8-copy-48.png') 50% 50% no-repeat;
    background-size: 100%;
}

.w-90 {
    width: 90%;
}

.btn-copy:hover {
    border: transparent;
}
</style>

import Vue from 'vue';
import App from '@/App.vue';
import router from "@/routes";
import store from "@/store";
import titleMixin from "@/mixins/titleMixin"
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import VueGtag from "vue-gtag";
import * as Sentry from "@sentry/vue";
import {parseToken} from "@/api/token";
import {mapActions} from "vuex";
import {LOGOUT_ACTION, MOUDLE_WEB3_NAME} from "@/store/modules/web3/constant";

import dotenv from 'dotenv'
import {getEveConfigVersion} from "@/api/config/get";

import '@/assets/css/styles.css';
import interceptorsSetup from "@/interceptors";

dotenv.config()

Vue.use(VueToast);

Vue.use(VueGtag, {
    config: {id: "G-CW5TMWG2SW"}
});

Vue.prototype.$eventBus = new Vue();
Vue.config.productionTip = false;

Vue.mixin(titleMixin)
Sentry.init({
    Vue,
    dsn: "https://86669a0d323f45be9b05199915b6b16a@o4505062396854272.ingest.sentry.io/4505062405570560",
    integrations: [
        new Sentry.BrowserTracing({
            tracePropagationTargets: ["localhost"],
            routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        }),
        new Sentry.Replay(),
    ],
    environment: process.env.SENTRY || "dev",
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
});
interceptorsSetup()
Vue.filter('truncate', function (text: string, stop: number, clamp: string) {
    return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
});
new Vue({
    render: h => h(App),
    data: {
        version: process.env.VUE_APP_VERSION,
    },
    router,
    store,
    methods: {
        ...mapActions(MOUDLE_WEB3_NAME, [LOGOUT_ACTION]),
        async getEveConfig() {
            const result = await getEveConfigVersion()
            if (result == undefined) {
                return;
            }
            this.version = result.version
        }
    },
    created() {
        let self = this
        this.getEveConfig().then(
            function () {
                if (localStorage.getItem('app_version') !== self.version) {
                    localStorage.removeItem('app_version');
                    localStorage.clear();
                    location.reload();
                }
                if (!localStorage.getItem('app_version')) {
                    localStorage.setItem('app_version', self.version ? self.version : "");
                }
            }
        )

        window.setInterval(() => {
            const token = parseToken();
            if (token !== null) {
                if (token.exp < Date.now() / 1000) {
                    this.logout();
                    if (this.$route.path !== "/") {
                        this.$router.push({path: "/"});
                    }
                }
            }
        }, 1000);
    },
}).$mount('#app')

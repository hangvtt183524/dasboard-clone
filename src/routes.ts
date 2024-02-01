import DashBoard from './containers/DashBoard.vue'
import Portfolio from './containers/Portfolio.vue'
import error403 from './containers/errorpage/403.vue'
import error500 from './containers/errorpage/500.vue'
import EventVote from '@/containers/event/EventVote.vue'
import EventAirDrop from '@/containers/event/EventAirDrop.vue'
import EventPost from '@/containers/event/EventPost.vue'
import EventList from '@/containers/event/EventListPage.vue'
import Reference from '@/containers/Reference.vue'
import GetRefCode from '@/containers/eventref/GetRefCode.vue'
import RoboDAO from '@/containers/eventdao/RoboDAO.vue'
import DAODetails from '@/containers/eventdao/DAODetails.vue'
import ComingSoon from './containers/ComingSoon.vue'
import Ethereum from './containers/Ethereum.vue'

import Vue from "vue";
import VueRouter from "vue-router";
// import {toastMessage} from "@/lib/toast";
// import store from "@/store";
import EventMigrate from "@/containers/event/EventMigrate.vue";

Vue.use(VueRouter);

const routes = [
    {path: '/', name: 'Home', component: DashBoard},
    {path: '/portfolio', name: 'My Portfolio', component: Portfolio},
    {path: '/portfolio/:walletID', name: 'My Portfolio Wallet', component: Portfolio},
    {
        path: '/events', name: 'Events', component: EventList, children: [
            {path: 'post/:eventID', name: 'Post', component: EventPost, props: true},
            {path: 'vote/:eventID', name: 'Vote', component: EventVote, props: true},
            {path: 'refcode/:eventID', name: 'Reference Code', component: GetRefCode, props: true},
            {path: 'airdrop/:eventID', name: 'Air Drop', component: EventAirDrop, props: true},
            {path: 'migration', name: 'Migration', component: EventMigrate, props: true},
        ]
    },
    {path: '/reference', name: 'Reference', component: Reference},
    {path: '/vote', name: 'DAO', component: RoboDAO},
    {path: '/vote/:id', name: 'DAO Vote', component: DAODetails, props: true},
    {path: '/comingsoon', name: 'Coming Soon', component: ComingSoon},
    {path: '/ethereum', name: 'Coming Soon', component: Ethereum},
    {path: '/403', name: 'Forbidden', component: error403},
    {path: '/500', name: 'Internal Server', component: error500},
    {path: '*', redirect: '/403', component: error403},
]

const router = new VueRouter({
    mode: 'history',
    routes
});

// function isAuthenticate(): boolean {
//     return store.getters["Web3ModuleStore/IsLogin"]
// }
//
// function isHolder(): boolean {
//     return store.getters["Web3ModuleStore/IsWalletHolder"]
// }
//
// router.beforeEach(async (to, _, next) => {
//     switch (to.name) {
//         case 'Home':
//         case 'Events':
//             break;
//         case 'Reference':
//             if (isHolder() && isAuthenticate()) {
//                 break;
//             }
//             Vue.$toast.open({
//                 message: isAuthenticate() ? toastMessage.holder : toastMessage.login,
//                 type: "error",
//                 position: "top-right",
//                 duration: 5000,
//             });
//             return next({name: 'Home'});
//         default:
//             if (!isAuthenticate()) {
//                 Vue.$toast.open({
//                     message: toastMessage.login,
//                     type: "error",
//                     position: "top-right",
//                     duration: 5000,
//                 });
//                 return next({name: 'Home'});
//             }
//             break;
//     }
//     return next();
// });
export default router

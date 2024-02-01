import store from "@/store/index";
import {GetStatusEventUseCases} from "@/usecases/GetStatusEventUseCases";
import * as defineStatus from "@/define/event-status"
import {GetTypeEventUseCases} from "@/usecases/GetTypeEventUseCases";

export async function validateRouter(event_id: number, type: number) {
    let statusEvent = new GetStatusEventUseCases();
    let typeEvent = new GetTypeEventUseCases();

    if (await statusEvent.checkStatusEvent(event_id) !== defineStatus.EVENT_OPEN) {
        return false;
    }
    if (await typeEvent.checkTypeEvent(event_id) !== type) {
        return false;
    }
    if (!store.getters.IsLogin || !store.getters.IsWalletHolder) {
        return false;
    }
    return true;
}

import moment from 'moment'
import isMobile from "@/helper/platform";

export function dateTimeToUTC(datetime: string) {
    var dt = new Date(datetime);
    return dt.toUTCString().slice(0, 25) + " UTC";
}

export function formatDatMobileScr(datetime: string) {
    var date = moment(datetime).utc();
    return date.format("MM/DD/YYYY HH:mm") + " UTC"
}

export function formatDateLowerCase(listHis: any) {

    if (isMobile()) {
        for (let index in listHis) {
            listHis[index].updated_at = formatDatMobileScr(
                listHis[index].updated_at
            );
        }
    } else {
        for (let index in listHis) {
            listHis[index].updated_at = dateTimeToUTC(listHis[index].updated_at);
        }
    }
}

export function formatDate(listHis: any) {
    if (isMobile()) {
        for (let index in listHis) {
            listHis[index].UpdatedAt = formatDatMobileScr(
                listHis[index].UpdatedAt
            );
        }
    } else {
        for (let index in listHis) {
            listHis[index].UpdatedAt = dateTimeToUTC(listHis[index].UpdatedAt);
        }
    }
}

export function formatDateObj(date: string) {
    if (isMobile()) {
        return formatDatMobileScr(date);
    } else {
        return dateTimeToUTC(date);
    }
}

export function formatDateLowerCaseObj(ObjHis: any) {
    if (isMobile()) {
        ObjHis.updated_at = formatDatMobileScr(ObjHis.updated_at)
    } else {
        ObjHis.updated_at = dateTimeToUTC(ObjHis.updated_at);
    }
}

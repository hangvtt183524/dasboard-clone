import isMobile from "@/helper/platform";

export function sliceContentMobile(obj: any) {
    if (isMobile()) {
        let temp = obj.content;
        if (temp.length > 30)
            return temp.slice(0, 30) + "...";
        return temp;
    }
    return obj.content;
}

export function sliceWalletIDMobile(text: string) {
    if (isMobile()) {
        let temp = text;
        return temp.slice(0, 5) + "..." + temp.slice(-5);
    }
    return text;
}

export function sliceWalletID(text: string) {
    let temp = text;
    return temp.slice(0, 5) + "..." + temp.slice(-5);
}

export function sliceWalletIDMobileDynanmic(text: string,from: number, to: number) {
    if (isMobile()) {
        let temp = text;
        return temp.slice(from, to) + "..." + temp.slice(-to);
    }
    return text;
}
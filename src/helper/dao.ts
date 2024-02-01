import {EventState} from "@/entities/ProposalDetail";

const millisecondsInOneSecond = 1000;
const millisecondsInOneMinute = 1000 * 60;
const millisecondsInOneHour = 1000 * 60 * 60;
const millisecondsInOneDay = 1000 * 60 * 60 * 24;

export function CssEventStage(stage: number) {
    let rs = {class: "", name: ""};
    switch (stage) {
        case EventState.Open:
            rs.class = "_open";
            rs.name = "Open";
            break;
        case EventState.Expired:
            rs.class = "_expired";
            rs.name = "Expired";
            break;
        default:
            rs.class = "_none";
            rs.name = "Process";
            break;
    }
    return rs;
}

export function startTimerList(): string {
    let timerOutput: string;
    const timeNow = new Date().getTime();
    const timeDifference = this.event.time_to_end * 1000 - timeNow;

    const differenceInDays = timeDifference / millisecondsInOneDay;
    const remainderDifferenceInHours = (timeDifference % millisecondsInOneDay) / millisecondsInOneHour;
    const remainderDifferenceInMinutes = (timeDifference % millisecondsInOneHour) / millisecondsInOneMinute;
    const remainderDifferenceInSeconds = (timeDifference % millisecondsInOneMinute) / millisecondsInOneSecond;
    const remainingDays = Math.floor(differenceInDays);
    const remainingHours = Math.floor(remainderDifferenceInHours).toString().length === 1 ? '0' + Math.floor(remainderDifferenceInHours) : Math.floor(remainderDifferenceInHours);
    const remainingMinutes = Math.floor(remainderDifferenceInMinutes).toString().length === 1 ? '0' + Math.floor(remainderDifferenceInMinutes) : Math.floor(remainderDifferenceInMinutes);
    const remainingSeconds = Math.floor(remainderDifferenceInSeconds).toString().length === 1 ? '0' + Math.floor(remainderDifferenceInSeconds) : Math.floor(remainderDifferenceInSeconds);

    timerOutput = remainingDays + " days " + remainingHours + "h " + remainingMinutes + "m " + remainingSeconds + "s UTC left";
    if (remainingSeconds < 0) {
        timerOutput = "Ended " + -remainingDays + " days left"
    }
    return timerOutput
}

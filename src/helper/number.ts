export default function formatNumber(amount: any) {
    if ((amount == "") || (amount == 0)) {
        return "-";
    }
    return amount.toString().replace(/(?<!(\.\d*|^.{0}))(?=(\d{3})+(?!\d))/g, ',');
}

export function IsDebug() {
    return process.env.DEBUG || false
}

export function errorStatus(params: any){

    if (IsDebug()) {
        if(params.code === 1002) {
            console.log(params)
        }
    }

}

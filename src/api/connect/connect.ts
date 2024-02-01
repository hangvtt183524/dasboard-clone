const BASE_URL = "https://dzbxsf9z87.execute-api.us-east-1.amazonaws.com/Prod/api/v1"

export async function getNonce(address: string) {
    const reqOpts = {
        method: "GET",
        headers: {"Content-Type": "application/json"},
    };
    const response = await fetch(BASE_URL + "/connect/nonce?address=" + address, reqOpts);
    if (response.status === 200) {
        const data = await response.json();
        const nonce = data.nonce;
        return [200, nonce];
    }
    return [response.status, ""];
}

export async function register(address: string) {
    const reqOpts = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            address: address,
        }),
    };
    const response = await fetch(
        BASE_URL + "/connect/signup",
        reqOpts
    );
    if (response.status === 201) {
        return null;
    }
    if (response.status === 200) {
        return await response.json();
    }
    return null;
}

export async function performLogin(address: string, sig: string) {
    const reqOpts = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            address: address,
            signature: sig,
        }),
    };
    const response = await fetch(
        BASE_URL + "/connect/login",
        reqOpts
    );
    if (response.status === 200) {
        return await response.json();
    }
    return null;
}

export async function signMessage(provider: any, nonce: any) {
    const rawMessage = "Welcome to Robo Global Investment!\n\n Click to sign with nonce: " + nonce + ".\nIt means that I accept RGI Terms of Service https://roboglobal.info/term\n\n Happy discovery!";
    try {
        const signer = provider.getSigner();
        return await signer.signMessage(rawMessage);
    } catch (error) {
        return null
    }
}

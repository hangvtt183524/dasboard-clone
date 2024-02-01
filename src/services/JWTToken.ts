import { encode } from "jwt-simple";
import { EncodeResult, Session } from "@/constants/jwt";
import store from "@/store";

export function encodeSession(secretKey: string): EncodeResult {
    const algorithm = "HS256";
    const issued = Date.now();
    const fifteenMinutesInMs = 15 * 60 * 1000;
    const expires = issued + fifteenMinutesInMs;
    const session: Session = {
        issued: issued,
        expires: expires,
        name: store.getters.getAddress,
    };
    const token = encode(session, secretKey, algorithm)
    localStorage.setItem("token", token)
    return {
        token: token,
        issued: issued,
        expires: expires
    };
}

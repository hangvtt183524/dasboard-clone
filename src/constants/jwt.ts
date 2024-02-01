export interface Session {

    /**
     * Timestamp indicating when the session was created, in Unix milliseconds.
     */
    issued: number;
    /**
     * Timestamp indicating when the session should expire, in Unix milliseconds.
     */
    expires: number;
    name: string;
}

/**
 * Identical to the Session type, but without the `issued` and `expires` properties.
 */
// eslint-disable-next-line no-undef
export type PartialSession = Omit<Session, "issued" | "expires">;

export interface EncodeResult {
    token: string,
    expires: number,
    issued: number
}

export type DecodeResult =
    | {
    type: "valid";
    session: Session;
}
    | {
    type: "integrity-error";
}
    | {
    type: "invalid-token";
};

export type ExpirationStatus = "expired" | "active" | "grace";

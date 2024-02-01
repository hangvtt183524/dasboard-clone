import {encodeSession} from "@/services/JWTToken";

export function authHeader() {
    let header = generateHeaderToken()
    if (!header) {
        encodeSession("8j5rmx3aThtCGPLf");
        header = generateHeaderToken()
    }

    return header
}

function generateHeaderToken() {
    let token = localStorage.getItem('token');
    if (token) {
        return {'Authorization': 'Bearer ' + token};
    }
    return null
}

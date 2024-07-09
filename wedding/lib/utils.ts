import { CFP_COOKIE_KEY } from './constants';

export function toJSON(data: unknown, status = 200): Response {
    let body = JSON.stringify(data, null, 2);
    let headers = {'content-type': 'application/json'};
    return new Response(body, {headers, status});
}

export function toError(error: string | unknown, status = 400): Response {
    return toJSON({error}, status);
}

export function reply(output: any): Response {
    if (output != null) return toJSON(output, 200);
    return toError('Error with query', 500);
}

export async function sha256(str: string): Promise<string> {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
    return Array.prototype.map
        .call(new Uint8Array(buf), (x) => ('00' + x.toString(16)).slice(-2))
        .join('');
}

export async function getCookieKeyValue(password?: string): Promise<string> {
    if (password != null) {
        const hash: string = await sha256(password);
        return `${CFP_COOKIE_KEY}=${hash}`;
    }
    return ""
}
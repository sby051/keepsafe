import type { RequestHandler } from "./$types";
import { HttpStatusCode } from "../types";
import { error, json } from "@sveltejs/kit";

const LIMIT = 1000;

// api/v1/bruteforce?vault=...
export const GET = (async ({ url, fetch, getClientAddress }) => {
    console.log(`(GET)-[/api/v2/crypto/bruteforce]-(${getClientAddress()}): Made request to bruteforce vault`);

    const text = url.searchParams.get("text");

    if (!text) throw error(HttpStatusCode.BadRequest, "Missing 'text' search parameter");

    const passwordsResponse = await _get_passwords(fetch);
    if (!passwordsResponse) throw error(HttpStatusCode.InternalServerError, "Failed to fetch password list");

    const PASSWORDS = passwordsResponse.slice(0, LIMIT);

    for (const PASSWORD of PASSWORDS) {
        const response = await fetch("/api/v2/crypto", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${PASSWORD}`
            },
            body: JSON.stringify({
                text,
                operation: "decrypt"
            })
        });
        if (response.ok) {
            console.log("[/api/v2/crypto/bruteforce] Found password for text:", PASSWORD);
            return new Response(PASSWORD);
        }
    }

    throw error(HttpStatusCode.NotFound, "No password found");
}) satisfies RequestHandler;

const _get_passwords = async (fetch: any): Promise<string[] | null> => {
    const response = await fetch("https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/10-million-password-list-top-1000.txt");
    if (!response.ok) return null;
    return (await response.text()).split("\n");
};

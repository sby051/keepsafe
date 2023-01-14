import type { RequestHandler } from "./$types";
import type { BruteforceResponseBody } from "../types";
import { error, json } from "@sveltejs/kit";
import { HttpStatusCode } from "../types";

const LIMIT = 1000;

// api/v1/bruteforce?vault=...
export const GET = (async ({ url, fetch, getClientAddress }) => {
    console.log(`(GET)-[/api/v1/vault]-(${getClientAddress()}): Made request to bruteforce vault`);

    const vault = url.searchParams.get("vault");

    if (!vault) throw error(HttpStatusCode.BadRequest, "Please provide a vault to bruteforce");

    const PASSWORDS = (await _get_passwords(fetch)).slice(0, LIMIT);

    for (const PASSWORD of PASSWORDS) {
        const response = await fetch("/api/v1/vault", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${PASSWORD}`
            },
            body: JSON.stringify({
                vault,
                operation: "decrypt"
            })
        });
        if (response.ok) {
            console.log("[/api/v1/bruteforce] Found password for text:", PASSWORD);
            return json({
                password: PASSWORD,
                response: await response.json(),
                attemptsMade: PASSWORDS.indexOf(PASSWORD)
            } as BruteforceResponseBody);
        }
    }

    throw error(HttpStatusCode.NotFound, "No password found");
}) satisfies RequestHandler;

const _get_passwords = async (fetch: any) => {
    const response = await fetch("https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/10-million-password-list-top-1000.txt");
    return (await response.text()).split("\n");
};

import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
    return { fetch }
}) satisfies PageLoad;
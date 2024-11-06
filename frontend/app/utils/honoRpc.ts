import type { AppType } from "~/../../server/src/index";
import { hc } from "hono/client";

export const honoClient = hc<AppType>(import.meta.env.VITE_BACKEND_BASE_URL, {
	init: {
		credentials: "include", // by default fetch will not send cookies :), this will include them
	},
});

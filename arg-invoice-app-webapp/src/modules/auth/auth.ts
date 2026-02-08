const KEY = "arg-invoice-app/accessToken";

window.addEventListener("storage", (e) => {
	if (e.key === KEY && !e.newValue) {
		cachedToken = null;
	}
});

let cachedToken = localStorage.getItem(KEY);

/*
 * Simple cross-tab auth store that caches a single access token in memory and mirrors it to localStorage.
 *
 * Current behavior:
 * - On load: reads value from localStorage into `cachedToken`.
 * - set(token): ignores falsy values, updates `cachedToken` and localStorage.
 * - get(): returns the in-memory `cachedToken`.
 * - clear(): clears `cachedToken` and removes the key from localStorage.
 * - A `storage` event listener clears the in-memory cache when another tab removes the key.
 *
 * Important limitations and suggested improvements:
 * - Security: localStorage is accessible from JavaScript and vulnerable to XSS.
 * - Validation: values read from storage are not validated.
 * - Cross-tab sync: the current listener only reacts to removal.
 * - Race conditions & initialization: concurrent writes across tabs may cause unexpected state.
 * - Type safety & error handling: add TypeScript types for token shape and robust
 *   try/catch when reading/parsing storage values.
 */
export const authStore = {
	get: () => cachedToken,
	set: (token: string) => {
		if (!token) return;
		cachedToken = token;
		localStorage.setItem(KEY, token);
	},
	clear: () => {
		cachedToken = null;
		localStorage.removeItem(KEY);
	},
};

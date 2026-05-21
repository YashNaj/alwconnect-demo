import { BRAND } from '$lib/constants/brand';

type Session = { email: string; displayName: string; greeting: string };

let session = $state<Session | null>(null);
let pendingWelcome = $state(false);

export const auth = {
	get current() {
		return session;
	},
	get isAuthed() {
		return session !== null;
	},
	get hasPendingWelcome() {
		return pendingWelcome;
	},
	signIn(email: string) {
		const trimmed = email.trim();
		session = {
			email: trimmed,
			displayName: BRAND.defaultDisplayName,
			greeting: BRAND.defaultGreeting
		};
		pendingWelcome = true;
	},
	consumeWelcome() {
		pendingWelcome = false;
	},
	signOut() {
		session = null;
		pendingWelcome = false;
	}
};

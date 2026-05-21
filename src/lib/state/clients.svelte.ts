import type {
	Client,
	EligibilityDoc,
	EmergencyContact,
	PersonalInfo,
	PlaceOfService,
	ReferralSource,
	ServiceDates,
	Insurance
} from '$lib/types';
import { SEED_CLIENTS } from './seed';

const clients = $state<Client[]>(structuredClone(SEED_CLIENTS));

let nextDocSeq = 100;
let nextPosSeq = 100;
let nextContactSeq = 100;

function uid(prefix: string) {
	if (prefix === 'd') return `d${nextDocSeq++}`;
	if (prefix === 'pos') return `pos${nextPosSeq++}`;
	if (prefix === 'c') return `c${nextContactSeq++}`;
	return `${prefix}${Math.random().toString(36).slice(2, 8)}`;
}

function blankClient(id: string): Client {
	return {
		id,
		tier: 3,
		habilitation: false,
		assistedLiving: '',
		eligibility: 'active',
		personal: {
			lastName: '',
			firstName: '',
			mrNumber: id,
			gender: '',
			ssn: '',
			maritalStatus: '',
			dob: '',
			address: '',
			phone: '',
			city: '',
			state: '',
			zip: '',
			email: ''
		},
		insurance: {
			mediCalNumber: '',
			hmo: '',
			eligibility: '',
			shareOfCost: '',
			dateEligibilityVerified: '',
			medicareNumber: '',
			documents: []
		},
		serviceDates: {
			referralDate: '',
			enrollmentDate: '',
			waitlistDate: '',
			disenrollmentDate: '',
			waitlistType: '',
			disenrollmentReason: '',
			waitlistReleaseDate: '',
			status: 'PENDING',
			applicationSubmissionDate: '',
			transfer: 'N/A',
			reEnrollment: 'N/A'
		},
		pos: { current: null, history: [] },
		contacts: { emergency: [], mainContactId: null },
		referral: { type: '', individual: '', role: '', organization: '' }
	};
}

function generateClientId(): string {
	const year = new Date().getFullYear();
	const existing = clients
		.map((c) => c.id)
		.filter((id) => id.startsWith(`${year}-`))
		.map((id) => Number(id.split('-')[1]?.replace(/\D/g, '')) || 0);
	const next = (existing.length === 0 ? 0 : Math.max(...existing)) + 1;
	return `${year}-${String(next).padStart(3, '0')}`;
}

function find(id: string) {
	return clients.find((c) => c.id === id);
}

export const clientStore = {
	get all() {
		return clients;
	},
	byId(id: string) {
		return find(id);
	},

	create(initial?: Partial<PersonalInfo>): Client {
		const id = generateClientId();
		const draft = blankClient(id);
		if (initial) draft.personal = { ...draft.personal, ...initial };
		clients.push(draft);
		return draft;
	},

	remove(id: string) {
		const i = clients.findIndex((c) => c.id === id);
		if (i >= 0) clients.splice(i, 1);
	},

	updatePersonal(id: string, patch: Partial<PersonalInfo>) {
		const c = find(id);
		if (!c) return;
		c.personal = { ...c.personal, ...patch };
	},

	updateInsurance(id: string, patch: Partial<Insurance>) {
		const c = find(id);
		if (!c) return;
		c.insurance = { ...c.insurance, ...patch };
	},

	updateServiceDates(id: string, patch: Partial<ServiceDates>) {
		const c = find(id);
		if (!c) return;
		c.serviceDates = { ...c.serviceDates, ...patch };
	},

	updateReferral(id: string, patch: Partial<ReferralSource>) {
		const c = find(id);
		if (!c) return;
		c.referral = { ...c.referral, ...patch };
	},

	// Place of Service ----------------------------------------------------
	upsertCurrentPOS(id: string, draft: Omit<PlaceOfService, 'id'>) {
		const c = find(id);
		if (!c) return;
		if (c.pos.current) {
			c.pos.current = { ...c.pos.current, ...draft };
		} else {
			const next: PlaceOfService = { ...draft, id: uid('pos') };
			c.pos.current = next;
		}
	},
	addPOSToHistory(id: string, entry: Omit<PlaceOfService, 'id'>) {
		const c = find(id);
		if (!c) return;
		c.pos.history.push({ ...entry, id: uid('pos') });
	},
	deletePOS(id: string) {
		const c = find(id);
		if (!c) return;
		c.pos.current = null;
	},
	promoteHistoryToCurrent(id: string, historyId: string) {
		const c = find(id);
		if (!c) return;
		const idx = c.pos.history.findIndex((p) => p.id === historyId);
		if (idx < 0) return;
		const [item] = c.pos.history.splice(idx, 1);
		if (c.pos.current) c.pos.history.unshift(c.pos.current);
		c.pos.current = item;
	},

	// Contacts ------------------------------------------------------------
	addContact(id: string, entry: Omit<EmergencyContact, 'id'>) {
		const c = find(id);
		if (!c) return;
		const next: EmergencyContact = { ...entry, id: uid('c') };
		c.contacts.emergency.push(next);
		if (!c.contacts.mainContactId) c.contacts.mainContactId = next.id;
	},
	updateContact(id: string, contactId: string, patch: Partial<EmergencyContact>) {
		const c = find(id);
		if (!c) return;
		const target = c.contacts.emergency.find((x) => x.id === contactId);
		if (!target) return;
		Object.assign(target, patch);
	},
	deleteContact(id: string, contactId: string) {
		const c = find(id);
		if (!c) return;
		c.contacts.emergency = c.contacts.emergency.filter((x) => x.id !== contactId);
		if (c.contacts.mainContactId === contactId) {
			c.contacts.mainContactId = c.contacts.emergency[0]?.id ?? null;
		}
	},
	setMainContact(id: string, contactId: string) {
		const c = find(id);
		if (!c) return;
		c.contacts.mainContactId = contactId;
	},

	// Eligibility documents ----------------------------------------------
	addDocument(id: string, doc: { fileName: string; staffName: string }) {
		const c = find(id);
		if (!c) return;
		const today = new Date();
		const dateStr = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(
			today.getDate()
		).padStart(2, '0')}/${String(today.getFullYear()).slice(2)}`;
		const next: EligibilityDoc = {
			id: uid('d'),
			fileName: doc.fileName,
			staffName: doc.staffName,
			uploadDate: dateStr
		};
		c.insurance.documents.push(next);
	},
	deleteDocument(id: string, docId: string) {
		const c = find(id);
		if (!c) return;
		c.insurance.documents = c.insurance.documents.filter((d) => d.id !== docId);
	}
};

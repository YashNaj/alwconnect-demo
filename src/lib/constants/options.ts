import type {
	ClientStatus,
	ContactRelationship,
	Gender,
	MaritalStatus,
	POSType,
	ReferralRole,
	ReferralType,
	ReEnrollmentState,
	Tier,
	TransferState,
	WaitlistType
} from '$lib/types';

type Opt<T extends string | number> = { value: T; label: string };

export const STATUS_OPTIONS: Opt<ClientStatus>[] = [
	{ value: 'ENROLLED', label: 'Enrolled' },
	{ value: 'WAITLISTED', label: 'Waitlisted' },
	{ value: 'DISENROLLED', label: 'Disenrolled' },
	{ value: 'PENDING', label: 'Pending' },
	{ value: 'TRANSFERRED', label: 'Transferred' }
];

export const GENDER_OPTIONS: Opt<Gender>[] = [
	{ value: 'M', label: 'Male' },
	{ value: 'F', label: 'Female' },
	{ value: 'X', label: 'Non-binary' }
];

export const MARITAL_STATUS_OPTIONS: Opt<MaritalStatus>[] = [
	{ value: 'Single', label: 'Single' },
	{ value: 'Married', label: 'Married' },
	{ value: 'Divorced', label: 'Divorced' },
	{ value: 'Widowed', label: 'Widowed' },
	{ value: 'Separated', label: 'Separated' }
];

export const TIER_OPTIONS: Opt<Tier>[] = [
	{ value: 1, label: 'Tier 1' },
	{ value: 2, label: 'Tier 2' },
	{ value: 3, label: 'Tier 3' },
	{ value: 4, label: 'Tier 4' }
];

export const WAITLIST_TYPE_OPTIONS: Opt<WaitlistType>[] = [
	{ value: 'Standard', label: 'Standard' },
	{ value: 'Priority', label: 'Priority' },
	{ value: 'Hardship', label: 'Hardship' }
];

export const TRANSFER_OPTIONS: Opt<TransferState>[] = [
	{ value: 'N/A', label: 'N/A' },
	{ value: 'Yes', label: 'Yes' },
	{ value: 'No', label: 'No' }
];

export const RE_ENROLLMENT_OPTIONS: Opt<ReEnrollmentState>[] = [
	{ value: 'N/A', label: 'N/A' },
	{ value: 'Yes', label: 'Yes' },
	{ value: 'No', label: 'No' }
];

export const POS_TYPE_OPTIONS: Opt<POSType>[] = [
	{ value: 'AFL', label: 'AFL (Adult Family Living)' },
	{ value: 'Community Home', label: 'Community Home' },
	{ value: 'Extended Stay', label: 'Extended Stay' },
	{ value: 'Other', label: 'Other' }
];

export const REFERRAL_TYPE_OPTIONS: Opt<ReferralType>[] = [
	{ value: 'Self', label: 'Self' },
	{ value: 'Family', label: 'Family' },
	{ value: 'Provider', label: 'Provider' },
	{ value: 'Agency', label: 'Agency' },
	{ value: 'Other', label: 'Other' }
];

export const REFERRAL_ROLE_OPTIONS: Opt<ReferralRole>[] = [
	{ value: 'Case Manager', label: 'Case Manager' },
	{ value: 'Physician', label: 'Physician' },
	{ value: 'Social Worker', label: 'Social Worker' },
	{ value: 'Family Member', label: 'Family Member' },
	{ value: 'Other', label: 'Other' }
];

export const CONTACT_RELATIONSHIP_OPTIONS: Opt<ContactRelationship>[] = [
	{ value: 'Spouse', label: 'Spouse' },
	{ value: 'Parent', label: 'Parent' },
	{ value: 'Child', label: 'Child' },
	{ value: 'Sibling', label: 'Sibling' },
	{ value: 'Friend', label: 'Friend' },
	{ value: 'Guardian', label: 'Guardian' },
	{ value: 'Other', label: 'Other' }
];

export const STATE_OPTIONS: Opt<string>[] = [
	'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
].map((s) => ({ value: s, label: s }));

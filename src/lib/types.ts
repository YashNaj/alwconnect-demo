export type ClientStatus =
	| 'ENROLLED'
	| 'WAITLISTED'
	| 'DISENROLLED'
	| 'PENDING'
	| 'TRANSFERRED';

export type Eligibility = 'active' | 'inactive';

export type Tier = 1 | 2 | 3 | 4;

export type Gender = 'M' | 'F' | 'X';

export type MaritalStatus = 'Single' | 'Married' | 'Divorced' | 'Widowed' | 'Separated';

export type WaitlistType = 'Standard' | 'Priority' | 'Hardship';

export type TransferState = 'Yes' | 'No' | 'N/A';

export type ReEnrollmentState = 'Yes' | 'No' | 'N/A';

export type POSType = 'AFL' | 'Community Home' | 'Extended Stay' | 'Other';

export type ReferralType = 'Self' | 'Family' | 'Provider' | 'Agency' | 'Other';

export type ReferralRole =
	| 'Case Manager'
	| 'Physician'
	| 'Social Worker'
	| 'Family Member'
	| 'Other';

export type ContactRelationship =
	| 'Spouse'
	| 'Parent'
	| 'Child'
	| 'Sibling'
	| 'Friend'
	| 'Guardian'
	| 'Other';

export type Address = {
	street: string;
	city: string;
	state: string;
	zip: string;
};

export type PersonalInfo = {
	lastName: string;
	firstName: string;
	mrNumber: string;
	gender: Gender | '';
	ssn: string;
	maritalStatus: MaritalStatus | '';
	dob: string;
	address: string;
	phone: string;
	city: string;
	state: string;
	zip: string;
	email: string;
};

export type EligibilityDoc = {
	id: string;
	fileName: string;
	staffName: string;
	uploadDate: string;
};

export type Insurance = {
	mediCalNumber: string;
	hmo: string;
	eligibility: string;
	shareOfCost: string;
	dateEligibilityVerified: string;
	medicareNumber: string;
	documents: EligibilityDoc[];
};

export type ServiceDates = {
	referralDate: string;
	enrollmentDate: string;
	waitlistDate: string;
	disenrollmentDate: string;
	waitlistType: WaitlistType | '';
	disenrollmentReason: string;
	waitlistReleaseDate: string;
	status: ClientStatus;
	applicationSubmissionDate: string;
	transfer: TransferState;
	reEnrollment: ReEnrollmentState;
};

export type PlaceOfService = {
	id: string;
	type: POSType | '';
	effectiveDate: string;
	facilityName: string;
	address: string;
	city: string;
	state: string;
	zip: string;
	phone: string;
	email: string;
};

export type EmergencyContact = {
	id: string;
	lastName: string;
	firstName: string;
	phone: string;
	email: string;
	contactIs: ContactRelationship | '';
	clientIs: ContactRelationship | '';
	poa: 'Yes' | 'No' | '';
};

export type ReferralSource = {
	type: ReferralType | '';
	individual: string;
	role: ReferralRole | '';
	organization: string;
};

export type Client = {
	id: string;
	tier: Tier;
	habilitation: boolean;
	assistedLiving: string;
	eligibility: Eligibility;
	personal: PersonalInfo;
	insurance: Insurance;
	serviceDates: ServiceDates;
	pos: { current: PlaceOfService | null; history: PlaceOfService[] };
	contacts: { emergency: EmergencyContact[]; mainContactId: string | null };
	referral: ReferralSource;
};

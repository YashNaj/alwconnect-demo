import type { Client } from '$lib/types';

const empty = (id: string): Client['personal'] => ({
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
});

type ClientOverrides = Omit<Partial<Client>, 'personal'> & {
	personal?: Partial<Client['personal']>;
};

function make(id: string, overrides: ClientOverrides): Client {
	const { personal: personalOverride, ...rest } = overrides;
	return {
		id,
		tier: 3,
		habilitation: true,
		assistedLiving: '',
		eligibility: 'active',
		personal: { ...empty(id), ...(personalOverride ?? {}) },
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
		referral: { type: '', individual: '', role: '', organization: '' },
		...rest
	};
}

// 7 rows visible on PDF page 2
export const SEED_CLIENTS: Client[] = [
	make('2024-001', {
		personal: { firstName: 'John', lastName: 'Doe', dob: '01/01/1920', gender: 'M' },
		tier: 3,
		habilitation: true,
		assistedLiving: 'Sunny Assisted Living',
		eligibility: 'inactive',
		serviceDates: {
			referralDate: '',
			enrollmentDate: '01/01/2024',
			waitlistDate: '10/01/2024',
			disenrollmentDate: '05/25/2025',
			waitlistType: 'Standard',
			disenrollmentReason: '',
			waitlistReleaseDate: '12/10/2024',
			status: 'DISENROLLED',
			applicationSubmissionDate: '',
			transfer: 'N/A',
			reEnrollment: 'N/A'
		},
		insurance: {
			mediCalNumber: '12345678A',
			hmo: '',
			eligibility: '$0 SOC as of 04/30/2026',
			shareOfCost: '$0',
			dateEligibilityVerified: '04/30/2026',
			medicareNumber: '',
			documents: [
				{
					id: 'd1',
					fileName: 'Eligibility_JD_04.20.05.pdf',
					staffName: 'Earlienne Rillo',
					uploadDate: '04/20/2025'
				},
				{
					id: 'd2',
					fileName: 'Eligibility_JD_03.01.05.pdf',
					staffName: 'Earlienne Rillo',
					uploadDate: '03/01/2025'
				}
			]
		}
	}),
	make('2024-001B', {
		personal: { firstName: 'John', lastName: 'Doe', dob: '01/01/1920', gender: 'M' },
		tier: 4,
		habilitation: true,
		assistedLiving: 'Sunny Assisted Living',
		eligibility: 'active',
		serviceDates: {
			referralDate: '',
			enrollmentDate: '',
			waitlistDate: '10/01/2024',
			disenrollmentDate: '',
			waitlistType: 'Standard',
			disenrollmentReason: '',
			waitlistReleaseDate: '08/25/2025',
			status: 'ENROLLED',
			applicationSubmissionDate: '',
			transfer: 'N/A',
			reEnrollment: 'N/A'
		}
	}),
	make('2024-002', {
		personal: { firstName: 'Bruce', lastName: 'Wayne', dob: '05/15/1944', gender: 'M' },
		tier: 1,
		habilitation: false,
		assistedLiving: 'Golden Oaks III',
		eligibility: 'active',
		serviceDates: {
			referralDate: '',
			enrollmentDate: '',
			waitlistDate: '10/22/2024',
			disenrollmentDate: '',
			waitlistType: 'Standard',
			disenrollmentReason: '',
			waitlistReleaseDate: '',
			status: 'ENROLLED',
			applicationSubmissionDate: '',
			transfer: 'N/A',
			reEnrollment: 'N/A'
		}
	}),
	make('2025-001', {
		personal: { firstName: 'Barbara', lastName: 'Truman', dob: '08/17/1965', gender: 'F' },
		tier: 2,
		habilitation: false,
		assistedLiving: 'Villa del Sol',
		eligibility: 'active',
		serviceDates: {
			referralDate: '',
			enrollmentDate: '10/24/2024',
			waitlistDate: '03/01/2025',
			disenrollmentDate: '',
			waitlistType: 'Standard',
			disenrollmentReason: '',
			waitlistReleaseDate: '',
			status: 'WAITLISTED',
			applicationSubmissionDate: '',
			transfer: 'N/A',
			reEnrollment: 'N/A'
		}
	}),
	make('2025-002', {
		personal: { firstName: 'Bob', lastName: 'McNelson', dob: '03/03/1932', gender: 'M' },
		tier: 3,
		habilitation: true,
		assistedLiving: 'Tranquil Gardens Assisted Living',
		eligibility: 'inactive',
		serviceDates: {
			referralDate: '',
			enrollmentDate: '',
			waitlistDate: '10/01/2024',
			disenrollmentDate: '',
			waitlistType: 'Standard',
			disenrollmentReason: '',
			waitlistReleaseDate: '',
			status: 'WAITLISTED',
			applicationSubmissionDate: '',
			transfer: 'N/A',
			reEnrollment: 'N/A'
		}
	}),
	make('2025-003', {
		personal: { firstName: 'Melinda', lastName: 'Gates', dob: '05/09/1968', gender: 'F' },
		tier: 2,
		habilitation: false,
		assistedLiving: '',
		eligibility: 'active',
		serviceDates: {
			referralDate: '',
			enrollmentDate: '',
			waitlistDate: '',
			disenrollmentDate: '',
			waitlistType: 'Standard',
			disenrollmentReason: '',
			waitlistReleaseDate: '',
			status: 'PENDING',
			applicationSubmissionDate: '',
			transfer: 'N/A',
			reEnrollment: 'N/A'
		}
	}),
	make('2025-004', {
		personal: { firstName: 'John', lastName: 'McNelson', dob: '11/20/1978', gender: 'M' },
		tier: 3,
		habilitation: true,
		assistedLiving: 'Peaceful Cottages IV',
		eligibility: 'inactive',
		serviceDates: {
			referralDate: '',
			enrollmentDate: '10/24/2024',
			waitlistDate: '01/01/2025',
			disenrollmentDate: '',
			waitlistType: 'Standard',
			disenrollmentReason: '',
			waitlistReleaseDate: '05/25/2025',
			status: 'WAITLISTED',
			applicationSubmissionDate: '',
			transfer: 'N/A',
			reEnrollment: 'N/A'
		}
	})
];

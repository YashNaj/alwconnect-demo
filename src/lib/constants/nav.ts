export type NavItem = {
	label: string;
	href: string;
};

export type SidebarItem = {
	label: string;
	href?: string;
	children?: NavItem[];
};

export const TOP_NAV: NavItem[] = [
	{ label: 'Dashboard', href: '/dashboard' },
	{ label: 'Client List', href: '/clients' },
	{ label: 'Billing', href: '/billing' },
	{ label: 'Reports', href: '/reports' },
	{ label: 'Admin', href: '/admin' },
	{ label: 'My Account', href: '/my-account' }
];

export const CLIENT_SIDEBAR: SidebarItem[] = [
	{
		label: 'Intake',
		children: [
			{ label: 'Consents', href: 'consents' },
			{ label: 'Demographics', href: 'demographics' },
			{ label: 'Waitlist', href: 'waitlist' }
		]
	},
	{ label: 'Assessment & ISP', href: 'assessment-isp' },
	{ label: 'Monthly Visit Notes', href: 'monthly-visit-notes' },
	{ label: 'Incident Reports', href: 'incident-reports' },
	{ label: 'Communication Log', href: 'communication-log' },
	{ label: 'DHCS Emails', href: 'dhcs-emails' },
	{ label: 'Misc. Document Upload', href: 'documents' },
	{ label: 'Disenrollment', href: 'disenrollment' },
	{ label: 'Client Calendar', href: 'client-calendar' },
	{ label: 'Billing', href: 'billing' }
];

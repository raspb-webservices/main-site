import { z } from 'zod';

const MAX_STRING = 500;

/** Schema fuer POST /api/customer/create */
export const customerCreateSchema = z.object({
	email: z.string().email().max(254),
	salutation: z.string().max(50).optional(),
	givenName: z.string().max(MAX_STRING).optional(),
	familyName: z.string().max(MAX_STRING).optional(),
	company: z.string().max(MAX_STRING).optional(),
	address: z.string().max(MAX_STRING).optional(),
	postCode: z.string().max(20).optional(),
	city: z.string().max(MAX_STRING).optional(),
	country: z.string().max(MAX_STRING).optional(),
	phone: z.string().max(50).optional(),
	auth0Id: z.string().max(MAX_STRING).optional(),
	projectIds: z.array(z.string()).optional()
});

/** Schema fuer PATCH /api/customer/patch/[id] */
export const customerPatchByIdSchema = z.object({
	id: z.string().min(1),
	salutation: z.string().max(50).optional(),
	givenName: z.string().max(MAX_STRING).optional(),
	familyName: z.string().max(MAX_STRING).optional(),
	company: z.string().max(MAX_STRING).optional(),
	address: z.string().max(MAX_STRING).optional(),
	postCode: z.string().max(20).optional(),
	city: z.string().max(MAX_STRING).optional(),
	country: z.string().max(MAX_STRING).optional(),
	phone: z.string().max(50).optional(),
	email: z.string().email().max(254).optional(),
	auth0Id: z.string().max(MAX_STRING).optional()
});

/** Schema fuer PATCH /api/customer/patch/byMail/[email] */
export const customerPatchByMailSchema = z.object({
	email: z.string().email().max(254),
	salutation: z.string().max(50).optional(),
	givenName: z.string().max(MAX_STRING).optional(),
	familyName: z.string().max(MAX_STRING).optional(),
	company: z.string().max(MAX_STRING).optional(),
	address: z.string().max(MAX_STRING).optional(),
	postCode: z.string().max(20).optional(),
	city: z.string().max(MAX_STRING).optional(),
	country: z.string().max(MAX_STRING).optional(),
	phone: z.string().max(50).optional(),
	auth0Id: z.string().max(MAX_STRING).optional()
});

/** Schema fuer PATCH /api/customer/link-projects/[id] */
export const customerLinkProjectsByIdSchema = z.object({
	id: z.string().min(1),
	projectIds: z.array(z.string()).nullable().optional()
});

/** Schema fuer PATCH /api/customer/link-projects/byMail/[email] */
export const customerLinkProjectsByMailSchema = z.object({
	email: z.string().email().max(254),
	projectIds: z.array(z.string()).nullable().optional()
});

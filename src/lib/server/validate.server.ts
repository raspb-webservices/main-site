import { z } from 'zod';

export class ValidationError extends Error {
	public details: z.ZodError;

	constructor(zodError: z.ZodError) {
		const messages = zodError.errors.map((e) => `${e.path.join('.')}: ${e.message}`);
		super(`Validation failed: ${messages.join(', ')}`);
		this.name = 'ValidationError';
		this.details = zodError;
	}
}

export function validateBody<T>(schema: z.ZodSchema<T>, data: unknown): T {
	const result = schema.safeParse(data);
	if (!result.success) {
		throw new ValidationError(result.error);
	}
	return result.data;
}

/** Response fuer Validierungsfehler */
export function validationErrorResponse(error: unknown): Response {
	if (error instanceof ValidationError) {
		return new Response(
			JSON.stringify({
				error: 'Validation failed',
				details: error.details.errors.map((e) => ({
					field: e.path.join('.'),
					message: e.message
				}))
			}),
			{ status: 400, headers: { 'Content-Type': 'application/json' } }
		);
	}
	throw error;
}

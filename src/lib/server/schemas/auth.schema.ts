import { z } from 'zod';

/** Schema fuer PATCH /api/auth/update-metadata */
export const updateMetadataSchema = z.object({
	user_metadata: z.record(z.unknown())
});

import { z } from 'zod';

/** Schema fuer PATCH /api/auth/update-metadata */
export const updateMetadataSchema = z.object({
  user_metadata: z.record(z.string(), z.unknown())
});

/** Schema fuer POST /api/auth/create-user */
export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  givenName: z.string().min(1),
  familyName: z.string().min(1),
  user_metadata: z.object({
    givenName: z.string(),
    familyName: z.string()
  })
});

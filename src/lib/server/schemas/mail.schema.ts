import { z } from 'zod';

const mailRecipientSchema = z.object({
  email: z.string().email().max(254),
  name: z.string().max(200).optional()
});

const mailSenderSchema = z.object({
  email: z.string().email().max(254),
  name: z.string().max(200)
});

/** Schema fuer POST /api/mail/send */
export const mailSendSchema = z.object({
  // from is NOT accepted from clients — hardcoded server-side to prevent email spoofing
  to: z.array(mailRecipientSchema).min(1).max(50),
  subject: z.string().min(1).max(500),
  text: z.string().max(10000).optional(),
  template: z.string().max(200).optional(),
  templateProps: z.record(z.string(), z.unknown()).optional(),
  html: z.string().max(100000).optional(),
  category: z.string().max(100).optional()
});

/** Schema fuer POST /api/user-question/create */
export const userQuestionSchema = z.object({
  question: z.string().min(1).max(5000),
  email: z.string().email().max(254).optional()
});

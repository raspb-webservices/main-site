import { MailtrapClient } from 'mailtrap';
import Renderer from 'better-svelte-email/render';
import { env } from '$env/dynamic/private';
import WelcomeEmail from '$lib/emails/welcome.svelte';
import type { RequestHandler } from '@sveltejs/kit';

interface MailRequest {
  from: { email: string; name: string };
  to: { email: string; name?: string }[];
  subject: string;
  text?: string;
  template?: string;
  templateProps?: Record<string, unknown>;
  html?: string;
  category?: string;
}

export interface MailRecipient {
  email: string;
  name?: string;
}

export interface MailSender {
  email: string;
  name: string;
}

export interface SendMailOptions {
  from: MailSender;
  to: MailRecipient[];
  subject: string;
  text?: string;
  html?: string;
  category?: string;
}

function getMailtrapClient(): MailtrapClient {
  if (!mailtrapClient) {
    if (!env.MAILTRAP_TOKEN) {
      throw new Error('MAILTRAP_TOKEN environment variable is not set');
    }
    mailtrapClient = new MailtrapClient({ token: env.MAILTRAP_TOKEN });
  }
  return mailtrapClient;
}

let mailtrapClient: MailtrapClient | null = null;
const { render } = new Renderer();
const client = getMailtrapClient();

export const POST: RequestHandler = async ({ request }) => {
  try {
    const mailData: MailRequest = await request.json();
    const html = await render(WelcomeEmail, { props:mailData.templateProps });
    const sendOptions: SendMailOptions = {
      from: mailData.from,
      to: mailData.to,
      subject: mailData.subject,
      text: mailData.text,
      html,
      category: mailData.category
    };
    const result = await client.send(sendOptions);

    if (result.success) {
      return Response.json({ success: true, messageId: result.message_ids?.[0] });
    } else {
      return Response.json({ success: false, error: 'unknown error occurred' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in mail API:', error);
    return Response.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
};
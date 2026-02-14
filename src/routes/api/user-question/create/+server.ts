import { client } from '$lib/server/graphql-client.server';
import { gql } from 'graphql-request';
import { MailtrapClient } from 'mailtrap';
import Renderer from 'better-svelte-email/render';
import { env } from '$env/dynamic/private';
import UserQuestionNotification from '$lib/emails/user-question-notification.svelte';
import type { RequestHandler } from '@sveltejs/kit';
import { validateBody, validationErrorResponse, ValidationError } from '$lib/server/validate.server';
import { userQuestionSchema } from '$lib/server/schemas/mail.schema';

const { render } = new Renderer();

let mailtrapClient: MailtrapClient | null = null;
function getMailtrapClient(): MailtrapClient {
  if (!mailtrapClient) {
    if (!env.MAILTRAP_TOKEN) {
      throw new Error('MAILTRAP_TOKEN environment variable is not set');
    }
    mailtrapClient = new MailtrapClient({ token: env.MAILTRAP_TOKEN });
  }
  return mailtrapClient;
}

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = validateBody(userQuestionSchema, await request.json());

    // 1. Create entry in Hygraph
    const mutation = gql`
      mutation CreateUserQuestion($question: String!, $email: String) {
        createUserQuestion(data: { question: $question, email: $email }) {
          id
          question
          email
        }
      }
    `;

    const variables = {
      question: data.question.trim(),
      email: data.email?.trim() || null
    };

    const response = (await client.request(mutation, variables)) as {
      createUserQuestion: { id: string; question: string; email: string | null };
    };

    // 2. Send notification email via Mailtrap
    try {
      const mailClient = getMailtrapClient();
      const html = await render(UserQuestionNotification, {
        props: {
          question: data.question.trim(),
          email: data.email?.trim() || null
        }
      });

      await mailClient.send({
        from: { email: 'noreply@raspb.de', name: 'raspb Website' },
        to: [{ email: 'kontakt@raspb.de' }],
        subject: 'Neue Frage aus dem FAQ-Bereich',
        html,
        category: 'user-question'
      });
    } catch (mailError) {
      // Log mail error but don't fail the request – the Hygraph entry was created
      console.error('Failed to send notification email:', mailError);
    }

    return Response.json({ success: true, data: response.createUserQuestion }, { status: 201 });
  } catch (error) {
    if (error instanceof ValidationError) {
      return validationErrorResponse(error);
    }

    console.error('Error creating user question:', error);

    let errorMessage = 'Unknown error occurred';
    let statusCode = 500;

    if (error instanceof Error) {
      if (error.message.includes('authorization') || error.message.includes('Unauthorized')) {
        statusCode = 401;
        errorMessage = 'Authorization failed';
      }
    }

    return Response.json({ success: false, error: errorMessage }, { status: statusCode });
  }
};

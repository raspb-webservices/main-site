import { MAILTRAP_TOKEN } from '$env/static/private';
import { MailtrapClient } from 'mailtrap';
import type { Actions } from '@sveltejs/kit';

export const actions = {
	sendTestMail: async () => {
		const client = new MailtrapClient({ token: MAILTRAP_TOKEN });

		await client.send({
			from: { email: 'noreply@raspb.de' },
			to: [{ email: 'markus_haertig@web.de' }],
			subject: 'Testmail',
			text: 'Hallo Welt'
		});

		return { success: true };
	}
} satisfies Actions;

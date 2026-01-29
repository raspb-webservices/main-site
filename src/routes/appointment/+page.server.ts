import { redirect, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async () => {
	redirect(302, '/?openAppointment=true');
};

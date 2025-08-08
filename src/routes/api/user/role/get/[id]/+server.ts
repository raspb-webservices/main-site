import Api from '$helper/auth0Api';

export const GET = async (req) => {
  const id = req.params.id;
  try {
    const response = await Api.get('users/' + id + '/roles', req);
    return new Response(JSON.stringify(response));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
};

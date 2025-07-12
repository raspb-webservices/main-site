import Api from '$helper/auth0Api';

export const GET = async (req) => {
  const id = req.params.id;

  console.log("ID ", id);
  try {
    const response = await Api.get('users/' + id + '/roles', req);


    console.log("response",response);


    return new Response(JSON.stringify(response));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
};
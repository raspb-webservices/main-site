import axios from 'axios';
import { PUBLIC_VITE_AUTH0_AUDIENCE } from '$env/static/public';
import { PUBLIC_VITE_AUTH0_CLIENT_ID } from '$env/static/public';
import { PUBLIC_VITE_AUTH0_TOKEN_URL } from '$env/static/public';
import { env } from '$env/dynamic/private';

const axiosAPI = axios.create({
  baseURL: PUBLIC_VITE_AUTH0_AUDIENCE
});

async function getToken() {
  try {
    const response = await fetch(PUBLIC_VITE_AUTH0_TOKEN_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        client_id: PUBLIC_VITE_AUTH0_CLIENT_ID,
        client_secret: env.VITE_AUTH0_CLIENT_SECRET,
        audience: PUBLIC_VITE_AUTH0_AUDIENCE,
        grant_type: 'client_credentials'
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error fetching token:', error);
  }
}

const apiRequest = async (method: string, url: string, request: unknown) => {
  const token = await getToken();
  const headers = {
    authorization: `Bearer ${token}`
  };

  return axiosAPI({
    method,
    url,
    data: request,
    headers
  })
    .then((res) => {
      return Promise.resolve(res.data);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const get = (url: string, request: unknown) => apiRequest('get', url, request);
const deleteRequest = (url: string, request: unknown) => apiRequest('delete', url, request);
const post = (url: string, request: unknown) => apiRequest('post', url, request);
const put = (url: string, request: unknown) => apiRequest('put', url, request);
const patch = (url: string, request: unknown) => apiRequest('patch', url, request);

const API = {
  get,
  delete: deleteRequest,
  post,
  put,
  patch
};

export default API;

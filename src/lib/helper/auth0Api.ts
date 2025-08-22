import axios from 'axios';

const axiosAPI = axios.create({
  baseURL: 'https://dev-lztna60en7yhpzaq.us.auth0.com/api/v2/'
});

async function getToken() {
  try {
    const response = await fetch('https://dev-lztna60en7yhpzaq.us.auth0.com/oauth/token', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        client_id: 'zXz4XyH3QgMnGRP4x6KKkf20YiHGjcAw',
        client_secret: 'wJU_opDyjhAB7wDK52dFh_S1J3Li-uX7IjpUg1ccaZ3v94nLRTdjlmZI67ypAbyE',
        audience: 'https://dev-lztna60en7yhpzaq.us.auth0.com/api/v2/',
        grant_type: 'client_credentials'
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    // console.log(data);

    return data.access_token;
  } catch (error) {
    console.error('Error fetching token:', error);
  }
}

// implement a method to execute all the request from here.
const apiRequest = async (method, url, request) => {
  const token = await getToken();
  const headers = {
    authorization: `Bearer ${token}`
  };

  //using the axios instance to perform the request that received from each http method
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

// function to execute the http get request
const get = (url, request) => apiRequest('get', url, request);

// function to execute the http delete request
const deleteRequest = (url, request) => apiRequest('delete', url, request);

// function to execute the http post request
const post = (url, request) => apiRequest('post', url, request);

// function to execute the http put request
const put = (url, request) => apiRequest('put', url, request);

// function to execute the http path request
const patch = (url, request) => apiRequest('patch', url, request);

// expose your method to other services or actions
const API = {
  get,
  delete: deleteRequest,
  post,
  put,
  patch
};

export default API;

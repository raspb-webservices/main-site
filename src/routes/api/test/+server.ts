import dotenv from 'dotenv';
dotenv.config();

export const GET = async (req) => {
  return new Response(JSON.stringify({body: 'Hello World from ' + process.env['USERID']}));
};

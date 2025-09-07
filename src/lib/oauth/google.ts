import { Google } from 'arctic';

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectUri = process.env.GOOGLE_REDIRECT_URI;

export const googleOAuthClient = new Google(
  clientId,
  clientSecret,
  redirectUri
);

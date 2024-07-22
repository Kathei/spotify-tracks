import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

const client_id: string = process.env.SPOTIFY_CLIENT_ID ?? "";
const client_secret: string = process.env.SPOTIFY_CLIENT_SECRET ?? "";

const fetchNewAccessToken = async (): Promise<RequestCookie> => {
  console.log("get access token");
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch access token");
  }

  const { access_token, expires_in } = await response.json();

  console.log("expires in", expires_in);

  // Set the access token in a cookie with an expiration time
  cookies().set("access_token", access_token, {
    expires: Date.now() + expires_in * 1000 - 1000, // expire the cookie 1 second before the token expires to ensure a new token is fetched before the old one expires
    httpOnly: true,
    path: "/",
  });

  return access_token;
};

export const getAccessToken = async (): Promise<string | undefined> => {
  console.log("ensure valid access token");
  const cookieStore = cookies();
  let access_token = cookieStore.get("access_token");
  console.log("access_token", access_token);
  console.log("all cookies", cookieStore.getAll());
  if (!access_token) {
    // If there's no access token in cookies, or it's expired, fetch a new one
    console.log("no access token");
    access_token = await fetchNewAccessToken();
  }

  return access_token?.value;
};

import { ensureValidAccessToken } from "@/app/_auth/accessToken";

export async function GET({ params }: { params: { id: string } }) {
  const id = params.id;

  console.log("inside get api");
  const access_token = await ensureValidAccessToken();

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/audio-features/${id}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch track audio features");
    }

    const data = await response.json();
    console.log("Track Audio Features:", data);

    // Return the audio features as a JSON response
    return new Response(JSON.stringify(data), {
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch track audio features" }),
      {
        headers: {
          "content-type": "application/json",
        },
        status: 500,
      }
    );
  }
}

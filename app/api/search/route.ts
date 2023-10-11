import { ensureValidAccessToken } from "@/app/_auth/accessToken";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  console.log("inside get api");
  const access_token = await ensureValidAccessToken();
  const searchParams = request.nextUrl.searchParams;
  console.log("searchParams", searchParams);
  const query = searchParams.get("query");
  console.log("query: ", query);

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=track&limit=20&market=FI`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const reader = response.body?.getReader();
    let result = "";

    while (reader) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      // Process the chunk of data (value) here
      result += new TextDecoder().decode(value);
    }

    console.log("result", result);

    // loop result so that you save .name, .id, .artists[0].name, .album.name, .album.images[0].url

    const data = JSON.parse(result);

    interface Track {
      name: string;
      id: string;
      artists: { name: string }[];
      album: { name: string; images: { url: string }[] };
    }

    const tracks: Track[] = data.tracks.items.map((track: Track) => ({
      name: track.name,
      id: track.id,
      artist: track.artists[0].name,
      album: track.album.name,
      image: track.album.images[0].url,
    }));

    return new Response(JSON.stringify(tracks), {
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      headers: {
        "content-type": "application/json",
      },
      status: 500, // You can set an appropriate error status code
    });
  }
}

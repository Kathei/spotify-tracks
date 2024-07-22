import { getAccessToken } from "@/app/_auth/accessToken";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  console.log("inside get api");
  const access_token = await getAccessToken();
  const searchParams = request.nextUrl.searchParams;
  console.log("searchParams", searchParams);
  const query = searchParams.get("query");
  const offset = searchParams.get("offset") ?? 0;
  const limit = searchParams.get("limit") ?? 10;
  console.log("query: ", query);

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=track&limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );

    if (!response.ok) {
      console.log("response", response);
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    console.log("Data:", data);

    interface Track {
      name: string;
      id: string;
      artists: string[];
      albumName: string;
      imageUrl: string;
    }

    const tracks: Track[] = data.tracks.items.map((track: any) => ({
      name: track.name,
      id: track.id,
      artists: track.artists.map((artist: any) => artist.name),
      albumName: track.album.name,
      imageUrl: track.album.images[0].url ?? "",
    }));
    console.log("tracks", tracks);

    return new Response(
      JSON.stringify({ tracks: tracks, total: data.tracks.total }),
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      headers: {
        "content-type": "application/json",
      },
      status: 500,
    });
  }
}

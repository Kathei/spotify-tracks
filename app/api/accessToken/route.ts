import { NextResponse } from "next/server";
import { getAccessToken } from "../../_auth/accessToken";

export async function GET() {
  try {
    await getAccessToken();
    return NextResponse.json({ message: "Access token set" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch access token" },
      { status: 500 }
    );
  }
}

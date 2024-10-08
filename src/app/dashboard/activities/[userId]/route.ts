// app/dashboard/activities/[userId]/route.ts

import { NextResponse } from "next/server";
import { cache } from "react";

// Hier könntest du fetch oder Axios verwenden
export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  try {
    // Fetch Anfrage an dein API Gateway, das mit Lambda verbunden ist
    const res = await fetch(
      `https://ple5mxynje.execute-api.eu-central-1.amazonaws.com/activities/user/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          // Weitere Header, falls nötig
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch activities");
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

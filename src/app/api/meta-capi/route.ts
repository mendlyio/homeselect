import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

function sha256(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

export async function POST(req: NextRequest) {
  const accessToken = process.env.META_ACCESS_TOKEN;
  const datasetId = process.env.META_DATASET_ID;

  if (!accessToken || !datasetId) {
    return NextResponse.json({ skipped: true, reason: "Meta CAPI not configured" });
  }

  try {
    const { name, phone } = await req.json();

    const eventTime = Math.floor(Date.now() / 1000);
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "";
    const userAgent = req.headers.get("user-agent") || "";

    const eventData = {
      data: [
        {
          event_name: "Lead",
          event_time: eventTime,
          action_source: "website",
          event_source_url: req.headers.get("referer") || "",
          user_data: {
            ph: [sha256(phone)],
            fn: [sha256(name.split(" ")[0] || name)],
            ln: [sha256(name.split(" ").slice(1).join(" ") || name)],
            client_ip_address: clientIp,
            client_user_agent: userAgent,
          },
        },
      ],
    };

    const response = await fetch(
      `https://graph.facebook.com/v21.0/${datasetId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      }
    );

    const result = await response.json();
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to send CAPI event" },
      { status: 500 }
    );
  }
}

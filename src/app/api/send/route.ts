import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const SERVICE_LABELS: Record<string, string> = {
  renovation: "Rénovation / Renovation",
  painting: "Peinture / Painting",
  gardening: "Jardinage / Gardening",
  ac: "Climatisation / Air Conditioning",
  plumbing: "Plomberie / Plumbing",
  electrical: "Électricité / Electrical",
  handyman: "Bricolage / Handyman",
  doors: "Portes & Fenêtres / Doors & Windows",
  moving: "Déménagement / Moving",
};

export async function POST(req: NextRequest) {
  try {
    const { services, ownerStatus, name, phone } = await req.json();

    const serviceList = (services as string[])
      .map((s) => SERVICE_LABELS[s] || s)
      .join(", ");

    const status = ownerStatus === "owner" ? "Propriétaire / Owner" : "Locataire / Tenant";

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #fbbf24; padding: 20px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="margin: 0; color: #1e293b; font-size: 24px;">🏠 HomeSelect</h1>
          <p style="margin: 4px 0 0; color: #475569; font-size: 14px;">Nouveau lead / New lead</p>
        </div>
        <div style="background: #ffffff; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 14px;">Services</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b; font-size: 14px; font-weight: 600; text-align: right;">${serviceList}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 14px;">Statut</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b; font-size: 14px; font-weight: 600; text-align: right;">${status}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 14px;">Nom</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b; font-size: 14px; font-weight: 600; text-align: right;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #64748b; font-size: 14px;">Téléphone</td>
              <td style="padding: 12px 0; color: #1e293b; font-size: 14px; font-weight: 600; text-align: right;">${phone}</td>
            </tr>
          </table>
        </div>
      </div>
    `;

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Resend not configured" }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const toEmail = process.env.RESEND_TO_EMAIL || "info@bronfortvalentin.com";

    const { error } = await resend.emails.send({
      from: "HomeSelect <onboarding@resend.dev>",
      to: [toEmail],
      subject: `Nouveau lead HomeSelect - ${name} (${serviceList})`,
      html,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}

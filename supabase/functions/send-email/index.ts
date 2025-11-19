import { Resend } from "npm:resend";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

Deno.serve(async (req) => {
  const body = await req.json();

  const { to, subject, html } = body;

  if (!to || !subject || !html) {
    return new Response("Missing fields", { status: 400 });
  }

  try {
    const response = await resend.emails.send({
      from: "SolarPack Notifications <no-reply@resend.dev>",
      to,
      subject,
      html,
    });

    return new Response(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
    });
  }
});

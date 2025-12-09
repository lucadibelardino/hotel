import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = "re_123456789"; // Sostituisci con la tua chiave Resend

serve(async (req) => {
    const { record } = await req.json();

    if (!record || !record.email) {
        return new Response(JSON.stringify({ error: "No email found" }), { status: 400 });
    }

    const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
            from: "Prenotazioni <onboarding@resend.dev>",
            to: [record.email],
            subject: "Conferma Prenotazione Hotel Luca",
            html: `<h1>Grazie per la tua prenotazione!</h1><p>Ciao ${record.name}, confermiamo il tuo soggiorno dal ${record.check_in} al ${record.check_out}.</p>`,
        }),
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
    });
});

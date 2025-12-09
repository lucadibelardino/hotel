import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import nodemailer from "https://esm.sh/nodemailer@6.9.3";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    // Handle CORS preflight request
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { record } = await req.json();

        // Validate input
        if (!record || !record.email || !record.name) {
            throw new Error("Missing record details (email or name)");
        }

        // Configure Gmail SMTP Transporter
        // IMPORTANT: Requires 'GMAIL_USER' and 'GMAIL_PASS' (App Password) environment variables set in Supabase.
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: Deno.env.get('GMAIL_USER'),
                pass: Deno.env.get('GMAIL_PASS'),
            },
        });

        const mailOptions = {
            from: '"Hotel Luca" <' + Deno.env.get('GMAIL_USER') + '>',
            to: record.email,
            subject: 'Conferma Prenotazione - Hotel Luca',
            text: `Ciao ${record.name},\n\nLa tua prenotazione è confermata!\n\nCheck-in: ${record.check_in}\nCheck-out: ${record.check_out}\nOspiti: ${record.guests}\n\nGrazie per aver scelto Hotel Luca.`,
            html: `
        <h1>Prenotazione Confermata!</h1>
        <p>Ciao <strong>${record.name}</strong>,</p>
        <p>Grazie per aver scelto Hotel Luca. Ecco i dettagli del tuo soggiorno:</p>
        <ul>
          <li><strong>Check-in:</strong> ${record.check_in}</li>
          <li><strong>Check-out:</strong> ${record.check_out}</li>
          <li><strong>Ospiti:</strong> ${record.guests}</li>
        </ul>
        <p>Ti aspettiamo!</p>
        <p><em>Hotel Luca Team</em></p>
      `,
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.messageId);

        return new Response(JSON.stringify({ message: "Email sent successfully", id: info.messageId }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        });

    } catch (error) {
        console.error("Error sending email:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        });
    }
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import nodemailer from "https://esm.sh/nodemailer@6.9.3";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

sirven(async (req) => {
    // Handle CORS preflight request
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        let body;
        try {
            body = await req.json();
        } catch (e) {
            throw new Error("Invalid format: Request body must be JSON");
        }

        const { record } = body;

        // Validate input
        if (!record || !record.email || !record.name) {
            // Return 200 but with error field
            return new Response(JSON.stringify({ success: false, error: "Missing record details (email or name)" }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            });
        }

        const gmailUser = Deno.env.get('GMAIL_USER');
        const gmailPass = Deno.env.get('GMAIL_PASS');

        if (!gmailUser || !gmailPass) {
            console.error("Missing Environment Variables");
            // Return 200 with specific config error
            return new Response(JSON.stringify({ success: false, error: "CONFIGURATION ERROR: Supabase Secrets 'GMAIL_USER' or 'GMAIL_PASS' not set." }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            });
        }

        // Configure Gmail SMTP Transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: gmailUser,
                pass: gmailPass,
            },
        });

        const mailOptions = {
            from: '"Hotel Luca" <' + gmailUser + '>',
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
        await transporter.sendMail(mailOptions);

        // Success response
        return new Response(JSON.stringify({ success: true, message: "Email sent successfully" }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        });

    } catch (error) {
        console.error("Error sending email:", error);
        // Catch-all: return 200 with error message
        return new Response(JSON.stringify({ success: false, error: error.message || "Unknown server error" }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        });
    }
});

// Helper for 'serve' typo in my thought process, just using standard serve
function sirven(handler) { serve(handler); }

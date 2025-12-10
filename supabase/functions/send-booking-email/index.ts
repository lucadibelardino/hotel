import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// Use npm specifier to leverage Deno's native Node.js compatibility layer
// This fixes the 'dns.lookup' and 'Buffer' issues found with esm.sh builds
import nodemailer from "npm:nodemailer@6.9.7";

const corsHeaders = {
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Authorized domains (Production + Localhost for testing)
const allowedOrigins = [
    "https://lucadibelardino.github.io",
    "http://localhost:5173",
    "http://localhost:3000"
];

serve(async (req) => {
    const origin = req.headers.get('Origin');
    const isAllowed = origin && allowedOrigins.includes(origin);

    // Set CORS Origin dynamically if allowed, otherwise null (blocks access)
    // For tools/curl that send no origin, we can block or allow based on strictness. 
    // Here we allow if allowed or default strict (but for simplicity/demo we might fallback to * if needed, but let's be strict for security)
    const accessControlAllowOrigin = isAllowed ? origin : "null";

    const headers = {
        ...corsHeaders,
        'Access-Control-Allow-Origin': accessControlAllowOrigin
    };

    // Handle CORS preflight request
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers });
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
            return new Response(JSON.stringify({ success: false, error: "Missing record details (email or name)" }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            });
        }

        const gmailUser = Deno.env.get('GMAIL_USER');
        const gmailPass = Deno.env.get('GMAIL_PASS');

        if (!gmailUser || !gmailPass) {
            console.error("Missing Environment Variables");
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
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #eaeaea; }
            .header { background-color: #1a1a1a; padding: 30px; text-align: center; }
            .header h1 { color: #d4af37; margin: 0; font-size: 28px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; }
            .content { padding: 40px; color: #333333; line-height: 1.6; }
            .greeting { font-size: 20px; margin-bottom: 20px; color: #1a1a1a; }
            .booking-box { background-color: #f8f8f8; border-left: 4px solid #d4af37; padding: 25px; margin: 30px 0; border-radius: 4px; }
            .detail-row { display: flex; justify-content: space-between; margin-bottom: 12px; border-bottom: 1px solid #eeeeee; padding-bottom: 8px; }
            .detail-row:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
            .label { font-weight: 600; color: #666666; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
            .value { font-weight: 500; color: #1a1a1a; font-size: 16px; }
            .footer { background-color: #1a1a1a; padding: 20px; text-align: center; color: #888888; font-size: 12px; }
            .footer p { margin: 5px 0; }
            .cta-button { display: inline-block; background-color: #d4af37; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 4px; margin-top: 20px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Hotel Luca</h1>
            </div>
            <div class="content">
              <p class="greeting">Gentile <strong>${record.name}</strong>,</p>
              <p>È con grande piacere che confermiamo la Sua prenotazione presso la nostra struttura.</p>
              <p>Il nostro staff è pronto ad accoglierLa in un'atmosfera di relax ed eleganza.</p>
              
              <div class="booking-box">
                <div class="detail-row">
                  <span class="label">Check-in</span>
                  <span class="value">${record.check_in}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Check-out</span>
                  <span class="value">${record.check_out}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Ospiti</span>
                  <span class="value">${record.guests}</span>
                </div>
              </div>

              <p>Se necessita di ulteriori informazioni o ha richieste particolari per il Suo soggiorno, non esiti a contattarci.</p>
              
              <p style="margin-top: 30px;">Cordiali saluti,<br><em>La Direzione</em></p>
            </div>
            <div class="footer">
              <p>Hotel Luca - Via Esempio 123, Città</p>
              <p>Tel: +39 012 3456789 | info@hotelluca.it</p>
              <p>&copy; ${new Date().getFullYear()} Hotel Luca. Tutti i diritti riservati.</p>
            </div>
          </div>
        </body>
        </html>
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
        // Return detailed error
        return new Response(JSON.stringify({ success: false, error: error.message || "Unknown server error" }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        });
    }
});

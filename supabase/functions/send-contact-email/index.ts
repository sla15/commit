import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY environment variable");
      throw new Error("Server configuration error: Missing API Key");
    }

    // Masked logging for debugging 401 error
    const maskedKey = `${RESEND_API_KEY.substring(0, 5)}...${RESEND_API_KEY.substring(RESEND_API_KEY.length - 4)}`;
    console.log(`API Key Verification: Length=${RESEND_API_KEY.length}, Masked=${maskedKey}`);

    const resend = new Resend(RESEND_API_KEY);

    // 1. Parse JSON safely
    let data;
    try {
      data = await req.json();
      console.log("Parsed Request Data:", JSON.stringify(data));
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      return new Response(
        JSON.stringify({ error: "Invalid JSON body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 2. Extract Fields (Simple & Direct)
    const { firstName, lastName, email, phone, subject, message } = data;

    // 3. Simple Validation
    if (!email || !message) {
      return new Response(
        JSON.stringify({ error: "Email and Message are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const name = `${firstName || ''} ${lastName || ''}`.trim() || "Anonymous";

    // 4. Send Email
    // NOTE: 'from' must be 'onboarding@resend.dev' if domain is not verified.
    // NOTE: 'to' must be your verified account email (saitjobe15@yahoo.com) if in Sandbox mode.
    // If you have verified 'commit.gm' or similar, you can use that.
    // We will attempt to send to 'sladibba15@gmail.com' as requested, hoping it is verified or the account is out of Sandbox.

    // NOTE: In Resend Sandbox, you can only send TO your own verified address (saitjobe15@yahoo.com)
    // Once you verify a domain (e.g. commit.gm), you can change this to any address.
    const emailResponse = await resend.emails.send({
      from: "CommIT Web <onboarding@resend.dev>",
      to: ["saitjobe15@yahoo.com"],
      reply_to: email,
      subject: `Inquiry: ${subject || 'New Message'}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    console.log("Resend Response Data:", JSON.stringify(emailResponse));

    if (emailResponse.error) {
      console.error("Resend API Error:", emailResponse.error);
      return new Response(
        JSON.stringify({
          error: "Resend API Error",
          details: emailResponse.error
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, id: emailResponse.data?.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error("Edge Function Exception:", error.message);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        message: error.message
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

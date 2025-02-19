"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function OtpSignInPage() {
  const supabase = createClient();
  const router = useRouter();

  // Step state: 'email' to send the code, 'otp' to verify the received code
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  // Handle sending the OTP to the provided email
  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");

    // Send OTP code to the user's email.
    // (Make sure your Supabase project's email auth settings and email template send a code)
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setFeedback(`Error sending OTP: ${error.message}`);
    } else {
      setFeedback("OTP code sent to your email. Please check your inbox.");
      setStep("otp");
    }
    setLoading(false);
  };

  // Handle verifying the OTP code
  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");

    // Verify the OTP code.
    // Here we use type 'magiclink' which is the default for email.
    // (If you have a custom flow, adjust the type accordingly)
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "magiclink",
    });

    if (error) {
      setFeedback(`Error verifying OTP: ${error.message}`);
    } else {
      setFeedback("OTP verified successfully! Redirecting...");
      // Redirect to the dashboard after successful verification
      router.push("/");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto", padding: "1rem" }}>
      {step === "email" && (
        <>
          <h1>Sign In</h1>
          <form
            onSubmit={handleEmailSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ padding: "0.5rem" }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{ padding: "0.5rem" }}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        </>
      )}

      {step === "otp" && (
        <>
          <h1>Verify OTP</h1>
          <p>
            Enter the OTP sent to <strong>{email}</strong>
          </p>
          <form
            onSubmit={handleOtpSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <label htmlFor="otp">OTP Code:</label>
            <input
              type="text"
              id="otp"
              placeholder="Enter OTP code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              style={{ padding: "0.5rem" }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{ padding: "0.5rem" }}
            >
              {loading ? "Verifying OTP..." : "Verify OTP"}
            </button>
          </form>
        </>
      )}

      {feedback && <p>{feedback}</p>}
    </div>
  );
}

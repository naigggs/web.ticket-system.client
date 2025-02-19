"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/utils/supabase/client"

export default function OtpSignInPage() {
  const [step, setStep] = useState<"email" | "otp">("email")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    try {
      if (step === "email") {
        const { error } = await supabase.auth.signInWithOtp({ email })
        if (error) throw error
        setStep("otp")
        toast({
          title: "OTP Sent!",
          description: "Check your email for the OTP code.",
          className: "bg-green-500 text-white",
        })
      } else {
        const { error } = await supabase.auth.verifyOtp({ email, token: otp, type: "magiclink" })
        if (error) throw error
        toast({
          title: "Login Success!",
          description: "You have successfully logged in.",
          className: "bg-green-500 text-white",
        })
        router.push("/") 
      }
    } catch (error) {
      console.error("OTP operation failed:", error)
      toast({
        variant: "destructive",
        title: step === "email" ? "OTP Request Failed" : "Login Failed",
        description: step === "email" ? "Unable to send OTP. Please try again." : "Invalid OTP. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6")}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">{step === "email" ? "Sign in with OTP" : "Enter OTP"}</h1>
        <p className="text-balance text-sm text-muted-foreground">
          {step === "email" ? "Enter your email to receive a one-time password" : "Enter the OTP sent to your email"}
        </p>
      </div>
      <div className="grid gap-6">
        {step === "email" ? (
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        ) : (
          <div className="grid gap-2">
            <Label htmlFor="otp">One-Time Password</Label>
            <Input
              id="otp"
              name="otp"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
        )}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loading..." : step === "email" ? "Request OTP" : "Verify OTP"}
        </Button>
      </div>
      {step === "otp" && (
        <Button type="button" variant="link" className="mt-2" onClick={() => setStep("email")}>
          Back to Email
        </Button>
      )}
      <div className="text-center text-sm">
        Sign in with{" "}
        <a href="/auth/login" className="underline underline-offset-4">
          password
        </a>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="/auth/register" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  )
}


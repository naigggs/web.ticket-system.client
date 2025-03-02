"use client"

import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
    <div className={cn("flex flex-col gap-6")}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">{step === "email" ? "Sign in with OTP" : "Enter OTP"}</h1>
                <p className="text-balance text-muted-foreground">
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
                {step === "otp" && (
                  <Button type="button" variant="outline" className="w-full" onClick={() => setStep("email")}>
                    Back to Email
                  </Button>
                )}
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full" type="button">
                  <a href="/auth/login" className="w-full">
                    Password
                  </a>
                </Button>
                <Button variant="outline" className="w-full" type="button">
                  <a href="/auth/register" className="w-full">
                    Register
                  </a>
                </Button>
              </div>
            </div>
          </form>
          <div className="relative bg-muted hidden md:flex md:items-center md:justify-center">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-60 w-60 object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground">
        By clicking continue, you agree to our Terms of Service and Privacy Policy.
      </div>
    </div>
  );
}


'use client'

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { registerUser } from "@/app/api/auth/actions";
import { useToast } from "@/hooks/use-toast";

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      await registerUser(formData);
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
      setLoading(false);
      toast({
        title: "Signup Request Sent Successfully!",
        description: "Please wait for our staff to confirm your registration.",
        className: "bg-green-500 text-white",
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-balance text-muted-foreground">
                  Fill in your details below to create your account
                </p>
              </div>
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" name="firstName" type="text" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" type="text" required />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Address</Label>
                  <Input id="location" name="location" type="text" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="document1">Upload Barangay ID (Front)</Label>
                    <Input id="document1" name="document1" type="file" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="document2">Upload Barangay ID (Back)</Label>
                    <Input id="document2" name="document2" type="file" required />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </Button>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <Button variant="outline" className="w-full" type="button">
                <a href="/auth/login" className="w-full">
                  Login
                </a>
              </Button>
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

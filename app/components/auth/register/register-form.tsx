import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Fill in your details below to create your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" type="text" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" type="text" required />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" type="text" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="documents">Upload Document 2</Label>
            <Input id="documents" type="file" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="documents">Upload Document 1</Label>
            <Input id="documents" type="file" />
          </div>
        </div>
        <Button type="submit" className="w-full">
          Register
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/auth/login" className="underline underline-offset-4">
          Sign in
        </a>
      </div>
    </form>
  );
}

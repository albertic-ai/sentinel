import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function VerifyPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Verify your email</CardTitle>
        <CardDescription>
          Enter the verification code sent to your email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Verification code</Label>
            <Input
              id="code"
              type="text"
              placeholder="Enter 6-digit code"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Verify
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-2">
        <p className="text-sm text-muted-foreground">
          Didn&apos;t receive a code?{" "}
          <button type="button" className="text-foreground hover:underline">
            Resend
          </button>
        </p>
        <p className="text-sm text-muted-foreground">
          <Link href="/auth/login" className="text-foreground hover:underline">
            Back to sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

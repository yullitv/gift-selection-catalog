import { Link } from "react-router-dom";

import AuthCard from "@/components/auth/AuthCard";
import AuthPageLayout from "@/components/auth/AuthPageLayout";
import LoginForm from "@/components/auth/LoginForm";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <AuthPageLayout>
      <AuthCard>
        <CardHeader className="border-0 px-6 pb-0 text-center">
          <div className="mb-4 flex flex-col items-center gap-2">
            <img
              src="/favicon.png"
              alt=""
              className="size-12 rounded-xl object-cover shadow-sm"
            />
            <span className="font-serif text-lg font-semibold tracking-tight text-foreground">
              GIVHEART
            </span>
          </div>
          <CardTitle className="font-serif text-2xl font-semibold tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription className="text-base">
            Sign in to your account
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pt-2">
          <LoginForm />
        </CardContent>

        <CardFooter className="flex justify-center border-0 bg-transparent px-6 pt-2">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="auth-footer-link">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </AuthCard>
    </AuthPageLayout>
  );
}
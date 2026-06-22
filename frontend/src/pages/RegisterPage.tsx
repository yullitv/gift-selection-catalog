import { Link } from "react-router-dom";

import AuthCard from "@/components/auth/AuthCard";
import AuthPageLayout from "@/components/auth/AuthPageLayout";
import RegisterForm from "@/components/auth/RegisterForm";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RegisterPage() {
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
            Create your account
          </CardTitle>
          <CardDescription className="text-base">
            Start sending meaningful gifts today
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pt-2">
          <RegisterForm />
        </CardContent>

        <CardFooter className="flex justify-center border-0 bg-transparent px-6 pt-2">
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="auth-footer-link">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </AuthCard>
    </AuthPageLayout>
  );
}
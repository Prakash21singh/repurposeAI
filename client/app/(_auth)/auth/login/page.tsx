"use client";
import AuthForm from "@components/components/auth/login-form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {};

function Page({}: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function onSubmit({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.ok) {
        router.push("/dashboard");
      }
    } catch (error: any) {
      setError(error.message);
    }
  }
  return (
    <div className="w-full h-screen flex items-center justify-center font-poppins relative overflow-hidden">
      <div className="flex flex-col gap-y-3">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
          Welcome to the Portal
        </h1>
        <p className="text-xl dark:text-white/60">
          We're happy to have you, please go on with the joining form.
        </p>
        <AuthForm
          error={error}
          loading={loading}
          email={email}
          password={password}
          setPassword={setPassword}
          setEmail={setEmail}
          onSubmit={onSubmit}
          setError={setError}
          setLoading={setLoading}
        />
        <Link href={"/auth/join"} className="underline self-end">
          Create Account
        </Link>
      </div>
    </div>
  );
}

export default Page;

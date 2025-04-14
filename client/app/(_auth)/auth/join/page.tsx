"use client";
import AuthForm from "@components/components/auth/login-form";
import axios from "axios";
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
    setLoading(true);
    try {
      const result = await axios.post("/api/auth/register", {
        email,
        password,
      });

      if (result.data.success) {
        router.push("/auth/login");
      }
    } catch (error: any) {
      console.log(error);
      setEmail("");
      setPassword("");
      setError(error.response.data.message);
    } finally {
      setLoading(false);
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
          email={email}
          password={password}
          loading={loading}
          onSubmit={onSubmit}
          setError={setError}
          setEmail={setEmail}
          setLoading={setLoading}
          setPassword={setPassword}
        />
        <Link href={"/auth/login"} className="underline self-end">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Page;

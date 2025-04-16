"use client";
import { useRegister } from "@/hooks/use-auth";
import AuthForm from "@components/components/auth/login-form";
import Link from "next/link";

type Props = {};

function Page({}: Props) {
  const {
    email,
    error,
    loading,
    password,
    setEmail,
    setError,
    setLoading,
    setPassword,
    onSubmit,
  } = useRegister();

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

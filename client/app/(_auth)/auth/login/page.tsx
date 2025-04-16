"use client";
import { useLogin } from "@/hooks/use-auth";
import AuthForm from "@/components/components/auth/auth-form";

type Props = {};

function Page({}: Props) {
  let {
    email,
    error,
    loading,
    onSubmit,
    password,
    setEmail,
    setError,
    setLoading,
    setPassword,
  } = useLogin();
  return (
    <div className="w-full h-screen p-5 flex items-center justify-center font-poppins relative overflow-hidden">
      <div className="w-full flex flex-col items-center gap-y-3">
        <h1 className="text-2xl md:text-3xl text-center lg:text-left lg:text-4xl font-semibold">
          Welcome to the Portal
        </h1>
        <p className="text-xl dark:text-white/60 text-center lg:text-left">
          We're happy to have you, please login in
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
          formType="LOGIN"
        />
      </div>
    </div>
  );
}

export default Page;

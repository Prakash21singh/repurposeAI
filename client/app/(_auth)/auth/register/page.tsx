"use client";
import { useRegister } from "@/hooks/use-auth";
import AuthForm from "@/components/components/auth/auth-form";

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
    name,
    setName,
  } = useRegister();

  return (
    <div className="w-full h-screen flex items-center justify-center font-poppins relative overflow-hidden">
      <div className="flex flex-col gap-y-3 w-full items-center p-3">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
          Welcome to the Portal
        </h1>
        <p className="text-xl dark:text-white/60 text-center">
          We're happy to have you, Fill the register form.
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
          formType="SIGNUP"
          name={name}
          setName={setName}
        />
      </div>
    </div>
  );
}

export default Page;

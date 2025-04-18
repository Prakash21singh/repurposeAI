"use client";

import type React from "react";
import { useState, Dispatch, SetStateAction } from "react";
import { Button } from "@components/components/ui/button";
import { Input } from "@components/components/ui/input";
import { Card, CardContent } from "@components/components/ui/card";
import { LucideEye, EyeOff } from "lucide-react";
import Link from "next/link";

type IProps = {
  loading: boolean;
  error: string | null;
  email: string;
  password: string;
  name?: string;
  setName?: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  children?: React.ReactNode;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
  onSubmit: ({
    email,
    password,
    name,
  }: {
    name?: string;
    email: string;
    password: string;
  }) => void;
  formType: "LOGIN" | "SIGNUP";
};

export default function AuthForm({
  error,
  onSubmit,
  loading,
  email,
  setEmail,
  password,
  setPassword,
  formType,
  name,
  setName,
}: IProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      email,
      password,
    });
  };
  const [isPassVisible, setPassVisible] = useState<boolean>(false);

  return (
    <Card className="shadow-lg bg-transparent w-full h-auto max-w-xl">
      <CardContent className="p-6">
        <h1>Fill the credentials</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative space-y-4">
            {formType === "SIGNUP" && setName && (
              <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <Input
              value={email}
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="p-2"
            />

            <div className="relative">
              <Input
                value={password}
                type={isPassVisible ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="p-3"
              />
              <span className="absolute z-10 cursor-pointer right-2 top-1/2 -translate-y-1/2">
                {!isPassVisible ? (
                  <EyeOff
                    className="w-8"
                    onClick={() => setPassVisible(true)}
                  />
                ) : (
                  <LucideEye
                    className="w-8"
                    onClick={() => setPassVisible(false)}
                  />
                )}
              </span>
            </div>
            {error ? <p className="text-red-500 text-xs">{error}</p> : ""}
            <Button type="submit" className="w-full" disabled={loading}>
              {!loading ? `${formType}` : "Submitting..."}
            </Button>
            <div className="float-right">
              {formType === "LOGIN" ? (
                <Link href={"/auth/register"} className="underline self-end">
                  Create Account
                </Link>
              ) : (
                <Link href={"/auth/login"} className="underline self-end">
                  Login
                </Link>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

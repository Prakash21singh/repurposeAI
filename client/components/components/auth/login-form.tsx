"use client";

import type React from "react";
import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { Button } from "@components/components/ui/button";
import { Input } from "@components/components/ui/input";
import { Card, CardContent } from "@components/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";

import { signIn } from "next-auth/react";

type FormStage = "email" | "password" | "submitting";

type IProps = {
  loading: boolean;
  error: string | null;
  email: string;
  password: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  children?: React.ReactNode;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
  onSubmit: ({ email, password }: { email: string; password: string }) => void;
};

export default function AuthForm({
  children,
  error,
  onSubmit,
  setError,
  loading,
  email,
  setEmail,
  password,
  setPassword,
}: IProps) {
  const [stage, setStage] = useState<FormStage>("email");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [countdown, setCountdown] = useState(3);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (email: string) => {
    const isValid = emailRegex.test(email);
    setIsEmailValid(isValid);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (stage === "email") {
      setEmail(value);
      const isValid = validateEmail(value);

      // Clear any existing timer
      if (timer) {
        clearTimeout(timer);
        setTimer(null);
        setCountdown(3);
      }

      // If email is valid, set a timer to transition to password stage
      if (isValid) {
        setCountdown(3);

        // Start countdown
        const countdownInterval = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(countdownInterval);
              return 0;
            }
            return prev - 1;
          });
        }, 500);

        const newTimer = window.setTimeout(() => {
          clearInterval(countdownInterval);
          transitionToStage("password");
        }, 1500);

        setTimer(newTimer);
      }
    } else if (stage === "password") {
      setPassword(value);
    }
  };

  const transitionToStage = (newStage: FormStage) => {
    setIsAnimating(true);
    setTimeout(() => {
      setStage(newStage);
      setIsAnimating(false);

      // Focus the appropriate input after animation
      setTimeout(() => {
        if (newStage === "email" && emailInputRef.current) {
          emailInputRef.current.focus();
        } else if (newStage === "password" && passwordInputRef.current) {
          passwordInputRef.current.focus();
        }
      }, 50);
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (stage !== "password" || !password) return;
    setStage("submitting");
    setError(null);
    onSubmit({
      email,
      password,
    });
    try {
    } catch (error: any) {
      setStage("password");
    } finally {
      setStage("email");
    }
  };

  const goBackToEmail = () => {
    transitionToStage("email");
    setError(null);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  return (
    <Card className="shadow-lg bg-transparent w-full">
      <CardContent className="p-6">
        <h1>Fill the credentials</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative h-10">
            {/* Email input */}
            <div
              className={`absolute inset-0 transition-all duration-300 ease-in-out ${
                stage === "email"
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-full"
              }`}>
              <Input
                ref={emailInputRef}
                type="email"
                value={email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full"
                autoComplete="email"
                disabled={stage !== "email" || isAnimating}
              />
            </div>

            {/* Password input with back button */}
            <div
              className={`absolute inset-0 transition-all duration-300 ease-in-out ${
                stage === "password" || stage === "submitting"
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-full"
              }`}>
              <div className="relative flex items-center">
                <button
                  type="button"
                  onClick={goBackToEmail}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 z-10"
                  disabled={stage === "submitting" || isAnimating}>
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back to email</span>
                </button>
                <Input
                  ref={passwordInputRef}
                  type="password"
                  value={password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full pl-10"
                  autoComplete="current-password"
                  disabled={stage === "submitting" || isAnimating}
                />
              </div>
            </div>
          </div>

          {/* Validation messages - fixed the conditional rendering */}

          {/* Submit button */}
          {(stage === "password" || stage === "submitting") && (
            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {stage === "submitting" && loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Joining...
                </>
              ) : (
                "Join"
              )}
            </Button>
          )}
          <div className="min-h-6">
            {stage === "email" && email && !isEmailValid && (
              <p className="text-red-500 text-xs mt-1">
                Please enter a valid email address
              </p>
            )}

            {stage === "email" && isEmailValid && timer && (
              <p className="text-green-600 text-xs mt-1">
                Valid email! Continuing in {countdown} seconds...
              </p>
            )}

            {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

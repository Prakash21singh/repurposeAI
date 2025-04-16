import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useRegister = () => {
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
      setEmail("");
      setPassword("");
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    error,
    loading,
    email,
    password,
    setError,
    setLoading,
    setEmail,
    setPassword,
    onSubmit,
  };
};

export const useLogin = () => {
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

  return {
    error,
    loading,
    email,
    password,
    onSubmit,
    setError,
    setLoading,
    setEmail,
    setPassword,
  };
};

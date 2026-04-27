import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "@services/firebase";

const useSignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignin = async (action: () => Promise<unknown>) => {
    setError(null);
    setIsSubmitting(true);
    try {
      await action();
      const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname;
      navigate(from ?? "/", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
      setIsSubmitting(false);
    }
  };

  return {
    signIn: (email: string, password: string) =>
      handleSignin(() => signInWithEmailAndPassword(auth, email, password)),
    signInWithGoogle: () => handleSignin(() => signInWithPopup(auth, new GoogleAuthProvider())),
    error,
    isSubmitting,
  };
};

export default useSignIn;

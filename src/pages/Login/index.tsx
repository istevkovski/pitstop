import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import { auth } from "@services/firebase";
import classes from "./index.module.scss";
import useAuth from "@hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isLoading } = useAuth();

  console.log(isLoading);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname;
      navigate(from ?? "/", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      This is: {isLoading}
      <form className={classes.login} onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <input
          type="email"
          aria-label="Email"
          placeholder="Email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
        />
        <input
          type="password"
          aria-label="Password"
          placeholder="Password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isSubmitting}
        />
        {error && <p role="alert">{error}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export default Login;

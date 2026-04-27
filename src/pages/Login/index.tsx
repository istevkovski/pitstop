import { useState, type FormEvent } from "react";
import useSignIn from "@hooks/useSignIn";
import classes from "./index.module.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, error, isSubmitting } = useSignIn();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    signIn(email, password);
  };

  return (
    <div className={classes.login}>
      <form className={classes.form} onSubmit={handleSubmit}>
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

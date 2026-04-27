import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useSignIn from "@hooks/useSignIn";
import classes from "./index.module.scss";
import { Input } from "@components/FormComponents";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").pipe(z.email("Enter a valid email address")),
  password: z.string().min(1, "Password is required"),
});

type LoginValues = z.infer<typeof loginSchema>;

const Login = () => {
  const { signIn, error, isSubmitting } = useSignIn();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    disabled: isSubmitting,
  });

  const onSubmit = ({ email, password }: LoginValues) => {
    signIn(email, password);
  };

  return (
    <div className={classes.login}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1>Sign in</h1>
        <Input
          type="email"
          aria-label="Email"
          placeholder="Email"
          autoComplete="email"
          {...register("email")}
        />
        {errors.email && <p role="alert">{errors.email.message}</p>}
        <Input
          type="password"
          aria-label="Password"
          placeholder="Password"
          autoComplete="current-password"
          {...register("password")}
        />
        {errors.password && <p role="alert">{errors.password.message}</p>}
        {error && <p role="alert">{error}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export default Login;

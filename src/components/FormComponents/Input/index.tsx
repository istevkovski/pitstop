import clsx from "clsx";
import type { ComponentProps } from "react";
import classes from "./index.module.scss";

type Props = ComponentProps<"input">;

export const Input = ({ className, ...rest }: Props) => {
  return <input className={clsx(classes.input, className)} {...rest} />;
};

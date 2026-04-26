import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

const Container = ({ children, ...rest }: Props) => {
  return <div {...rest}>{children}</div>;
};

export default Container;

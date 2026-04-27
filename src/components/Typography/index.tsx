import type { ComponentPropsWithoutRef, ElementType } from "react";

type TypographyTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "label" | "a";

type Props<T extends TypographyTag = "p"> = {
  tag?: T;
} & ComponentPropsWithoutRef<T>;

const Typography = <T extends TypographyTag = "p">({ tag, ...rest }: Props<T>) => {
  const Component = (tag ?? "p") as ElementType;
  return <Component {...rest} />;
};

export default Typography;

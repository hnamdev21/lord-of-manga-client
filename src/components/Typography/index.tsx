import cn from "classnames";
import React from "react";

import styles from "./styles.module.scss";

type FontColor = "info" | "danger" | "warning" | "success" | "primary" | "secondary" | "dark" | "light" | "white" | "black";
type FontSize = "xs" | "sm" | "base" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl";
type FontWeight = "thin" | "base" | "md" | "bold" | "extrabold";
type TextTransform = "uppercase" | "lowercase" | "capitalize" | "normal" | "none";
type TextAlign = "left" | "center" | "right" | "justify";
type Tag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

type TypographyProps = React.HTMLAttributes<HTMLHeadingElement> & {
  tag?: Tag;
  fontSize?: FontSize;
  textColor?: FontColor;
  fontWeight?: FontWeight;
  transform?: TextTransform;
  align?: TextAlign;
  italic?: boolean;
  label?: boolean;
};

const Typography = ({
  tag: Tag = "p",
  fontSize = "base",
  fontWeight = "base",
  textColor = "black",
  transform = "none",
  align = "left",
  italic = false,
  className = "",
  children,
  ...props
}: TypographyProps & { children: React.ReactNode }) => {
  const TagName = Tag;
  const classes = cn(
    styles.text,
    styles[`text__size__${fontSize}`],
    styles[`text__weight__${fontWeight}`],
    styles[`text__color__${textColor}`],
    styles[`text__transform__${transform}`],
    styles[`text__align__${align}`],
    { [styles["text__italic"]]: italic },
    className
  );

  return (
    <TagName {...props} className={classes}>
      {children}
    </TagName>
  );
};

export default Typography;

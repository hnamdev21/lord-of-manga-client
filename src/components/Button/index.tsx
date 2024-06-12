"use client";

import cn from "classnames";
import Link from "next/link";
import React from "react";

import styles from "./styles.module.scss";

type ButtonSize = "sm" | "base" | "md" | "lg";
type ButtonColor = "primary" | "secondary" | "danger" | "success" | "warning" | "info";
type ButtonVariant = "solid" | "outline" | "plain";

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  as: "button";
  type: "button" | "submit" | "reset";
  children: React.ReactNode;
};

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  as?: "a";
  href: string;
  children: React.ReactNode;
};

type DefaultButtonProps = {
  size?: ButtonSize;
  color?: ButtonColor;
  variant?: ButtonVariant;
  icon?: boolean;
};

type Props = (DefaultButtonProps & ButtonProps) | (DefaultButtonProps & LinkProps);

const Button = ({ size = "base", color = "primary", variant = "solid", icon = false, children, className = "", ...props }: Props) => {
  const classes = cn(
    styles.button,
    styles[`button__size__${size}`],
    styles[`button__color__${color}`],
    styles[`button__variant__${variant}`],
    icon && styles["button__icon"],
    className
  );

  if (props.as === "button") {
    return (
      <button {...props} className={classes}>
        {children}
      </button>
    );
  }

  return (
    <Link {...props} className={classes}>
      {children}
    </Link>
  );
};

export default Button;

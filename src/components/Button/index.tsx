"use client";

import cn from "classnames";
import Link from "next/link";
import React from "react";

import styles from "./styles.module.scss";

type ButtonSize = "xs" | "sm" | "base" | "md" | "lg";
type ButtonColor = "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "transparent";
type ButtonVariant = "solid" | "outline" | "plain";

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  element: "button";
  type: "button" | "submit" | "reset";
  children: React.ReactNode;
};

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  element?: "a";
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

  if (props.element === "button") {
    return (
      <button {...props} className={classes}>
        {children}
      </button>
    );
  }

  return (
    <Link {...props} className={classes} href={props.href}>
      {children}
    </Link>
  );
};

export default Button;

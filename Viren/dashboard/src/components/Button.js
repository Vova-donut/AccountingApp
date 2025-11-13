import React from "react";

const cx = (...classes) => classes.filter(Boolean).join(" ");

const Button = ({
  children,
  variant = "primary", // primary | secondary | danger | success
  size = "md", // sm | md | lg
  className,
  ...props
}) => {
  return (
    <button
      className={cx(
        "btn",
        variant === "primary" && "btn-primary",
        variant === "secondary" && "btn-secondary",
        variant === "danger" && "btn-danger",
        variant === "success" && "btn-success",
        size === "sm" && "btn-sm",
        size === "lg" && "btn-lg",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;


import clsx from "clsx";
import { ReactNode, MouseEvent } from "react";

interface ButtonProps {
  children?: ReactNode;
  label?: string;
  onClick: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "second" | "danger";
}

function Button({
  children,
  label = "",
  onClick,
  className,
  type = "button",
  variant = "primary",
}: ButtonProps) {
  const variants: Record<string, string> = {
    primary: "bg-black text-white",
    second: "bg-black/30 text-white",
    danger: "bg-[#ff4d4d] font-bold text-white",
  };

  const defaultStyles = "text-sm px-3 rounded-lg py-2 font-medium";
  return (
    <button
      className={clsx(
        className,
        variants[variant] ?? variants.primary,
        defaultStyles
      )}
      onClick={onClick}
      type={type}
    >
      {label}
      {children}
    </button>
  );
}

export default Button;

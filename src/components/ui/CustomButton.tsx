import type { ButtonProps } from "../../types/types";
import "./button.css";

export function CustomButton({
  size,
  variant,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={`m-3 button button--${size} button--${variant} align-self-center`}
    >
      {children}
    </button>
  );
}

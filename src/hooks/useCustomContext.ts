import { useContext, type Context } from "react";

export function useCustomContext<T>(
  context: Context<T | undefined>,
  hookName: string
): T {
  const value = useContext(context);

  if (!value) {
    throw new Error(`${hookName}Must be used within Provider.`);
  }
  return value;
}

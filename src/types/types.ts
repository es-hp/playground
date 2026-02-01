import type { ComponentProps } from "react";
import type { ReactNode } from "react";

export type Task = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

export type TodosResponse = {
  todos: Task[];
  total: number;
  skip: string | number;
  limit: number;
};

export const SIZE_OPTIONS = ["small", "medium", "large"] as const;
export type Size = (typeof SIZE_OPTIONS)[number];
export const DEFAULT_SIZE: Size = SIZE_OPTIONS[0];

export const VARIANT_OPTIONS = ["main", "accent", "ghost", "disabled"] as const;
export type Variant = (typeof VARIANT_OPTIONS)[number];
export const DEFAULT_VARIANT: Variant = VARIANT_OPTIONS[0];

export type ButtonProps = ComponentProps<"button"> & {
  size: Size;
  variant: Variant;
};

export interface ProviderProps {
  children: ReactNode;
}

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { debounce } from "./debounce"

export { debounce }

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

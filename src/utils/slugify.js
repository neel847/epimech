// utils/slugify.js

import clsx from "clsx"
import { twMerge } from "tailwind-merge"

// ✅ ClassName merge function (for combining Tailwind classes safely)
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// ✅ Slugify function (convert text into a clean slug)
export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

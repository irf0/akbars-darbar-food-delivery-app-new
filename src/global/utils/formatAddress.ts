// utils/formatAddress.ts
export const formatAddress = (...parts: (string | null | undefined)[]) =>
  parts.filter(Boolean).join(', ') || 'Selected location';

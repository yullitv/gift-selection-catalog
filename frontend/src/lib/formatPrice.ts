export function formatPriceUsd(cents: number): string {
  const dollars = Math.round(cents / 100);
  return `${dollars} USD`;
}
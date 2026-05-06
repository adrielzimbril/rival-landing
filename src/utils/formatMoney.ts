export function formatMoney(value: number, symbol: string = "€") {
  return `${symbol}${Math.abs(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}
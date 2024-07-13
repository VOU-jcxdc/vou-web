export default function formatCurrencyWithCommas(number: number): string {
  const numberWithCommas = number
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return numberWithCommas;
}

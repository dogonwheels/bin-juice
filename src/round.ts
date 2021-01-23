export default function round(value: number, nearest: number) {
  return Math.floor(value / nearest) * nearest;
}

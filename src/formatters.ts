export function formatBinary(value: number, length: number) {
  return value.toString(2).padStart(length, '0');
}

export function formatHex(value: number, length: number) {
  return '0x' + value.toString(16).padStart(length, '0');
}

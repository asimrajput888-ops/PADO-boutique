export function formatUSD(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatSigned(value: number) {
  if (value === 0) return '+$0'
  return `+${formatUSD(value)}`
}

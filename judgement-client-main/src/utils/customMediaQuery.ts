export function combinedMediaMaxQuery(width: number, height: number): string {
  return `@media (max-width: ${width}px) and (max-height: ${height}px)`
}

export function combinedMediaMinQuery(width: number, height: number): string {
  return `@media (min-width: ${width}px) and (min-height: ${height}px)`
}

export function combinedMediaMaxMinQuery(width: number, height: number): string {
  return `@media (max-width: ${width}px) and (min-height: ${height}px)`
}

export function combinedMediaMinMaxQuery(width: number, height: number): string {
  return `@media (min-width: ${width}px) and (max-height: ${height}px)`
}

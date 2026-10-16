// Lit un tableau JSON depuis localStorage ; renvoie le repli si absent, corrompu ou mal typé
export function loadArray<T>(key: string, fallback: T[]): T[] {
  try {
    const saved = localStorage.getItem(key)
    if (!saved) return fallback
    const parsed: unknown = JSON.parse(saved)
    return Array.isArray(parsed) ? (parsed as T[]) : fallback
  } catch {
    return fallback
  }
}

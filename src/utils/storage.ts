const isObject = (value: unknown): boolean => typeof value === 'object' && value !== null

// Conserve la valeur illisible sous <clé>-corrompu avant que le repli ne l'écrase
function backupCorrupted(key: string, saved: string): void {
  try {
    localStorage.setItem(`${key}-corrompu`, saved)
  } catch {
    // quota plein : rien de plus à faire
  }
}

// Lit un tableau JSON depuis localStorage ; renvoie le repli si absent, corrompu ou mal typé.
// Les éléments qui ne sont pas des objets ou que `isValid` refuse sont écartés.
export function loadArray<T>(
  key: string,
  fallback: T[],
  isValid: (item: Record<string, unknown>) => boolean = () => true
): T[] {
  let saved: string | null = null
  try {
    saved = localStorage.getItem(key)
    if (!saved) return fallback
    const parsed: unknown = JSON.parse(saved)
    if (!Array.isArray(parsed)) throw new Error('pas un tableau')
    return parsed.filter((item) => isObject(item) && isValid(item)) as T[]
  } catch {
    if (saved) backupCorrupted(key, saved)
    return fallback
  }
}

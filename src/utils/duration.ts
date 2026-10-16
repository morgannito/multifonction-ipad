export const MIN_DURATION_MINUTES = 1
export const MAX_DURATION_MINUTES = 120

// Borne une durée saisie (minutes) ; une saisie vide ou invalide donne le minimum
export const clampDuration = (raw: string): number =>
  Math.min(MAX_DURATION_MINUTES, Math.max(MIN_DURATION_MINUTES, Number(raw) || MIN_DURATION_MINUTES))

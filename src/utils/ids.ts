// Identifiant unique même pour deux créations dans la même milliseconde
export const newId = (): string => `${Date.now()}-${Math.random().toString(36).slice(2)}`

import { useState, useEffect, useRef, useCallback } from 'react'

export type NoiseLevel = 'quiet' | 'moderate' | 'loud'

interface UseAudioMeterReturn {
  decibels: number
  noiseLevel: NoiseLevel
  isMonitoring: boolean
  error: string | null
  startMonitoring: () => Promise<void>
  stopMonitoring: () => void
}

export function useAudioMeter(): UseAudioMeterReturn {
  const [decibels, setDecibels] = useState(0)
  const [noiseLevel, setNoiseLevel] = useState<NoiseLevel>('quiet')
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  const updateNoiseLevel = useCallback((db: number) => {
    if (db < 50) {
      setNoiseLevel('quiet')
    } else if (db < 70) {
      setNoiseLevel('moderate')
    } else {
      setNoiseLevel('loud')
    }
  }, [])

  const analyzeAudio = useCallback(() => {
    if (!analyserRef.current) return

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
    analyserRef.current.getByteFrequencyData(dataArray)

    // Calculer le niveau moyen
    const average = dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length

    // Convertir en décibels (approximation)
    // Les valeurs de getByteFrequencyData vont de 0 à 255
    // On convertit en échelle 0-100 dB pour l'affichage
    const db = Math.min(100, (average / 255) * 100)

    setDecibels(db)
    updateNoiseLevel(db)

    animationFrameRef.current = requestAnimationFrame(analyzeAudio)
  }, [updateNoiseLevel])

  const startMonitoring = useCallback(async () => {
    try {
      setError(null)

      // Demander l'accès au microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      // Créer le contexte audio
      const audioContext = new AudioContext()
      audioContextRef.current = audioContext

      // Créer l'analyseur
      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 2048
      analyser.smoothingTimeConstant = 0.8
      analyserRef.current = analyser

      // Connecter le microphone à l'analyseur
      const microphone = audioContext.createMediaStreamSource(stream)
      microphoneRef.current = microphone
      microphone.connect(analyser)

      setIsMonitoring(true)

      // Démarrer l'analyse
      analyzeAudio()
    } catch (err) {
      console.error('Erreur d\'accès au microphone:', err)
      setError(
        err instanceof Error
          ? err.message
          : 'Impossible d\'accéder au microphone. Vérifiez les permissions.'
      )
      stopMonitoring()
    }
  }, [analyzeAudio])

  const stopMonitoring = useCallback(() => {
    // Arrêter l'animation
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    // Fermer le microphone
    if (microphoneRef.current) {
      microphoneRef.current.disconnect()
      microphoneRef.current = null
    }

    // Arrêter le stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }

    // Fermer le contexte audio
    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }

    analyserRef.current = null
    setIsMonitoring(false)
    setDecibels(0)
    setNoiseLevel('quiet')
  }, [])

  // Cleanup à la destruction du composant
  useEffect(() => {
    return () => {
      stopMonitoring()
    }
  }, [stopMonitoring])

  return {
    decibels,
    noiseLevel,
    isMonitoring,
    error,
    startMonitoring,
    stopMonitoring,
  }
}

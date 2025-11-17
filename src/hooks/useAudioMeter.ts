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
  const gainNodeRef = useRef<GainNode | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  const updateNoiseLevel = useCallback((db: number) => {
    if (db < 40) {
      setNoiseLevel('quiet')
    } else if (db < 65) {
      setNoiseLevel('moderate')
    } else {
      setNoiseLevel('loud')
    }
  }, [])

  const analyzeAudio = useCallback(() => {
    if (!analyserRef.current) return

    // Utiliser les données temporelles pour une meilleure précision
    const bufferLength = analyserRef.current.fftSize
    const dataArray = new Uint8Array(bufferLength)
    analyserRef.current.getByteTimeDomainData(dataArray)

    // Calculer le RMS (Root Mean Square) pour une mesure plus précise
    let sum = 0
    for (let i = 0; i < bufferLength; i++) {
      const normalized = (dataArray[i] - 128) / 128 // Normaliser entre -1 et 1
      sum += normalized * normalized
    }
    const rms = Math.sqrt(sum / bufferLength)

    // Convertir en décibels avec formule logarithmique
    // Formule : dB = 20 * log10(rms)
    // On ajoute un offset pour avoir des valeurs réalistes (environ 30-100 dB)
    let db = 20 * Math.log10(rms + 0.0001) // +0.0001 pour éviter log(0)

    // Calibration pour avoir des valeurs entre 20 et 100 dB
    db = db + 100 // Offset pour avoir des valeurs positives

    // Augmenter la sensibilité avec un facteur multiplicateur
    db = db * 1.5

    // Limiter entre 20 et 100 dB (valeurs réalistes en classe)
    db = Math.max(20, Math.min(100, db))

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

      // Créer l'analyseur avec paramètres optimisés pour la sensibilité
      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 4096 // Plus grande taille pour plus de précision
      analyser.smoothingTimeConstant = 0.3 // Plus réactif (0.3 au lieu de 0.8)
      analyserRef.current = analyser

      // Créer un gain node pour amplifier le signal
      const gainNode = audioContext.createGain()
      gainNode.gain.value = 2.5 // Amplification x2.5 pour meilleure sensibilité
      gainNodeRef.current = gainNode

      // Connecter : microphone -> gain -> analyseur
      const microphone = audioContext.createMediaStreamSource(stream)
      microphoneRef.current = microphone
      microphone.connect(gainNode)
      gainNode.connect(analyser)

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

    // Déconnecter le gain node
    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect()
      gainNodeRef.current = null
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

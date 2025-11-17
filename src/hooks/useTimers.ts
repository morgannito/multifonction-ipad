import { useState, useEffect, useRef } from 'react'

export interface Timer {
  id: string
  name: string
  duration: number // en secondes
  remaining: number // temps restant en secondes
  isRunning: boolean
  isPinned: boolean
  createdAt: number
}

export function useTimers() {
  const [timers, setTimers] = useState<Timer[]>([])
  const intervalRef = useRef<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Créer l'audio pour l'alarme au montage
  useEffect(() => {
    // Créer un son simple avec Web Audio API
    audioRef.current = new Audio()
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Mettre à jour tous les timers actifs chaque seconde
  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setTimers((prevTimers) => {
        let hasFinished = false

        const updatedTimers = prevTimers.map((timer) => {
          if (!timer.isRunning || timer.remaining <= 0) {
            return timer
          }

          const newRemaining = timer.remaining - 1

          // Vérifier si un timer vient de se terminer
          if (newRemaining === 0) {
            hasFinished = true
          }

          return {
            ...timer,
            remaining: newRemaining,
            isRunning: newRemaining > 0,
          }
        })

        // Jouer l'alarme si un timer est terminé
        if (hasFinished) {
          playAlarm()
        }

        return updatedTimers
      })
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const playAlarm = () => {
    // Créer un son de bip simple
    const audioContext = new AudioContext()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = 800 // Fréquence en Hz
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.5
    )

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)

    // Répéter 3 fois
    setTimeout(() => {
      const osc2 = audioContext.createOscillator()
      const gain2 = audioContext.createGain()
      osc2.connect(gain2)
      gain2.connect(audioContext.destination)
      osc2.frequency.value = 800
      osc2.type = 'sine'
      gain2.gain.setValueAtTime(0.3, audioContext.currentTime)
      gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
      osc2.start()
      osc2.stop(audioContext.currentTime + 0.5)
    }, 600)

    setTimeout(() => {
      const osc3 = audioContext.createOscillator()
      const gain3 = audioContext.createGain()
      osc3.connect(gain3)
      gain3.connect(audioContext.destination)
      osc3.frequency.value = 800
      osc3.type = 'sine'
      gain3.gain.setValueAtTime(0.3, audioContext.currentTime)
      gain3.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
      osc3.start()
      osc3.stop(audioContext.currentTime + 0.5)
    }, 1200)
  }

  const addTimer = (name: string, durationMinutes: number) => {
    const newTimer: Timer = {
      id: `timer-${Date.now()}-${Math.random()}`,
      name,
      duration: durationMinutes * 60,
      remaining: durationMinutes * 60,
      isRunning: false,
      isPinned: false,
      createdAt: Date.now(),
    }
    setTimers((prev) => [...prev, newTimer])
    return newTimer.id
  }

  const removeTimer = (id: string) => {
    setTimers((prev) => prev.filter((t) => t.id !== id))
  }

  const startTimer = (id: string) => {
    setTimers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isRunning: true } : t))
    )
  }

  const pauseTimer = (id: string) => {
    setTimers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isRunning: false } : t))
    )
  }

  const resetTimer = (id: string) => {
    setTimers((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, remaining: t.duration, isRunning: false }
          : t
      )
    )
  }

  const togglePin = (id: string) => {
    setTimers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isPinned: !t.isPinned } : t))
    )
  }

  const updateTimerName = (id: string, name: string) => {
    setTimers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, name } : t))
    )
  }

  return {
    timers,
    addTimer,
    removeTimer,
    startTimer,
    pauseTimer,
    resetTimer,
    togglePin,
    updateTimerName,
  }
}

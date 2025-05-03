import { useState, useEffect } from 'react'

export function useTime(refreshCycle = 1000) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, refreshCycle)

    return () => clearInterval(timer)
  }, [refreshCycle])

  return time
}

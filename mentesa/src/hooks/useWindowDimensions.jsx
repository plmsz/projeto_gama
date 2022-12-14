import { useState, useEffect } from 'react'

export function getWindowDimension() {
  const { innerWidth: width, innerHeight: height } = window
  return { width, height }
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimension())

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimension())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return windowDimensions
}

// src/components/ClientLayout.tsx
"use client"

import { useState, useEffect } from "react"
import { GreenLeafLoader } from "@/components/ui/GreenLeafLoader"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate a delay for initial page load
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000) // Adjust delay as needed

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {isLoading && <GreenLeafLoader />}
      <div className={isLoading ? "hidden" : "block"}>{children}</div>
    </>
  )
}
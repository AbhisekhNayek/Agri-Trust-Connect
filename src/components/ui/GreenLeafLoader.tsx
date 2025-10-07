// src/components/ui/GreenLeafLoader.tsx
"use client"

import { motion } from "framer-motion"
import { Leaf } from "lucide-react"

export function GreenLeafLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[linear-gradient(135deg,#1a3c34,#064e3b,#1a3c34)] animate-gradient-bg bg-[length:200%_200%]">
      <div
        className="absolute inset-0 bg-[url('/leaf-texture.png')] bg-[size:200px_200px] opacity-10"
        aria-hidden="true"
      />
      <motion.div
        className="relative h-16 w-16 rounded-full border-4 border-emerald-600"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Leaf className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-emerald-400" />
      </motion.div>
      <span className="absolute bottom-10 text-sm text-emerald-200 animate-pulse">
        Loading AgriTrust Connect...
      </span>
    </div>
  )
}
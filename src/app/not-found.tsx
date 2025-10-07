"use client";

import type React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout } from "lucide-react";

/**
 * NotFoundPage Component
 *
 * Renders a 404 page for the AgriTrust platform when a requested page is not found.
 * Uses consistent styling with the provided login page for a cohesive look.
 */
export default function NotFoundPage() {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  const buttonGlowVariants = {
    hover: {
      boxShadow: "0 0 20px rgba(34, 197, 94, 0.5)",
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,#1a3c34,#064e3b,#1a3c34)] animate-gradient-bg bg-[length:200%_200%] p-4">
      <div
        className="absolute inset-0 bg-[url('/leaf-texture.png')] bg-[size:200px_200px] opacity-10"
        aria-hidden="true"
      />
      <motion.div
        className="relative w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <Card className="border-emerald-800/50 bg-emerald-900/50 backdrop-blur-md shadow-lg">
          <CardHeader className="space-y-1">
            {/* AgriTrust Logo */}
            <div className="mb-4 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-600 to-emerald-400 shadow-lg shadow-green-600/20">
                <Sprout className="h-7 w-7 text-white" />
              </div>
            </div>

            {/* Page title and description */}
            <CardTitle className="text-center text-2xl sm:text-3xl text-white">
              Page Not Found
            </CardTitle>
            <p className="text-center text-emerald-200">
              Oops! The page you're looking for doesn't exist.
            </p>
          </CardHeader>

          <CardContent className="flex flex-col items-center gap-4">
            <p className="text-center text-sm text-emerald-200">
              Let's get you back to the AgriTrust dashboard.
            </p>
            <motion.div variants={buttonGlowVariants} whileHover="hover">
              <Link href="/farmer">
                <Button
                  className="bg-gradient-to-r from-green-600 to-emerald-400 text-white shadow-lg hover:from-green-700 hover:to-emerald-500 transition-all"
                  aria-label="Return to AgriTrust Dashboard"
                >
                  Go to Dashboard
                </Button>
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
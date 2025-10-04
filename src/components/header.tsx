"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * Navigation link configuration
 * Centralized nav items for easier maintenance and consistency
 */
const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/guide", label: "Guide" },
  { href: "/features", label: "Features" },
  { href: "/contact", label: "Contact" },
] as const

/**
 * Header Component
 * 
 * Main navigation header for AgriTrust Connect platform.
 * Features:
 * - Sticky header with backdrop blur effect
 * - Responsive mobile menu
 * - Gradient logo and branding
 * - Consistent navigation across desktop and mobile
 */
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  /**
   * Close mobile menu when screen size changes to desktop
   * Prevents menu staying open when resizing from mobile to desktop
   */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  /**
   * Prevent body scroll when mobile menu is open
   * Improves mobile UX by preventing background scrolling
   */
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  /**
   * Toggle mobile menu visibility
   */
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev)
  }

  /**
   * Close mobile menu when a navigation link is clicked
   * Improves mobile navigation experience
   */
  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main header container */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo and brand section */}
          <div className="flex items-center gap-3">
            {/* Logo icon */}
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-600">
              <span className="text-lg font-bold text-white">AT</span>
            </div>

            {/* Brand name with gradient text */}
            <Link
              href="/"
              className="bg-gradient-to-b from-green-500 to-green-400/60 bg-clip-text text-xl font-bold text-transparent"
              onClick={handleNavClick}
            >
              AgriTrust Connect
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 transition-colors hover:text-green-400"
              >
                {link.label}
              </Link>
            ))}

            {/* Login button */}
            <Button
              asChild
              variant="outline"
              className="border-green-600 bg-transparent text-green-400 hover:bg-green-600 hover:text-white"
            >
              <Link href="/login">Login</Link>
            </Button>
          </nav>

          {/* Mobile Menu Toggle Button - Visible only on mobile */}
          <button
            className="text-gray-300 hover:text-white md:hidden"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation - Shown when menu is open */}
        {mobileMenuOpen && (
          <nav
            id="mobile-menu"
            className="space-y-3 border-t border-gray-800 py-4 md:hidden"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-gray-300 transition-colors hover:text-green-400"
                onClick={handleNavClick}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile login button */}
            <Button
              asChild
              variant="outline"
              className="w-full border-green-600 bg-transparent text-green-400 hover:bg-green-600 hover:text-white"
              onClick={handleNavClick}
            >
              <Link href="/login">Login</Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  )
}
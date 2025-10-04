"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Sprout, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * Navigation link configuration
 * Centralized configuration for easier maintenance and consistency
 */
type NavLinkBase = {
  label: string;
  primary: boolean;
};

type NavLinkSimple = NavLinkBase & {
  href: string;
};

type NavLinkDropdown = NavLinkBase & {
  dropdown: { href: string; label: string }[];
};

type NavLink = NavLinkSimple | NavLinkDropdown;

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home", primary: true },
  { href: "#features", label: "Features", primary: false },
  { href: "#how-it-works", label: "How It Works", primary: false },
  { href: "#pricing", label: "Pricing", primary: false },
  { 
    label: "Solutions", 
    primary: false,
    dropdown: [
      { href: "/solutions/farmers", label: "For Farmers" },
      { href: "/solutions/buyers", label: "For Buyers" },
      { href: "/solutions/suppliers", label: "For Suppliers" },
      { href: "/solutions/logistics", label: "For Logistics" },
    ]
  },
  { 
    label: "Resources", 
    primary: false,
    dropdown: [
      { href: "/blog", label: "Blog" },
      { href: "/case-studies", label: "Case Studies" },
      { href: "/documentation", label: "Documentation" },
      { href: "/api", label: "API Reference" },
      { href: "/support", label: "Support Center" },
    ]
  },
  { href: "#about", label: "About Us", primary: false },
  { href: "#contact", label: "Contact", primary: false },
];

/**
 * Scroll threshold for header style change
 */
const SCROLL_THRESHOLD = 20

/**
 * Header Component
 * 
 * Main navigation header for AgriTrust Connect platform.
 * Features:
 * - Sticky header with dynamic scroll effects
 * - Backdrop blur and shadow on scroll
 * - Responsive mobile menu with animations
 * - Dropdown menus for Solutions and Resources
 * - Gradient logo with hover effects
 * - CTA buttons for Login and Sign Up
 * - Fully responsive across sm, md, lg, and xl devices
 */
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null)

  /**
   * Handle scroll event to update header appearance
   * Changes background opacity and shadow when scrolling past threshold
   */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  /**
   * Close mobile menu when screen size changes to desktop
   * Prevents menu staying open when resizing from mobile to desktop
   */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
        setMobileDropdownOpen(null)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  /**
   * Prevent body scroll when mobile menu is open
   * Improves mobile UX by locking scroll position
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
   * Close dropdowns when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null)
    }

    if (openDropdown) {
      document.addEventListener("click", handleClickOutside)
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [openDropdown])

  /**
   * Toggle mobile menu visibility
   */
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev)
    setMobileDropdownOpen(null)
  }

  /**
   * Close mobile menu when a navigation link is clicked
   * Provides smooth navigation experience on mobile
   */
  const handleNavClick = () => {
    setMobileMenuOpen(false)
    setMobileDropdownOpen(null)
  }

  /**
   * Toggle dropdown menu
   */
  const toggleDropdown = (label: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setOpenDropdown(openDropdown === label ? null : label)
  }

  /**
   * Toggle mobile dropdown
   */
  const toggleMobileDropdown = (label: string) => {
    setMobileDropdownOpen(mobileDropdownOpen === label ? null : label)
  }

  /**
   * Dynamic header classes based on scroll state
   */
  const headerClasses = scrolled
    ? "border-border/60 bg-background/80 backdrop-blur-lg shadow-sm"
    : "border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${headerClasses}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main header container */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo and brand section with hover effects */}
          <Link 
            href="/" 
            className="group flex items-center gap-2"
            onClick={handleNavClick}
            aria-label="AgriTrust Connect Home"
          >
            {/* Logo icon with gradient background and hover animation */}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-primary/30">
              <Sprout className="h-6 w-6 text-primary-foreground" />
            </div>

            {/* Brand name with gradient text effect - Hidden on small screens */}
            <span className="hidden bg-gradient-to-br from-primary via-accent to-primary bg-clip-text text-xl font-bold text-transparent sm:inline">
              AgriTrust Connect
            </span>
            {/* Shorter brand name for mobile */}
            <span className="bg-gradient-to-br from-primary via-accent to-primary bg-clip-text text-xl font-bold text-transparent sm:hidden">
              AgriTrust
            </span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile screens, progressive reveal on larger screens */}
          <nav className="hidden items-center gap-4 md:flex lg:gap-6" aria-label="Main navigation">
            {/* Navigation links */}
            {NAV_LINKS.map((link) => {
              const isDropdown = (l: NavLink): l is NavLinkDropdown => 'dropdown' in l;
              return isDropdown(link) ? (
                // Dropdown navigation item
                <div key={link.label} className="relative">
                  <button
                    onClick={(e) => toggleDropdown(link.label, e)}
                    className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 hover:text-primary ${
                      link.primary ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openDropdown === link.label ? "rotate-180" : ""}`} />
                  </button>

                  {/* Dropdown menu */}
                  {openDropdown === link.label && (
                    <div className="absolute left-0 top-full mt-2 w-56 animate-fade-in rounded-lg border border-border/60 bg-background/95 p-2 shadow-lg backdrop-blur-lg">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                // Regular navigation link
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-primary ${
                    link.primary ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Login button with ghost style - Hidden on md, shown on lg+ */}
            <Link href="/login" className="hidden lg:block">
              <Button 
                variant="ghost" 
                size="sm" 
                className="transition-all duration-200 hover:scale-105"
              >
                Login
              </Button>
            </Link>

            {/* Primary CTA button with enhanced hover effects */}
            <Link href="/signup">
              <Button
                size="sm"
                className="bg-primary shadow-md shadow-primary/20 transition-all duration-200 hover:scale-105 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30"
              >
                Get Started
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Toggle Button - Visible only on mobile */}
          <button
            className="transition-transform duration-200 hover:scale-110 md:hidden"
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

        {/* Mobile Navigation Menu - Shown when menu is open */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="max-h-[calc(100vh-4rem)] space-y-1 overflow-y-auto py-4 md:hidden"
            aria-label="Mobile navigation"
          >
            {/* Mobile navigation links */}
            {NAV_LINKS.map((link) => {
              const isDropdown = (l: NavLink): l is NavLinkDropdown => 'dropdown' in l;
              return isDropdown(link) ? (
                // Mobile dropdown navigation item
                <div key={link.label}>
                  <button
                    onClick={() => toggleMobileDropdown(link.label)}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-primary ${
                      link.primary ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileDropdownOpen === link.label ? "rotate-180" : ""}`} />
                  </button>

                  {/* Mobile dropdown items */}
                  {mobileDropdownOpen === link.label && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-border/40 pl-3">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                          onClick={handleNavClick}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                // Regular mobile navigation link
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-primary ${
                    link.primary ? "text-foreground" : "text-muted-foreground"
                  }`}
                  onClick={handleNavClick}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Mobile CTA buttons container */}
            <div className="flex flex-col gap-2 border-t border-border/40 pt-4">
              {/* Mobile login button */}
              <Link href="/login" onClick={handleNavClick}>
                <Button variant="ghost" size="sm" className="w-full">
                  Login
                </Button>
              </Link>

              {/* Mobile sign up button */}
              <Link href="/signup" onClick={handleNavClick}>
                <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
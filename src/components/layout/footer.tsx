// src/components/Footer.tsx
"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Sprout, Twitter, Linkedin, Github, Mail } from "lucide-react"

const FOOTER_LINKS = {
  product: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Documentation", href: "/resources/documentation" },
  ],
  solutions: [
    { label: "For Farmers", href: "/solutions/farmers" },
    { label: "For Buyers", href: "/solutions/buyers" },
    { label: "For Suppliers", href: "/solutions/suppliers" },
    { label: "For Logistics", href: "/solutions/logistics" },
  ],
  resources: [
    { label: "Blog", href: "/resources/blog" },
    { label: "Case Studies", href: "/resources/case-studies" },
    { label: "API Reference", href: "/resources/api" },
    { label: "Support Center", href: "/resources/support" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "#careers" },
    { label: "Press Kit", href: "#press" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Security", href: "/security" },
  ],
}

const SOCIAL_LINKS = [
  { icon: Twitter, href: "https://twitter.com/agritrust", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/agritrust", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/agritrust", label: "GitHub" },
  { icon: Mail, href: "mailto:hello@agritrust.com", label: "Email" },
]

const buttonGlowVariants = {
  hover: {
    boxShadow: "0 0 20px rgba(34, 197, 94, 0.5)",
    scale: 1.05,
    transition: { duration: 0.3 },
  },
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-emerald-800/50 bg-[linear-gradient(135deg,#1a3c34,#064e3b,#1a3c34)] animate-gradient-bg bg-[length:200%_200%] text-emerald-200">
      <div
        className="absolute inset-0 bg-[url('/leaf-texture.png')] bg-[size:200px_200px] opacity-10"
        aria-hidden="true"
      />
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 relative backdrop-blur-md">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-7">
          {/* Brand Column - Takes 2 columns on large screens */}
          <div className="col-span-2 space-y-4">
            {/* Logo and brand */}
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-green-600 to-emerald-400 shadow-lg shadow-emerald-400/30">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <span className="text-lg font-bold text-emerald-400">
                AgriTrust Connect
              </span>
            </Link>

            {/* Company description */}
            <p className="text-sm leading-relaxed text-emerald-200">
              Building trust in agriculture through blockchain technology. 
              Connect, track, and verify your agricultural supply chain with transparency.
            </p>

            {/* Social links */}
            <div className="flex gap-2">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-800/50 bg-emerald-900/50 transition-colors hover:bg-emerald-600/20 hover:text-emerald-300"
                    variants={buttonGlowVariants}
                    whileHover="hover"
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Product links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Product</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-emerald-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Solutions</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.solutions.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-emerald-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Resources</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-emerald-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Company</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-emerald-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Legal</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-emerald-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar with copyright */}
      <div className="border-t border-emerald-800/50">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            {/* Copyright */}
            <p className="text-sm text-emerald-200">
              © {currentYear} AgriTrust Connect. All rights reserved.
            </p>

            {/* Additional links */}
            <div className="flex gap-6 text-sm">
              <Link
                href="/privacy"
                className="transition-colors hover:text-emerald-400"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="transition-colors hover:text-emerald-400"
              >
                Terms
              </Link>
              <Link
                href="/cookies"
                className="transition-colors hover:text-emerald-400"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
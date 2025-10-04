import type { Metadata } from "next"

/**
 * Metadata for authentication pages
 * Optimized for SEO and social sharing
 */
export const metadata: Metadata = {
  title: {
    template: "%s | AgriTrust Connect",
    default: "Authentication | AgriTrust Connect",
  },
  description: "Sign in or create an account to access AgriTrust Connect - Building trust in agriculture through blockchain technology.",
}

/**
 * AuthLayout Component
 * 
 * Layout wrapper for all authentication pages (login, signup, forgot password).
 * Features:
 * - Consistent background and styling across auth pages
 * - Centered content layout
 * - No header/footer for focused user experience
 * - Responsive design for all screen sizes
 * 
 * @param children - Child components (auth pages)
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-background to-green-50/30 dark:from-gray-900 dark:via-background dark:to-gray-900">
      {/* Background pattern overlay for visual interest */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
        aria-hidden="true"
      />
      
      {/* Main content container */}
      <div className="relative">
        {children}
      </div>
    </div>
  )
}
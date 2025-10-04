import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

/**
 * Metadata for marketing pages
 * Optimized for SEO and social sharing
 */
export const metadata: Metadata = {
  title: {
    template: "%s | AgriTrust Connect",
    default: "AgriTrust Connect - Building Trust in Agriculture",
  },
  description: "Connect farmers, buyers, and suppliers on a transparent blockchain platform. Track your products from farm to table with complete traceability.",
  keywords: ["agriculture", "blockchain", "supply chain", "farmers", "transparency", "traceability"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "AgriTrust Connect",
    title: "AgriTrust Connect - Building Trust in Agriculture",
    description: "Connect farmers, buyers, and suppliers on a transparent blockchain platform.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgriTrust Connect - Building Trust in Agriculture",
    description: "Connect farmers, buyers, and suppliers on a transparent blockchain platform.",
  },
}

/**
 * MarketingLayout Component
 * 
 * Layout wrapper for all marketing pages (home, about, pricing, contact).
 * Features:
 * - Header with navigation
 * - Footer with links and info
 * - Consistent dark theme styling across marketing pages
 * - SEO optimized metadata
 * 
 * @param children - Child components (marketing pages)
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      {/* Header navigation */}
      <Header />
      
      {/* Main content area */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Sprout, 
  Shield, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  Leaf,
  Package,
  Truck,
  BarChart3
} from "lucide-react"

/**
 * Feature cards data for the features section
 */
const FEATURES = [
  {
    icon: Shield,
    title: "Blockchain Security",
    description: "Immutable records ensure data integrity and trust throughout the supply chain.",
  },
  {
    icon: TrendingUp,
    title: "Real-time Tracking",
    description: "Monitor your products from farm to market with live updates and insights.",
  },
  {
    icon: Users,
    title: "Connect Stakeholders",
    description: "Bridge the gap between farmers, buyers, suppliers, and logistics providers.",
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    description: "Make informed decisions with comprehensive analytics and reporting tools.",
  },
]

/**
 * Benefits data for different user types
 */
const BENEFITS = [
  {
    icon: Leaf,
    title: "For Farmers",
    description: "Increase transparency, build trust, and get fair prices for your produce.",
  },
  {
    icon: Package,
    title: "For Buyers",
    description: "Verify product authenticity and quality with complete traceability.",
  },
  {
    icon: Truck,
    title: "For Logistics",
    description: "Optimize routes and ensure efficient delivery tracking.",
  },
]

/**
 * Statistics data
 */
const STATS = [
  { value: "10,000+", label: "Farmers Connected" },
  { value: "50,000+", label: "Products Tracked" },
  { value: "99.9%", label: "Data Accuracy" },
  { value: "24/7", label: "Support Available" },
]

/**
 * HomePage Component
 * 
 * Main landing page for AgriTrust Connect platform.
 * Features:
 * - Hero section with CTA
 * - Features showcase
 * - Benefits for different user types
 * - Statistics section
 * - Call-to-action section
 * - Fully responsive design
 */
export default function HomePage() {
  return (
    <div className="flex flex-col bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        {/* Background pattern */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]"
          aria-hidden="true"
        />
        
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            {/* Hero content */}
            <div className="flex flex-col justify-center">
              {/* Badge */}
              <div className="mb-6 inline-flex">
                <span className="inline-flex items-center gap-2 rounded-full bg-green-600/20 border border-green-600/30 px-4 py-1.5 text-sm font-medium text-green-400">
                  <Sprout className="h-4 w-4" />
                  Powered by Blockchain
                </span>
              </div>

              {/* Main heading */}
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Building Trust in{" "}
                <span className="bg-gradient-to-r from-green-500 to-green-400 bg-clip-text text-transparent">
                  Agriculture
                </span>
              </h1>

              {/* Subheading */}
              <p className="mb-8 text-lg text-gray-400 sm:text-xl">
                Connect farmers, buyers, and suppliers on a transparent blockchain platform. 
                Track your products from farm to table with complete traceability.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg shadow-green-500/30 hover:from-green-700 hover:to-green-600"
                >
                  <Link href="/signup">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-green-600 bg-transparent text-green-400 hover:bg-green-600/10"
                >
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-400">No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-400">Free forever plan</span>
                </div>
              </div>
            </div>

            {/* Hero image/illustration */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 to-green-500 p-8 shadow-2xl shadow-green-500/20">
                {/* Placeholder for hero image - Replace with actual image */}
                <div className="flex h-96 items-center justify-center">
                  <div className="text-center text-white">
                    <Sprout className="mx-auto mb-4 h-24 w-24" />
                    <p className="text-lg font-medium">
                      Transparent Agricultural Supply Chain
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-green-500 opacity-20 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-green-400 opacity-20 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="border-y border-green-900/30 bg-gray-900 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-green-500 sm:text-4xl">{stat.value}</p>
                <p className="mt-2 text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-black px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Powerful Features for Modern Agriculture
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              Everything you need to build trust and transparency in your agricultural supply chain
            </p>
          </div>

          {/* Features grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="border-green-900/30 bg-gray-900/50 backdrop-blur transition-all hover:border-green-600/50 hover:shadow-lg hover:shadow-green-500/10">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-600/20 border border-green-600/30">
                      <Icon className="h-6 w-6 text-green-500" />
                    </div>
                    <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-900 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Built for Every Stakeholder
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              Whether you're a farmer, buyer, or logistics provider, AgriTrust has you covered
            </p>
          </div>

          {/* Benefits grid */}
          <div className="grid gap-8 md:grid-cols-3">
            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div 
                  key={benefit.title}
                  className="group relative overflow-hidden rounded-2xl border border-green-900/30 bg-black p-8 transition-all hover:border-green-600/50 hover:shadow-xl hover:shadow-green-500/10"
                >
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-600 to-green-500 text-white shadow-lg shadow-green-500/30">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                  
                  {/* Hover effect */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-green-600 to-green-500 transition-all duration-300 group-hover:w-full" />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-black px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              Get started in three simple steps
            </p>
          </div>

          {/* Steps */}
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: "01", title: "Sign Up", description: "Create your account and choose your role in the supply chain" },
              { step: "02", title: "Connect", description: "Link with farmers, buyers, or suppliers in your network" },
              { step: "03", title: "Track & Trust", description: "Monitor products with blockchain-verified transparency" },
            ].map((item, index) => (
              <div key={item.step} className="relative">
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-green-500 text-xl font-bold text-white shadow-lg shadow-green-500/30">
                    {item.step}
                  </div>
                  {index < 2 && (
                    <ArrowRight className="hidden h-6 w-6 text-green-500 md:block" />
                  )}
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-500 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
            Ready to Transform Your Agricultural Supply Chain?
          </h2>
          <p className="mb-8 text-lg text-green-50">
            Join thousands of farmers, buyers, and suppliers building trust through transparency
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-green-600 shadow-lg hover:bg-gray-50"
            >
              <Link href="/signup">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white bg-transparent text-white hover:bg-white/10"
            >
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
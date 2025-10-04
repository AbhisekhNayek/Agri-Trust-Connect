"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X, HelpCircle, ArrowRight, Zap } from "lucide-react"

/**
 * Pricing plans data
 */
const PRICING_PLANS = [
  {
    name: "Starter",
    description: "Perfect for individual farmers starting their digital journey",
    monthlyPrice: 0,
    annualPrice: 0,
    popular: false,
    features: [
      { text: "Up to 50 product listings", included: true },
      { text: "Basic blockchain tracking", included: true },
      { text: "Mobile app access", included: true },
      { text: "Email support", included: true },
      { text: "Basic analytics dashboard", included: true },
      { text: "Advanced analytics", included: false },
      { text: "Priority support", included: false },
      { text: "API access", included: false },
      { text: "Custom integrations", included: false },
    ],
  },
  {
    name: "Professional",
    description: "For growing businesses and cooperatives",
    monthlyPrice: 49,
    annualPrice: 490,
    popular: true,
    features: [
      { text: "Unlimited product listings", included: true },
      { text: "Advanced blockchain tracking", included: true },
      { text: "Mobile + Web app access", included: true },
      { text: "Priority email & chat support", included: true },
      { text: "Advanced analytics & reports", included: true },
      { text: "Multi-user access (up to 10)", included: true },
      { text: "API access", included: true },
      { text: "Custom integrations", included: false },
      { text: "Dedicated account manager", included: false },
    ],
  },
  {
    name: "Enterprise",
    description: "For large organizations and supply chain networks",
    monthlyPrice: null,
    annualPrice: null,
    popular: false,
    features: [
      { text: "Unlimited everything", included: true },
      { text: "Custom blockchain tracking", included: true },
      { text: "Mobile + Web + API access", included: true },
      { text: "24/7 premium support", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Custom integrations", included: true },
      { text: "On-premise deployment", included: true },
      { text: "Custom analytics & insights", included: true },
      { text: "Training & onboarding", included: true },
    ],
  },
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="max-w-3xl text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
          Choose Your Plan
        </h1>
        <p className="text-gray-400 mt-2">
          Empower your farm with blockchain transparency and trust — pick a plan that grows with you.
        </p>

        {/* Billing Toggle */}
        <div className="mt-6 inline-flex items-center bg-gray-800 rounded-full p-1">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-2 rounded-full text-sm transition ${
              billingCycle === "monthly"
                ? "bg-green-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={`px-4 py-2 rounded-full text-sm transition ${
              billingCycle === "annual"
                ? "bg-green-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Annual <span className="text-green-400 text-xs ml-1">(Save 20%)</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {PRICING_PLANS.map((plan) => (
          <Card
            key={plan.name}
            className={`relative border border-green-900/40 bg-gradient-to-b from-green-900/30 to-green-950/20 backdrop-blur-md rounded-2xl shadow-xl ${
              plan.popular ? "ring-2 ring-green-500 shadow-green-500/20" : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-xs font-semibold px-3 py-1 rounded-full">
                Most Popular
              </div>
            )}

            <CardHeader>
              <CardTitle className="text-2xl text-green-400">{plan.name}</CardTitle>
              <CardDescription className="text-gray-400">{plan.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {plan.monthlyPrice !== null ? (
                <div className="text-4xl font-bold text-green-500">
                  ${billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice}
                  <span className="text-base text-gray-400 font-normal">/{billingCycle}</span>
                </div>
              ) : (
                <div className="text-2xl font-semibold text-green-400">Custom Pricing</div>
              )}

              <ul className="space-y-2 mt-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    {feature.included ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-gray-600" />
                    )}
                    <span className={feature.included ? "text-gray-200" : "text-gray-500"}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="mt-6">
              {plan.monthlyPrice === null ? (
                <Button
                  variant="outline"
                  className="w-full border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
                  asChild
                >
                  <Link href="/contact">
                    Contact Sales <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button
                  className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-green-500/20"
                  asChild
                >
                  <Link href="/signup">
                    Get Started <Zap className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Footer note */}
      <p className="text-gray-500 text-sm mt-10">
        Need a custom plan?{" "}
        <Link href="/contact" className="text-green-400 hover:underline">
          Let’s talk
        </Link>
      </p>
    </div>
  )
}

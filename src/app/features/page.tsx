"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Shield, BarChart2, Truck, Leaf, ArrowRight } from "lucide-react";

const FEATURES = [
  {
    title: "Blockchain Transparency",
    description: "Ensure trust with secure, immutable supply chain tracking.",
    icon: Shield,
    stat: "100% Verifiable",
  },
  {
    title: "AI-Powered Analytics",
    description: "Optimize operations with real-time data insights.",
    icon: BarChart2,
    stat: "30% Yield Increase",
  },
  {
    title: "Streamlined Logistics",
    description: "Connect farmers, buyers, and suppliers seamlessly.",
    icon: Truck,
    stat: "50% Faster Delivery",
  },
  {
    title: "Sustainability Tracking",
    description: "Monitor environmental impact with detailed metrics.",
    icon: Leaf,
    stat: "20% Carbon Reduction",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const buttonGlowVariants = {
  hover: {
    boxShadow: "0 0 20px rgba(34, 197, 94, 0.5)",
    scale: 1.05,
    transition: { duration: 0.3 },
  },
};

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[linear-gradient(135deg,#1a3c34,#064e3b,#1a3c34)] animate-gradient-bg bg-[length:200%_200%]">
      <Header />
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-[linear-gradient(180deg,#064e3b,#022c22)] backdrop-blur-md border-b border-emerald-900/50">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-12 sm:mb-16 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white">Features of AgriTrust Connect</h1>
            <p className="text-emerald-100 mt-3 text-base sm:text-lg">
              Discover the powerful tools that transform agriculture
            </p>
          </motion.div>
          <motion.div
            className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {FEATURES.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-emerald-900/50 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-emerald-800/50"
                whileHover={{ scale: 1.03 }}
              >
                <Card className="bg-transparent border-0">
                  <CardHeader className="flex items-center gap-2 p-0">
                    <feature.icon className="h-6 w-6 text-emerald-300" />
                    <CardTitle className="text-lg sm:text-xl text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 mt-2">
                    <p className="text-emerald-100 text-sm sm:text-base">{feature.description}</p>
                    <p className="text-emerald-300 text-xs mt-1 font-medium">{feature.stat}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="mt-12 text-center"
            variants={buttonGlowVariants}
            whileHover="hover"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-green-600 to-emerald-400 text-white shadow-lg hover:from-green-700 hover:to-emerald-500 transition-all"
              aria-label="Sign up for AgriTrust Connect"
            >
              <Link href="/signup">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
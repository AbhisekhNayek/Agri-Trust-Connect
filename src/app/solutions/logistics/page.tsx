"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Truck, Clock, Map, ShieldCheck, ArrowRight } from "lucide-react";
import { Footer } from "@/components/layout/footer";

const BENEFITS = [
  {
    icon: Truck,
    title: "Real-Time Tracking",
    description: "Monitor shipments with blockchain-verified tracking for complete visibility.",
  },
  {
    icon: Clock,
    title: "Optimized Delivery",
    description: "AI-driven logistics planning ensures faster and more efficient deliveries.",
  },
  {
    icon: Map,
    title: "Route Optimization",
    description: "Plan the best routes to reduce costs and improve delivery timelines.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Transactions",
    description: "Blockchain ensures secure, tamper-proof records for all logistics operations.",
  },
];

const TESTIMONIALS = [
  {
    quote: "AgriTrust Connect’s tracking system ensures we deliver produce on time, every time.",
    author: "Li Wei, Logistics Manager",
    location: "Shanghai, China",
  },
  {
    quote: "The platform’s route optimization has cut our delivery costs significantly.",
    author: "Sophie B., Transport Coordinator",
    location: "Bordeaux, France",
  },
];

const TOOLS = [
  {
    name: "Shipment Tracker",
    description: "Track shipments in real-time with blockchain-verified data.",
    icon: Truck,
  },
  {
    name: "Route Planner",
    description: "Optimize delivery routes with AI-driven insights.",
    icon: Map,
  },
];

export default function LogisticsPage() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.2 },
    },
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

  return (
    <div className="flex flex-col min-h-screen bg-[linear-gradient(135deg,#1a3c34,#064e3b,#1a3c34)] animate-gradient-bg bg-[length:200%_200%]">
      <Header/>
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:py-28 sm:px-6 lg:px-8 bg-[linear-gradient(45deg,#064e3b,#022c22,#064e3b)] animate-gradient-bg bg-[length:200%_200%] backdrop-blur-md border-b border-emerald-900/50">
        <div
          className="absolute inset-0 bg-[url('/leaf-texture.png')] bg-[size:200px_200px] opacity-10"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]"
          aria-hidden="true"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-emerald-900/20 transform translate-y-10"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          aria-hidden="true"
        />
        <motion.div
          className="relative mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
            Empowering{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-200 bg-clip-text text-transparent">
              Logistics
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-emerald-100 font-medium">
            AgriTrust Connect optimizes logistics with real-time tracking, AI-driven planning, and secure blockchain records.
          </p>
          <motion.div variants={buttonGlowVariants} whileHover="hover">
            <Button
              asChild
              size="lg"
              className="mt-8 bg-gradient-to-r from-green-600 to-emerald-400 text-white shadow-lg hover:from-green-700 hover:to-emerald-500 transition-all"
              aria-label="Sign up for AgriTrust Connect"
            >
              <Link href="/signup">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-[linear-gradient(180deg,#064e3b,#022c22)] backdrop-blur-md border-b border-emerald-900/50">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-12 sm:mb-16 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white flex items-center justify-center gap-2">
              <Truck className="h-7 sm:h-8 w-7 sm:w-8 text-emerald-300" /> Why Logistics Providers Choose Us
            </h2>
            <p className="text-emerald-100 mt-3 text-base sm:text-lg">
              Streamline your operations with cutting-edge technology
            </p>
          </motion.div>
          <motion.div
            className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  variants={itemVariants}
                  className="group bg-emerald-900/50 backdrop-blur-md rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all border border-emerald-800/50"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="mb-5 inline-flex h-12 sm:h-14 w-12 sm:w-14 items-center justify-center rounded-xl bg-emerald-800/40 text-emerald-300 group-hover:scale-110 transition">
                    <Icon className="h-6 sm:h-7 w-6 sm:w-7" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-emerald-100 mt-3 text-sm sm:text-base leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-[linear-gradient(180deg,#022c22,#064e3b)] backdrop-blur-md border-b border-emerald-900/50">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-12 sm:mb-16 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white flex items-center justify-center gap-2">
              <Truck className="h-7 sm:h-8 w-7 sm:w-8 text-emerald-300" /> Our Logistics Tools
            </h2>
            <p className="text-emerald-100 mt-3 text-base sm:text-lg">
              Enhance your logistics with powerful tools
            </p>
          </motion.div>
          <motion.div
            className="grid gap-6 sm:gap-8 sm:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {TOOLS.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-emerald-900/50 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-emerald-800/50"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-800/40 text-emerald-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">
                    {tool.name}
                  </h3>
                  <p className="text-emerald-100 text-sm sm:text-base">
                    {tool.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-[linear-gradient(180deg,#064e3b,#022c22)] backdrop-blur-md border-b border-emerald-900/50">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-12 sm:mb-16 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white">What Logistics Providers Say</h2>
            <p className="text-emerald-100 mt-3 text-base sm:text-lg">
              Real stories from our logistics community
            </p>
          </motion.div>
          <motion.div
            className="grid gap-6 sm:gap-8 sm:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-emerald-900/50 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all border border-emerald-800/50"
                whileHover={{ scale: 1.03 }}
              >
                <p className="text-emerald-100 italic mb-4 text-sm sm:text-base">
                  "{testimonial.quote}"
                </p>
                <p className="text-emerald-300 font-semibold text-sm sm:text-base">
                  {testimonial.author}
                </p>
                <p className="text-emerald-100 text-xs sm:text-sm">{testimonial.location}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-[linear-gradient(45deg,#064e3b,#022c22,#064e3b)] animate-gradient-bg bg-[length:200%_200%] backdrop-blur-md">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <h2 className="mb-6 text-3xl sm:text-4xl font-bold text-white">
            🌱 Optimize Your Logistics Today
          </h2>
          <p className="mb-8 text-lg sm:text-xl text-emerald-100">
            Join AgriTrust Connect to streamline deliveries and ensure transparency.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <motion.div variants={buttonGlowVariants} whileHover="hover">
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
            <motion.div variants={buttonGlowVariants} whileHover="hover">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-emerald-800/50 text-emerald-300 hover:bg-emerald-900/50 hover:text-emerald-200 transition-all"
                aria-label="Contact AgriTrust Connect"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>
    <Footer/>
    </div>
  );
}
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ShoppingCart,
  ShieldCheck,
  Truck,
  Eye,
  ArrowRight,
  Leaf,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const BENEFITS = [
  {
    icon: ShoppingCart,
    title: "Verified Suppliers",
    description:
      "Connect with trusted farmers offering verified produce quality and origin.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Sourcing",
    description:
      "Blockchain ensures full visibility into the supply chain, from farm to table.",
  },
  {
    icon: Truck,
    title: "Efficient Procurement",
    description:
      "Streamline purchasing with real-time data and direct farmer connections.",
  },
  {
    icon: Eye,
    title: "Quality Assurance",
    description:
      "AI-driven insights verify crop quality, ensuring premium products every time.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "AgriTrust Connect makes sourcing produce easy and reliable with full transparency.",
    author: "Emily T., Grocery Chain Buyer",
    location: "London, UK",
  },
  {
    quote:
      "The platform’s verification system ensures we only buy high-quality crops.",
    author: "Carlos M., Food Distributor",
    location: "Sao Paulo, Brazil",
  },
];

const FARMERS = [
  {
    name: "Green Valley Farms",
    location: "Napa Valley, USA",
    specialty: "Organic Vegetables",
    image: "/farmers/green-valley.jpg",
  },
  {
    name: "Sunrise Orchards",
    location: "Tuscany, Italy",
    specialty: "Heirloom Fruits",
    image: "/farmers/sunrise-orchards.jpg",
  },
];

export default function BuyersPage() {
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
      <Header />

      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:py-28 sm:px-6 lg:px-8 bg-[linear-gradient(45deg,#064e3b,#022c22,#064e3b)] animate-gradient-bg bg-[length:200%_200%] backdrop-blur-md border-b border-emerald-900/50 overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('/leaf-texture.png')] bg-[size:200px_200px] opacity-10"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:24px_24px]"
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
              Buyers
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-emerald-100 font-medium">
            AgriTrust Connect provides buyers with transparent sourcing,
            verified quality, and efficient procurement through blockchain
            technology.
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
              <ShoppingCart className="h-7 sm:h-8 w-7 sm:w-8 text-emerald-300" /> Why Buyers
              Choose Us
            </h2>
            <p className="text-emerald-100 mt-3 text-base sm:text-lg">
              Reliable sourcing with complete transparency
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

      {/* Featured Farmers Section */}
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
              <Leaf className="h-7 sm:h-8 w-7 sm:w-8 text-emerald-300" /> Meet Our Farmers
            </h2>
            <p className="text-emerald-100 mt-3 text-base sm:text-lg">
              Connect with verified farmers delivering top-quality produce
            </p>
          </motion.div>
          <motion.div
            className="grid gap-6 sm:gap-8 sm:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {FARMERS.map((farmer, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-emerald-900/50 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-emerald-800/50"
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src={farmer.image}
                  alt={`${farmer.name} farm`}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  {farmer.name}
                </h3>
                <p className="text-emerald-100 text-sm sm:text-base">
                  {farmer.location}
                </p>
                <p className="text-emerald-300 text-sm sm:text-base font-medium">
                  Specialty: {farmer.specialty}
                </p>
              </motion.div>
            ))}
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white">What Buyers Say</h2>
            <p className="text-emerald-100 mt-3 text-base sm:text-lg">
              Real stories from our buyer community
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
            🌱 Start Sourcing with Confidence
          </h2>
          <p className="mb-8 text-lg sm:text-xl text-emerald-100">
            Join AgriTrust Connect to access verified farmers and transparent
            supply chains.
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

      <Footer />
    </div>
  );
}
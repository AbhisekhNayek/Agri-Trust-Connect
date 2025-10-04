"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Award,
  Globe,
  Lightbulb,
  TrendingUp,
  ArrowRight,
  Sprout,
  Leaf
} from "lucide-react"

const VALUES = [
  {
    icon: Heart,
    title: "Transparency",
    description: "Open communication and honest practices across the farming supply chain.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Stronger partnerships between farmers, buyers, and suppliers.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Blockchain + AI creating traceable and fair agricultural ecosystems.",
  },
  {
    icon: Award,
    title: "Trust",
    description: "Immutable records that strengthen credibility and reliability.",
  },
]

const TEAM_STATS = [
  { icon: Users, value: "50+", label: "Team Members" },
  { icon: Globe, value: "15+", label: "Countries" },
  { icon: Award, value: "10+", label: "Years Experience" },
  { icon: TrendingUp, value: "100K+", label: "Users Served" },
]

const TESTIMONIALS = [
  {
    quote: "AgriTrust has transformed how we connect with buyers, ensuring fair pricing and trust.",
    author: "Maria S., Organic Farmer",
    location: "Napa Valley, CA",
  },
  {
    quote: "The blockchain transparency gives our customers confidence in our supply chain.",
    author: "John K., Agri Supplier",
    location: "Midwest, USA",
  },
]

const MILESTONES = [
  { year: "2018", event: "AgriTrust Founded with a mission to revolutionize agriculture." },
  { year: "2020", event: "Launched blockchain platform for supply chain transparency." },
  { year: "2022", event: "Expanded to 10+ countries with 50K+ users." },
  { year: "2025", event: "Integrated AI for predictive farming analytics." },
]

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="flex flex-col bg-gradient-to-b from-green-900/30 to-green-950/20 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-28 sm:px-6 lg:px-8 border-green-900/40 bg-gradient-to-b from-green-900/30 to-green-950/20 backdrop-blur-md">
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]"
          aria-hidden="true"
        />
        <motion.div 
          className="relative mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
            Growing{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-200 bg-clip-text text-transparent">
              Trust in Agriculture
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-green-100 font-medium">
            AgriTrust Connect bridges technology and sustainability — empowering farmers and buyers 
            through blockchain-powered transparency.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-lg shadow-green-600/20 hover:from-green-700 hover:to-emerald-600 transform hover:scale-105 transition-all"
          >
            <Link href="/signup">
              Explore Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            className="mb-16 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <h2 className="text-4xl font-bold text-white flex items-center justify-center gap-2">
              <Sprout className="h-8 w-8 text-green-300" /> Our Purpose
            </h2>
            <p className="text-green-100 mt-3 text-lg">Mission and Vision that drive every seed we plant</p>
          </motion.div>

          <motion.div 
            className="grid gap-8 lg:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <Card className="border-green-900/40 bg-gradient-to-b from-green-900/50 to-green-950/30 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all">
                <CardContent className="p-8">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-green-900/50">
                    <Target className="h-8 w-8 text-green-300" />
                  </div>
                  <h3 className="mb-4 text-2xl font-semibold text-white">Our Mission</h3>
                  <p className="text-green-100 leading-relaxed">
                    Empowering farmers with blockchain transparency, ensuring fair pricing, and 
                    reconnecting consumers with trusted food sources.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-green-900/40 bg-gradient-to-b from-green-900/50 to-green-950/30 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all">
                <CardContent className="p-8">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-green-900/50">
                    <Eye className="h-8 w-8 text-green-300" />
                  </div>
                  <h3 className="mb-4 text-2xl font-semibold text-white">Our Vision</h3>
                  <p className="text-green-100 leading-relaxed">
                    A world where every crop, trade, and transaction is traceable — creating 
                    sustainability and trust in agriculture worldwide.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="px-4 py-24 sm:px-6 lg:px-8 border-green-900/40 bg-gradient-to-b from-green-900/30 to-green-950/20 backdrop-blur-md">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            className="mb-16 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <h2 className="text-4xl font-bold text-white flex items-center justify-center gap-2">
              <Leaf className="h-8 w-8 text-green-300" /> Core Values
            </h2>
            <p className="text-green-100 mt-3 text-lg">What makes AgriTrust Connect unique</p>
          </motion.div>

          <motion.div 
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {VALUES.map((value) => {
              const Icon = value.icon
              return (
                <motion.div 
                  key={value.title}
                  variants={itemVariants}
                  className="group border-green-900/40 bg-gradient-to-b from-green-900/50 to-green-950/30 backdrop-blur-md rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all"
                >
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-green-900/50 text-green-300 group-hover:scale-110 transition">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{value.title}</h3>
                  <p className="text-green-100 mt-3 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            className="mb-16 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <h2 className="text-4xl font-bold text-white">What Our Community Says</h2>
            <p className="text-green-100 mt-3 text-lg">Voices from farmers and partners</p>
          </motion.div>

          <motion.div 
            className="grid gap-8 sm:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="border-green-900/40 bg-gradient-to-b from-green-900/50 to-green-950/30 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all"
              >
                <p className="text-green-100 italic mb-4">"{testimonial.quote}"</p>
                <p className="text-green-300 font-semibold">{testimonial.author}</p>
                <p className="text-green-100 text-sm">{testimonial.location}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="px-4 py-24 sm:px-6 lg:px-8 border-green-900/40 bg-gradient-to-b from-green-900/30 to-green-950/20 backdrop-blur-md">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            className="mb-16 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <h2 className="text-4xl font-bold text-white">Our Journey</h2>
            <p className="text-green-100 mt-3 text-lg">Key milestones in AgriTrust’s growth</p>
          </motion.div>

          <motion.div 
            className="relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="absolute left-1/2 h-full w-1 -translate-x-1/2 bg-green-900/50" />
            {MILESTONES.map((milestone, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className={`mb-8 flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className="w-1/2 px-6">
                  <div className="border-green-900/40 bg-gradient-to-b from-green-900/50 to-green-950/30 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all">
                    <h3 className="text-xl font-semibold text-green-300">{milestone.year}</h3>
                    <p className="text-green-100 mt-2">{milestone.event}</p>
                  </div>
                </div>
                <div className="w-1/2" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="px-4 py-24 sm:px-6 lg:px-8 border-green-900/40 bg-gradient-to-b from-green-900/30 to-green-950/20 backdrop-blur-md">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            className="mb-16 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <h2 className="text-4xl font-bold text-white">🌍 Our Impact in Numbers</h2>
            <p className="text-green-100 mt-3 text-lg">A global network growing stronger each season</p>
          </motion.div>

          <motion.div 
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {TEAM_STATS.map((stat) => {
              const Icon = stat.icon
              return (
                <motion.div 
                  key={stat.label}
                  variants={itemVariants}
                  className="border-green-900/40 bg-gradient-to-b from-green-900/50 to-green-950/30 backdrop-blur-md rounded-2xl p-8 text-center shadow-xl hover:scale-105 transition-transform"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-900/50">
                    <Icon className="h-6 w-6 text-green-300" />
                  </div>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-green-100 text-sm">{stat.label}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-24 sm:px-6 lg:px-8 border-green-900/40 bg-gradient-to-b from-green-900/30 to-green-950/20 backdrop-blur-md">
        <motion.div 
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <h2 className="mb-6 text-4xl font-bold text-white">
            🌾 Ready to Join the AgriTrust Movement?
          </h2>
          <p className="mb-8 text-xl text-green-100">
            Farmers, buyers, and innovators — let’s cultivate transparency together.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-lg shadow-green-600/20 hover:from-green-700 hover:to-emerald-600 transform hover:scale-105 transition-all"
            >
              <Link href="/signup">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-green-900/40 text-green-300 hover:bg-green-900/50 hover:text-green-200 transform hover:scale-105 transition-all"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
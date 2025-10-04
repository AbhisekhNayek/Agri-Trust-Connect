"use client";

import { Header } from "@/components/layout/header";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, ArrowRight, Shield, BarChart2, Truck, Leaf, TrendingUp, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { useEffect, useState } from "react";

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

const TESTIMONIALS = [
  {
    quote: "AgriTrust transformed our farm's efficiency with real-time tracking.",
    author: "John Doe",
    role: "Organic Farmer, California",
  },
  {
    quote: "The analytics tools helped us scale our supply chain globally.",
    author: "Jane Smith",
    role: "Supplier, India",
  },
  {
    quote: "Seamless logistics made our operations smoother than ever.",
    author: "Carlos Rivera",
    role: "Logistics Manager, Brazil",
  },
];

const HOW_IT_WORKS = [
  { step: "Sign Up", description: "Create your AgriTrust account in minutes." },
  { step: "Connect", description: "Link with farmers, buyers, and suppliers." },
  { step: "Track", description: "Monitor operations with blockchain transparency." },
  { step: "Optimize", description: "Use AI insights to improve efficiency." },
];

const STATS = [
  { value: "10K+", label: "Farmers Onboarded", icon: Users },
  { value: "1M+", label: "Transactions Processed", icon: TrendingUp },
  { value: "50+", label: "Countries Served", icon: Sprout },
];

const BLOG_POSTS = [
  {
    title: "Blockchain in Agriculture",
    description: "How blockchain ensures trust in the supply chain.",
    href: "/resources/blog/blockchain-in-agriculture",
  },
  {
    title: "AI for Farming",
    description: "Leveraging AI for smarter agricultural decisions.",
    href: "/resources/blog/ai-for-farming",
  },
];

const PARTNERS = [
  { name: "GreenFields Co.", href: "#" },
  { name: "AgriTech Solutions", href: "#" },
  { name: "Global Farms", href: "#" },
];

export default function HomePage() {
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
    initial: {
      scale: [1, 1.1, 1],
      transition: { duration: 0.5, times: [0, 0.5, 1], delay: 0.5 },
    },
  };

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const testimonialVariants = {
    active: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    inactive: { opacity: 0, x: 50, transition: { duration: 0.5 } },
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentTestimonial(index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[linear-gradient(135deg,#1a3c34,#064e3b,#1a3c34)] animate-gradient-bg bg-[length:200%_200%]">
      <Header />

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
          className="absolute top-10 left-10 h-4 w-4 text-emerald-300"
          animate={{ y: [0, -20, 0], rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <Leaf className="h-4 w-4" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-20 h-4 w-4 text-emerald-300"
          animate={{ y: [0, 20, 0], rotate: [0, -360] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <Leaf className="h-4 w-4" />
        </motion.div>
        <motion.div
          className="relative mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-emerald-300 text-lg sm:text-xl font-medium mb-4">
            Trusted by 10,000+ farmers globally
          </p>
          <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
            Transform Agriculture with{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-200 bg-clip-text text-transparent">
              AgriTrust Connect
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-emerald-100 font-medium">
            Empowering farmers, buyers, and suppliers with blockchain transparency, AI analytics, and seamless logistics.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <motion.div variants={buttonGlowVariants} whileHover="hover" initial="initial" animate="initial">
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
            <motion.div variants={buttonGlowVariants} whileHover="hover" initial="initial" animate="initial">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-emerald-800/50 text-emerald-300 hover:bg-emerald-900/50 hover:text-emerald-200 transition-all"
                aria-label="Learn more about AgriTrust Connect"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-[linear-gradient(180deg,#064e3b,#022c22)] backdrop-blur-md border-b border-emerald-900/50">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-12 sm:mb-16 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white">How AgriTrust Connect Works</h2>
            <p className="text-emerald-100 mt-3 text-base sm:text-lg">
              Get started in four simple steps
            </p>
          </motion.div>
          <motion.div
            className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {HOW_IT_WORKS.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-emerald-900/50 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-emerald-800/50"
                whileHover={{ scale: 1.03 }}
              >
                <Card className="bg-transparent border-0">
                  <CardHeader className="p-0">
                    <CardTitle className="text-lg sm:text-xl text-white">
                      {index + 1}. {step.step}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 mt-2">
                    <p className="text-emerald-100 text-sm sm:text-base">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-[linear-gradient(180deg,#064e3b,#022c22)] backdrop-blur-md border-b border-emerald-900/50">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-12 sm:mb-16 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Why AgriTrust Connect?</h2>
            <p className="text-emerald-100 mt-3 text-base sm:text-lg">
              Discover the tools that transform agriculture
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
                    <Button
                      asChild
                      variant="link"
                      className="mt-2 text-emerald-400 hover:text-emerald-300 p-0"
                    >
                      <Link href="/features" aria-label={`Learn more about ${feature.title}`}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-[linear-gradient(45deg,#064e3b,#022c22,#064e3b)] animate-gradient-bg bg-[length:200%_200%] backdrop-blur-md border-b border-emerald-900/50">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-12 sm:mb-16 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Our Impact</h2>
            <p className="text-emerald-100 mt-3 text-base sm:text-lg">
              AgriTrust Connect is transforming agriculture worldwide
            </p>
          </motion.div>
          <motion.div
            className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {STATS.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-emerald-900/50 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-emerald-800/50 text-center"
                whileHover={{ scale: 1.03 }}
              >
                <stat.icon className="h-8 w-8 text-emerald-300 mx-auto mb-2" />
                <p className="text-3xl sm:text-4xl font-bold text-emerald-100">{stat.value}</p>
                <p className="text-emerald-300 text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className="px-4 py-20 sm:px-6 lg:px-8 bg-[linear-gradient(180deg,#064e3b,#022c22)] backdrop-blur-md border-b border-emerald-900/50"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-12 sm:mb-16 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white">What Our Users Say</h2>
            <p className="text-emerald-100 mt-3 text-base sm:text-lg">
              Hear from farmers, buyers, and suppliers using AgriTrust Connect
            </p>
          </motion.div>
          <div className="relative">
            <motion.div
              className="relative overflow-hidden"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.x > 50) handlePrev();
                if (offset.x < -50) handleNext();
              }}
            >
              {TESTIMONIALS.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={testimonialVariants}
                  animate={index === currentTestimonial ? "active" : "inactive"}
                  className="bg-emerald-900/50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-emerald-800/50"
                  style={{ display: index === currentTestimonial ? "block" : "none" }}
                >
                  <p className="text-emerald-100 text-sm sm:text-base italic">"{testimonial.quote}"</p>
                  <p className="text-emerald-300 text-sm mt-3 font-medium">
                    {testimonial.author}, {testimonial.role}
                  </p>
                </motion.div>
              ))}
            </motion.div>
            {/* Navigation Buttons */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 left-0"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="bg-emerald-900/50 text-emerald-300 hover:bg-emerald-800/50 hover:text-emerald-200"
                onClick={handlePrev}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </motion.div>
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 right-0"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="bg-emerald-900/50 text-emerald-300 hover:bg-emerald-800/50 hover:text-emerald-200"
                onClick={handleNext}
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </motion.div>
            {/* Pagination Dots */}
            <div className="flex justify-center mt-4 space-x-2">
              {TESTIMONIALS.map((_, index) => (
                <motion.button
                  key={index}
                  className={`h-3 w-3 rounded-full ${
                    index === currentTestimonial ? "bg-emerald-400" : "bg-emerald-700/50"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-[linear-gradient(180deg,#064e3b,#022c22)] backdrop-blur-md border-b border-emerald-900/50">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-12 sm:mb-16 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Latest Insights</h2>
            <p className="text-emerald-100 mt-3 text-base sm:text-lg">
              Stay updated with our blog on agriculture and technology
            </p>
          </motion.div>
          <motion.div
            className="grid gap-6 sm:gap-8 sm:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {BLOG_POSTS.map((post, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-emerald-900/50 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-emerald-800/50"
                whileHover={{ scale: 1.03 }}
              >
                <h3 className="text-lg sm:text-xl font-semibold text-white">{post.title}</h3>
                <p className="text-emerald-100 text-sm sm:text-base mt-2">{post.description}</p>
                <Button
                  asChild
                  variant="link"
                  className="mt-2 text-emerald-400 hover:text-emerald-300 p-0"
                >
                  <Link href={post.href} aria-label={`Read blog post: ${post.title}`}>
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-[linear-gradient(180deg,#064e3b,#022c22)] backdrop-blur-md border-b border-emerald-900/50">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-12 sm:mb-16 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Our Partners</h2>
            <p className="text-emerald-100 mt-3 text-base sm:text-lg">
              Trusted by leading organizations in agriculture
            </p>
          </motion.div>
          <motion.div
            className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {PARTNERS.map((partner, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-emerald-900/50 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-emerald-800/50 text-center"
                whileHover={{ scale: 1.03 }}
              >
                <p className="text-lg sm:text-xl font-semibold text-white">{partner.name}</p>
                <Button
                  asChild
                  variant="link"
                  className="mt-2 text-emerald-400 hover:text-emerald-300 p-0"
                >
                  <Link href={partner.href} aria-label={`Learn more about ${partner.name}`}>
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
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
            🌱 Join AgriTrust Connect Today
          </h2>
          <p className="mb-8 text-lg sm:text-xl text-emerald-100">
            Start transforming your agricultural operations with our platform.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <motion.div variants={buttonGlowVariants} whileHover="hover" initial="initial" animate="initial">
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
            <motion.div variants={buttonGlowVariants} whileHover="hover" initial="initial" animate="initial">
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
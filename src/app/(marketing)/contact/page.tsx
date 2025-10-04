"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  Headphones
} from "lucide-react"
import { motion } from "framer-motion"

/**
 * Contact methods data
 */
const CONTACT_METHODS = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Our team will respond within 24 hours",
    contact: "support@agritrust.com",
    href: "mailto:support@agritrust.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Mon-Fri from 9am to 6pm",
    contact: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Come say hello at our office",
    contact: "123 Agriculture St, Farm City, FC 12345",
    href: "https://maps.google.com",
  },
  {
    icon: Clock,
    title: "Business Hours",
    description: "Our support team is available",
    contact: "Monday - Friday: 9:00 AM - 6:00 PM",
    href: null,
  },
]

/**
 * Inquiry types for the contact form
 */
const INQUIRY_TYPES = [
  "General Inquiry",
  "Sales & Pricing",
  "Technical Support",
  "Partnership Opportunity",
  "Media & Press",
  "Other",
]

/**
 * ContactPage Component
 * 
 * Contact page with form and contact information.
 * Features:
 * - Contact form with validation
 * - Multiple contact methods
 * - Success/error states
 * - Inquiry type selection
 * - Fully responsive design with dark background and green accents
 */
export default function ContactPage() {
  // Form state management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  /**
   * Handle input field changes
   */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (error) setError("")
  }

  /**
   * Validate form
   */
  const validateForm = (): string => {
    if (!formData.name.trim()) {
      return "Please enter your name"
    }
    if (!formData.email.includes("@")) {
      return "Please enter a valid email address"
    }
    if (!formData.inquiryType) {
      return "Please select an inquiry type"
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      return "Please enter a message (at least 10 characters)"
    }
    return ""
  }

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // TODO: Replace with actual API call to send contact form
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success state
      setIsSuccess(true)
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
        setFormData({
          name: "",
          email: "",
          phone: "",
          inquiryType: "",
          message: "",
        })
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

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
    <div className="flex flex-col bg-gradient-to-b from-green-900/30 to-green-950/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 border-green-900/40 bg-gradient-to-b from-green-900/30 to-green-950/20 backdrop-blur-md">
        {/* Background pattern */}
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
          {/* Page title */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Get in{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-200 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>

          {/* Page description */}
          <p className="mx-auto mb-8 max-w-2xl text-lg text-green-100 sm:text-xl">
            Have a question or want to learn more? We're here to help. Reach out to our team 
            and we'll get back to you as soon as possible.
          </p>
        </motion.div>
      </section>

      {/* Contact Methods Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {CONTACT_METHODS.map((method) => {
              const Icon = method.icon
              return (
                <motion.div 
                  key={method.title}
                  variants={itemVariants}
                  className="border-green-900/40 bg-gradient-to-b from-green-900/30 to-green-950/20 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-900/50">
                      <Icon className="h-6 w-6 text-green-300" />
                    </div>
                    <h3 className="mb-2 font-semibold text-white">{method.title}</h3>
                    <p className="mb-3 text-sm text-green-100">{method.description}</p>
                    {method.href ? (
                      <a
                        href={method.href}
                        className="text-sm font-medium text-green-300 hover:text-green-200 hover:underline"
                        target={method.href.startsWith("http") ? "_blank" : undefined}
                        rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        {method.contact}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-green-100">{method.contact}</p>
                    )}
                  </CardContent>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 border-green-900/40 bg-gradient-to-b from-green-900/30 to-green-950/20 backdrop-blur-md">
        <div className="mx-auto max-w-4xl">
          <motion.div 
            className="grid gap-12 lg:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Form info */}
            <motion.div variants={itemVariants} className="flex flex-col justify-center">
              <h2 className="mb-4 text-3xl font-bold text-white">
                Send Us a Message
              </h2>
              <p className="mb-8 text-lg text-green-100">
                Fill out the form and our team will get back to you within 24 hours.
              </p>

              {/* Why contact us list */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MessageSquare className="h-6 w-6 flex-shrink-0 text-green-300" />
                  <div>
                    <h3 className="font-semibold text-white">Quick Response</h3>
                    <p className="text-sm text-green-100">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Headphones className="h-6 w-6 flex-shrink-0 text-green-300" />
                  <div>
                    <h3 className="font-semibold text-white">Expert Support</h3>
                    <p className="text-sm text-green-100">
                      Get help from our agricultural tech experts
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-green-300" />
                  <div>
                    <h3 className="font-semibold text-white">Dedicated Team</h3>
                    <p className="text-sm text-green-100">
                      Our team is committed to your success
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div variants={itemVariants}>
              <Card className="border-green-900/40 bg-gradient-to-b from-green-900/50 to-green-950/30 backdrop-blur-md shadow-xl">
                <CardContent className="p-6 sm:p-8">
                  {isSuccess ? (
                    /* Success message */
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-900/50">
                        <CheckCircle2 className="h-10 w-10 text-green-300" />
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-white">Message Sent!</h3>
                      <p className="text-green-100">
                        Thank you for contacting us. We'll get back to you soon.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Error message */}
                      {error && (
                        <div className="rounded-md bg-red-900/50 p-3 text-sm text-red-200">
                          {error}
                        </div>
                      )}

                      {/* Name input */}
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-green-100">
                          Full Name <span className="text-red-400">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleInputChange}
                          disabled={isLoading}
                          required
                          className="bg-green-900/20 text-white border-green-900/40 placeholder:text-green-200/50"
                        />
                      </div>

                      {/* Email and Phone */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-green-100">
                            Email <span className="text-red-400">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            required
                            className="bg-green-900/20 text-white border-green-900/40 placeholder:text-green-200/50"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-green-100">Phone (Optional)</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            value={formData.phone}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            className="bg-green-900/20 text-white border-green-900/40 placeholder:text-green-200/50"
                          />
                        </div>
                      </div>

                      {/* Inquiry type */}
                      <div className="space-y-2">
                        <Label htmlFor="inquiryType" className="text-green-100">
                          Inquiry Type <span className="text-red-400">*</span>
                        </Label>
                        <select
                          id="inquiryType"
                          name="inquiryType"
                          value={formData.inquiryType}
                          onChange={handleInputChange}
                          disabled={isLoading}
                          required
                          className="flex h-10 w-full rounded-md border border-green-900/40 bg-green-900/20 px-3 py-2 text-sm text-white placeholder:text-green-200/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-2 focus-visible:ring-offset-green-950 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="" className="bg-green-900/50 text-white">Select inquiry type</option>
                          {INQUIRY_TYPES.map((type) => (
                            <option key={type} value={type} className="bg-green-900/50 text-white">
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-green-100">
                          Message <span className="text-red-400">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell us more about your inquiry..."
                          value={formData.message}
                          onChange={handleInputChange}
                          disabled={isLoading}
                          required
                          rows={5}
                          className="resize-none bg-green-900/20 text-white border-green-900/40 placeholder:text-green-200/50"
                        />
                        <p className="text-xs text-green-100">
                          Minimum 10 characters
                        </p>
                      </div>

                      {/* Submit button */}
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white hover:from-green-700 hover:to-emerald-600 shadow-md shadow-green-600/20 hover:shadow-lg hover:shadow-green-600/30 transition-all"
                        disabled={isLoading}
                      >
                        {isLoading ? "Sending..." : "Send Message"}
                        {!isLoading && <Send className="ml-2 h-4 w-4" />}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
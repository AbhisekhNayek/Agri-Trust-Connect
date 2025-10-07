// src/app/FarmerDashboard.tsx
// @ts-nocheck
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClaimFormModal } from "@/components/forms/ClaimFormModal"
import {
  FileText,
  Truck,
  MapPin,
  Target,
  AlertTriangle,
  Cloud,
  Sun,
  CloudRain,
  Search,
  ArrowRight,
  Camera,
  CheckCircle2,
  Clock,
  Star,
  Phone,
  TrendingUp,
  Leaf,
  Map,
  LogOut,
} from "lucide-react"

const buttonGlowVariants = {
  hover: {
    boxShadow: "0 0 20px rgba(34, 197, 94, 0.5)",
    scale: 1.05,
    transition: { duration: 0.3 },
  },
}

export default function FarmerDashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("Dashboard")
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false)

  useEffect(() => {
    fetchProfile()
  }, [])

  async function fetchProfile() {
    try {
      const response = await fetch("/api/user/profile")
      const data = await response.json()
      if (data.success) {
        setUser(data.data.user)
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      window.location.href = "/login"
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const handleClaimSubmit = (data: any) => {
    console.log("Claim submitted:", data)
    setIsClaimModalOpen(false)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,#1a3c34,#064e3b,#1a3c34)] animate-gradient-bg bg-[length:200%_200%]">
        <div
          className="absolute inset-0 bg-[url('/leaf-texture.png')] bg-[size:200px_200px] opacity-10"
          aria-hidden="true"
        />
        <motion.div
          className="h-16 w-16 rounded-full border-4 border-emerald-600"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Leaf className="h-full w-full text-emerald-400" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#1a3c34,#064e3b,#1a3c34)] animate-gradient-bg bg-[length:200%_200%] text-emerald-100">
      <div
        className="absolute inset-0 bg-[url('/leaf-texture.png')] bg-[size:200px_200px] opacity-10"
        aria-hidden="true"
      />
      {/* Claim Form Modal */}
      <ClaimFormModal
        isOpen={isClaimModalOpen}
        onClose={() => setIsClaimModalOpen(false)}
        onSubmit={handleClaimSubmit}
      />

      {/* Header */}
      <header className="border-b border-emerald-800/50 bg-emerald-900/50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-emerald-400">
                <span className="text-lg font-bold text-white">
                  {user?.fullName?.charAt(0) || "F"}
                </span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{user?.fullName || "Farmer"}</h1>
                <p className="text-sm text-emerald-200">
                  Green Valley Farm • Siliguri, West Bengal
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="border-emerald-600 text-emerald-400 hover:bg-emerald-600/20 hover:text-emerald-300"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
              <span className="flex items-center gap-2 text-sm text-emerald-400">
                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"></div>
                Online
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <nav className="border-b border-emerald-800/50 bg-emerald-900/30">
          <div className="container mx-auto px-4">
            <TabsList className="flex gap-6 bg-transparent">
              {["Dashboard", "Map View", "Equipment"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === tab
                      ? "border-b-2 border-emerald-400 text-emerald-400"
                      : "text-emerald-200/70 hover:text-emerald-400"
                  }`}
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </nav>

        <TabsContent value="Dashboard" className="container mx-auto px-4 py-6">
          {/* Weather Warning */}
          <Card className="mb-6 border-orange-900/30 bg-gradient-to-r from-orange-900/20 to-red-900/20 backdrop-blur-md">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <AlertTriangle className="h-8 w-8 text-orange-500" />
                <div>
                  <h3 className="font-semibold text-white">Heavy Rain Warning</h3>
                  <p className="text-sm text-emerald-200">Expected 50-70mm rainfall in next 24 hours</p>
                  <div className="mt-2 flex gap-6 text-sm">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Cloud className="h-4 w-4" />
                      24°C
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <TrendingUp className="h-4 w-4" />
                      78%
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <MapPin className="h-4 w-4" />
                      12 km/h
                    </span>
                  </div>
                </div>
              </div>
              <Badge className="bg-orange-500/20 text-orange-500">Active</Badge>
            </CardContent>
          </Card>

          {/* Weather Forecast */}
          <Card className="mb-6 border-emerald-800/50 bg-emerald-900/50 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white">Weather Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { day: "Today", icon: CloudRain, temp: "25°C", condition: "Rainy", color: "text-blue-500" },
                  { day: "Tomorrow", icon: Cloud, temp: "27°C", condition: "Cloudy", color: "text-gray-500" },
                  { day: "Day After", icon: Sun, temp: "28°C", condition: "Sunny", color: "text-yellow-500" },
                ].map((forecast, index) => (
                  <motion.div
                    key={forecast.day}
                    className="rounded-lg bg-emerald-800/50 p-4 text-center"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <p className="mb-2 text-sm text-emerald-400">{forecast.day}</p>
                    <forecast.icon className={`mx-auto mb-2 h-10 w-10 ${forecast.color}`} />
                    <p className="mb-1 text-2xl font-bold text-white">{forecast.temp}</p>
                    <p className="text-sm text-emerald-400">{forecast.condition}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            {[
              { icon: FileText, label: "Active Claims", value: "3", color: "text-emerald-400", bg: "bg-emerald-400/20", change: "+12%" },
              { icon: Truck, label: "Deliveries", value: "2", color: "text-blue-500", bg: "bg-blue-500/20", change: "+8%" },
              { icon: MapPin, label: "Farm Area", value: "5.2ha", color: "text-purple-500", bg: "bg-purple-500/20", change: "+6%" },
              { icon: Target, label: "Success Rate", value: "97%", color: "text-orange-500", bg: "bg-orange-500/20", change: "+6%" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="border-emerald-800/50 bg-emerald-900/50 backdrop-blur-md">
                  <CardContent className="p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <div className={`rounded-lg p-3 ${stat.bg}`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                      <span className="text-sm text-emerald-400">{stat.change}</span>
                    </div>
                    <p className="text-sm text-emerald-400">{stat.label}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* File Claim */}
          <Card className="mb-6 border-emerald-800/50 bg-emerald-900/50 backdrop-blur-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="mb-2 text-xl font-bold text-white">Need to File a Claim?</h3>
                  <p className="mb-4 text-emerald-200">
                    Quick and easy claim filing with offline support and AI-assisted damage assessment
                  </p>
                  <div className="flex gap-4 text-sm text-emerald-400">
                    <span className="flex items-center gap-2">
                      <Camera className="h-4 w-4" />
                      Photo Upload
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      GPS Verification
                    </span>
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Instant Processing
                    </span>
                  </div>
                </div>
                <motion.div variants={buttonGlowVariants} whileHover="hover">
                  <Button
                    className="bg-gradient-to-r from-green-600 to-emerald-400 text-white shadow-lg hover:from-green-700 hover:to-emerald-500 transition-all"
                    onClick={() => setIsClaimModalOpen(true)}
                  >
                    File New Claim
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Claims and Live Deliveries */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="border-emerald-800/50 bg-emerald-900/50 backdrop-blur-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white">Recent Claims</CardTitle>
                <motion.button
                  className="text-sm text-emerald-400 hover:underline"
                  whileHover={{ scale: 1.05 }}
                >
                  View All
                </motion.button>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    placeholder="Search claims..."
                    className="border-emerald-800/50 bg-emerald-900/50 text-emerald-100 placeholder:text-emerald-400 focus:border-emerald-500 focus:ring-emerald-500"
                    icon={<Search className="h-4 w-4 text-emerald-400" />}
                  />
                </div>
                <div className="space-y-4">
                  {[
                    {
                      title: "Crop Damage",
                      desc: "Hail damage to rice crop",
                      status: "Approved",
                      badgeColor: "bg-emerald-600/20 text-emerald-400",
                      progress: "100%",
                      progressColor: "bg-emerald-600",
                      date: "2024-01-15",
                      photos: "3 photos",
                      amount: "₹25,000",
                    },
                    {
                      title: "Weather Loss",
                      desc: "Flood damage assessment",
                      status: "Pending",
                      badgeColor: "bg-yellow-500/20 text-yellow-500",
                      progress: "60%",
                      progressColor: "bg-yellow-500",
                      date: "2024-01-20",
                      photos: "5 photos",
                      amount: "₹18,500",
                    },
                  ].map((claim, index) => (
                    <motion.div
                      key={claim.title}
                      className="rounded-lg border border-emerald-800/50 bg-emerald-800/50 p-4"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-white">{claim.title}</h4>
                          <p className="text-sm text-emerald-400">{claim.desc}</p>
                        </div>
                        <Badge className={claim.badgeColor}>{claim.status}</Badge>
                      </div>
                      <div className="mb-2 flex items-center gap-4 text-xs text-emerald-400">
                        <span>{claim.date}</span>
                        <span>{claim.photos}</span>
                      </div>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm text-emerald-400">Progress</span>
                        <span className="text-sm text-emerald-400">{claim.progress}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-emerald-700/50">
                        <motion.div
                          className={`h-full ${claim.progressColor}`}
                          initial={{ width: 0 }}
                          animate={{ width: claim.progress }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xl font-bold text-emerald-400">{claim.amount}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="border-emerald-800/50 bg-emerald-900/50 backdrop-blur-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white">Live Deliveries</CardTitle>
                <motion.button
                  className="text-sm text-emerald-400 hover:underline"
                  whileHover={{ scale: 1.05 }}
                >
                  Track All
                </motion.button>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    placeholder="Search deliveries..."
                    className="border-emerald-800/50 bg-emerald-900/50 text-emerald-100 placeholder:text-emerald-400 focus:border-emerald-500 focus:ring-emerald-500"
                    icon={<Search className="h-4 w-4 text-emerald-400" />}
                  />
                </div>
                <div className="space-y-4">
                  {[
                    {
                      name: "Amit Singh",
                      item: "Fertilizers",
                      status: "En-route",
                      badgeColor: "bg-orange-500/20 text-orange-500",
                      location: "Darjeeling Road",
                      time: "2 hours",
                      rating: "4.9/5",
                    },
                    {
                      name: "Priya Sharma",
                      item: "Seeds",
                      status: "Delivered",
                      badgeColor: "bg-emerald-600/20 text-emerald-400",
                      location: "Your Farm",
                      time: "Delivered",
                      rating: "4.7/5",
                    },
                  ].map((delivery, index) => (
                    <motion.div
                      key={delivery.name}
                      className="rounded-lg border border-emerald-800/50 bg-emerald-800/50 p-4"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="mb-3 flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-white">{delivery.name}</h4>
                          <p className="text-sm text-emerald-400">{delivery.item}</p>
                        </div>
                        <Badge className={delivery.badgeColor}>{delivery.status}</Badge>
                      </div>
                      <div className="mb-3 flex items-center gap-4 text-sm text-emerald-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {delivery.location}
                        </span>
                        <span className="flex items-center gap-1">
                          {delivery.time === "Delivered" ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <Clock className="h-4 w-4" />
                          )}
                          {delivery.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        <span className="text-sm font-semibold text-white">{delivery.rating}</span>
                      </div>
                      <motion.div variants={buttonGlowVariants} whileHover="hover">
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3 w-full border-emerald-600 text-emerald-400 hover:bg-emerald-600/20 hover:text-emerald-300"
                        >
                          <Phone className="mr-2 h-4 w-4" />
                          Contact
                        </Button>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Map View Tab */}
        <TabsContent value="Map View" className="container mx-auto px-4 py-6">
          <Card className="border-emerald-800/50 bg-emerald-900/50 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white">Farm Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-[500px] w-full rounded-lg bg-emerald-800/50">
                <Map className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-emerald-400 opacity-50" />
                <p className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-8 text-sm text-emerald-400">
                  Interactive Map Placeholder (e.g., Google Maps or Leaflet)
                </p>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <Button
                    variant="outline"
                    className="border-emerald-600 text-emerald-400 hover:bg-emerald-600/20 hover:text-emerald-300"
                  >
                    Zoom In
                  </Button>
                  <Button
                    variant="outline"
                    className="border-emerald-600 text-emerald-400 hover:bg-emerald-600/20 hover:text-emerald-300"
                  >
                    Zoom Out
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Equipment Tab */}
        <TabsContent value="Equipment" className="container mx-auto px-4 py-6">
          <Card className="border-emerald-800/50 bg-emerald-900/50 backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Equipment</CardTitle>
              <motion.button
                className="text-sm text-emerald-400 hover:underline"
                whileHover={{ scale: 1.05 }}
              >
                View All
              </motion.button>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input
                  placeholder="Search equipment..."
                  className="border-emerald-800/50 bg-emerald-900/50 text-emerald-100 placeholder:text-emerald-400 focus:border-emerald-500 focus:ring-emerald-500"
                  icon={<Search className="h-4 w-4 text-emerald-400" />}
                />
              </div>
              <div className="space-y-4">
                {[
                  {
                    name: "John Deere 5105",
                    type: "Tractor",
                    status: "Operational",
                    badgeColor: "bg-emerald-600/20 text-emerald-400",
                    lastMaintenance: "2024-09-15",
                  },
                  {
                    name: "Kubota Harvester",
                    type: "Harvester",
                    status: "Maintenance Required",
                    badgeColor: "bg-red-500/20 text-red-500",
                    lastMaintenance: "2024-07-20",
                  },
                ].map((equipment, index) => (
                  <motion.div
                    key={equipment.name}
                    className="rounded-lg border border-emerald-800/50 bg-emerald-800/50 p-4"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-white">{equipment.name}</h4>
                        <p className="text-sm text-emerald-400">{equipment.type}</p>
                      </div>
                      <Badge className={equipment.badgeColor}>{equipment.status}</Badge>
                    </div>
                    <div className="mb-3 flex items-center gap-4 text-sm text-emerald-400">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Last Maintenance: {equipment.lastMaintenance}
                      </span>
                    </div>
                    <motion.div variants={buttonGlowVariants} whileHover="hover">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-emerald-600 text-emerald-400 hover:bg-emerald-600/20 hover:text-emerald-300"
                      >
                        Schedule Maintenance
                      </Button>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
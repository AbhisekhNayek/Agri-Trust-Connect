"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Tractor,
  BarChart2,
  LogOut,
} from "lucide-react"

// Custom Spinner Component
const Spinner = () => (
  <div className="border-b border-green-800 bg-green-900 backdrop-blur-sm">
    <motion.div
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-800 via-background to-green-900/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="h-16 w-16 rounded-full border-4 border-t-4 border-green-600 border-opacity-50"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <motion.div
          className="flex h-full w-full items-center justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Leaf className="h-6 w-6 text-green-400" />
        </motion.div>
      </motion.div>
    </motion.div>
  </div>
);

// Header Component
const DashboardHeader = ({ user, handleLogout }) => (
  <header className="border-b border-green-800 bg-green-900 backdrop-blur-sm">
    <div className="container mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-green-500"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="text-lg font-bold text-white">
              {user?.fullName?.charAt(0) || "F"}
            </span>
          </motion.div>
          <div>
            <h1 className="text-xl font-bold text-white">{user?.fullName || "Farmer"}</h1>
            <p className="text-sm text-green-400">
              Green Valley Farm • Siliguri, West Bengal
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              className="border-green-600 text-green-400 hover:bg-green-600/20"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4 text-green-400" />
              Logout
            </Button>
          </motion.div>
          <span className="flex items-center gap-2 text-sm text-green-400">
            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
            Online
          </span>
        </div>
      </div>
    </div>
  </header>
)

// Navigation Component
const DashboardNav = ({ activeTab, setActiveTab }) => (
  <nav className="border-b border-green-800 bg-green-900">
    <div className="container mx-auto px-4">
      <TabsList className="flex gap-6 bg-transparent">
        {["Dashboard", "Map View", "Equipment", "Analytics"].map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === tab
                ? "border-b-2 border-green-400 text-green-400"
                : "text-green-400/70 hover:text-green-400"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
              {tab}
            </motion.div>
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  </nav>
)

// Weather Warning Component
const WeatherWarning = () => (
  <Card className="mb-6 border-orange-600/50 bg-green-800/80">
    <CardContent className="flex items-center justify-between p-4">
      <motion.div
        className="flex items-center gap-4"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AlertTriangle className="h-8 w-8 text-orange-600" />
        <div>
          <h3 className="font-semibold text-white">Heavy Rain Warning</h3>
          <p className="text-sm text-orange-400">Expected 50-70mm rainfall in next 24 hours</p>
          <div className="mt-2 flex gap-6 text-sm">
            <span className="flex items-center gap-1 text-green-400">
              <Cloud className="h-4 w-4 text-green-400" />
              24°C
            </span>
            <span className="flex items-center gap-1 text-green-400">
              <TrendingUp className="h-4 w-4 text-green-400" />
              78%
            </span>
            <span className="flex items-center gap-1 text-green-400">
              <MapPin className="h-4 w-4 text-green-400" />
              12 km/h
            </span>
          </div>
        </div>
      </motion.div>
      <Badge variant="destructive" className="bg-orange-600 text-white">
        Active
      </Badge>
    </CardContent>
  </Card>
)

// Weather Forecast Component
const WeatherForecast = () => {
  const forecasts = [
    { day: "Today", icon: CloudRain, temp: "25°C", condition: "Rainy", color: "text-blue-500" },
    { day: "Tomorrow", icon: Cloud, temp: "27°C", condition: "Cloudy", color: "text-gray-500" },
    { day: "Day After", icon: Sun, temp: "28°C", condition: "Sunny", color: "text-yellow-500" },
  ]

  return (
    <Card className="mb-6 border-green-800 bg-green-800/80">
      <CardHeader>
        <CardTitle className="text-white">Weather Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {forecasts.map((forecast, index) => (
            <motion.div
              key={forecast.day}
              className="rounded-lg bg-green-800/50 p-4 text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="mb-2 text-sm text-green-400">{forecast.day}</p>
              <forecast.icon className={`mx-auto mb-2 h-10 w-10 ${forecast.color}`} />
              <p className="mb-1 text-2xl font-bold text-green-400">{forecast.temp}</p>
              <p className="text-sm text-green-400">{forecast.condition}</p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Stats Card Component
const StatsCard = ({ icon: Icon, title, value, percentage, iconColor }) => (
  <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="border-green-800 bg-green-800/80">
      <CardContent className="p-6">
        <div className="mb-2 flex items-center justify-between">
          <div className={`rounded-lg p-3 ${iconColor}/20`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
          <span className="text-sm text-green-400">{percentage}</span>
        </div>
        <p className="text-sm text-green-400">{title}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
      </CardContent>
    </Card>
  </motion.div>
)

// File Claim Component
const FileClaim = () => (
  <Card className="mb-6 border-green-800 bg-green-800/80">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="mb-2 text-xl font-bold text-white">Need to File a Claim?</h3>
          <p className="mb-4 text-green-400">
            Quick and easy claim filing with offline support and AI-assisted damage assessment
          </p>
          <div className="flex gap-4 text-sm text-green-400">
            <span className="flex items-center gap-2">
              <Camera className="h-4 w-4 text-green-400" />
              Photo Upload
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-green-400" />
              GPS Verification
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              Instant Processing
            </span>
          </div>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            File New Claim
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </CardContent>
  </Card>
)

// Claim Item Component
const ClaimItem = ({ title, description, status, date, photos, progress, amount, statusColor }) => (
  <motion.div
    className="rounded-lg border border-green-800 bg-green-800/50 p-4"
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <div className="mb-2 flex items-start justify-between">
      <div>
        <h4 className="font-semibold text-white">{title}</h4>
        <p className="text-sm text-green-400">{description}</p>
      </div>
      <Badge className={`${statusColor}/20 text-${statusColor}`}>{status}</Badge>
    </div>
    <div className="mb-2 flex items-center gap-4 text-xs text-green-400">
      <span>{date}</span>
      <span>{photos} photos</span>
    </div>
    <div className="mb-2 flex items-center justify-between">
      <span className="text-sm text-green-400">Progress</span>
      <span className={`text-sm text-${statusColor}`}>{progress}%</span>
    </div>
    <div className="h-2 overflow-hidden rounded-full bg-green-900">
      <motion.div
        className={`h-full bg-${statusColor}`}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
    <div className="mt-3 flex items-center justify-between">
      <span className={`text-xl font-bold text-${statusColor}`}>{amount}</span>
    </div>
  </motion.div>
)

// Delivery Item Component
const DeliveryItem = ({ name, item, status, location, time, rating, statusColor }) => (
  <motion.div
    className="rounded-lg border border-green-800 bg-green-800/50 p-4"
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <div className="mb-3 flex items-start justify-between">
      <div>
        <h4 className="font-semibold text-white">{name}</h4>
        <p className="text-sm text-green-400">{item}</p>
      </div>
      <Badge className={`${statusColor}/20 text-${statusColor}`}>{status}</Badge>
    </div>
    <div className="mb-3 flex items-center gap-4 text-sm text-green-400">
      <span className="flex items-center gap-1">
        <MapPin className="h-4 w-4 text-green-400" />
        {location}
      </span>
      <span className="flex items-center gap-1">
        {status === "Delivered" ? (
          <CheckCircle2 className="h-4 w-4 text-green-400" />
        ) : (
          <Clock className="h-4 w-4 text-green-400" />
        )}
        {time}
      </span>
    </div>
    <div className="flex items-center gap-2">
      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
      <span className="text-sm font-semibold text-white">{rating}/5</span>
    </div>
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="outline"
        size="sm"
        className="mt-3 w-full border-green-600 text-green-400 hover:bg-green-600/20"
      >
        <Phone className="mr-2 h-4 w-4 text-green-400" />
        Contact
      </Button>
    </motion.div>
  </motion.div>
)

// Map View Component
const MapView = () => (
  <Card className="border-green-800 bg-green-800/80">
    <CardHeader>
      <CardTitle className="text-white">Farm Map</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="relative h-[500px] w-full rounded-lg bg-green-800/50">
        <Map className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-green-400 opacity-50" />
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-8 text-sm text-green-400">
          Interactive Map Placeholder (e.g., Google Maps or Leaflet)
        </p>
        <div className="absolute bottom-4 left-4 flex gap-2">
          <Button
            variant="outline"
            className="border-green-600 text-green-400 hover:bg-green-600/20"
          >
            Zoom In
          </Button>
          <Button
            variant="outline"
            className="border-green-600 text-green-400 hover:bg-green-600/20"
          >
            Zoom Out
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
)

// Equipment Item Component
const EquipmentItem = ({ name, type, status, lastMaintenance }) => (
  <motion.div
    className="rounded-lg border border-green-800 bg-green-800/50 p-4"
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <div className="mb-3 flex items-start justify-between">
      <div>
        <h4 className="font-semibold text-white">{name}</h4>
        <p className="text-sm text-green-400">{type}</p>
      </div>
      <Badge className={`${status === "Operational" ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-600"}`}>
        {status}
      </Badge>
    </div>
    <div className="mb-3 flex items-center gap-4 text-sm text-green-400">
      <span className="flex items-center gap-1">
        <Clock className="h-4 w-4 text-green-400" />
        Last Maintenance: {lastMaintenance}
      </span>
    </div>
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="outline"
        size="sm"
        className="w-full border-green-600 text-green-400 hover:bg-green-600/20"
      >
        Schedule Maintenance
      </Button>
    </motion.div>
  </motion.div>
)

// Equipment Component
const Equipment = () => (
  <Card className="border-green-800 bg-green-800/80">
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle className="text-white">Equipment</CardTitle>
      <motion.button
        className="text-sm text-green-400 hover:underline"
        whileHover={{ scale: 1.05 }}
      >
        View All
      </motion.button>
    </CardHeader>
    <CardContent>
      <div className="mb-4">
        <Input
          placeholder="Search equipment..."
          className="border-green-600 bg-green-900 text-green-400 placeholder:text-green-400/70"
          icon={<Search className="h-4 w-4 text-green-400" />}
        />
      </div>
      <div className="space-y-4">
        <EquipmentItem
          name="John Deere 5105"
          type="Tractor"
          status="Operational"
          lastMaintenance="2024-09-15"
        />
        <EquipmentItem
          name="Kubota Harvester"
          type="Harvester"
          status="Maintenance Required"
          lastMaintenance="2024-07-20"
        />
        <EquipmentItem
          name="Irrigation Pump"
          type="Pump"
          status="Operational"
          lastMaintenance="2024-08-10"
        />
      </div>
    </CardContent>
  </Card>
)

// Analytics Component
const Analytics = () => (
  <Card className="border-green-800 bg-green-800/80">
    <CardHeader>
      <CardTitle className="text-white">Farm Analytics</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h4 className="mb-4 text-sm font-semibold text-white">Crop Yield (Monthly)</h4>
          <div className="h-64 rounded-lg bg-green-800/50 p-4">
            <div className="flex h-full items-end gap-2">
              {[50, 60, 80, 70, 90, 85].map((height, index) => (
                <motion.div
                  key={index}
                  className="flex-1 bg-yellow-600"
                  style={{ height: `${height}%` }}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: index * 0.1 }}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-xs text-green-400">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold text-white">Revenue Trend</h4>
          <div className="h-64 rounded-lg bg-green-800/50 p-4">
            <div className="flex h-full items-end gap-2">
              {[40, 55, 70, 65, 80, 90].map((height, index) => (
                <motion.div
                  key={index}
                  className="flex-1 bg-blue-600"
                  style={{ height: `${height}%` }}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: index * 0.1 }}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-xs text-green-400">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
)

export default function FarmerDashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("Dashboard")

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

  const handleLogout = () => {
    console.log("User logged out")
  }

  if (loading) return <Spinner />

  return (
    <div className="w-full bg-green-900 min-h-screen">
      <DashboardHeader user={user} handleLogout={handleLogout} />
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <DashboardNav activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabsContent value="Dashboard" className="container mx-auto px-4 py-6">
          <WeatherWarning />
          <WeatherForecast />
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            <StatsCard
              icon={FileText}
              title="Active Claims"
              value="3"
              percentage="+12%"
              iconColor="text-green-400"
            />
            <StatsCard
              icon={Truck}
              title="Deliveries"
              value="2"
              percentage="+8%"
              iconColor="text-blue-500"
            />
            <StatsCard
              icon={MapPin}
              title="Farm Area"
              value="5.2ha"
              percentage="+6%"
              iconColor="text-purple-500"
            />
            <StatsCard
              icon={Target}
              title="Success Rate"
              value="97%"
              percentage="+6%"
              iconColor="text-orange-500"
            />
          </div>
          <FileClaim />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="border-green-800 bg-green-800/80">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white">Recent Claims</CardTitle>
                <motion.button
                  className="text-sm text-green-400 hover:underline"
                  whileHover={{ scale: 1.05 }}
                >
                  View All
                </motion.button>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    placeholder="Search claims..."
                    className="border-green-600 bg-green-900 text-green-400 placeholder:text-green-400/70"
                    icon={<Search className="h-4 w-4 text-green-400" />}
                  />
                </div>
                <div className="space-y-4">
                  <ClaimItem
                    title="Crop Damage"
                    description="Hail damage to rice crop"
                    status="Approved"
                    date="2024-01-15"
                    photos="3"
                    progress="100"
                    amount="₹25,000"
                    statusColor="green-400"
                  />
                  <ClaimItem
                    title="Weather Loss"
                    description="Flood damage assessment"
                    status="Pending"
                    date="2024-01-20"
                    photos="5"
                    progress="60"
                    amount="₹18,500"
                    statusColor="yellow-500"
                  />
                  <ClaimItem
                    title="Pest Damage"
                    description="Locust swarm damage to wheat"
                    status="Processing"
                    date="2024-01-25"
                    photos="2"
                    progress="30"
                    amount="₹12,000"
                    statusColor="blue-500"
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="border-green-800 bg-green-800/80">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white">Live Deliveries</CardTitle>
                <motion.button
                  className="text-sm text-green-400 hover:underline"
                  whileHover={{ scale: 1.05 }}
                >
                  Track All
                </motion.button>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    placeholder="Search deliveries..."
                    className="border-green-600 bg-green-900 text-green-400 placeholder:text-green-400/70"
                    icon={<Search className="h-4 w-4 text-green-400" />}
                  />
                </div>
                <div className="space-y-4">
                  <DeliveryItem
                    name="Amit Singh"
                    item="Fertilizers"
                    status="En-route"
                    location="Darjeeling Road"
                    time="2 hours"
                    rating="4.9"
                    statusColor="orange-500"
                  />
                  <DeliveryItem
                    name="Priya Sharma"
                    item="Seeds"
                    status="Delivered"
                    location="Your Farm"
                    time="Delivered"
                    rating="4.7"
                    statusColor="green-400"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="Map View" className="container mx-auto px-4 py-6">
          <MapView />
        </TabsContent>
        <TabsContent value="Equipment" className="container mx-auto px-4 py-6">
          <Equipment />
        </TabsContent>
        <TabsContent value="Analytics" className="container mx-auto px-4 py-6">
          <Analytics />
        </TabsContent>
      </Tabs>
    </div>
  )
}
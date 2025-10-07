// @ts-nocheck
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Truck,
  MapPin,
  BarChart2,
  Search,
  Clock,
  CheckCircle2,
  Wrench,
  Fuel,
  LogOut,
  Leaf,
  TrendingUp,
  Package,
} from "lucide-react"

// Spinner Component
const Spinner = () => (
  <motion.div
    className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 via-green-800 to-green-700/30"
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
        <Leaf className="h-6 w-6 text-green-300" />
      </motion.div>
    </motion.div>
  </motion.div>
)

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
              {user?.fullName?.charAt(0) || "L"}
            </span>
          </motion.div>
          <div>
            <h1 className="text-xl font-bold text-white">{user?.fullName || "Logistics Manager"}</h1>
            <p className="text-sm text-green-300">Green Valley Logistics • Siliguri, India</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              className="border-green-600 text-green-300 hover:bg-green-600/20"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4 text-green-300" />
              Logout
            </Button>
          </motion.div>
          <span className="flex items-center gap-2 text-sm text-green-300">
            <div className="h-2 w-2 rounded-full bg-green-300 animate-pulse"></div>
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
        {["Home", "Deliveries", "Vehicles", "Analytics"].map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === tab
                ? "border-b-2 border-green-300 text-green-300"
                : "text-green-300/70 hover:text-green-300"
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
          <span className="text-sm text-green-300">{percentage}</span>
        </div>
        <p className="text-sm text-green-300">{title}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
      </CardContent>
    </Card>
  </motion.div>
)

// Delivery Item Component
const DeliveryItem = ({ deliveryId, product, status, destination, eta, statusColor }) => (
  <motion.div
    className="rounded-lg border border-green-800 bg-green-800/50 p-4"
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <div className="mb-2 flex items-start justify-between">
      <div>
        <h4 className="font-semibold text-white">Delivery #{deliveryId}</h4>
        <p className="text-sm text-green-300">{product}</p>
      </div>
      <Badge className={`${statusColor}/20 text-${statusColor}`}>{status}</Badge>
    </div>
    <div className="mb-2 flex items-center gap-4 text-sm text-green-300">
      <span className="flex items-center gap-1">
        <MapPin className="h-4 w-4 text-green-300" />
        {destination}
      </span>
      <span className="flex items-center gap-1">
        {status === "Delivered" ? (
          <CheckCircle2 className="h-4 w-4 text-green-300" />
        ) : (
          <Clock className="h-4 w-4 text-green-300" />
        )}
        ETA: {eta}
      </span>
    </div>
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="outline"
        className="w-full border-green-600 text-green-300 hover:bg-green-600/20"
      >
        Track Delivery
      </Button>
    </motion.div>
  </motion.div>
)

// Vehicle Item Component
const VehicleItem = ({ vehicleId, type, status, lastMaintenance }) => (
  <motion.div
    className="rounded-lg border border-green-800 bg-green-800/50 p-4"
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <div className="mb-3 flex items-start justify-between">
      <div>
        <h4 className="font-semibold text-white">{vehicleId}</h4>
        <p className="text-sm text-green-300">{type}</p>
      </div>
      <Badge className={status === "Operational" ? "bg-green-600/20 text-green-300" : "bg-red-600/20 text-red-600"}>
        {status}
      </Badge>
    </div>
    <div className="mb-3 flex items-center gap-4 text-sm text-green-300">
      <span className="flex items-center gap-1">
        <Wrench className="h-4 w-4 text-green-300" />
        Last Maintenance: {lastMaintenance}
      </span>
    </div>
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="outline"
        className="w-full border-green-600 text-green-300 hover:bg-green-600/20"
      >
        Schedule Maintenance
      </Button>
    </motion.div>
  </motion.div>
)

// Home Tab Component
const HomeTab = () => (
  <div className="space-y-6">
    <Card className="border-green-800 bg-green-800/80">
      <CardHeader>
        <CardTitle className="text-white">Welcome to Green Valley Logistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Search deliveries or vehicles..."
            className="border-green-600 bg-green-900 text-green-300 placeholder:text-green-300/70"
            icon={<Search className="h-4 w-4 text-green-300" />}
          />
        </div>
        <p className="text-green-300">Monitor and manage your delivery operations efficiently.</p>
      </CardContent>
    </Card>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <StatsCard
        icon={Truck}
        title="Active Deliveries"
        value="5"
        percentage="+10%"
        iconColor="text-green-300"
      />
      <StatsCard
        icon={Package}
        title="Vehicles in Use"
        value="3"
        percentage="+5%"
        iconColor="text-blue-500"
      />
      <StatsCard
        icon={TrendingUp}
        title="On-Time Rate"
        value="95%"
        percentage="+8%"
        iconColor="text-orange-500"
      />
    </div>
    <Card className="border-green-800 bg-green-800/80">
      <CardHeader>
        <CardTitle className="text-white">Recent Deliveries</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <DeliveryItem
            deliveryId="D123"
            product="Organic Rice"
            status="En-route"
            destination="Kolkata"
            eta="2025-10-06 18:00"
            statusColor="orange-500"
          />
          <DeliveryItem
            deliveryId="D124"
            product="Fresh Tomatoes"
            status="Delivered"
            destination="Darjeeling"
            eta="2025-10-05 14:00"
            statusColor="green-300"
          />
        </div>
      </CardContent>
    </Card>
  </div>
)

// Deliveries Tab Component
const DeliveriesTab = () => (
  <Card className="border-green-800 bg-green-800/80">
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle className="text-white">Deliveries</CardTitle>
      <motion.button
        className="text-sm text-green-300 hover:underline"
        whileHover={{ scale: 1.05 }}
      >
        View All
      </motion.button>
    </CardHeader>
    <CardContent>
      <div className="mb-4">
        <Input
          placeholder="Search deliveries..."
          className="border-green-600 bg-green-900 text-green-300 placeholder:text-green-300/70"
          icon={<Search className="h-4 w-4 text-green-300" />}
        />
      </div>
      <div className="space-y-4">
        <DeliveryItem
          deliveryId="D123"
          product="Organic Rice"
          status="En-route"
          destination="Kolkata"
          eta="2025-10-06 18:00"
          statusColor="orange-500"
        />
        <DeliveryItem
          deliveryId="D124"
          product="Fresh Tomatoes"
          status="Delivered"
          destination="Darjeeling"
          eta="2025-10-05 14:00"
          statusColor="green-300"
        />
        <DeliveryItem
          deliveryId="D125"
          product="Green Tea"
          status="Pending"
          destination="Siliguri"
          eta="2025-10-07 10:00"
          statusColor="yellow-500"
        />
      </div>
    </CardContent>
  </Card>
)

// Vehicles Tab Component
const VehiclesTab = () => (
  <Card className="border-green-800 bg-green-800/80">
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle className="text-white">Vehicles</CardTitle>
      <motion.button
        className="text-sm text-green-300 hover:underline"
        whileHover={{ scale: 1.05 }}
      >
        View All
      </motion.button>
    </CardHeader>
    <CardContent>
      <div className="mb-4">
        <Input
          placeholder="Search vehicles..."
          className="border-green-600 bg-green-900 text-green-300 placeholder:text-green-300/70"
          icon={<Search className="h-4 w-4 text-green-300" />}
        />
      </div>
      <div className="space-y-4">
        <VehicleItem
          vehicleId="TRK-001"
          type="Delivery Truck"
          status="Operational"
          lastMaintenance="2025-09-15"
        />
        <VehicleItem
          vehicleId="TRK-002"
          type="Cargo Van"
          status="Maintenance Required"
          lastMaintenance="2025-08-10"
        />
        <VehicleItem
          vehicleId="TRK-003"
          type="Refrigerated Truck"
          status="Operational"
          lastMaintenance="2025-09-30"
        />
      </div>
    </CardContent>
  </Card>
)

// Analytics Tab Component
const AnalyticsTab = () => (
  <Card className="border-green-800 bg-green-800/80">
    <CardHeader>
      <CardTitle className="text-white">Transport Analytics</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h4 className="mb-4 text-sm font-semibold text-white">Delivery Performance</h4>
          <div className="h-64 rounded-lg bg-green-800/50 p-4">
            <div className="flex h-full items-end gap-2">
              {[60, 70, 80, 75, 85, 90].map((height, index) => (
                <motion.div
                  key={index}
                  className="flex-1 bg-green-600/50"
                  style={{ height: `${height}%` }}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: index * 0.1 }}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-xs text-green-300">
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold text-white">Fuel Usage</h4>
          <div className="h-64 rounded-lg bg-green-800/50 p-4">
            <div className="flex h-full items-end gap-2">
              {[50, 55, 60, 65, 70, 75].map((height, index) => (
                <motion.div
                  key={index}
                  className="flex-1 bg-blue-500/50"
                  style={{ height: `${height}%` }}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: index * 0.1 }}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-xs text-green-300">
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
)

export default function LogisticsDashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("Home")

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
        <TabsContent value="Home" className="container mx-auto px-4 py-6">
          <HomeTab />
        </TabsContent>
        <TabsContent value="Deliveries" className="container mx-auto px-4 py-6">
          <DeliveriesTab />
        </TabsContent>
        <TabsContent value="Vehicles" className="container mx-auto px-4 py-6">
          <VehiclesTab />
        </TabsContent>
        <TabsContent value="Analytics" className="container mx-auto px-4 py-6">
          <AnalyticsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

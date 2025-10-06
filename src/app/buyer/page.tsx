"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ShoppingCart,
  Package,
  BarChart2,
  Search,
  ArrowRight,
  Clock,
  CheckCircle2,
  Star,
  LogOut,
  Leaf,
  DollarSign,
  TrendingUp,
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
              {user?.fullName?.charAt(0) || "B"}
            </span>
          </motion.div>
          <div>
            <h1 className="text-xl font-bold text-white">{user?.fullName || "Buyer"}</h1>
            <p className="text-sm text-green-300">Green Market Buyer • Kolkata, India</p>
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
        {["Home", "Browse Products", "My Orders", "Insights"].map((tab) => (
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

// Product Item Component
const ProductItem = ({ name, type, price, rating, stock, onPurchase }) => (
  <motion.div
    className="rounded-lg border border-green-800 bg-green-800/50 p-4"
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <div className="mb-3 flex items-start justify-between">
      <div>
        <h4 className="font-semibold text-white">{name}</h4>
        <p className="text-sm text-green-300">{type}</p>
      </div>
      <Badge className={stock > 0 ? "bg-green-600/20 text-green-300" : "bg-red-600/20 text-red-600"}>
        {stock > 0 ? `${stock} in stock` : "Out of stock"}
      </Badge>
    </div>
    <div className="mb-3 flex items-center gap-4 text-sm text-green-300">
      <span>₹{price}</span>
      <span className="flex items-center gap-1">
        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
        {rating}/5
      </span>
    </div>
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        className="w-full bg-green-600 text-white hover:bg-green-700"
        disabled={stock === 0}
        onClick={onPurchase}
      >
        Purchase
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </motion.div>
  </motion.div>
)

// Order Item Component
const OrderItem = ({ orderId, product, status, date, total, statusColor }) => (
  <motion.div
    className="rounded-lg border border-green-800 bg-green-800/50 p-4"
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <div className="mb-2 flex items-start justify-between">
      <div>
        <h4 className="font-semibold text-white">Order #{orderId}</h4>
        <p className="text-sm text-green-300">{product}</p>
      </div>
      <Badge className={`${statusColor}/20 text-${statusColor}`}>{status}</Badge>
    </div>
    <div className="mb-2 flex items-center gap-4 text-sm text-green-300">
      <span>{date}</span>
      <span className="flex items-center gap-1">
        {status === "Delivered" ? (
          <CheckCircle2 className="h-4 w-4 text-green-300" />
        ) : (
          <Clock className="h-4 w-4 text-green-300" />
        )}
        {status}
      </span>
    </div>
    <div className="mt-3 flex items-center justify-between">
      <span className="text-xl font-bold text-green-300">₹{total}</span>
    </div>
  </motion.div>
)

// Home Tab Component
const HomeTab = () => (
  <div className="space-y-6">
    <Card className="border-green-800 bg-green-800/80">
      <CardHeader>
        <CardTitle className="text-white">Welcome to Green Market</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Search for products..."
            className="border-green-600 bg-green-900 text-green-300 placeholder:text-green-300/70"
            icon={<Search className="h-4 w-4 text-green-300" />}
          />
        </div>
        <p className="text-green-300">Explore fresh agricultural products from trusted farmers.</p>
      </CardContent>
    </Card>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <StatsCard
        icon={ShoppingCart}
        title="Orders Placed"
        value="12"
        percentage="+15%"
        iconColor="text-green-300"
      />
      <StatsCard
        icon={DollarSign}
        title="Total Spent"
        value="₹45,000"
        percentage="+10%"
        iconColor="text-blue-500"
      />
      <StatsCard
        icon={Package}
        title="Pending Deliveries"
        value="3"
        percentage="+5%"
        iconColor="text-orange-500"
      />
    </div>
    <Card className="border-green-800 bg-green-800/80">
      <CardHeader>
        <CardTitle className="text-white">Featured Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ProductItem
            name="Organic Rice"
            type="Basmati"
            price="1200"
            rating="4.8"
            stock={50}
            onPurchase={() => console.log("Purchased Organic Rice")}
          />
          <ProductItem
            name="Fresh Tomatoes"
            type="Vegetable"
            price="80"
            rating="4.5"
            stock={100}
            onPurchase={() => console.log("Purchased Fresh Tomatoes")}
          />
        </div>
      </CardContent>
    </Card>
  </div>
)

// Browse Products Tab Component
const BrowseProductsTab = () => (
  <Card className="border-green-800 bg-green-800/80">
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle className="text-white">Browse Products</CardTitle>
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
          placeholder="Search products..."
          className="border-green-600 bg-green-900 text-green-300 placeholder:text-green-300/70"
          icon={<Search className="h-4 w-4 text-green-300" />}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ProductItem
          name="Organic Wheat"
          type="Grain"
          price="900"
          rating="4.7"
          stock={30}
          onPurchase={() => console.log("Purchased Organic Wheat")}
        />
        <ProductItem
          name="Fresh Potatoes"
          type="Vegetable"
          price="60"
          rating="4.6"
          stock={0}
          onPurchase={() => console.log("Purchased Fresh Potatoes")}
        />
        <ProductItem
          name="Green Tea"
          type="Beverage"
          price="500"
          rating="4.9"
          stock={20}
          onPurchase={() => console.log("Purchased Green Tea")}
        />
      </div>
    </CardContent>
  </Card>
)

// My Orders Tab Component
const MyOrdersTab = () => (
  <Card className="border-green-800 bg-green-800/80">
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle className="text-white">My Orders</CardTitle>
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
          placeholder="Search orders..."
          className="border-green-600 bg-green-900 text-green-300 placeholder:text-green-300/70"
          icon={<Search className="h-4 w-4 text-green-300" />}
        />
      </div>
      <div className="space-y-4">
        <OrderItem
          orderId="12345"
          product="Organic Rice"
          status="Delivered"
          date="2025-10-01"
          total="1200"
          statusColor="green-300"
        />
        <OrderItem
          orderId="12346"
          product="Fresh Tomatoes"
          status="En-route"
          date="2025-10-03"
          total="160"
          statusColor="orange-500"
        />
        <OrderItem
          orderId="12347"
          product="Green Tea"
          status="Processing"
          date="2025-10-05"
          total="500"
          statusColor="blue-500"
        />
      </div>
    </CardContent>
  </Card>
)

// Insights Tab Component
const InsightsTab = () => (
  <Card className="border-green-800 bg-green-800/80">
    <CardHeader>
      <CardTitle className="text-white">Purchase Insights</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h4 className="mb-4 text-sm font-semibold text-white">Monthly Spending</h4>
          <div className="h-64 rounded-lg bg-green-800/50 p-4">
            <div className="flex h-full items-end gap-2">
              {[40, 50, 60, 55, 70, 80].map((height, index) => (
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
          <h4 className="mb-4 text-sm font-semibold text-white">Top Categories</h4>
          <div className="h-64 rounded-lg bg-green-800/50 p-4">
            <div className="flex h-full items-end gap-2">
              {[60, 50, 30].map((height, index) => (
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
              <span>Grains</span>
              <span>Vegetables</span>
              <span>Beverages</span>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
)

export default function BuyerDashboard() {
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
        <TabsContent value="Browse Products" className="container mx-auto px-4 py-6">
          <BrowseProductsTab />
        </TabsContent>
        <TabsContent value="My Orders" className="container mx-auto px-4 py-6">
          <MyOrdersTab />
        </TabsContent>
        <TabsContent value="Insights" className="container mx-auto px-4 py-6">
          <InsightsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
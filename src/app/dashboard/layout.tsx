"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LogOut, Home, BarChart2, User, Sprout } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = () => {
    // TODO: Replace with actual logout logic (e.g., clear auth tokens)
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    router.push("/login");
  };

  const navItems = [
    { href: "/dashboard", label: "Overview", icon: Home },
    { href: "/dashboard/analytics", label: "Analytics", icon: BarChart2 },
    { href: "/dashboard/profile", label: "Profile", icon: User },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const buttonGlowVariants = {
    hover: {
      boxShadow: "0 0 20px rgba(34, 197, 94, 0.5)",
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="flex min-h-screen bg-[linear-gradient(135deg,#1a3c34,#064e3b,#1a3c34)] animate-gradient-bg bg-[length:200%_200%]">
      {/* Sidebar */}
      <motion.aside
        className="fixed top-0 left-0 w-64 bg-emerald-900/50 backdrop-blur-md border-r border-emerald-800/50 h-full p-6 hidden md:block"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex items-center gap-2 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-green-600 to-emerald-400">
            <Sprout className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">AgriTrust Dashboard</h2>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              className="w-full justify-start gap-2 text-emerald-200 hover:bg-emerald-800/50 hover:text-emerald-100 transition-all"
            >
              <Link href={item.href} aria-label={`Navigate to ${item.label}`}>
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
        <motion.div variants={buttonGlowVariants} whileHover="hover" className="absolute bottom-6 left-6 right-6">
          <Button
            variant="outline"
            className="w-full border-emerald-800/50 text-emerald-300 hover:bg-emerald-900/50 hover:text-emerald-200"
            onClick={handleLogout}
            aria-label="Log out of AgriTrust Dashboard"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </motion.div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
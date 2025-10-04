"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sprout, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type NavLinkBase = {
  label: string;
  primary: boolean;
};

type NavLinkSimple = NavLinkBase & {
  href: string;
};

type NavLinkDropdown = NavLinkBase & {
  dropdown: { href: string; label: string }[];
};

type NavLink = NavLinkSimple | NavLinkDropdown;

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home", primary: true },
  { href: "/features", label: "Features", primary: false },
  { href: "/how-it-works", label: "How It Works", primary: false },
  { href: "/pricing", label: "Pricing", primary: false },
  {
    label: "Solutions",
    primary: false,
    dropdown: [
      { href: "/solutions/farmers", label: "For Farmers" },
      { href: "/solutions/buyers", label: "For Buyers" },
      { href: "/solutions/suppliers", label: "For Suppliers" },
      { href: "/solutions/logistics", label: "For Logistics" },
    ],
  },
  {
    label: "Resources",
    primary: false,
    dropdown: [
      { href: "/blog", label: "Blog" },
      { href: "/case-studies", label: "Case Studies" },
      { href: "/documentation", label: "Documentation" },
      { href: "/api", label: "API Reference" },
      { href: "/support", label: "Support Center" },
    ],
  },
  { href: "/about", label: "About Us", primary: false },
  { href: "/contact", label: "Contact", primary: false },
];

const SCROLL_THRESHOLD = 20;

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
        setMobileDropdownOpen(null);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null);
    };

    if (openDropdown) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openDropdown]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
    setMobileDropdownOpen(null);
  };

  const handleNavClick = () => {
    setMobileMenuOpen(false);
    setMobileDropdownOpen(null);
  };

  const toggleDropdown = (label: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const toggleMobileDropdown = (label: string) => {
    setMobileDropdownOpen(mobileDropdownOpen === label ? null : label);
  };

  const headerClasses = scrolled
    ? "bg-[linear-gradient(135deg,#1a3c34,#064e3b,#1a3c34)] animate-gradient-bg bg-[length:200%_200%] backdrop-blur-lg border-b border-emerald-900/50 shadow-sm"
    : "bg-[linear-gradient(135deg,#1a3c34,#064e3b,#1a3c34)] animate-gradient-bg bg-[length:200%_200%] backdrop-blur-md border-b border-emerald-900/40";

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${headerClasses}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-2"
            onClick={handleNavClick}
            aria-label="AgriTrust Connect Home"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-green-600 to-emerald-400 shadow-lg shadow-green-600/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-green-600/30">
              <Sprout className="h-6 w-6 text-white" />
            </div>
            <span className="hidden bg-gradient-to-br from-green-400 to-emerald-200 bg-clip-text text-xl font-bold text-transparent sm:inline">
              AgriTrust Connect
            </span>
            <span className="bg-gradient-to-br from-green-400 to-emerald-200 bg-clip-text text-xl font-bold text-transparent sm:hidden">
              AgriTrust
            </span>
          </Link>

          <nav className="hidden items-center gap-4 md:flex lg:gap-6" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isDropdown = (l: NavLink): l is NavLinkDropdown => "dropdown" in l;
              return isDropdown(link) ? (
                <div key={link.label} className="relative">
                  <button
                    onClick={(e) => toggleDropdown(link.label, e)}
                    className={`flex items-center gap-1 text-sm font-medium text-emerald-100 hover:text-emerald-300 transition-colors duration-200 ${
                      link.primary ? "text-white" : "text-emerald-200"
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        openDropdown === link.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openDropdown === link.label && (
                    <div className="absolute left-0 top-full mt-2 w-56 animate-fade-in rounded-lg border border-emerald-800/50 bg-emerald-900/50 backdrop-blur-md p-2 shadow-lg">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block rounded-md px-3 py-2 text-sm text-emerald-200 hover:bg-emerald-800/50 hover:text-emerald-100 transition-colors"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium text-emerald-100 hover:text-emerald-300 transition-colors duration-200 ${
                    link.primary ? "text-white" : "text-emerald-200"
                  }`}
                  onClick={handleNavClick}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link href="/login" className="hidden lg:block">
              <Button
                variant="ghost"
                size="sm"
                className="text-emerald-300 hover:text-emerald-200 hover:bg-emerald-800/50 transition-all duration-200 hover:scale-105"
              >
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="sm"
                className="bg-gradient-to-r from-green-600 to-emerald-400 text-white shadow-md shadow-green-600/20 transition-all duration-200 hover:scale-105 hover:from-green-700 hover:to-emerald-500 hover:shadow-lg hover:shadow-green-600/30"
              >
                Get Started
              </Button>
            </Link>
          </nav>

          <button
            className="transition-transform duration-200 hover:scale-110 md:hidden"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-emerald-300" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6 text-emerald-300" aria-hidden="true" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="max-h-[calc(100vh-4rem)] space-y-1 overflow-y-auto py-4 md:hidden bg-emerald-900/50 backdrop-blur-md"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map((link) => {
              const isDropdown = (l: NavLink): l is NavLinkDropdown => "dropdown" in l;
              return isDropdown(link) ? (
                <div key={link.label}>
                  <button
                    onClick={() => toggleMobileDropdown(link.label)}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-emerald-100 hover:bg-emerald-800/50 hover:text-emerald-300 transition-colors ${
                      link.primary ? "text-white" : "text-emerald-200"
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        mobileDropdownOpen === link.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {mobileDropdownOpen === link.label && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-emerald-800/40 pl-3">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block rounded-md px-3 py-2 text-sm text-emerald-200 hover:bg-emerald-800/50 hover:text-emerald-100 transition-colors"
                          onClick={handleNavClick}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block rounded-md px-3 py-2 text-sm font-medium text-emerald-100 hover:bg-emerald-800/50 hover:text-emerald-300 transition-colors ${
                    link.primary ? "text-white" : "text-emerald-200"
                  }`}
                  onClick={handleNavClick}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="flex flex-col gap-2 border-t border-emerald-800/40 pt-4">
              <Link href="/login" onClick={handleNavClick}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-emerald-300 hover:text-emerald-200 hover:bg-emerald-800/50"
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup" onClick={handleNavClick}>
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-400 text-white hover:from-green-700 hover:to-emerald-500"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
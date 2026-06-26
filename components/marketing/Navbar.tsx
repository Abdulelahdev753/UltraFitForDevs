"use client"

import { useState } from "react"
import {
  BookOpenIcon,
  ZapIcon,
  ImageIcon,
  BarChart3Icon,
  MenuIcon,
  XIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const navigationLinks = [
  { href: "/", label: "Home" },
  {
    label: "API",
    submenu: true,
    type: "description",
    items: [
      {
        href: "/docs",
        label: "Image API",
        description: "Fetch gym illustration images with a single API call.",
        icon: "ImageIcon",
      },
      {
        href: "/docs#usage",
        label: "Usage Tracking",
        description: "Monitor your monthly API calls and limits in real time.",
        icon: "BarChart3Icon",
      },
      {
        href: "/docs#cdn",
        label: "Global CDN",
        description: "Images served from Cloudflare's edge network worldwide.",
        icon: "ZapIcon",
      },
    ],
  },
  {
    label: "Pricing",
    submenu: true,
    type: "simple",
    items: [
      { href: "/pricing", label: "Men Plan — 49 SAR" },
      { href: "/pricing", label: "Women Plan — 49 SAR" },
      { href: "/pricing", label: "Full Plan — 89 SAR" },
      { href: "/pricing", label: "Pro Plan — 149 SAR" },
    ],
  },
  {
    label: "Docs",
    submenu: true,
    type: "icon",
    items: [
      { href: "/docs", label: "Getting Started", icon: "BookOpenIcon" },
      { href: "/docs#api", label: "API Reference", icon: "ZapIcon" },
      { href: "/docs#examples", label: "Code Examples", icon: "ImageIcon" },
    ],
  },
]

const iconMap = {
  BookOpenIcon,
  ZapIcon,
  ImageIcon,
  BarChart3Icon,
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeMobile = () => setMobileOpen(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/40 px-4 backdrop-blur-md md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Logo + desktop nav */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 whitespace-nowrap text-lg font-bold tracking-tight text-white hover:text-white/90"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/logo.svg`}
                alt="UltraFit logo"
                width={28}
                height={28}
                priority
                className="h-7 w-7"
              />
              UltraFit
              <span className="hidden font-normal text-white/60 sm:inline">
                for developers
              </span>
            </Link>

            <div className="max-md:hidden">
              <NavigationMenu>
                <NavigationMenuList>
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index}>
                      {link.submenu ? (
                        <>
                          <NavigationMenuTrigger className="bg-transparent px-2 py-1.5 font-medium text-white/70 hover:bg-white/10 hover:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white">
                            {link.label}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul
                              className={cn(
                                "grid p-1",
                                link.type === "description"
                                  ? "w-[360px]"
                                  : "w-[190px]"
                              )}
                            >
                              {link.items.map((item, itemIndex) => {
                                const Icon =
                                  "icon" in item && item.icon
                                    ? iconMap[item.icon as keyof typeof iconMap]
                                    : null
                                return (
                                  <li key={itemIndex}>
                                    <NavigationMenuLink asChild>
                                      <a
                                        href={item.href}
                                        className="flex select-none items-center rounded-md no-underline outline-none transition-colors hover:bg-white/[0.08] focus:bg-white/[0.08]"
                                      >
                                        {link.type === "icon" && Icon && (
                                          <>
                                            <span className="flex w-8 shrink-0 items-center justify-center py-2 text-white/40">
                                              <Icon size={14} aria-hidden="true" />
                                            </span>
                                            <span className="py-2 pr-3 text-sm font-medium">
                                              {item.label}
                                            </span>
                                          </>
                                        )}
                                        {link.type === "description" && "description" in item && (
                                          <div className="flex items-start gap-3 p-2.5">
                                            {Icon && (
                                              <Icon
                                                size={15}
                                                className="mt-[3px] shrink-0 text-white/40"
                                                aria-hidden="true"
                                              />
                                            )}
                                            <div>
                                              <div className="text-sm font-medium leading-none">
                                                {item.label}
                                              </div>
                                              <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-snug text-white/45">
                                                {item.description}
                                              </p>
                                            </div>
                                          </div>
                                        )}
                                        {link.type === "simple" && (
                                          <span className="px-3 py-[7px] text-sm font-medium">
                                            {item.label}
                                          </span>
                                        )}
                                      </a>
                                    </NavigationMenuLink>
                                  </li>
                                )
                              })}
                            </ul>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <NavigationMenuLink asChild>
                          <a
                            href={link.href}
                            className="px-2 py-1.5 font-medium text-white/70 hover:text-white"
                          >
                            {link.label}
                          </a>
                        </NavigationMenuLink>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Desktop CTAs */}
          <div className="hidden items-center gap-2 md:flex">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-sm text-white/80 hover:bg-white/10 hover:text-white"
            >
              <Link href="/login">Sign In</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-white text-sm font-semibold text-black hover:bg-white/90"
            >
              <Link href="/register">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-white/80 transition-colors hover:bg-white/10 hover:text-white md:hidden"
          >
            {mobileOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <nav className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-white/10 bg-black/95 pb-4 backdrop-blur-md md:hidden">
          {navigationLinks.map((link, index) =>
            link.submenu ? (
              <div key={index} className="py-1">
                <p className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                  {link.label}
                </p>
                {link.items.map((item, itemIndex) => (
                  <a
                    key={itemIndex}
                    href={item.href}
                    onClick={closeMobile}
                    className="block rounded-md px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            ) : (
              <a
                key={index}
                href={link.href}
                onClick={closeMobile}
                className="block rounded-md px-3 py-2.5 text-base font-medium text-white/90 hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </a>
            )
          )}

          <div className="my-2 h-px bg-white/10" />

          <div className="flex flex-col gap-2 px-1 pt-1">
            <Link
              href="/login"
              onClick={closeMobile}
              className="rounded-md px-3 py-2.5 text-center text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              onClick={closeMobile}
              className="rounded-md bg-white px-3 py-2.5 text-center text-sm font-semibold text-black hover:bg-white/90"
            >
              Get Started
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}

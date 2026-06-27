"use client"

import Link from "next/link"
import { motion, type Variants, useReducedMotion } from "motion/react"

import { EASE_OUT } from "@/lib/ease"

// Starts after the headline + sub-headline TextReveals have landed (~1.65s).
const ENTER_DELAY = 1.7

export default function HeroActions() {
  const reduce = useReducedMotion()

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: reduce ? 0.3 : ENTER_DELAY,
        staggerChildren: 0.12,
      },
    },
  }

  const item: Variants = reduce
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3, ease: EASE_OUT } },
      }
    : {
        hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.6, ease: EASE_OUT },
        },
      }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
    >
      <motion.div variants={item} className="will-change-transform">
        <Link
          href="/register"
          className="inline-flex h-11 items-center justify-center rounded-md bg-white px-7 text-sm font-semibold text-black transition-colors hover:bg-white/90"
        >
          Get Started
        </Link>
      </motion.div>
      <motion.div variants={item} className="will-change-transform">
        <Link
          href="/docs"
          className="inline-flex h-11 items-center justify-center rounded-md border border-white/20 bg-white/5 px-7 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
        >
          Explore Docs
        </Link>
      </motion.div>
    </motion.div>
  )
}

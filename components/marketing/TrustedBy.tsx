"use client"

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiSupabase,
  SiVercel,
  SiNodedotjs,
} from "react-icons/si"

import LogoLoop from "./LogoLoop"

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiSupabase />, title: "Supabase", href: "https://supabase.com" },
  { node: <SiVercel />, title: "Vercel", href: "https://vercel.com" },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
]

export default function TrustedBy() {
  return (
    <section className="bg-black py-16">
      <p className="mb-10 text-center text-sm font-medium uppercase tracking-[0.2em] text-white/50">
        Trusted by developers
      </p>
      <div className="relative h-[64px] w-full overflow-hidden text-white/70">
        <LogoLoop
          logos={techLogos}
          speed={90}
          direction="left"
          logoHeight={40}
          gap={64}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#000000"
          ariaLabel="Technologies we build with"
        />
      </div>
    </section>
  )
}

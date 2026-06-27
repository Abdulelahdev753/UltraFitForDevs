import DarkVeil from '@/components/marketing/DarkVeil'
import { TextReveal } from '@/components/marketing/TextReveal'
import Navbar from '@/components/marketing/Navbar'
import TrustedBy from '@/components/marketing/TrustedBy'
import HeroActions from '@/components/marketing/HeroActions'
import Stats2 from '@/components/ui/stats-2'
import { Faq1 } from '@/components/ui/faq-1'
import { Footer16 } from '@/components/ui/footer-16'

export default function LandingPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section style={{ width: '100%', height: '100vh', position: 'relative' }}>
        <DarkVeil hueShift={75} speed={0.2} scanlineFrequency={0.5} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            textAlign: 'center',
            padding: '0 1rem',
          }}
        >
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-none tracking-tight">
            <span className="inline-block align-baseline">
              <TextReveal
                as="span"
                text="UltraFit"
                split="char"
                stagger={0.06}
                blur={16}
                yOffset="30%"
              />
            </span>
            <span className="inline-block">&nbsp;</span>
            <span className="inline-block align-baseline">
              <TextReveal
                as="span"
                text="for developers"
                split="word"
                stagger={0.06}
                delay={0.5}
                blur={16}
                yOffset="30%"
                className="font-normal text-white/60"
              />
            </span>
          </h1>
          <TextReveal
            text="Gym illustration images, delivered via API"
            as="p"
            split="word"
            stagger={0.07}
            delay={0.4}
            blur={10}
            yOffset="20%"
            className="mt-4 text-[clamp(1rem,2vw,1.5rem)] opacity-80"
          />
          <HeroActions />
        </div>
      </section>

      {/* Trusted by developers */}
      <TrustedBy />

      {/* Divider */}
      <div className="w-full bg-black">
        <div className="mx-auto h-px max-w-6xl bg-white/10" />
      </div>

      {/* Stats */}
      <Stats2 />

      {/* FAQ */}
      <Faq1
        badge="FAQ"
        title="Frequently asked questions"
        faqs={[
          {
            id: 'what-is-ultrafit',
            question: 'What is UltraFit?',
            answer:
              'UltraFit is an API that delivers high-quality gym and fitness illustration images on demand. Drop a single endpoint into your fitness app and serve workout, equipment, and exercise artwork without commissioning a designer.',
          },
          {
            id: 'getting-started',
            question: 'How do I get started?',
            answer:
              'Create a free account, generate an API key from your dashboard, and start requesting images right away. Most developers are up and running with their first illustration in under five minutes.',
          },
          {
            id: 'formats',
            question: 'What image formats and sizes are supported?',
            answer:
              'Every illustration is available in modern formats like WebP, PNG, and SVG, and can be requested at multiple resolutions so they stay crisp on everything from mobile screens to large displays.',
          },
          {
            id: 'cdn',
            question: 'Are images served from a global CDN?',
            answer:
              'Yes. All images are cached and delivered through a global CDN, so your users get fast load times no matter where they are in the world.',
          },
          {
            id: 'pricing',
            question: 'How does pricing work?',
            answer:
              'Pricing is usage-based with a generous free tier to get you started. Paid plans scale with the number of API requests you make, and you can track your usage live from the dashboard.',
          },
          {
            id: 'licensing',
            question: 'Can I use the illustrations commercially?',
            answer:
              'Absolutely. Every image you pull through the API comes with a commercial license, so you can use it freely inside your apps, marketing, and products.',
          },
        ]}
      />

      {/* Footer */}
      <Footer16
        brandName="UltraFit"
        tagline={"Gym illustration images, delivered via API.\nEverything your fitness app needs\nstarts here."}
        columns={[
          {
            title: 'Product',
            links: [
              { label: 'Pricing', href: '/pricing' },
              { label: 'Documentation', href: '/docs' },
              { label: 'Get Started', href: '/register' },
            ],
          },
          {
            title: 'API',
            links: [
              { label: 'Image API', href: '/docs' },
              { label: 'Usage Tracking', href: '/docs#usage' },
              { label: 'Global CDN', href: '/docs#cdn' },
            ],
          },
          {
            title: 'Account',
            links: [
              { label: 'Sign In', href: '/login' },
              { label: 'Register', href: '/register' },
              { label: 'Dashboard', href: '/dashboard' },
            ],
          },
        ]}
        legalLinks={[
          { label: 'Privacy Policy', href: '#' },
          { label: 'Terms of Service', href: '#' },
        ]}
        copyright="© 2026 UltraFit. All rights reserved."
      />
    </main>
  )
}

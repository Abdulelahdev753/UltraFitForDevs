import DarkVeil from '@/components/marketing/DarkVeil'
import { TextReveal } from '@/components/marketing/TextReveal'
import Navbar from '@/components/marketing/Navbar'
import TrustedBy from '@/components/marketing/TrustedBy'

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
        </div>
      </section>

      {/* Trusted by developers */}
      <TrustedBy />
    </main>
  )
}

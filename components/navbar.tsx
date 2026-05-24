"use client"

import { useState, useEffect } from 'react'

const NAV_ITEMS = [
  { id: 'showroom', label: 'Showroom'   },
  { id: 'feat',     label: 'Diferenciais' },
  { id: 'proc',     label: 'Processo'   },
  { id: 'cta',      label: 'Contato'    },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[500] h-16 flex items-center justify-between px-6 lg:px-12 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(6,6,10,0.92)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-gold rounded-lg flex items-center justify-center text-ink font-bold text-sm tracking-wider">
          SM
        </div>
        <div className="hidden sm:flex flex-col">
          <span className="text-[0.78rem] font-semibold text-white/80 tracking-wide leading-none">
            SM Empreiteiras
          </span>
          <span className="text-[0.58rem] text-white/25 tracking-[2px] mt-0.5">
            Construção Premium
          </span>
        </div>
      </div>

      {/* Links */}
      <ul className="hidden md:flex items-center gap-0 list-none">
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollTo(item.id)}
              className="px-4 py-2 text-[0.72rem] tracking-wide text-white/35 hover:text-white/70 transition-colors duration-200 font-medium"
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={() => scrollTo('cta')}
        className="py-2.5 px-5 text-[0.7rem] tracking-[2px] font-semibold uppercase rounded-lg
          border border-gold/30 text-gold/80
          hover:bg-gold/8 hover:border-gold/50 hover:text-gold
          transition-all duration-200"
      >
        Orçamento
      </button>
    </nav>
  )
}

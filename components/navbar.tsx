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
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme')
    if (savedTheme === 'light') setTheme('light')
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
    window.localStorage.setItem('theme', theme)
  }, [theme])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[500] h-14 sm:h-16 flex items-center justify-between px-4 sm:px-6 lg:px-12 transition-all duration-500"
        style={{
          background: scrolled
            ? 'var(--nav-bg-scrolled)'
            : 'var(--nav-bg-top)',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--nav-border)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scrollTo('hero')}
            aria-label="Voltar ao início"
            className="brand-logo-card h-11 w-14 rounded-2xl border border-white/10 p-1.5 shadow-lg shadow-gold/10 transition-transform duration-200 hover:scale-105 sm:h-12 sm:w-16"
          >
            <img
              src="/sm-logo-transparent.png"
              alt="SM Empreiteira de Obras"
              className="brand-logo-dark h-full w-full scale-[1.75] object-contain"
            />
            <img
              src="/sm-logo-transparent.png"
              alt=""
              aria-hidden="true"
              className="brand-logo-light h-full w-full scale-[1.75] object-contain"
            />
          </button>
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
                type="button"
                onClick={() => scrollTo(item.id)}
                className="px-4 py-2 text-[0.72rem] tracking-wide text-white/35 hover:text-white/70 transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
            className="min-h-10 min-w-10 rounded-xl border border-gold/25 bg-ink/25 px-3 font-mono text-[0.66rem] font-semibold uppercase tracking-[1.5px] text-gold/85 transition-all duration-200 hover:border-gold/50 hover:bg-gold/8 hover:text-gold"
          >
            {theme === 'dark' ? 'Claro' : 'Escuro'}
          </button>
          <button
            type="button"
            onClick={() => scrollTo('cta')}
            className="min-h-10 py-2.5 px-3 sm:px-5 text-[0.68rem] tracking-[2px] font-semibold uppercase rounded-xl
              border border-gold/30 text-gold/85 bg-ink/25
              hover:bg-gold/8 hover:border-gold/50 hover:text-gold
              transition-all duration-200"
          >
            Orçamento
          </button>
        </div>
      </nav>

      <div
        className="md:hidden fixed left-3 right-3 bottom-3 z-[500] rounded-2xl border border-white/10 px-2 py-2 shadow-[0_18px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl"
        style={{ background: 'var(--bottom-nav-bg)' }}
      >
        <div className="grid grid-cols-4 gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className="min-h-11 rounded-xl px-1.5 text-[0.58rem] font-semibold uppercase tracking-[1.4px] text-white/42 transition-colors hover:bg-white/[0.04] hover:text-gold"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

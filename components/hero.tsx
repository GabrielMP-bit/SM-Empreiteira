"use client"

export function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      className="min-h-[100svh] relative flex flex-col justify-center overflow-hidden"
      style={{ background: 'var(--surface-hero)' }}
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Gold radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, var(--hero-glow) 0%, transparent 65%)',
        }}
      />

      {/* Fine grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage:
            'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 100%)',
        }}
      />

      <div className="brand-logo-card absolute right-8 top-24 z-10 hidden w-44 rounded-[1.6rem] border border-white/10 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.22)] lg:block">
        <img src="/sm-logo-transparent.png" alt="SM Empreiteira de Obras" className="brand-logo-dark w-full scale-125 object-contain" />
        <img src="/sm-logo.png" alt="" aria-hidden="true" className="brand-logo-light w-full scale-125 object-contain" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-5 sm:px-8 lg:px-16 pt-16 pb-24 max-w-[800px]">
        <div className="flex items-center gap-3 mb-6 sm:mb-8 animate-fade-up animate-fade-up-1">
          <div className="h-px w-6 bg-gold/60" />
          <span className="font-mono text-[0.56rem] sm:text-[0.6rem] tracking-[3.5px] sm:tracking-[5px] text-gold/65 uppercase">
            SM Empreiteiras · Est. 2008
          </span>
        </div>

        <h1
          className="font-display leading-[0.88] tracking-[-0.5px] animate-fade-up animate-fade-up-2"
          style={{ fontSize: 'clamp(3.2rem,16vw,9rem)' }}
        >
          <span className="text-white/90">CONSTRUA</span>
          <br />
          <em className="text-gold not-italic">SUA VISÃO</em>
        </h1>

        <p className="mt-7 sm:mt-8 text-[0.95rem] sm:text-[0.9rem] text-white/46 sm:text-white/30 leading-relaxed max-w-[360px] sm:max-w-[420px] font-light animate-fade-up animate-fade-up-3">
          Engenharia de alto padrão. Acabamento impecável. Do projeto ao
          registro — uma experiência de construção sem igual.
        </p>

        <div className="mt-9 sm:mt-10 grid grid-cols-2 sm:flex gap-3 sm:gap-4 items-center max-w-[420px] animate-fade-up animate-fade-up-4">
          <button
            type="button"
            onClick={() => scrollTo('showroom')}
            className="relative overflow-hidden group min-h-12 bg-gold text-ink py-3.5 px-5 sm:px-8 text-[0.68rem] sm:text-[0.72rem] tracking-[2.5px] sm:tracking-[3px] font-semibold uppercase transition-colors hover:bg-gold-2"
          >
            <span className="absolute top-0 left-[-100%] w-[60%] h-full bg-white/20 skew-x-[-20deg] transition-all duration-500 group-hover:left-[150%]" />
            Ver Showroom
          </button>
          <button
            type="button"
            onClick={() => scrollTo('cta')}
            className="min-h-12 py-3.5 px-5 sm:px-8 text-[0.68rem] sm:text-[0.72rem] tracking-[2.5px] sm:tracking-[3px] font-medium uppercase border border-white/15 text-white/55 sm:text-white/40 hover:border-gold/40 hover:text-gold/70 transition-all duration-200"
          >
            Orçamento
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-24 sm:bottom-8 left-5 sm:left-8 lg:left-16 flex items-center gap-3 animate-fade-up animate-fade-up-5">
        <div className="h-px w-8 bg-gradient-to-r from-gold/60 to-transparent" />
        <span className="font-mono text-[0.58rem] tracking-[3px] text-white/20 uppercase">
          Scroll
        </span>
      </div>
    </section>
  )
}

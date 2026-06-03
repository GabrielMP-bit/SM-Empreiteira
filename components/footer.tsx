"use client"

export function Footer() {
  return (
    <footer
      className="border-t pt-10 pb-28 md:pb-10 px-5 sm:px-8 lg:px-16"
      style={{
        background: 'var(--surface-footer)',
        borderColor: 'var(--subtle-border)',
      }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="brand-logo-card h-14 w-20 rounded-2xl border border-white/10 p-2 shadow-lg shadow-gold/10">
            <img src="/sm-logo-transparent.png" alt="SM Empreiteira de Obras" className="brand-logo-dark h-full w-full scale-150 object-contain" />
            <img src="/sm-logo-transparent.png" alt="" aria-hidden="true" className="brand-logo-light h-full w-full scale-150 object-contain" />
          </div>
          <span className="font-display text-[1.1rem] tracking-[4px] text-gold/70">
            EMPREITEIRAS
          </span>
        </div>

        {/* Copyright */}
        <p className="font-mono text-[0.55rem] tracking-[2px] text-white/22 sm:text-white/15 uppercase leading-relaxed">
          © {new Date().getFullYear()} SM Empreiteiras de Obras · Todos os direitos reservados
        </p>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
          {['Instagram', 'LinkedIn', 'WhatsApp'].map((link) => (
            <a
              key={link}
              href="#"
              className="font-mono text-[0.58rem] tracking-[2px] text-white/20 uppercase hover:text-gold/60 transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

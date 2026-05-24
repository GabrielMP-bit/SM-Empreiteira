"use client"

export function Footer() {
  return (
    <footer
      className="border-t py-10 px-8 lg:px-16"
      style={{
        background: '#050508',
        borderColor: 'rgba(255,255,255,0.05)',
      }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gold rounded flex items-center justify-center text-ink font-bold text-xs">
            SM
          </div>
          <span className="font-display text-[1.1rem] tracking-[4px] text-gold/70">
            EMPREITEIRAS
          </span>
        </div>

        {/* Copyright */}
        <p className="font-mono text-[0.55rem] tracking-[2px] text-white/15 uppercase">
          © {new Date().getFullYear()} SM Empreiteiras de Obras · Todos os direitos reservados
        </p>

        {/* Links */}
        <div className="flex gap-6">
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

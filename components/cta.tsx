"use client"

export function CTA() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="cta"
      className="py-40 px-8 text-center relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #07070C 0%, #050508 100%)' }}
    >
      {/* Gold bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,162,39,0.055) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-[640px] mx-auto">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-6 bg-gold/30" />
          <span className="font-mono text-[0.58rem] tracking-[4px] text-gold/50 uppercase">
            Vamos Construir
          </span>
          <div className="h-px w-6 bg-gold/30" />
        </div>

        <h2
          className="font-display text-white/85 leading-[0.9] tracking-[1px]"
          style={{ fontSize: 'clamp(3rem,7vw,6.5rem)' }}
        >
          SUA CASA
          <br />
          <em className="text-gold not-italic">COMEÇA AQUI</em>
        </h2>

        <p className="mt-7 mb-12 text-[0.85rem] text-white/25 max-w-[400px] mx-auto leading-relaxed font-light">
          Solicite seu orçamento sem compromisso. Um especialista SM retorna em até 24 horas.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => scrollTo('showroom')}
            className="relative overflow-hidden group bg-gold text-ink py-3.5 px-10 text-[0.72rem] tracking-[3px] font-semibold uppercase hover:bg-gold-2 transition-colors duration-200"
          >
            <span className="absolute top-0 left-[-100%] w-[60%] h-full bg-white/20 skew-x-[-20deg] transition-all duration-500 group-hover:left-[150%]" />
            Ver Showroom
          </button>
          <button className="py-3.5 px-10 text-[0.72rem] tracking-[3px] font-medium uppercase border border-white/12 text-white/35 hover:border-gold/40 hover:text-gold/70 transition-all duration-200">
            Falar com Especialista
          </button>
        </div>

        {/* Contact info */}
        <div className="mt-16 flex justify-center gap-12">
          {[
            { label: 'WhatsApp', value: '(11) 99999-9999' },
            { label: 'E-mail',   value: 'contato@smempreiteiras.com.br' },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="font-mono text-[0.55rem] tracking-[3px] text-white/20 uppercase mb-1">
                {label}
              </p>
              <p className="text-[0.75rem] text-white/40">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

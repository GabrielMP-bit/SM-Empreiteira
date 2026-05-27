"use client"

const FEATURES = [
  {
    n: '01',
    title: 'Projetos Exclusivos',
    desc: 'Cada residência é singular. Arquitetos e engenheiros dedicados criam soluções personalizadas alinhadas ao seu modo de vida.',
  },
  {
    n: '02',
    title: 'Prazo Garantido',
    desc: 'Cronograma com tolerância de 5 dias úteis. Metodologia BIM elimina imprevistos. Multa contratual em caso de atraso.',
  },
  {
    n: '03',
    title: 'Garantia Estrutural',
    desc: '5 anos de garantia na estrutura. 2 anos em acabamentos. Assistência técnica vitalícia para sua tranquilidade.',
  },
  {
    n: '04',
    title: 'Acompanhamento Total',
    desc: 'Relatórios semanais, fotos diárias e medições em tempo real. Você nunca perde nenhum detalhe da sua obra.',
  },
  {
    n: '05',
    title: 'Materiais Certificados',
    desc: 'Apenas fornecedores homologados. Rastreabilidade completa de cada material aplicado na sua residência.',
  },
  {
    n: '06',
    title: 'Cobertura Nacional',
    desc: 'Presença em 32 cidades. Equipes locais certificadas com o mesmo padrão SM independente da localização.',
  },
]

export function Features() {
  return (
    <section
      id="feat"
      className="py-20 sm:py-32 px-5 sm:px-8 lg:px-16"
      style={{ background: 'var(--surface-features)' }}
    >
      {/* Header */}
      <div className="max-w-[1200px] mx-auto mb-12 sm:mb-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-6 bg-gold/30" />
          <span className="font-mono text-[0.58rem] tracking-[4px] text-gold/50 uppercase">
            Diferenciais
          </span>
        </div>
        <h2
          className="font-display text-white/85 leading-[0.92] tracking-[0.5px]"
          style={{ fontSize: 'clamp(2.8rem,5vw,4.5rem)' }}
        >
          POR QUE
          <br />
          <span className="text-gold">ESCOLHER A SM</span>
        </h2>
      </div>

      {/* Grid */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-3xl overflow-hidden border border-white/5">
        {FEATURES.map((f) => (
          <div
            key={f.n}
            className="group relative p-6 sm:p-8 transition-colors duration-300"
            style={{ background: 'var(--card-bg)' }}
          >
            {/* Number */}
            <span className="font-mono text-[0.58rem] tracking-[3px] text-gold/30 uppercase mb-5 block">
              {f.n}
            </span>

            {/* Title */}
            <h3 className="text-[1.02rem] sm:text-[1rem] font-semibold text-white/76 sm:text-white/70 mb-3 group-hover:text-white/90 transition-colors duration-200">
              {f.title}
            </h3>

            {/* Desc */}
            <p className="text-[0.85rem] sm:text-[0.8rem] text-white/36 sm:text-white/25 leading-relaxed font-light">
              {f.desc}
            </p>

            {/* Corner accent */}
            <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[32px] border-r-[32px] border-b-transparent border-r-gold/0 group-hover:border-r-gold/8 transition-all duration-300" />
          </div>
        ))}
      </div>
    </section>
  )
}

"use client"

const STEPS = [
  { n: '01', label: 'Briefing',     desc: 'Reunião de alinhamento. Definição de programa de necessidades e parâmetros do projeto.' },
  { n: '02', label: 'Anteprojeto',  desc: 'Estudo preliminar com opções de implantação. Apresentação 3D e ajustes colaborativos.' },
  { n: '03', label: 'Projeto',      desc: 'Desenvolvimento completo: arquitetônico, estrutural, hidráulico e elétrico.' },
  { n: '04', label: 'Aprovação',    desc: 'Regularização junto à prefeitura e demais órgãos competentes. Licença de obras.' },
  { n: '05', label: 'Execução',     desc: 'Obra com cronograma detalhado, RDO digital e visitas técnicas semanais.' },
  { n: '06', label: 'Entrega',      desc: 'Vistoria final, habite-se, manual do proprietário e pós-obra garantida.' },
]

export function Process() {
  return (
    <section
      id="proc"
      className="py-20 sm:py-32 px-5 sm:px-8 lg:px-16"
      style={{ background: 'var(--surface-process)' }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-6 bg-gold/30" />
            <span className="font-mono text-[0.58rem] tracking-[4px] text-gold/50 uppercase">
              Processo
            </span>
          </div>
          <h2
            className="font-display text-white/85 leading-[0.92]"
            style={{ fontSize: 'clamp(2.8rem,5vw,4.5rem)' }}
          >
            DA IDEIA À
            <br />
            <span className="text-gold">ENTREGA DAS CHAVES</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-[2.35rem] top-8 bottom-8 w-px bg-gradient-to-b from-gold/20 via-gold/10 to-transparent hidden md:block" />

          <div className="flex flex-col gap-5 sm:gap-8">
            {STEPS.map((step, i) => (
              <div key={step.n} className="flex gap-4 sm:gap-8 items-start group">
                {/* Step number circle */}
                <div className="shrink-0 w-12 sm:w-[4.7rem] flex justify-center">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border
                      transition-all duration-300
                      border-white/8 bg-white/[0.02] group-hover:border-gold/30 group-hover:bg-gold/5"
                  >
                    <span className="font-mono text-[0.6rem] tracking-[1px] text-white/25 group-hover:text-gold/60 transition-colors">
                      {step.n}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="pb-5 sm:pb-8 border-b border-white/5 flex-1">
                  <h3 className="text-[1.02rem] sm:text-[1rem] font-semibold text-white/72 sm:text-white/60 mb-2 group-hover:text-white/85 transition-colors duration-200">
                    {step.label}
                  </h3>
                  <p className="text-[0.85rem] sm:text-[0.8rem] text-white/34 sm:text-white/22 leading-relaxed font-light max-w-[560px]">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

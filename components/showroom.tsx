"use client"

import dynamic from 'next/dynamic'
import { useProjectStore, PROJECTS } from '@/store/project-store'
import { cn } from '@/lib/utils'

const ModelViewer = dynamic(
  () => import('./3d/model-viewer').then((m) => ({ default: m.ModelViewer })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center" style={{ background: '#06070D' }}>
        <div className="w-8 h-8 rounded-full border-2 animate-spin"
          style={{ borderColor: 'rgba(201,162,39,0.1)', borderTopColor: 'rgba(201,162,39,0.7)' }} />
      </div>
    ),
  }
)

// ── Ícones por glbKey ─────────────────────────────────────────────────────────
function ViewIcon({ glbKey }: { glbKey: string }) {
  if (glbKey === 'full') return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  )
  if (glbKey === 'planta-baixa') return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zm0 9.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zm9.75-9.75A2.25 2.25 0 0115.75 3.75H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zm0 9.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  )
  // floor-01, floor-02, etc
  const num = glbKey.match(/\d+/)?.[0] ?? '1'
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <text x="12" y="15.5" textAnchor="middle" fontSize="9" fontFamily="monospace"
        fontWeight="700" fill="currentColor" stroke="none">
        {num}
      </text>
    </svg>
  )
}

// ── Sidebar de Projetos ───────────────────────────────────────────────────────
function ProjectSidebar() {
  const { projectId, viewId, setProject, setView, getActiveProject } = useProjectStore()
  const activeProject = getActiveProject()

  return (
    <aside className="lg:w-60 shrink-0 flex flex-col gap-3">

      {/* ── Lista de Projetos ── */}
      <div className="rounded-2xl border border-white/6 p-4" style={{ background: 'rgba(255,255,255,0.016)' }}>
        <p className="font-mono text-[0.55rem] tracking-[3px] text-white/25 uppercase px-1 mb-3">
          Projetos
        </p>
        <div className="flex flex-col gap-1.5">
          {PROJECTS.map((p) => {
            const active = projectId === p.id
            return (
              <button
                key={p.id}
                onClick={() => setProject(p.id)}
                className={cn(
                  'relative flex items-center gap-3 w-full px-3 py-2.5 rounded-lg border text-left transition-all duration-200',
                  active
                    ? 'border-gold/30 bg-gold/6'
                    : 'border-white/5 bg-transparent hover:border-white/10 hover:bg-white/[0.03]',
                )}
              >
                <div className={cn(
                  'absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-r-full transition-all',
                  active ? 'h-6 bg-gold' : 'h-0',
                )} />
                <div className="flex flex-col pl-1 min-w-0">
                  <span className={cn('text-[0.75rem] font-medium truncate', active ? 'text-gold' : 'text-white/50')}>
                    {p.label}
                  </span>
                  <span className="text-[0.58rem] text-white/20 mt-0.5 truncate">{p.sub}</span>
                </div>
                {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gold/80 shrink-0" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Views do projeto ativo ── */}
      <div className="rounded-2xl border border-white/10 p-4" style={{ background: 'rgba(255,255,255,0.025)' }}>
        {/* Header da seção com nome do projeto */}
        <div className="flex items-center gap-2 mb-3 px-1">
          <div className="w-1 h-4 rounded-full bg-gold/60" />
          <p className="font-mono text-[0.55rem] tracking-[2px] text-gold/60 uppercase truncate">
            {activeProject.label}
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          {activeProject.views.map((v) => {
            const active = viewId === v.id
            return (
              <button
                key={v.id}
                onClick={() => setView(v.id)}
                className={cn(
                  'group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-all duration-200',
                  active
                    ? 'border-gold/40 bg-gold/8 shadow-sm shadow-gold/10'
                    : 'border-white/5 bg-transparent hover:border-white/10 hover:bg-white/[0.04]',
                )}
              >
                {/* Icon */}
                <div className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all',
                  active ? 'bg-gold/20 text-gold' : 'bg-white/[0.04] text-white/25 group-hover:text-white/45',
                )}>
                  <ViewIcon glbKey={v.glbKey} />
                </div>

                <div className="flex flex-col min-w-0">
                  <span className={cn(
                    'text-[0.78rem] font-semibold tracking-wide transition-colors',
                    active ? 'text-gold' : 'text-white/45 group-hover:text-white/70',
                  )}>
                    {v.label}
                  </span>
                  <span className="text-[0.6rem] text-white/20 mt-0.5">{v.sub}</span>
                </div>

                {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-gold animate-pulse shrink-0" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Acabamentos ── */}
      <FinishPanel />

      {/* ── CTA ── */}
      <div className="rounded-2xl border border-gold/12 p-4" style={{ background: 'linear-gradient(135deg, rgba(201,162,39,0.04), rgba(201,162,39,0.01))' }}>
        <p className="font-mono text-[0.55rem] tracking-[3px] text-gold/40 uppercase mb-1.5">Pronto para avançar?</p>
        <p className="text-[0.73rem] text-white/28 leading-relaxed mb-3 font-light">Orçamento sem compromisso.</p>
        <button className="w-full py-2.5 bg-gold text-ink text-[0.68rem] tracking-[2px] font-semibold uppercase rounded-xl hover:bg-gold-2 transition-colors">
          Solicitar Orçamento
        </button>
      </div>
    </aside>
  )
}

// ── Acabamentos ───────────────────────────────────────────────────────────────
function FinishPanel() {
  const { paint, coating, electric, setPaint, setCoating, setElectric } = useProjectStore()

  return (
    <div className="rounded-2xl border border-white/6 p-4" style={{ background: 'rgba(255,255,255,0.016)' }}>
      <p className="font-mono text-[0.55rem] tracking-[3px] text-white/25 uppercase mb-4">Acabamentos</p>
      <div className="flex flex-col gap-3.5">
        <FinishRow label="Pintura"
          options={[{ id: 'com-pintura', label: 'Com Pintura' }, { id: 'sem-pintura', label: 'Sem Pintura' }]}
          value={paint} onChange={(v: any) => setPaint(v)} />
        <div className="h-px bg-white/5" />
        <FinishRow label="Revestimento"
          options={[{ id: 'porcelanato', label: 'Porcelanato' }, { id: 'ceramico', label: 'Cerâmico' }]}
          value={coating} onChange={(v: any) => setCoating(v)} />
        <div className="h-px bg-white/5" />
        <FinishRow label="Elétrica"
          options={[{ id: 'com-eletrica', label: 'Com' }, { id: 'sem-eletrica', label: 'Sem' }]}
          value={electric} onChange={(v: any) => setElectric(v)} />
      </div>
    </div>
  )
}

function FinishRow({ label, options, value, onChange }: {
  label: string
  options: { id: string; label: string }[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="font-mono text-[0.52rem] tracking-[2px] text-white/20 uppercase">{label}</p>
      <div className="flex rounded-lg overflow-hidden border border-white/8">
        {options.map((opt, i) => (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={cn(
              'flex-1 py-2 text-[0.68rem] font-medium tracking-wide transition-all',
              i > 0 && 'border-l border-white/8',
              value === opt.id ? 'bg-gold/10 text-gold' : 'text-white/28 hover:text-white/50 hover:bg-white/[0.03]',
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Main Showroom ─────────────────────────────────────────────────────────────
export function Showroom() {
  return (
    <section id="showroom" className="relative min-h-screen flex flex-col" style={{ background: '#06060A' }}>
      <div className="h-px bg-gradient-to-r from-transparent via-gold/18 to-transparent" />

      <div className="pt-24 pb-8 px-8 text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="h-px w-6 bg-gold/25" />
          <span className="font-mono text-[0.55rem] tracking-[4px] text-gold/45 uppercase">Showroom Interativo</span>
          <div className="h-px w-6 bg-gold/25" />
        </div>
        <h2 className="font-display text-white/85 leading-none tracking-wide" style={{ fontSize: 'clamp(2rem,4vw,3.2rem)' }}>
          VISUALIZE <span className="text-gold">SEU PROJETO</span>
        </h2>
        <p className="mt-3 text-[0.8rem] text-white/25 max-w-sm mx-auto leading-relaxed font-light">
          Escolha o projeto e navegue entre os pavimentos.
        </p>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row max-w-[1500px] w-full mx-auto px-5 lg:px-8 pb-16 gap-4">
        <ProjectSidebar />
        <div className="flex-1 min-h-[65vh] lg:min-h-0 rounded-2xl overflow-hidden border border-white/6 relative">
          <ModelViewer />
        </div>
      </div>
    </section>
  )
}

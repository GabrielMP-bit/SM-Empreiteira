"use client"

import { useProjectStore, PROJECTS, VIEWS } from '@/store/project-store'
import { cn } from '@/lib/utils'

function SelectorItem({
  active,
  onClick,
  label,
  sub,
}: {
  active: boolean
  onClick: () => void
  label: string
  sub: string
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative flex items-center gap-3 w-full px-4 py-3 rounded-xl border text-left',
        'transition-all duration-250 overflow-hidden',
        active
          ? 'border-gold/35 bg-gold/6'
          : 'border-white/5 bg-white/[0.015] hover:border-white/10 hover:bg-white/[0.03]',
      )}
    >
      {/* Left accent */}
      <div className={cn(
        'absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-r-full transition-all duration-300',
        active ? 'h-7 bg-gold' : 'h-0 group-hover:h-4 group-hover:bg-gold/25',
      )} />

      <div className="flex flex-col min-w-0 pl-1">
        <span className={cn(
          'text-[0.78rem] font-medium tracking-wide transition-colors duration-200 truncate',
          active ? 'text-gold' : 'text-white/55 group-hover:text-white/80',
        )}>
          {label}
        </span>
        <span className="text-[0.6rem] text-white/22 mt-0.5">{sub}</span>
      </div>

      {active && (
        <div className="ml-auto shrink-0 w-1.5 h-1.5 rounded-full bg-gold/80" />
      )}
    </button>
  )
}

export function ProjectSelector() {
  const { projectId, setProject } = useProjectStore()
  return (
    <div className="flex flex-col gap-1">
      <p className="font-mono text-[0.54rem] tracking-[3px] text-white/22 uppercase mb-2 px-1">
        Projetos
      </p>
      {PROJECTS.map((p) => (
        <SelectorItem
          key={p.id}
          active={projectId === p.id}
          onClick={() => setProject(p.id)}
          label={p.label}
          sub={p.sub}
        />
      ))}
    </div>
  )
}

export function ViewSelector() {
  const { viewId, setView } = useProjectStore()
  return (
    <div className="flex flex-col gap-1">
      <p className="font-mono text-[0.54rem] tracking-[3px] text-white/22 uppercase mb-2 px-1">
        Visualização
      </p>
      {VIEWS.map((v) => (
        <SelectorItem
          key={v.id}
          active={viewId === v.id}
          onClick={() => setView(v.id)}
          label={v.label}
          sub={v.sub}
        />
      ))}
    </div>
  )
}

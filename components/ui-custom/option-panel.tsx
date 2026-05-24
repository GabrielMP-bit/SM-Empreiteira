"use client"

import {
  useProjectStore,
  type PaintOption,
  type CoatingOption,
  type ElectricOption,
} from '@/store/project-store'
import { cn } from '@/lib/utils'

function CompactToggle<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T
  options: { id: T; label: string }[]
  onChange: (v: T) => void
}) {
  return (
    <div className="flex rounded overflow-hidden" style={{ border: '1px solid #131E2E' }}>
      {options.map((opt, i) => {
        const active = value === opt.id
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className="flex-1 py-1.5 font-mono text-[0.6rem] tracking-wide transition-all duration-150"
            style={{
              background:  active ? 'rgba(91,155,213,0.12)' : 'transparent',
              color:       active ? '#5B9BD5' : '#2A4060',
              borderLeft:  i > 0 ? '1px solid #131E2E' : 'none',
            }}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

function Row({ icon, label, children }: {
  icon: React.ReactNode; label: string; children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5">
        <span style={{ color: '#2A4060' }}>{icon}</span>
        <span className="font-mono text-[0.55rem] tracking-[2px] uppercase" style={{ color: '#2A4060' }}>
          {label}
        </span>
      </div>
      {children}
    </div>
  )
}

const IcoPaint = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M19 11H5M19 11a2 2 0 010 4H5a2 2 0 010-4M19 11V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2m-6 12v-8" strokeLinecap="round"/>
  </svg>
)
const IcoCoat = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
)
const IcoElec = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export function OptionPanel({ compact }: { compact?: boolean }) {
  const { paint, coating, electric, setPaint, setCoating, setElectric } = useProjectStore()

  return (
    <div className="flex flex-col gap-3">
      <Row icon={<IcoPaint />} label="Pintura">
        <CompactToggle<PaintOption>
          value={paint}
          options={[{ id: 'com-pintura', label: 'Com' }, { id: 'sem-pintura', label: 'Sem' }]}
          onChange={setPaint}
        />
      </Row>

      <div style={{ height: 1, background: '#0D1520' }} />

      <Row icon={<IcoCoat />} label="Revestimento">
        <CompactToggle<CoatingOption>
          value={coating}
          options={[{ id: 'porcelanato', label: 'Porcel.' }, { id: 'ceramico', label: 'Cerâm.' }]}
          onChange={setCoating}
        />
      </Row>

      <div style={{ height: 1, background: '#0D1520' }} />

      <Row icon={<IcoElec />} label="Elétrica">
        <CompactToggle<ElectricOption>
          value={electric}
          options={[{ id: 'com-eletrica', label: 'Com' }, { id: 'sem-eletrica', label: 'Sem' }]}
          onChange={setElectric}
        />
      </Row>
    </div>
  )
}

import { create } from 'zustand'

// ─── Cada view tem seu próprio GLB dentro da pasta do projeto ─────────────────
export interface ProjectView {
  id:     string
  label:  string
  sub:    string
  glbKey: string   // nome do arquivo sem .glb dentro de /models/{projectId}/
}

export interface Project {
  id:    string
  label: string
  sub:   string
  views: ProjectView[]
}

// ─── Projetos — cada um com suas próprias views/GLBs ─────────────────────────
//
// Estrutura de pastas esperada:
//   /public/models/
//     sobrado/
//       full.glb
//       floor-01.glb
//       floor-02.glb
//       planta-baixa.glb
//     sobrado-geminado/
//       full.glb
//       floor-01.glb
//       planta-baixa.glb
//     casa-terrea/
//       full.glb
//       planta-baixa.glb
//     ... etc
//
// Adicione novos projetos aqui. Se um .glb não existir → placeholder automático.

export const PROJECTS: Project[] = [
  {
    id: 'sobrado',
    label: 'Sobrado',
    sub: '2 pavimentos · Alvenaria',
    views: [
      { id: 'full',    label: 'Projeto Completo', sub: 'Modelo inteiro',      glbKey: 'full'          },
      { id: 'floor1',  label: '1º Andar',         sub: 'Pavimento térreo',    glbKey: 'floor-01'      },
      { id: 'floor2',  label: '2º Andar',         sub: 'Pavimento superior',  glbKey: 'floor-02'      },
      { id: 'plan',    label: 'Planta Baixa',     sub: 'Vista aérea',         glbKey: 'planta-baixa'  },
    ],
  },
  {
    id: 'sobrado-geminado',
    label: 'Sobrado Geminado',
    sub: '2 unidades · 2 pavimentos',
    views: [
      { id: 'full',    label: 'Projeto Completo', sub: 'Modelo inteiro',      glbKey: 'full'          },
      { id: 'floor1',  label: '1º Andar',         sub: 'Pavimento térreo',    glbKey: 'floor-01'      },
      { id: 'floor2',  label: '2º Andar',         sub: 'Pavimento superior',  glbKey: 'floor-02'      },
      { id: 'plan',    label: 'Planta Baixa',     sub: 'Vista aérea',         glbKey: 'planta-baixa'  },
    ],
  },
  {
    id: 'casa-terrea',
    label: 'Casa Térrea',
    sub: '1 pavimento · Alvenaria',
    views: [
      { id: 'full',    label: 'Projeto Completo', sub: 'Modelo inteiro',      glbKey: 'full'          },
      { id: 'floor1',  label: 'Térreo',           sub: 'Planta do pavimento', glbKey: 'floor-01'      },
      { id: 'plan',    label: 'Planta Baixa',     sub: 'Vista aérea',         glbKey: 'planta-baixa'  },
    ],
  },
  {
    id: 'alvenaria',
    label: 'Casa em Alvenaria',
    sub: 'Sistema estrutural misto',
    views: [
      { id: 'full',    label: 'Projeto Completo', sub: 'Modelo inteiro',      glbKey: 'full'          },
      { id: 'floor1',  label: 'Térreo',           sub: 'Planta do pavimento', glbKey: 'floor-01'      },
      { id: 'plan',    label: 'Planta Baixa',     sub: 'Vista aérea',         glbKey: 'planta-baixa'  },
    ],
  },
]

// ─── Acabamentos ──────────────────────────────────────────────────────────────
export type PaintOption    = 'com-pintura'  | 'sem-pintura'
export type CoatingOption  = 'porcelanato'  | 'ceramico'
export type ElectricOption = 'com-eletrica' | 'sem-eletrica'

// ─── Store ────────────────────────────────────────────────────────────────────
interface ProjectState {
  projectId: string
  viewId:    string
  paint:     PaintOption
  coating:   CoatingOption
  electric:  ElectricOption
  rotating:  boolean

  setProject:       (id: string)        => void
  setView:          (id: string)        => void
  setPaint:         (v: PaintOption)    => void
  setCoating:       (v: CoatingOption)  => void
  setElectric:      (v: ElectricOption) => void
  setRotating:      (v: boolean)        => void
  getModelUrl:      ()                  => string
  getActiveProject: ()                  => Project
  getActiveView:    ()                  => ProjectView
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projectId: PROJECTS[0].id,
  viewId:    PROJECTS[0].views[0].id,
  paint:     'com-pintura',
  coating:   'porcelanato',
  electric:  'com-eletrica',
  rotating:  true,

  // Ao trocar projeto → reseta view para a primeira do novo projeto
  setProject: (projectId) => {
    const proj = PROJECTS.find(p => p.id === projectId) ?? PROJECTS[0]
    set({ projectId, viewId: proj.views[0].id })
  },

  setView:     (viewId)    => set({ viewId }),
  setPaint:    (paint)     => set({ paint }),
  setCoating:  (coating)   => set({ coating }),
  setElectric: (electric)  => set({ electric }),
  setRotating: (rotating)  => set({ rotating }),

  getActiveProject: () => {
    const { projectId } = get()
    return PROJECTS.find(p => p.id === projectId) ?? PROJECTS[0]
  },

  getActiveView: () => {
    const { viewId, getActiveProject } = get()
    const proj = getActiveProject()
    return proj.views.find(v => v.id === viewId) ?? proj.views[0]
  },

  getModelUrl: () => {
    const { projectId, getActiveView } = get()
    const view = getActiveView()
    return `/models/${projectId}/${view.glbKey}.glb`
  },
}))

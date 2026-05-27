# SM Empreiteiras

Landing page institucional e showroom arquitetônico interativo para a SM Empreiteiras. O projeto apresenta modelos residenciais em 3D, opções de visualização por pavimento, seleção de acabamentos e uma experiência visual premium para captação de orçamentos.

## Sobre o projeto

A aplicação foi criada com Next.js e React, com foco em uma experiência de navegação fluida e visual. A página principal reúne seções de apresentação, showroom 3D, diferenciais da empresa, processo de construção e chamada para contato.

Principais recursos:

- Showroom interativo com modelos GLB renderizados em 3D.
- Seleção de projetos, pavimentos e planta baixa.
- Controles de rotação, zoom e órbita para inspeção dos modelos.
- Painel de acabamentos com opções de pintura, revestimento e elétrica.
- Placeholder automático quando um arquivo GLB ainda não foi adicionado.
- Layout responsivo com identidade visual escura, dourada e tipografia premium.

## Tecnologias

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Three Fiber](https://r3f.docs.pmnd.rs/)
- [Drei](https://drei.docs.pmnd.rs/)
- [Three.js](https://threejs.org/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Radix UI](https://www.radix-ui.com/)
- [Vercel Analytics](https://vercel.com/analytics)

## Pré-requisitos

Antes de começar, instale:

- Node.js 20 ou superior.
- npm, que já acompanha o Node.js.

## Como executar

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse no navegador:

```text
http://localhost:3000
```

## Scripts disponíveis

```bash
npm run dev
```

Executa o projeto em modo de desenvolvimento.

```bash
npm run build
```

Gera a versão de produção.

```bash
npm run start
```

Executa a versão de produção gerada pelo build.

```bash
npm run lint
```

Executa a verificação de lint do projeto.

## Estrutura principal

```text
app/
  layout.tsx        Configura metadados, fontes e estrutura global
  page.tsx          Monta as seções da landing page
components/
  3d/               Visualizador 3D com React Three Fiber
  ui/               Componentes de interface reutilizáveis
  hero.tsx          Seção inicial
  showroom.tsx      Showroom interativo
  features.tsx      Diferenciais da empresa
  process.tsx       Etapas do processo de construção
  cta.tsx           Chamada para orçamento
store/
  project-store.ts  Estado dos projetos, views, acabamentos e modelos
public/
  models/           Arquivos GLB usados no showroom
```

## Modelos 3D

Os modelos devem ficar em `public/models`, separados por projeto. Cada projeto usa o `id` definido em `store/project-store.ts`.

Exemplo:

```text
public/models/
  sobrado/
    full.glb
    floor-01.glb
    floor-02.glb
    planta-baixa.glb
  casa-terrea/
    full.glb
    floor-01.glb
    planta-baixa.glb
```

Para adicionar um novo projeto:

1. Crie uma pasta em `public/models/<id-do-projeto>/`.
2. Adicione os arquivos `.glb` necessários.
3. Cadastre o projeto no array `PROJECTS` em `store/project-store.ts`.
4. Informe as views disponíveis e o respectivo `glbKey`.

Se um modelo não existir, o showroom exibe automaticamente um placeholder em wireframe com o caminho esperado do arquivo.

## Deploy

O repositório inclui configuração para deploy na Netlify em `netlify.toml`, com build via `npm run build` e headers específicos para servir arquivos `.glb` com o MIME type correto.

## Desenvolvimento

A página inicial é composta em `app/page.tsx`. Para alterar textos e seções, edite os componentes em `components/`. Para alterar projetos, views ou opções do showroom, use `store/project-store.ts`.

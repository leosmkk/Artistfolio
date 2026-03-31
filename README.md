# Artistfolio — Frontend com Microfrontends

Plataforma de portfólios para artistas independentes, construída com **React + Vite + Module Federation**, deployada no **Azure Static Web Apps**.

URLS: https://nice-bush-0f9e1190f.2.azurestaticapps.net
https://polite-cliff-041c0110f.1.azurestaticapps.net
https://yellow-bush-0da22780f.4.azurestaticapps.net

---

## 1. Visão Geral

O Artistfolio permite que artistas visuais, ilustradores, fotógrafos e designers criem portfólios online com identidade visual própria — galeria de obras, feed público, perfil, contato e (futuramente) loja.

A arquitetura divide o frontend em **3 unidades de deploy independentes**:

| App | Domínio de negócio | Porta local | Azure SWA |
|---|---|---|---|
| **host-shell** | Layout global, roteamento, auth | 5000 | `host.azurestaticapps.net` |
| **feed-mf** | Feed público, portfólio do artista | 5001 | `feed-mf.azurestaticapps.net` |
| **dashboard-mf** | Login, cadastro, gestão de obras e perfil | 5002 | `dashboard-mf.azurestaticapps.net` |

---

## 2. Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                      host-shell                          │
│                                                          │
│  ┌─────────┐   ┌──────────────┐   ┌──────────────────┐  │
│  │ Header  │   │ React Router │   │ AuthStore (Zust.) │  │
│  └─────────┘   └──────┬───────┘   └──────────────────┘  │
│                        │                                 │
│          ┌─────────────┼──────────────┐                  │
│          ▼                            ▼                  │
│   ┌─────────────┐             ┌──────────────┐           │
│   │  feed-mf    │             │ dashboard-mf │           │
│   │  (remote)   │             │  (remote)    │           │
│   └─────────────┘             └──────────────┘           │
│                                                          │
│  ┌─────────┐                                             │
│  │ Footer  │                                             │
│  └─────────┘                                             │
└─────────────────────────────────────────────────────────┘
```

**Como funciona:**

1. O **host-shell** define as rotas de nível superior e carrega os remotes via `React.lazy()` + Module Federation.
2. Os remotes expõem componentes de página (não apps inteiros). O host os monta nas rotas corretas.
3. O estado de autenticação (Zustand) é compartilhado via `shared` do Module Federation — todos os apps usam a mesma instância do store.
4. Cada remote é um **Azure Static Web App independente**, servindo seu `remoteEntry.js` com CORS habilitado.

---

## 3. Mapa de Rotas

```
/                          → host carrega feedMf/FeedPage
/artist/:slug              → host carrega feedMf/ArtistPage
/login                     → host carrega dashboardMf/LoginPage
/register                  → host carrega dashboardMf/RegisterPage
/dashboard                 → host carrega dashboardMf/DashboardLayout (protegida)
  ├── /dashboard/           → DashboardHome
  ├── /dashboard/works      → WorksListPage
  ├── /dashboard/works/new  → WorkFormPage
  ├── /dashboard/works/:id/edit → WorkFormPage (edição)
  └── /dashboard/profile    → ProfilePage
```

---

## 4. Estrutura de Pastas

```
artistfolio/
├── .github/workflows/
│   ├── deploy-host-shell.yml
│   ├── deploy-feed-mf.yml
│   └── deploy-dashboard-mf.yml
├── packages/
│   ├── host-shell/
│   │   ├── src/
│   │   │   ├── components/    (Header, Footer, ProtectedRoute, RemoteErrorBoundary)
│   │   │   ├── context/       (authStore.ts — Zustand)
│   │   │   ├── pages/         (NotFound)
│   │   │   ├── routes/        (AppRoutes — lazy loading dos remotes)
│   │   │   ├── types/         (remotes.d.ts — tipagem dos módulos federados)
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   ├── .env               (URLs locais dos remotes)
│   │   ├── .env.production    (URLs Azure dos remotes)
│   │   ├── staticwebapp.config.json
│   │   └── vite.config.ts     (Module Federation — consome remotes)
│   │
│   ├── feed-mf/
│   │   ├── src/
│   │   │   ├── components/    (ArtistCard, GalleryGrid, AboutSection, ContactForm, TagBadge)
│   │   │   ├── pages/         (FeedPage, ArtistPage)
│   │   │   ├── mocks/         (artists.ts — dados mockados)
│   │   │   └── types/
│   │   ├── staticwebapp.config.json
│   │   └── vite.config.ts     (Module Federation — expõe FeedPage, ArtistPage)
│   │
│   └── dashboard-mf/
│       ├── src/
│       │   ├── components/    (WorkCard, StatsCard, Sidebar)
│       │   ├── pages/         (LoginPage, RegisterPage, DashboardHome, WorksListPage, WorkFormPage, ProfilePage)
│       │   ├── layouts/       (DashboardLayout — sub-rotas internas)
│       │   ├── hooks/         (useAuthStore.ts)
│       │   ├── mocks/         (data.ts — mock works, stats, profile)
│       │   └── types/
│       ├── staticwebapp.config.json
│       └── vite.config.ts     (Module Federation — expõe LoginPage, RegisterPage, DashboardLayout)
│
├── .gitignore
├── package.json              (npm workspaces)
└── README.md
```

---

## 5. Tecnologias e Justificativas

| Tecnologia | Justificativa |
|---|---|
| **React 18** | Ecossistema maduro; `React.lazy()` + Suspense nativos para carregamento dos remotes |
| **Vite 5** | Build rápido, HMR instantâneo, ESM nativo — ideal para Module Federation |
| **@originjs/vite-plugin-federation** | Plugin estável para Module Federation no Vite; permite expor/consumir módulos entre apps |
| **TypeScript** | Tipagem estática previne bugs de integração entre host e remotes |
| **Tailwind CSS 3** | Utility-first elimina conflito de estilos entre microfrontends |
| **Zustand** | Store leve (~1 KB); funciona como singleton via `shared` do Module Federation |
| **React Router 6** | Roteamento declarativo; host controla rotas de nível superior |
| **Azure Static Web Apps** | Hosting serverless com CI/CD nativo via GitHub Actions, CORS configurável, fallback de SPA |
| **GitHub Actions** | CI/CD integrado ao GitHub; workflows por path filtram deploys por microfrontend |

---

Projeto acadêmico — PUCPR 2026/1.

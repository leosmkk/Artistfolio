import type { Work, DashboardStats, Profile } from "../types";

export const mockProfile: Profile = {
  name: "Marina Alcântara",
  slug: "marina-alcantara",
  specialty: "Ilustração Digital",
  bio: "Ilustradora digital com foco em arte conceitual e personagens. Apaixonada por narrativas visuais e universos fantásticos.",
  avatarUrl: "https://i.pravatar.cc/150?img=5",
  socialLinks: {
    instagram: "https://instagram.com/marina.art",
    behance: "https://behance.net/marinaalc",
  },
};

export const mockWorks: Work[] = [
  {
    id: "w1",
    title: "Guardiã da Floresta",
    description: "Personagem conceitual para projeto de game indie.",
    imageUrl: "https://picsum.photos/seed/forest-guardian/800/1000",
    tags: ["concept art", "personagem", "fantasia"],
    createdAt: "2025-11-15T10:30:00Z",
    views: 342,
  },
  {
    id: "w2",
    title: "Cidade Flutuante",
    description: "Cenário para livro ilustrado infantojuvenil.",
    imageUrl: "https://picsum.photos/seed/floating-city/800/600",
    tags: ["cenário", "fantasia", "editorial"],
    createdAt: "2025-10-02T14:00:00Z",
    views: 218,
  },
  {
    id: "w3",
    title: "Retrato Cósmico",
    description: "Série de retratos com elementos cósmicos e surrealistas.",
    imageUrl: "https://picsum.photos/seed/cosmic-portrait/800/800",
    tags: ["retrato", "surrealismo", "digital"],
    createdAt: "2025-09-20T09:15:00Z",
    views: 156,
  },
];

export const mockStats: DashboardStats = {
  totalWorks: 3,
  totalViews: 716,
  totalContacts: 12,
  recentViews: [45, 62, 38, 71, 55, 89, 67],
};

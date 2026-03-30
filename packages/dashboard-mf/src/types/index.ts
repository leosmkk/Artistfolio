export interface User {
  id: string;
  name: string;
  slug: string;
  email: string;
  avatarUrl?: string;
}

export interface Work {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  createdAt: string;
  views: number;
}

export interface Profile {
  name: string;
  slug: string;
  specialty: string;
  bio: string;
  avatarUrl: string;
  socialLinks: Record<string, string>;
}

export interface DashboardStats {
  totalWorks: number;
  totalViews: number;
  totalContacts: number;
  recentViews: number[];
}

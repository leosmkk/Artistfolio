export interface Artist {
  id: string;
  name: string;
  slug: string;
  specialty: string;
  bio: string;
  avatarUrl: string;
  socialLinks: Record<string, string>;
  works: Work[];
}

export interface Work {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  createdAt: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  artistId: string;
}

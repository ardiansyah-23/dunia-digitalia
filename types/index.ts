export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
  readTime: number;
  published: boolean;
  featured: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  views: number;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  images: string[];
  category: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  completed: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price?: string;
  order: number;
  active: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  featured: boolean;
  createdAt: Date | string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  order: number;
  createdAt: Date | string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  read: boolean;
  replied: boolean;
  createdAt: Date | string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  type: 'article' | 'project' | 'gallery' | 'service';
  order: number;
}

export interface SiteSettings {
  id: string;
  siteName: string;
  tagline: string;
  description: string;
  logoUrl: string;
  faviconUrl: string;
  email: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  linkedin: string;
  github: string;
  address: string;
  googleMapsEmbed: string;
  stats: {
    projects: number;
    clients: number;
    articles: number;
    students: number;
  };
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: Date | string;
  lastLogin: Date | string;
}

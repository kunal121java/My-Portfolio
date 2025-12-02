export interface Project {
  id?: string;
  title: string;
  description: string;
  tech: string[];
  category: 'ML/AI' | 'Web Dev' | 'Cloud' | 'Other' | string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Certificate {
  id?: string;
  title: string;
  issuer: string;
  date: string;
  link?: string;
  skills?: string[];
  credentialId?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}
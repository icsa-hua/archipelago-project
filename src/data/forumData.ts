export type Domain = 
  | 'digital-education'
  | 'sustainability'
  | 'marine-research'
  | 'island-development'
  | 'policy';

export interface ForumPost {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: 'student' | 'professor';
  authorAvatar: string;
  domain: Domain;
  title: string;
  content: string;
  createdAt: Date;
  likes: string[]; // user IDs
  applause: string[]; // user IDs
  comments: Comment[];
}

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: 'student' | 'professor';
  authorAvatar: string;
  content: string;
  createdAt: Date;
}

export const DOMAINS: { id: Domain; labelEn: string; labelFr: string; color: string }[] = [
  { id: 'digital-education', labelEn: 'Digital Education', labelFr: 'Éducation Numérique', color: 'bg-primary' },
  { id: 'sustainability', labelEn: 'Sustainability', labelFr: 'Durabilité', color: 'bg-green-500' },
  { id: 'marine-research', labelEn: 'Marine Research', labelFr: 'Recherche Marine', color: 'bg-blue-500' },
  { id: 'island-development', labelEn: 'Island Development', labelFr: 'Développement Insulaire', color: 'bg-accent' },
  { id: 'policy', labelEn: 'Policy & Governance', labelFr: 'Politique et Gouvernance', color: 'bg-purple-500' }
];

// Initial forum posts
export const initialPosts: ForumPost[] = [
  {
    id: 'post-1',
    authorId: 'professor-1',
    authorName: 'Dr. Jean Dupont',
    authorRole: 'professor',
    authorAvatar: 'JD',
    domain: 'digital-education',
    title: 'Implementing Blended Learning in SIDS Universities',
    content: 'I wanted to share some insights from our pilot program at UTT. We\'ve found that combining asynchronous video lectures with live Q&A sessions works particularly well for students with unreliable internet connections. The key is to make the asynchronous content downloadable so students can access it during off-peak hours.',
    createdAt: new Date('2025-01-20'),
    likes: [],
    applause: [],
    comments: []
  },
  {
    id: 'post-2',
    authorId: 'professor-1',
    authorName: 'Dr. Jean Dupont',
    authorRole: 'professor',
    authorAvatar: 'JD',
    domain: 'sustainability',
    title: 'Green Campus Initiatives for Island Universities',
    content: 'As part of WP2, we are developing toolkits that include sustainability modules. I would love to hear from partners about existing green initiatives at your institutions. What has worked? What challenges have you faced?',
    createdAt: new Date('2025-01-18'),
    likes: [],
    applause: [],
    comments: []
  },
  {
    id: 'post-3',
    authorId: 'professor-1',
    authorName: 'Dr. Jean Dupont',
    authorRole: 'professor',
    authorAvatar: 'JD',
    domain: 'marine-research',
    title: 'Collaborative Marine Data Collection Platform',
    content: 'We are exploring the creation of a shared marine data platform across SIDS universities. This would enable collaborative research on ocean health, climate impacts, and marine biodiversity. Looking for partners interested in contributing data or expertise.',
    createdAt: new Date('2025-01-15'),
    likes: [],
    applause: [],
    comments: []
  }
];

// Storage key
export const FORUM_STORAGE_KEY = 'archipelago_forum_posts';
export const FOLLOWS_STORAGE_KEY = 'archipelago_follows';

export const getStoredPosts = (): ForumPost[] => {
  const stored = localStorage.getItem(FORUM_STORAGE_KEY);
  if (stored) {
    const posts = JSON.parse(stored);
    return posts.map((p: any) => ({
      ...p,
      createdAt: new Date(p.createdAt),
      comments: p.comments.map((c: any) => ({
        ...c,
        createdAt: new Date(c.createdAt)
      }))
    }));
  }
  localStorage.setItem(FORUM_STORAGE_KEY, JSON.stringify(initialPosts));
  return initialPosts;
};

export const savePosts = (posts: ForumPost[]) => {
  localStorage.setItem(FORUM_STORAGE_KEY, JSON.stringify(posts));
};

export const getFollows = (userId: string): string[] => {
  const stored = localStorage.getItem(FOLLOWS_STORAGE_KEY);
  if (stored) {
    const follows = JSON.parse(stored);
    return follows[userId] || [];
  }
  return [];
};

export const saveFollows = (userId: string, followedIds: string[]) => {
  const stored = localStorage.getItem(FOLLOWS_STORAGE_KEY);
  const follows = stored ? JSON.parse(stored) : {};
  follows[userId] = followedIds;
  localStorage.setItem(FOLLOWS_STORAGE_KEY, JSON.stringify(follows));
};

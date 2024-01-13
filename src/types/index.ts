export interface ICardData {
  id: string;
  name: string;
  description: string;
  interests: string[];
  githubUrl?: string | null;
  twitterUrl?: string | null;
}

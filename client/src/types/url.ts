export type Url = {
  id: string;

  longUrl: string;

  slug: string;

  title: string | null;

  isActive: boolean;

  expiresAt: Date | null;

  userId: string;

  createdAt: Date;

  updatedAt: Date;
};

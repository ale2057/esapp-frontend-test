export interface Account {
  id: string;
  type: 'checking' | 'savings' | 'other';
  ownerName: string;
  balance: number;
  photoUrl?: string;
  number?: string;
}

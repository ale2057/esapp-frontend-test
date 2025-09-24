export interface Transaction {
  id: string;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  date: string;
  status: 'success' | 'failed' | 'pending';
}

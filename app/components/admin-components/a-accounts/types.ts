export type Accounts = {
  id: number;
  full_name: string;
  email: string;
  password: string;
  document_1: string;
  document_2: string;
  location: string; 
  created_at: string;
  status: string;
};

export interface UserInfo {
  user_id: string;
  full_name: string;
  age: number;
  location: string;
  document_1: string;
  document_2: string;
  created_at: string;
}

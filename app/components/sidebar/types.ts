export interface User {
    user_id: string;
    first_name: string;
    last_name: string;
    age: number;
    location: string;
    'document-1': string | null;
    'document-2': string | null;
    created_at: string;
}
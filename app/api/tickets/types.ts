export type FormData = {
  title?: string;
  description?: string;
  location?: string;
  lastName: string;
  firstName: string;
  middleName: string;
  birthdate?: string;
  birthplace?: string;
  age?: number;
  height?: string;
  weight?: string;
  civilStatus?: string;
  address?: string;
  contactPersonName?: string;
  contactPersonNumber?: string;
  purpose?: string;
  status?: string;
  attachment1?: File | undefined;
  attachment2?: File;
};

export type TicketStatus = "Open" | "In Progress" | "Closed" | "On Hold" | "Resolved";
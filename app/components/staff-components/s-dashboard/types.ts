// export type Tickets = {
//     id: number;
//     title: string;
//     description: string;
//     status: "Open" | "In Progress" | "Closed" | "On Hold";
//     location: string;
//     created_at: string;
//   };

export type Tickets = {
  id: number;
  title: string;
  description: string;
  status: string
  location: string;
  created_at: string;
  ticket_status: "Open" | "In Progress" | "Closed" | "On Hold";
  address: string;
  concern_type: string;
  attachment_1: string;
  attachment_2: string;
  name: string;
  birthdate: string;
  age: number;
  birthplace: string;
  height: string;
  weight: string;
  civil_status: string;
  contact_person_name: string;
  contact_person_number: string;
  purpose: string;
  assginee_id: string;
  assignee_id: number;
  submitted_by: string;
};

export interface TicketDatePickerProps {
  onDateChange: (date: Date | null) => void;
}

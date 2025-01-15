export type Tickets = {
  id: number;
  title: string;
  description: string;
  status: "Open" | "In Progress" | "Closed" | "On Hold";
  location: string;
  created_at: string;
  ticket_status: string;
  address: string;
  concern_type: string;
};

export interface TicketDatePickerProps {
  onDateChange: (date: Date | null) => void;
}

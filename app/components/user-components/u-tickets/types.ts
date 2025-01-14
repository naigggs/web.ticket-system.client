export type Tickets = {
  id: number;
  title: string;
  description: string;
  status: "Open" | "In Progress" | "Closed" | "On Hold";
  location: string;
  created_at: string;
};

export interface TicketDatePickerProps {
  onDateChange: (date: Date | null) => void;
}

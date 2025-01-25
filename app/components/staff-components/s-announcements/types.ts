export type Announcements = {
  id: number;
  title: string;
  description: string;
  subtitle: string;
  body: string;
  created_at: string;
};

export interface AnnouncementDatePickerProps {
  onDateChange: (date: Date | null) => void;
}

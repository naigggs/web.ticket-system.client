export type Surveys = {
  id: number;
  title: string;
  description: string;
  created_at: string;
};

export interface SurveyDatePickerProps {
  onDateChange: (date: Date | null) => void;
}

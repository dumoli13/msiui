export interface StepperProps {
  active: number;
  items: Array<{ title: string; available?: boolean }>;
  onChange?: (index: number) => void;
  disabled?: boolean;
}

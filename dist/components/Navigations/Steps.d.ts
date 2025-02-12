import React from 'react';
interface StepProps {
    active: number;
    items: Array<{
        title: string;
        description: string;
        error?: boolean;
        success?: boolean;
        available?: boolean;
    }>;
    onChange?: (index: number) => void;
    disabled?: boolean;
}
/**
 * Steps Component
 *
 * A component that renders a multi-step progress tracker. Each step can represent a process or a task.
 * The component displays the title and description for each step, along with visual indicators for success, error,
 * or default state. It also provides interactivity for navigation between steps, with the ability to disable
 * navigation and indicate whether a step is available or not.
 *
 * @interface StepProps
 * @property {number} active - The index of the currently active step.
 * @property {Array} items - An array of step items, each containing the following properties:
 * @property {function} [onChange] - A callback function triggered when the active step is changed.
 * @property {boolean} [disabled=false] - A flag that disables the ability to change steps.
 *
 * @example Basic Usage:
 * ```tsx
 * import Steps from './Steps';
 *
 * const MyComponent = () => {
 *   const [activeStep, setActiveStep] = useState(0);
 *
 *   const stepItems = [
 *     { title: 'Step 1', description: 'Description for step 1' },
 *     { title: 'Step 2', description: 'Description for step 2', success: true },
 *     { title: 'Step 3', description: 'Description for step 3', error: true },
 *     { title: 'Step 4', description: 'Description for step 4', available: true },
 *   ];
 *
 *   return (
 *     <Steps
 *       active={activeStep}
 *       items={stepItems}
 *       onChange={setActiveStep}
 *     />
 *   );
 * };
 * ```
 *
 * @returns {JSX.Element} The Steps component that displays the steps and allows navigation between them.
 */
declare function Steps({ active, items, onChange, disabled }: StepProps): React.JSX.Element;
export default Steps;

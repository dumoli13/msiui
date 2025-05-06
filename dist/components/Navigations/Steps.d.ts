export interface StepProps {
    active: number;
    items: Array<{
        title: string;
        description?: string;
        error?: boolean;
        success?: boolean;
        available?: boolean;
    }>;
    onChange?: (index: number) => void;
    disabled?: boolean;
}
/**
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
 * @property {boolean} [disabled=false] - A flag that disables the ability to change steps.*
 *
 */
declare function Steps({ active, items, onChange, disabled, }: Readonly<StepProps>): import("react/jsx-runtime").JSX.Element;
export default Steps;
//# sourceMappingURL=Steps.d.ts.map
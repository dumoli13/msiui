import { jsx as _jsx } from "react/jsx-runtime";
import cx from 'classnames';
function InputHelper({ id, message, error, size }) {
    if (!message)
        return null;
    return (_jsx("div", { id: id, ...(error && { role: 'alert' }), className: cx('w-full text-left mt-1', {
            'text-danger-main dark:text-danger-main-dark': error,
            'text-neutral-60 dark:text-neutral-60-dark': !error,
            'text-12px': size === 'default',
            'text-16px': size === 'large',
        }), children: message }));
}
export default InputHelper;

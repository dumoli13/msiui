import { jsx as _jsx } from "react/jsx-runtime";
import cx from 'classnames';
function InputLabel({ id, children, size = 'default', }) {
    return (_jsx("label", { htmlFor: id, className: cx('shrink-0 block text-left text-neutral-80 dark:text-neutral-100-dark mb-1', {
            'text-14px': size === 'default',
            'text-18px': size === 'large',
        }), children: children }));
}
export default InputLabel;

import { jsx as _jsx } from "react/jsx-runtime";
import cx from 'classnames';
const ModalFooter = ({ className, children }) => {
    return (_jsx("div", { className: cx('px-6 py-3 bg-neutral-20 dark:bg-neutral-30-dark flex justify-end items-center gap-3 rounded-b-md', className), children: children }));
};
export default ModalFooter;

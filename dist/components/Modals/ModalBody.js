import { jsx as _jsx } from "react/jsx-runtime";
import cx from 'classnames';
const ModalBody = ({ className, children }) => {
    return (_jsx("div", { className: cx('pb-4 px-6 h-full flex-1 overflow-auto', className), children: children }));
};
export default ModalBody;

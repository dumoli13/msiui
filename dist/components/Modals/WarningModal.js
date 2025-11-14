import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import Icon from '../Icon';
import ModalConfirmContainer from './ModalConfirmContainer';
const WarningModal = (_a) => {
    var { icon = (_jsx(Icon, { name: "alert-circle", size: 24, strokeWidth: 3, className: "text-warning-main dark:text-warning-main-dark" })), content, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm } = _a, props = __rest(_a, ["icon", "content", "confirmText", "cancelText", "onConfirm"]);
    const container = document.createElement('div');
    const root = createRoot(container);
    document.body.appendChild(container);
    const handleClose = () => {
        root.unmount();
        document.body.removeChild(container);
    };
    root.render(_jsx(ModalConfirmContainer, Object.assign({}, props, { open: true, icon: icon, onClose: handleClose, onConfirm: () => {
            onConfirm === null || onConfirm === void 0 ? void 0 : onConfirm();
            handleClose();
        }, confirmText: confirmText, cancelText: cancelText, confirmButtonColor: "warning", children: content })));
};
export default WarningModal;

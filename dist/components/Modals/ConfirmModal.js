import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import Icon from '../Icon';
import ModalConfirmContainer from './ModalConfirmContainer';
const ConfirmModal = (_a) => {
    var { icon = (_jsx(Icon, { name: "alert-triangle", size: 24, strokeWidth: 2, className: "text-neutral-90 dark:text-neutral-90-dark" })), content, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onCancel } = _a, props = __rest(_a, ["icon", "content", "confirmText", "cancelText", "onConfirm", "onCancel"]);
    const container = document.createElement('div');
    const root = createRoot(container);
    document.body.appendChild(container);
    const handleClose = () => {
        root.unmount();
        document.body.removeChild(container);
    };
    root.render(_jsx(ModalConfirmContainer, Object.assign({}, props, { open: true, icon: icon, onClose: () => {
            onCancel === null || onCancel === void 0 ? void 0 : onCancel();
            handleClose();
        }, onConfirm: () => {
            onConfirm === null || onConfirm === void 0 ? void 0 : onConfirm();
            handleClose();
        }, confirmText: confirmText, cancelText: cancelText, children: content })));
};
export default ConfirmModal;

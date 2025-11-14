import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import Icon from '../Icon';
import ModalConfirmContainer from './ModalConfirmContainer';
const DangerModal = (_a) => {
    var { icon = (_jsx(Icon, { name: "x-mark", size: 24, strokeWidth: 3, className: "text-danger-main dark:text-danger-main-dark" })), content, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onCancel } = _a, props = __rest(_a, ["icon", "content", "confirmText", "cancelText", "onConfirm", "onCancel"]);
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
            handleClose();
            onConfirm === null || onConfirm === void 0 ? void 0 : onConfirm();
        }, confirmText: confirmText, cancelText: cancelText, confirmButtonColor: "danger", children: content })));
};
export default DangerModal;

import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import Icon from '../Icon';
import ModalConfirmContainer from './ModalConfirmContainer';
const SuccessModal = (_a) => {
    var { icon = (_jsx(Icon, { name: "check", size: 24, strokeWidth: 3, className: "text-success-main dark:text-success-main-dark" })), content, confirmText = 'OK', onConfirm, customAction } = _a, props = __rest(_a, ["icon", "content", "confirmText", "onConfirm", "customAction"]);
    const container = document.createElement('div');
    const root = createRoot(container);
    document.body.appendChild(container);
    const handleClose = () => {
        root.unmount();
        document.body.removeChild(container);
    };
    root.render(_jsx(ModalConfirmContainer, Object.assign({}, props, { open: true, icon: icon, onConfirm: () => {
            onConfirm === null || onConfirm === void 0 ? void 0 : onConfirm();
            handleClose();
        }, confirmText: confirmText, confirmButtonColor: "success", customAction: customAction, children: content })));
};
export default SuccessModal;

import { jsx as _jsx } from "react/jsx-runtime";
import Icon from '../Icon';
import ModalConfirmContainer from './ModalConfirmContainer';
import { createModal } from './modalManager';
const WarningModal = ({ icon = (_jsx(Icon, { name: "alert-circle", size: 24, strokeWidth: 3, className: "text-warning-main dark:text-warning-main-dark" })), content, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, animation, ...props }) => {
    const modal = createModal();
    if (!modal)
        return;
    const { root, handleClose } = modal;
    root.render(_jsx(ModalConfirmContainer, { ...props, open: true, icon: icon, onClose: handleClose, animation: animation, onConfirm: () => {
            onConfirm?.();
            handleClose();
        }, confirmText: confirmText, cancelText: cancelText, buttonColor: "warning", children: content }));
};
export default WarningModal;

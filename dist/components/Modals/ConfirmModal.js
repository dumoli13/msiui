import { jsx as _jsx } from "react/jsx-runtime";
import Icon from '../Icon';
import ModalConfirmContainer from './ModalConfirmContainer';
import { createModal } from './modalManager';
const ConfirmModal = ({ icon = (_jsx(Icon, { name: "alert-triangle", size: 24, strokeWidth: 2, className: "text-neutral-90 dark:text-neutral-90-dark" })), content, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onCancel, animation, ...props }) => {
    const modal = createModal();
    if (!modal)
        return;
    const { root, handleClose } = modal;
    root.render(_jsx(ModalConfirmContainer, { ...props, open: true, icon: icon, animation: animation, onClose: () => {
            onCancel?.();
            handleClose();
        }, onConfirm: () => {
            onConfirm?.();
            handleClose();
        }, confirmText: confirmText, cancelText: cancelText, children: content }));
};
export default ConfirmModal;

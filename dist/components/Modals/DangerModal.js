import { jsx as _jsx } from "react/jsx-runtime";
import Icon from '../Icon';
import ModalConfirmContainer from './ModalConfirmContainer';
import { createModal } from './modalManager';
const DangerModal = ({ icon = (_jsx(Icon, { name: "x-mark", size: 24, strokeWidth: 3, className: "text-danger-main dark:text-danger-main-dark" })), content, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onCancel, animation, ...props }) => {
    const modal = createModal();
    if (!modal)
        return;
    const { root, handleClose } = modal;
    root.render(_jsx(ModalConfirmContainer, { ...props, open: true, icon: icon, animation: animation, onClose: () => {
            onCancel?.();
            handleClose();
        }, onConfirm: () => {
            handleClose();
            onConfirm?.();
        }, confirmText: confirmText, cancelText: cancelText, buttonColor: "danger", children: content }));
};
export default DangerModal;

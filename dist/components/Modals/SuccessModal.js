import { jsx as _jsx } from "react/jsx-runtime";
import Icon from '../Icon';
import ModalConfirmContainer from './ModalConfirmContainer';
import { createModal } from './modalManager';
const SuccessModal = ({ icon = (_jsx(Icon, { name: "check", size: 24, strokeWidth: 3, className: "text-success-main dark:text-success-main-dark" })), content, confirmText = 'OK', onConfirm, customAction, animation, ...props }) => {
    const modal = createModal();
    if (!modal)
        return;
    const { root, handleClose } = modal;
    root.render(_jsx(ModalConfirmContainer, { ...props, open: true, icon: icon, animation: animation, onConfirm: () => {
            onConfirm?.();
            handleClose();
        }, confirmText: confirmText, buttonColor: "success", customAction: customAction, children: content }));
};
export default SuccessModal;

import { jsx as _jsx } from "react/jsx-runtime";
import Icon from '../Icon';
import ModalConfirmContainer from './ModalConfirmContainer';
import { createModal } from './modalManager';
const InfoModal = ({ icon = (_jsx(Icon, { name: "alert-circle", size: 24, strokeWidth: 3, className: "text-info-main dark:text-info-main-dark" })), title, content, confirmText = 'OK', onConfirm, animation, customAction, }) => {
    const modal = createModal();
    if (!modal)
        return;
    const { root, handleClose } = modal;
    root.render(_jsx(ModalConfirmContainer, { open: true, title: title, icon: icon, animation: animation, onConfirm: () => {
            onConfirm?.();
            handleClose();
        }, confirmText: confirmText, buttonColor: "info", customAction: customAction, children: content }));
};
export default InfoModal;

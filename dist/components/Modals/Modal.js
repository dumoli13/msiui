import { jsx as _jsx } from "react/jsx-runtime";
import ConfirmModal from './ConfirmModal';
import DangerModal from './DangerModal';
import InfoModal from './InfoModal';
import ModalContainer from './ModalContainer';
import PrimaryModal from './PrimaryModal';
import SuccessModal from './SuccessModal';
import WarningModal from './WarningModal';
const Modal = (props) => {
    return _jsx(ModalContainer, Object.assign({}, props));
};
Modal.confirm = ConfirmModal;
Modal.success = SuccessModal;
Modal.info = InfoModal;
Modal.warning = WarningModal;
Modal.danger = DangerModal;
Modal.primary = PrimaryModal;
export default Modal;

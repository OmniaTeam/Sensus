import { ReactNode } from "react";

interface ModalProps {
    onClose: () => void;
    children: ReactNode
}

export default function Modal(props: ModalProps) {
    return <div className="modal--overlay" onClick={props.onClose}>
        <div 
            className="modal--content" 
            onClick={(e) => e.stopPropagation()}>
            {props.children}
        </div>
    </div>
}
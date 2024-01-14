import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ModalProps {
    onClose: () => void;
    children: ReactNode
}

export default function Modal(props: ModalProps) {
    return <div className="modal--overlay" onClick={props.onClose}>
        <motion.div 
            className="modal--content"
            key="modal"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            onClick={(e) => e.stopPropagation()}>
            {props.children}
        </motion.div>
    </div>
}
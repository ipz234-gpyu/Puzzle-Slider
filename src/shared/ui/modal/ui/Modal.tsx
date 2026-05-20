import {type ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    showCloseButton?: boolean;
    closeOnOverlayClick?: boolean;
    children: ReactNode;
}

export const Modal = ({
    isOpen,
    onClose,
    title,
    showCloseButton = true,
    closeOnOverlayClick = true,
    children,
}: ModalProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !mounted) return null;

    return createPortal(
        <div className={styles.overlay} onClick={closeOnOverlayClick ? onClose : undefined}>
            <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    {title && <h2 className={styles.title}>{title}</h2>}
                    {showCloseButton && (
                        <button className={styles.closeButton} onClick={onClose}>
                            &times;
                        </button>
                    )}
                </div>
                <div className={styles.body}>{children}</div>
            </div>
        </div>,
        document.body
    );
};
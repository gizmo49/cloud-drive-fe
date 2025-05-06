'use client';

import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    size?: 'sm' | 'md' | 'lg';
}

const Modal = ({ isOpen, onClose, title, children, size = 'md' }: ModalProps) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div className={styles.modalOverlay} onClick={onClose}>
            <div 
                className={`${styles.modalContent} ${styles[size]}`}
                onClick={e => e.stopPropagation()}
            >
                {title && (
                    <div className={styles.modalHeader}>
                        <h3 className={styles.modalTitle}>{title}</h3>
                        <button 
                            className={styles.closeButton}
                            onClick={onClose}
                            aria-label="Close modal"
                        >
                            ×
                        </button>
                    </div>
                )}
                <div className={styles.modalBody}>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
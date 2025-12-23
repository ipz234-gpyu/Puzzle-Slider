import {type ReactNode, useState} from 'react';
import {Button, type ButtonProps} from '@/shared/ui/button';
import {Modal} from '@/shared/ui/modal';

interface ModalFormButtonProps {
    trigger?: ReactNode;
    buttonText?: string;
    buttonProps?: Omit<ButtonProps, 'onClick'>;
    modalTitle: string;
    renderForm: (onClose: () => void) => ReactNode;
    className?: string;
}

export const ModalFormButton = ({
    trigger,
    buttonText = 'Open',
    buttonProps,
    modalTitle,
    renderForm,
    className
}: ModalFormButtonProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    return (
        <>
            {trigger ? (
                <div onClick={handleOpen} className={className} style={{ cursor: 'pointer', display: 'inline-block' }}>
                    {trigger}
                </div>
            ) : (
                <Button variant="outline" className={className} size="sm" {...buttonProps} onClick={handleOpen}>
                    {buttonText}
                </Button>
            )}
            <Modal
                isOpen={isModalOpen}
                onClose={handleClose}
                title={modalTitle}
            >
                {renderForm(handleClose)}
            </Modal>
        </>
    );
};

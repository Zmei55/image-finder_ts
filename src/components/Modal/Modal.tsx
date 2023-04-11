import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalContent } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root') as HTMLElement;

interface IModalEl {
  children: ReactNode;
  onClose(): void;
}

export function Modal({ children, onClose }: IModalEl) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (event: { code: string }) => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick: React.MouseEventHandler<
    HTMLDivElement
  > = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalContent>{children}</ModalContent>
    </Overlay>,
    modalRoot,
  );
}

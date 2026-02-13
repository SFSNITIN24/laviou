"use client";

import { Modal } from "antd";

interface ModalComponentProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  mask?: {
    closable?: boolean;
  };
  closable?: boolean;
}

export default function ModalComponent({
  open,
  onClose,
  children,
  mask = { closable: true },
  closable = true,
}: ModalComponentProps) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      destroyOnHidden
      mask={mask}
      closable={closable}
      width="auto"
      
     styles={{
        body: {
          padding: 0,
          background: "transparent",
        },
        header: {
          display: "none",
        },
      }}
    >
      {children}
    </Modal>
  );
}

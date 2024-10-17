import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";

export const Route = createFileRoute("/_components/Modal")({
  component: () => <div>Hello /_components/Modal!</div>,
});

interface ModalProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onConfirm?: () => void;
  body: React.ReactNode;
  title: string;
  description: string;
  onClose?: () => void;
}

export function Modal({
  mobileMenuOpen,
  setMobileMenuOpen,
  title,
  description,
  body,
  onClose,
  onConfirm,
}: ModalProps) {
  return (
    <AnimatePresence>
      {mobileMenuOpen && (
        <Dialog
          unmount
          open={mobileMenuOpen}
          onClose={() => {
            setMobileMenuOpen(false);
            onClose && onClose();
          }}
          className="relative z-50"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30"
          />
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel
              as={motion.div}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-lg space-y-4 rounded-xl bg-white pb-8 pl-12 pr-12 pt-8"
            >
              <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
              <Description>{description}</Description>
              <div className="pb-4 pt-4">{body}</div>

              <div className="flex justify-between gap-4">
                <button
                  className="text-red-600"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onClose && onClose();
                  }}
                >
                  Cancelar
                </button>
                <button
                  className="rounded-lg bg-orange-500 p-2 text-white transition-all duration-500 hover:bg-orange-600"
                  onClick={() => {
                    onConfirm && onConfirm();
                    setMobileMenuOpen(false);
                    onClose && onClose();
                  }}
                >
                  Confirmar
                </button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}

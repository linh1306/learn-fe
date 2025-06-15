import React, { useMemo, useRef } from "react";
import { JSXElementConstructor, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createContext, useContext, useState } from "react";
import { useIsMobile } from "./use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
export interface BaseModalProps {
  onSuccess?: () => void;
  onClose?: () => void;
  modals: ModalControls<any>;
  close: () => void;
}

export type ModalComponent<P = object> = React.ComponentType<
  P & BaseModalProps
>;

export type ModalInfo<P = BaseModalProps> = {
  title: ReactNode | string;
  component: JSXElementConstructor<P>;
};

export type ModalControls<T extends Record<string, ModalInfo<any>>> = {
  [K in keyof T]: T[K] extends ModalInfo<infer P>
    ? (props?: Omit<P, keyof BaseModalProps>) => void
    : never;
} & {
  closeModal: () => void;
  closeAllModals: () => void;
};

export interface ModalState {
  key: string;
  title: ReactNode | string;
  component: ReactNode;
  props?: any;
}

export interface ModalContextType {
  openModal: (modal: ModalState) => void;
  closeModal: () => void;
  closeAllModals: () => void;
}

export function useAppModal<T extends Record<string, ModalInfo<any>>>(
  modals: T
): ModalControls<T> {
  const { openModal, closeModal, closeAllModals } = useModal();
  const modalControlsRef = useRef<ModalControls<T>>(null!);

  const modalControls = useMemo(() => {
    const result: ModalControls<T> = {
      closeModal,
      closeAllModals,
    } as ModalControls<T>;

    Object.entries(modals).forEach(([key, { title, component: Component }]) => {
      result[key as keyof T] = ((props?: any) =>
        openModal({
          key,
          title,
          component: (
            <Component
              {...props}
              modals={modalControlsRef.current}
              close={closeModal}
            />
          ),
          props,
        })) as ModalControls<T>[keyof T];
    });

    return result;
  }, [modals, openModal, closeModal, closeAllModals]);

  modalControlsRef.current = modalControls;
  return modalControls;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();
  const [modals, setModals] = useState<ModalState[]>([]);

  const openModal = (modal: ModalState) => {
    setModals((prev) => [
      ...prev,
      { ...modal, key: `${modal.key}-${Date.now()}` },
    ]);
  };

  const closeModal = () => {
    setModals((prev) => prev.slice(0, -1));
  };

  const closeAllModals = () => {
    setModals([]);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, closeAllModals }}>
      {children}
      {modals.map((modal) =>
        isMobile ? (
          <Drawer
            key={modal.key}
            open={true}
            onOpenChange={(open) => {
              if (!open) closeModal();
            }}
          >
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>{modal.title}</DrawerTitle>
              </DrawerHeader>
              <div className="p-4">{modal.component}</div>
            </DrawerContent>
          </Drawer>
        ) : (
          <Dialog
            key={modal.key}
            open={true}
            onOpenChange={(open) => {
              if (!open) closeModal();
            }}
          >
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{modal.title}</DialogTitle>
              </DialogHeader>
              <div className="py-4">{modal.component}</div>
            </DialogContent>
          </Dialog>
        )
      )}
    </ModalContext.Provider>
  );
}

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
};

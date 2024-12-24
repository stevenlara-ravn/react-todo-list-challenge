import { create } from "zustand";
import { ModalStore } from "../types/Modal";


export const useModalStore = create<ModalStore>(
    (set) => ({
        showModal: false,
        mode: null,
        task: null,
        setShowModal: (showModal: boolean, mode = null, task = null) =>
            set({ showModal, mode, task }),
    })
)
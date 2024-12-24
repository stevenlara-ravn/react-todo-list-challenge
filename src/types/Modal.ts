import { Task, TaskFormMode } from "./Task";

export interface ModalStore {
    showModal: boolean;
    mode: TaskFormMode | null;
    task: Task | null;
    setShowModal: (showModal: boolean, mode?: TaskFormMode | null, task?: Task | null) => void;
}

export interface FormSelectorProps {
    mode?: TaskFormMode,
    task?: Task,
    onClose: () => void
}
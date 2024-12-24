import { createPortal } from "react-dom";
import { FormSelectorProps, ModalStore } from "../types/Modal";
import CreateTaskForm from "./CreateTaskForm";
import EditTaskForm from "./EditTaskForm";

const FormSelector = ({ mode = 'create', task, onClose }: FormSelectorProps) => {
  switch (mode) {
    case 'create':
      return <CreateTaskForm onClose={onClose} />
    case 'edit':
      if (!task) {
        return null;
      }
      return <EditTaskForm task={task} onClose={onClose} />
  }
}

export default function TaskForm({ showModal, setShowModal, mode, task }: ModalStore) {
  return (
    showModal && createPortal(
      <FormSelector
        mode={mode || 'create'}
        task={task || undefined}
        onClose={() => setShowModal(false)}
      />,
      document.body,
    )
  )
}

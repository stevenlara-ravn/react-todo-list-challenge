import { createPortal } from "react-dom";
import { useModalStore } from "../stores/modal";
import { FormSelectorProps } from "../types/Modal";
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

export default function TaskForm() {
  const { showModal, setShowModal, mode, task } = useModalStore((state) => state)

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

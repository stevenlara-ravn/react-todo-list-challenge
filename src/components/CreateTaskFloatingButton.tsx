import { Plus } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import TaskForm from "./TaskForm";

export default function CreateTaskFloatingButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="bg-black rounded-lg p-2 fixed text-white bottom-9"
        onClick={() => setShowModal(true)}
      >
        <Plus size={30} color="currentColor" />
      </button>
      {
        showModal && createPortal(
          <TaskForm onClose={() => setShowModal(false)} />,
          document.body
        )
      }
    </>
  )
}
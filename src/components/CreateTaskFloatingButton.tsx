import { Plus } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import TaskForm from "./TaskForm";

export default function CreateTaskFloatingButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="nm-inset-slate-700-xl rounded-lg p-4 fixed text-white bottom-6 hover:nm-inset-slate-500-xl"
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
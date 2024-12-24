import { Plus } from "lucide-react";
import { useModalStore } from "../stores/modal";
import { ModalStore } from "../types/Modal";


export default function CreateTaskFloatingButton() {
  const setShowModal = useModalStore((state: ModalStore) => state.setShowModal)

  return (
    <>
      <button
        className="nm-inset-slate-700-xl rounded-lg p-4 fixed text-white bottom-6 hover:nm-inset-slate-500-xl"
        onClick={() => setShowModal(true)}
      >
        <Plus size={30} color="currentColor" />
      </button>
    </>
  )
}
import { SquareX } from "lucide-react";
import { Task, TaskFormMode } from "../types/Task";

interface FormLayoutProps {
  handleSubmit: (data: any) => void;
  onClose: () => void;
  onSubmit: (data: any) => void;
  errors: any;
  register: any;
  dataItem?: Task
  formMode: TaskFormMode
}

export default function TaskFormLayout({
  handleSubmit,
  onClose,
  onSubmit,
  errors,
  register,
  dataItem,
  formMode
}: FormLayoutProps
) {
  return (
    <form
      className="relative flex flex-col justify-center items-stretch w-96 h-[40rem] bg-gray-300 p-10 gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-0 right-0 p-2"
      >
        <SquareX size={25} />
      </button>

      <label className="text-xl flex flex-col justify-stretch">
        Task Title
        <input
          type="text"
          {...register("title")}
          className="border-2 border-black rounded-lg p-2 text-black"
          placeholder="Buy some fruits"
          defaultValue={dataItem?.title}
        />
        {errors.title && (
          <span className="text-red-500 text-sm">{errors.title.message}</span>
        )}
      </label>

      <label className="text-xl flex flex-col justify-stretch">
        Task Priority
        <select
          {...register("priority")}
          className="border-2 border-black rounded-lg p-2 text-black"
        >

          {
            dataItem?.priority &&
            <option value={dataItem.priority}>{dataItem.priority}</option>
          }
          <option value="Urgent">Urgent</option>
          <option value="High">High</option>
          <option value="Normal">Normal</option>
          <option value="Low">Low</option>
        </select>
        {errors.priority && (
          <span className="text-red-500 text-sm">{errors.priority.message}</span>
        )}
      </label>

      <label className="text-xl flex flex-col justify-stretch">
        Story Points
        <input
          type="number"
          {...register("storyPoints")}
          className="border-2 border-black rounded-lg p-2 text-black"
          placeholder="From 1 to 20"
          defaultValue={dataItem?.storyPoints}
        />
        {errors.storyPoints && (
          <span className="text-red-500 text-sm">{errors.storyPoints.message}</span>
        )}
      </label>

      <label className="text-xl flex flex-col justify-stretch">
        Assignee
        <input
          type="text"
          {...register("assignee")}
          className="border-2 border-black rounded-lg p-2 text-black"
          placeholder="username"
          defaultValue={dataItem?.assignee}
        />
        {errors.assignee && (
          <span className="text-red-500 text-sm">{errors.assignee.message}</span>
        )}
      </label>

      <label className="text-xl flex flex-col justify-stretch">
        Due Date
        <input
          type="date"
          {...register("dueDate")}
          className="border-2 border-black rounded-lg p-2 text-black"
          placeholder="Enter Task Due Date"
          defaultValue={dataItem?.dueDate}
        />
        {errors.dueDate && (
          <span className="text-red-500 text-sm">{errors.dueDate.message}</span>
        )}
      </label>

      <input
        className="bg-black rounded-lg p-2 text-white w-full mt-2 cursor-pointer"
        type="submit"
        value={formMode === 'create' ? "Create Task" : "Update Task"}
      />
    </form>
  )
}
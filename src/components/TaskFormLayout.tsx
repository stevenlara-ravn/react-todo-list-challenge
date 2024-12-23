import { X } from "lucide-react";
import { FieldValues, SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import { Task, TaskFormMode } from "../types/Task";

interface FormLayoutProps {
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onClose: () => void;
  onSubmit: SubmitHandler<FieldValues>;
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
      className="relative flex flex-col justify-center items-stretch w-96 h-[40rem] nm-flat-slate-500-xl p-10 gap-3 text-slate-200"
      onSubmit={handleSubmit(onSubmit)}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-3 p-1 nm-flat-slate-500-sm rounded-xl"
      >
        <X size={25} color="white" />
      </button>

      <label className="text-xl flex flex-col justify-stretch">
        Task Title
        <input
          type="text"
          {...register("title")}
          className="nm-inset-slate-500-sm rounded-lg p-2 text-slate-300 focus:outline-none focus:text-white focus:nm-inset-slate-500"
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
          className="nm-inset-slate-500-sm rounded-lg p-2 text-slate-300 focus:outline-none focus:text-white focus:nm-inset-slate-500"
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
          className="nm-inset-slate-500-sm rounded-lg p-2 text-slate-300 focus:outline-none focus:text-white focus:nm-inset-slate-500"
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
          className="nm-inset-slate-500-sm rounded-lg p-2 text-slate-300 focus:outline-none focus:text-white focus:nm-inset-slate-500"
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
          className="nm-inset-slate-500-sm rounded-lg p-2 text-slate-300 focus:outline-none focus:text-white focus:nm-inset-slate-500"
          placeholder="Enter Task Due Date"
          defaultValue={dataItem?.dueDate}
        />
        {errors.dueDate && (
          <span className="text-red-500 text-sm">{errors.dueDate.message}</span>
        )}
      </label>

      <input
        className="nm-flat-slate-500-lg rounded-lg p-2 text-slate-200 w-full mt-2 cursor-pointer"
        type="submit"
        value={formMode === 'create' ? "Create Task" : "Update Task"}
      />
    </form>
  )
}
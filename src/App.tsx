import CreateTaskFloatingButton from "./components/CreateTaskFloatingButton"
import SearchTask from "./components/SearchTask"
import TaskList from "./components/TaskList"

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center max-w-7xl w-full h-screen mx-auto py-10 px-5">
      <div className="flex flex-col items-center justify-between max-w-4xl w-full h-[100rem] nm-flat-slate-500-sm px-10">
        <div className="flex flex-col items-center justify-center w-full h-1/6 gap-5">
          <h1 className="text-4xl p-3 text-slate-300 font-bold">Todo App</h1>

          <SearchTask />
        </div>

        <main className="flex flex-col items-center justify-center w-full h-[40rem] py-10 overflow-hidden rounded-lg">
          <TaskList />
        </main>

        <CreateTaskFloatingButton />
      </div>
    </div>
  )
}

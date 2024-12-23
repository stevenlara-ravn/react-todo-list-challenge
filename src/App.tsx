import CreateTaskFloatingButton from "./components/CreateTaskFloatingButton"
import SearchTask from "./components/SearchTask"
import TaskList from "./components/TaskList"


function App() {
  return (
    <div className="flex flex-col items-center justify-center max-w-7xl w-full h-screen mx-auto py-10">
      <div className="flex flex-col items-center justify-between max-w-4xl w-full h-[100rem] bg-red-300">
        <div className="flex flex-col items-center justify-center w-full h-1/6 gap-5 bg-gray-300">
          <h1 className="text-4xl p-3">Todo App</h1>

          <SearchTask />
        </div>

        <main className="flex flex-col items-center justify-center w-full h-[40rem] bg-blue-300 py-10 overflow-hidden">
          <TaskList />
        </main>

        <CreateTaskFloatingButton />
      </div>
    </div>
  )
}

export default App

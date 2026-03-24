import { FiPlus } from "react-icons/fi"

function TaskInput({
    taskName,
    setTaskName,
    dueDate,
    setDueDate,
    handleAddTask
}) {

    return (

        <div className="mt-8">

            <div className="bg-[#1f2a37] p-4 rounded-lg shadow flex gap-4 items-center">

                {/* TASK INPUT */}

                <input
                    type="text"
                    placeholder="What needs to be done?"
                    className="flex-1 bg-white text-black px-4 py-2 rounded outline-none"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />

                {/* DATE INPUT */}

                <input
                    type="date"
                    className="bg-white px-3 py-2 rounded outline-none"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />

                {/* ADD BUTTON */}

                <button
                    onClick={handleAddTask}
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition"
                >
                    <FiPlus />
                    Add
                </button>

            </div>

        </div>

    )

}

export default TaskInput
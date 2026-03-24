import { FaTrash } from "react-icons/fa"

function TaskRow({ task, toggleStatus, deleteTask }) {

    const today = new Date()
    const dueDate = new Date(task.dueDate)

    const diffTime = dueDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    const isOverdue = diffDays < 0 && task.status !== "DONE"

    let status = task.status
    if (isOverdue) status = "BACKLOG"

    let dateMessage = ""

    if (status === "DONE") {
        dateMessage = "Completed"
    } else if (isOverdue) {
        dateMessage = `Overdue by ${Math.abs(diffDays)} day(s)`
    } else if (diffDays === 0) {
        dateMessage = "Due today"
    } else if (diffDays === 1) {
        dateMessage = "Due tomorrow"
    } else {
        dateMessage = `Due in ${diffDays} days`
    }

    const statusStyle =
        status === "Done"
            ? "bg-green-100 text-green-700"
            : status === "Backlog"
                ? "bg-red-100 text-red-600"
                : "bg-yellow-100 text-yellow-700"

    return (
        <tr
            className={`border-b hover:bg-gray-50 transition ${isOverdue ? "bg-red-50" : ""
                }`}
        >

            {/* Task Name */}

            <td className="p-3 flex items-center gap-2">

                <input
                    type="checkbox"
                    checked={status === "Done"}
                    onChange={() => toggleStatus(task.id)}
                />

                <span
                    className={
                        status === "Done"
                            ? "line-through text-gray-400"
                            : "text-gray-800"
                    }
                >
                    {task.name}
                </span>

            </td>

            {/* Due Date */}

            <td>

                <div className="flex flex-col">

                    <span
                        className={`text-sm ${isOverdue ? "text-red-500 font-medium" : ""
                            }`}
                    >
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No Date"}
                    </span>

                    <span className="text-xs text-gray-500">
                        {dateMessage}
                    </span>

                </div>

            </td>

            {/* Status */}

            <td>

                <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${statusStyle}`}
                >
                    {status}
                </span>

            </td>

            {/* Delete */}

            <td>

                <button
                    onClick={() => deleteTask(task._id)}
                    className="text-red-500 hover:text-red-700 transition"
                >
                    <FaTrash />
                </button>

            </td>

        </tr>
    )
}

export default TaskRow
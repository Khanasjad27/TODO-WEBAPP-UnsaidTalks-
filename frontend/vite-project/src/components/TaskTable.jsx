import { FiTrash } from "react-icons/fi"

function TaskTable({ tasks = [], toggleStatus, deleteTask }) {

    return (

        <div className="mt-8">

            <table className="w-full bg-white shadow-md rounded-xl overflow-hidden">

                <thead className="bg-gray-100">

                    <tr className="text-left text-sm text-gray-600">

                        <th className="p-3"></th>
                        <th className="p-3">Task Name</th>
                        <th className="p-3">Due Date</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Delete</th>

                    </tr>

                </thead>

                <tbody>

                    {tasks.map((task) => {

                        const dueDateValue = task.due_date || task.dueDate

                        const dueDate = dueDateValue
                            ? new Date(dueDateValue)
                            : null

                        const today = new Date()

                        let dateStatus = ""
                        let displayStatus = task.status

                        // FIX: Don't show due/overdue text when task is DONE
                        if (dueDate && task.status !== "DONE") {

                            const diff = Math.ceil(
                                (dueDate - today) / (1000 * 60 * 60 * 24)
                            )

                            if (diff > 0) {
                                dateStatus = `Due in ${diff} days`
                            }

                            else if (diff === 0) {
                                dateStatus = "Due today"
                            }

                            else {

                                dateStatus = `Overdue by ${Math.abs(diff)} days`

                                // CHANGE STATUS TO BACKLOG IF OVERDUE
                                displayStatus = "BACKLOG"

                            }

                        }

                        return (

                            <tr
                                key={task._id}
                                className="border-b hover:bg-gray-50 transition"
                            >

                                {/* CHECKBOX */}

                                <td className="p-3">

                                    <input
                                        type="checkbox"
                                        checked={task.status === "DONE"}
                                        onChange={() => toggleStatus(task)}
                                        className="cursor-pointer"
                                    />

                                </td>

                                {/* TASK NAME */}

                                <td
                                    className={`p-3 font-medium transition ${task.status === "DONE"
                                            ? "line-through text-gray-400"
                                            : "text-gray-800"
                                        }`}
                                >
                                    {task.title}
                                </td>

                                {/* DUE DATE */}

                                <td className="p-3 text-sm">

                                    {dueDate
                                        ? dueDate.toLocaleDateString()
                                        : "No Date"}

                                    {dateStatus && (

                                        <p
                                            className={`text-xs mt-1 ${dateStatus.includes("Overdue")
                                                    ? "text-red-500"
                                                    : dateStatus.includes("today")
                                                        ? "text-orange-500"
                                                        : "text-gray-500"
                                                }`}
                                        >

                                            {dateStatus}

                                        </p>

                                    )}

                                </td>

                                {/* STATUS */}

                                <td className="p-3">

                                    <span
                                        className={
                                            displayStatus === "DONE"
                                                ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold"
                                                : displayStatus === "BACKLOG"
                                                    ? "bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold"
                                                    : "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold"
                                        }
                                    >

                                        {displayStatus}

                                    </span>

                                </td>

                                {/* DELETE */}

                                <td className="p-3">

                                    <FiTrash
                                        className="text-red-500 cursor-pointer hover:text-red-700 transition"
                                        onClick={() => deleteTask(task._id)}
                                    />

                                </td>

                            </tr>

                        )

                    })}

                </tbody>

            </table>

        </div>

    )

}

export default TaskTable
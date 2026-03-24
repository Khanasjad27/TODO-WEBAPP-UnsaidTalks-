import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import TaskInput from "../components/TaskInput";
import TaskTable from "../components/TaskTable";
import EmptyState from "../components/EmptyState";

import api from "../services/api";

function Dashboard() {


    const [taskName, setTaskName] = useState("");
    const [dueDate, setDueDate] = useState("");


    const [tasks, setTasks] = useState([]);


    const fetchTasks = async () => {

        try {

            const res = await api.get("/api/task");
            const taskData = res.data.tasks || res.data || [];

            setTasks(taskData);

        } catch (err) {

            console.log("fetch task error:", err);

        }

    };

    useEffect(() => {

        fetchTasks();

    }, []);

    const handleAddTask = async () => {

        // prevent empty task
        if (!taskName) return;

        try {

            await api.post("/api/task", {
                title: taskName,
                due_date: dueDate
            });

            // reset inputs
            setTaskName("");
            setDueDate("");

            // reload task list
            fetchTasks();

        } catch (err) {
            console.log("add task error:", err);
        }
    };

    const toggleStatus = async (task) => {

        try {

            const newStatus = task.status === "DONE" ? "PENDING" : "DONE";

            await api.patch(`/api/task/${task._id}`, {
                status: newStatus
            });

            fetchTasks();

        } catch (err) {

            console.log("toggle status error:", err);

        }

    };
    const deleteTask = async (id) => {

        try {

            await api.delete(`/api/task/${id}`);

            fetchTasks();

        } catch (err) {

            console.log("delete task error:", err);

        }

    };

    return (

        <div className="min-h-screen bg-gray-100">

            {/* NAVBAR */}
            <Navbar />

            {/* CENTERED CONTENT */}
            <div className="max-w-5xl mx-auto px-4">

                {/* TASK INPUT */}
                <TaskInput
                    taskName={taskName}
                    setTaskName={setTaskName}
                    dueDate={dueDate}
                    setDueDate={setDueDate}
                    handleAddTask={handleAddTask}
                />

                {/* TASK LIST */}
                {tasks.length === 0 ? (

                    <EmptyState />

                ) : (

                    <TaskTable
                        tasks={tasks}
                        toggleStatus={toggleStatus}
                        deleteTask={deleteTask}
                    />

                )}

            </div>

        </div>

    );

}

export default Dashboard;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";

import API from "../services/api";

function Dashboard() {

    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] =
        useState("All");

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [editingTask, setEditingTask] =
        useState(null);

    const [editForm, setEditForm] =
        useState({});

    const fetchTasks = async () => {

        try {

            const response =
                await API.get("/tasks");

            setTasks(response.data);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Unable to load tasks"
            );

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const deleteTask = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this task?"
            );

        if (!confirmDelete) return;

        try {

            await API.delete(`/tasks/${id}`);

            setTasks(
                tasks.filter(
                    task => task._id !== id
                )
            );

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Delete failed"
            );
        }
    };

    const startEdit = (task) => {

        setEditingTask(task._id);

        setEditForm({
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            dueDate: task.dueDate
                ? task.dueDate.substring(0, 10)
                : ""
        });
    };

    const handleEditChange = (e) => {

        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        });
    };

    const saveEdit = async (id) => {

        try {

            const response =
                await API.put(
                    `/tasks/${id}`,
                    editForm
                );

            setTasks(
                tasks.map(task =>
                    task._id === id
                        ? response.data
                        : task
                )
            );

            setEditingTask(null);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Update failed"
            );
        }
    };

    const filteredTasks = tasks.filter(task => {

        const matchesSearch =
            task.title
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "All" ||
            task.status === statusFilter;

        return (
            matchesSearch &&
            matchesStatus
        );
    });

    const completedTasks =
        tasks.filter(
            task => task.status === "Completed"
        ).length;

    const pendingTasks =
        tasks.filter(
            task => task.status === "Pending"
        ).length;

    const inProgressTasks =
        tasks.filter(
            task => task.status === "In Progress"
        ).length;

    return (
        <div>

            <Navbar />

            <main className="dashboard">

                <div className="dashboard-top">

                    <div>
                        <h1>My Tasks</h1>

                        <p>
                            Manage your tasks efficiently
                        </p>
                    </div>

                    <button
                        className="add-btn"
                        onClick={() =>
                            navigate("/add-task")
                        }
                    >
                        + Add Task
                    </button>

                </div>

                <div className="stats">

                    <div className="stat-card">
                        <h3>Total</h3>
                        <strong>
                            {tasks.length}
                        </strong>
                    </div>

                    <div className="stat-card">
                        <h3>Pending</h3>
                        <strong>
                            {pendingTasks}
                        </strong>
                    </div>

                    <div className="stat-card">
                        <h3>In Progress</h3>
                        <strong>
                            {inProgressTasks}
                        </strong>
                    </div>

                    <div className="stat-card">
                        <h3>Completed</h3>
                        <strong>
                            {completedTasks}
                        </strong>
                    </div>

                </div>

                <div className="filters">

                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(
                                e.target.value
                            )
                        }
                    >

                        <option value="All">
                            All
                        </option>

                        <option value="Pending">
                            Pending
                        </option>

                        <option value="In Progress">
                            In Progress
                        </option>

                        <option value="Completed">
                            Completed
                        </option>

                    </select>

                </div>

                {loading && (
                    <p>Loading tasks...</p>
                )}

                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}

                {!loading &&
                    filteredTasks.length === 0 && (
                        <div className="empty">
                            <h2>
                                No tasks found
                            </h2>

                            <p>
                                Create your first task.
                            </p>
                        </div>
                    )}

                <div className="task-list">

                    {filteredTasks.map(task => (

                        <div key={task._id}>

                            {editingTask === task._id ? (

                                <div className="edit-card">

                                    <input
                                        name="title"
                                        value={editForm.title}
                                        onChange={handleEditChange}
                                    />

                                    <textarea
                                        name="description"
                                        value={editForm.description}
                                        onChange={handleEditChange}
                                    />

                                    <select
                                        name="status"
                                        value={editForm.status}
                                        onChange={handleEditChange}
                                    >
                                        <option>
                                            Pending
                                        </option>

                                        <option>
                                            In Progress
                                        </option>

                                        <option>
                                            Completed
                                        </option>
                                    </select>

                                    <select
                                        name="priority"
                                        value={editForm.priority}
                                        onChange={handleEditChange}
                                    >
                                        <option>
                                            Low
                                        </option>

                                        <option>
                                            Medium
                                        </option>

                                        <option>
                                            High
                                        </option>
                                    </select>

                                    <input
                                        type="date"
                                        name="dueDate"
                                        value={editForm.dueDate}
                                        onChange={handleEditChange}
                                    />

                                    <button
                                        onClick={() =>
                                            saveEdit(task._id)
                                        }
                                    >
                                        Save
                                    </button>

                                    <button
                                        onClick={() =>
                                            setEditingTask(null)
                                        }
                                    >
                                        Cancel
                                    </button>

                                </div>

                            ) : (

                                <TaskCard
                                    task={task}
                                    onEdit={startEdit}
                                    onDelete={deleteTask}
                                />

                            )}

                        </div>

                    ))}

                </div>

            </main>

        </div>
    );
}

export default Dashboard;
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

function AddTask() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "Pending",
        priority: "Medium",
        dueDate: ""
    });

    const [error, setError] =
        useState("");

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.post(
                "/tasks",
                form
            );

            navigate("/dashboard");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to create task"
            );
        }
    };

    return (
        <div className="form-page">

            <div className="form-card">

                <h1>Add New Task</h1>

                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit}>

                    <label>
                        Task Title
                    </label>

                    <input
                        type="text"
                        name="title"
                        placeholder="Enter task title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />

                    <label>
                        Description
                    </label>

                    <textarea
                        name="description"
                        placeholder="Enter description"
                        value={form.description}
                        onChange={handleChange}
                    />

                    <label>
                        Status
                    </label>

                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
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

                    <label>
                        Priority
                    </label>

                    <select
                        name="priority"
                        value={form.priority}
                        onChange={handleChange}
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

                    <label>
                        Due Date
                    </label>

                    <input
                        type="date"
                        name="dueDate"
                        value={form.dueDate}
                        onChange={handleChange}
                    />

                    <button type="submit">
                        Create Task
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        Cancel
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AddTask;
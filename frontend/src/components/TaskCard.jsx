function TaskCard({
    task,
    onEdit,
    onDelete
}) {

    return (
        <div className="task-card">

            <div className="task-header">

                <h3>{task.title}</h3>

                <span
                    className={`priority ${task.priority.toLowerCase()}`}
                >
                    {task.priority}
                </span>

            </div>

            <p>
                {task.description}
            </p>

            <div className="task-info">

                <span>
                    Status: {task.status}
                </span>

                {task.dueDate && (
                    <span>
                        Due:{" "}
                        {new Date(
                            task.dueDate
                        ).toLocaleDateString()}
                    </span>
                )}

            </div>

            <div className="task-actions">

                <button
                    onClick={() => onEdit(task)}
                >
                    Edit
                </button>

                <button
                    className="delete-btn"
                    onClick={() =>
                        onDelete(task._id)
                    }
                >
                    Delete
                </button>

            </div>

        </div>
    );
}

export default TaskCard;
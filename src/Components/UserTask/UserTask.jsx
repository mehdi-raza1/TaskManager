import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import { updateTask, deleteTask } from "../../redux/userSlice";
import { toast } from "react-toastify";

export default function UserTask() {
  const { id } = useParams();
  const user = useSelector((state) =>
    state.user.users.find((user) => user.id === parseInt(id))
  );
  // console.log(user)
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);
  const [taskID, setTaskID] = useState("");
  const onOpenModal = (taskId) => {
    const selectedTask = user.task.find((task) => task.taskId === taskId);
    setDate(selectedTask.taskDate);
    setTask(selectedTask.taskName);
    setOpen(true);
    setTaskID(taskId);
  };

  const onCloseModal = () => setOpen(false);

  const dispatch = useDispatch();
  function handleTaskSubmit() {
    dispatch(updateTask({ userId: user.id, Id: taskID, taskName: task, date }));
    console.log(id, taskID, task, date);
    setOpen(false);
  }

  function handlerDeleteTask(id) {
    dispatch(
      deleteTask({
        id: user.id,
        taskId: id,
      })
    );
    toast.warning("🦄 Task Deleted");
  }

  return (
    <div className="container mx-auto mt-5">
      <h2 className="capitalize mt-5 text-3xl">User name: {user.userName}</h2>
      <ul className="list-none">
        {user.task.map((task) => (
          <li
            key={task.taskId}
            onClick={() => onOpenModal(task.taskId)}
            className="mt-2 flex text-xl justify-between items-center bg-violet-200 hover:bg-violet-300 px-4 py-2 rounded cursor-pointer"
          >
            <div>
              <div className="capitalize">
                Task: <span className="ms-5 ">{task.taskName}</span>
              </div>
              <div className="text-base">
                Date: <span>{task.taskDate}</span>
              </div>
            </div>

            <div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlerDeleteTask(task.taskId);
                }}
                className="text-white capitalize bg-red-500 border-0 py-1 me-4 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Modal open={open} onClose={onCloseModal} center>
        <h2>Update Task </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleTaskSubmit();
          }}
        >
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="mt-2 mb-4 px-4 py-2 border rounded w-full"
            placeholder="Enter task"
          />
          <input
            type="date"
            name="taskDate"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date()}
            className="mb-4 px-4 py-2 border rounded w-full"
          />
          <button className="py-2 px-5 bg-blue-500 text-white font-semibold rounded shadow-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-75">
            Submit Task
          </button>
        </form>
      </Modal>
    </div>
  );
}

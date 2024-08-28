import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteTask, addTask } from "../../redux/userSlice";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";

function Users() {
  const userData = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => {
        console.log(error)
        toast.error("Failed to fetch Data")
      });
  }, []);

  function handleFetchUser() {
    users.forEach((user) => {
      dispatch(
        addUser({
          id: user.id,
          userName: user.username,
          task: [],
        })
      );
    });
  }

  // Modals
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const onOpenModal = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  // Modal for adding a task
  const [modalOpen, setModalOpen] = useState(false);
  const [taskUser, setTaskUser] = useState(null);
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const onOpenTaskModal = (user) => {
    setTaskUser(user);
    setModalOpen(true);
  };

  const onCloseTaskModal = () => {
    setModalOpen(false);
    setTaskUser(null);
    setTask("");
    setDate("");
    setError("");
  };

  const handleTaskSubmit = (id) => {
    if (!task || !date) {
      setError("Both task and date are required.");
      return;
    }

    dispatch(
      addTask({
        id: id,
        task: { taskId: nanoid(), taskName: task, taskDate: date },
      })
    );

    toast.success("🦄 Task Added");
    setTask("");
    setDate("");
    setError("");
    onCloseTaskModal();
  };

  const navigate = useNavigate();
  return (
    <div className="container mx-auto text-center mt-16">
      <button
        onClick={handleFetchUser}
        className="py-2 px-5 bg-violet-500 text-white font-semibold rounded-full shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75"
      >
        Fetch Users
      </button>

      <ul className="list-none mt-6">
        {userData.map((user,index) => (
          <li
            onClick={() => onOpenModal(user)}
            className="mt-2 flex justify-between items-center bg-violet-200 hover:bg-violet-300 px-4 py-2 rounded cursor-pointer"
            key={index}
          >
            <div>{user.userName}</div>
            <div>
              {user.task.length > 0 ? (
                <div>
                  <button
                    onClick={() => navigate(`/UserTask/${user.id}`)}
                    className="text-white capitalize bg-lime-500 border-0 py-1 me-4 px-4 focus:outline-none hover:bg-lime-600 rounded text-md"
                  >
                    View
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenTaskModal(user);
                    }}
                    className="text-white capitalize bg-green-500 border-0 py-1 me-4 px-4 focus:outline-none hover:bg-green-600 rounded text-md"
                  >
                    Add Task
                  </button>
                </div>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenTaskModal(user);
                  }}
                  className="text-white capitalize bg-green-500 border-0 py-1 me-4 px-4 focus:outline-none hover:bg-green-600 rounded text-md"
                >
                  Add Task
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Modal for displaying tasks */}
      <Modal open={open} onClose={onCloseModal} center>
        <h2>Tasks:</h2>
        {selectedUser && selectedUser.task.length > 0 ? (
          <ul>
            {selectedUser.task.map((task, index) => (
              <li key={index}>
                Task: {task.taskName} | Date:{" "}
                {new Date(task.taskDate).toLocaleDateString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks available.</p>
        )}
      </Modal>

      {/* Modal for adding tasks */}
      <Modal open={modalOpen} onClose={onCloseTaskModal} center>
        <h2>Add Task for {taskUser && taskUser.userName}</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleTaskSubmit(taskUser.id);
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

export default Users;

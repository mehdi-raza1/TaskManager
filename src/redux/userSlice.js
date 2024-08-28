import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const user = {
        id: action.payload.id,
        userName: action.payload.userName,
        task: action.payload.task,
      };
      state.users.push(user);
    },

    addTask: (state, action) => {
      let { id, task } = action.payload;
      let user = state.users.find((user) => user.id === id);
      if (user) {
        user.task.push(task);
      }
    },
    updateTask: (state, action) => {
      let { userId, Id, taskName, date } = action.payload;

      let userIndex = state.users.findIndex((user) => user.id === userId);

      if (userIndex !== -1) {
        let taskToUpdate = state.users[userIndex].task.findIndex(
          (task) => task.taskId === Id
        );

        if (taskToUpdate !== -1) {
          state.users[userIndex].task[taskToUpdate] = {
            ...state.users[userIndex].task[taskToUpdate],
            taskName: taskName,
            taskDate: date,
          };
        }
      }
    },

    deleteTask: (state, action) => {
      const { id, taskId } = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === id);

      if (userIndex !== -1) {
        state.users[userIndex].task = state.users[userIndex].task.filter(
          (task) => task.taskId !== taskId
        );
      }
    },
  },
});

export const { addUser, addTask, deleteTask, updateTask } = userSlice.actions;

export const userReducer = userSlice.reducer;

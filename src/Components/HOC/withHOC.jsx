import React from "react";
import { connect } from "react-redux";
import { addTask,updateTask,deleteTask,addUser} from "../../redux/userSlice";

const withHOC = (Component) => {
  const state = (state) => ({
    users: state.user.users,
  });

  const dispatch = {
    addTask,
    updateTask,
    deleteTask,
    addUser,
  };

  return connect(state, dispatch)((props) => 
  <Component {...props} />);
};

export default withHOC;

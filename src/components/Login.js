import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthUserAction } from "../auth/auth.action";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

function Login({ path_no_login, users, dispatch }) {
  let history = useHistory();
  const handleLoginBtn = (selectedUser) => {
    dispatch(setAuthUserAction(selectedUser));
    history.push(path_no_login ? path_no_login : "/");
  };
  let renderQuestions = null;
  if (users !== null) {
    const data = Object.keys(users).map((key) => (
      <div key={key}>
        <Button onClick={handleLoginBtn.bind(this, users[key])}>
          Login as {users[key].name}
          <Avatar src={users[key].avatarURL} alt={users[key].name} />
        </Button>
      </div>
    ));
    renderQuestions = (
      <div>
        <h1>Users:</h1>
        {data}
      </div>
    );
  }
  return <div>{renderQuestions}</div>;
}

Login.propTypes = {
  users: PropTypes.object,
  questions: PropTypes.object,
  auth_user: PropTypes.object,
};
function mapStateToProps({ users, questions, auth_user }) {
  return {
    users: users,
    questions: questions,
    auth_user: auth_user,
  };
}
export default connect(mapStateToProps)(Login);

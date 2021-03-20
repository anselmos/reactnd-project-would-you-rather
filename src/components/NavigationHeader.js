import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { setAuthUserAction } from "../auth/auth.action";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

function NavigationHeader({ auth_user, history, dispatch }) {
  const handleHome = (history) => {
    history.push("/");
  };
  const handleNewQuestion = (history) => {
    history.push("/add");
  };
  const handleLeaderBoard = (history) => {
    history.push("/leaderboard");
  };
  const handleLogoutBtn = (history) => {
    dispatch(setAuthUserAction(null));
    history.push("/logout");
  };
  const handleLoginBtn = (history) => {
    history.push("/login");
  };
  return (
    <AppBar color="inherit" position="static">
      <Toolbar>
        <Typography variant="h6">Would you rather ... ?</Typography>
        <Button color="primary" onClick={handleHome.bind(this, history)}>
          Home
        </Button>
        <Button color="primary" onClick={handleNewQuestion.bind(this, history)}>
          New Question
        </Button>
        <Button color="primary" onClick={handleLeaderBoard.bind(this, history)}>
          Leader Board
        </Button>
        {auth_user ? (
          <div>
            <Avatar src={auth_user.avatarURL} alt={auth_user.name} />
            {auth_user.name}
            <Button
              color="primary"
              onClick={handleLogoutBtn.bind(this, history)}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button color="primary" onClick={handleLoginBtn.bind(this, history)}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

NavigationHeader.propTypes = {
  auth_user: PropTypes.object,
  history: PropTypes.object,
  dispatch: PropTypes.func,
};
function mapStateToProps({ auth_user }) {
  return {
    auth_user: auth_user,
  };
}
export default withRouter(connect(mapStateToProps)(NavigationHeader));

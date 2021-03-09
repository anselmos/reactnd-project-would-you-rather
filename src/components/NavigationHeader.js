import React from "react";
import {isLogged} from '../users/user.utils'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {setAuthUserAction} from "../auth/auth.action";

function NavigationHeader({
auth_user,
history,
dispatch
}) {
    const handleHome = (history) => {
        history.push('/');
    }
    const handleNewQuestion = (history) => {
        history.push('/add');
    }
    const handleLeaderBoard = (history) => {
        history.push('/leaderboard');
    }
    const handleLogoutBtn = (history) => {
        dispatch(setAuthUserAction(null))
        history.push('/logout');
    }
    const handleLoginBtn = (history) => {
        history.push('/login');
    }
    let userLoginData = (<button onClick={handleLoginBtn.bind(this, history)}>Login</button>);
    if (isLogged(auth_user)){
            userLoginData = (
        <div>
                    <div>{auth_user.name}</div>
                <button onClick={handleLogoutBtn.bind(this, history)}>Logout</button>
        </div>
    )
    }

    return (
        <div className="navigation-header">
                <button onClick={handleHome.bind(this, history)}>Home</button>
                <button onClick={handleNewQuestion.bind(this, history)}>New Question</button>
                <button onClick={handleLeaderBoard.bind(this, history)}>Leader Board</button>
            {userLoginData}
        </div>
    );
}

NavigationHeader.propTypes = {
  auth_user: PropTypes.object,
  history: PropTypes.object,
  dispatch: PropTypes.func,
}
function mapStateToProps ({ users, questions, auth_user }) {
  return {
    auth_user: auth_user
  }
}
export default withRouter(connect(mapStateToProps)(NavigationHeader));

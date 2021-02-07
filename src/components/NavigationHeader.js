import React from "react";
import {withRouter} from "react-router-dom";

function NavigationHeader({
user,
history,
handleLogout,
handleLogin
}) {
    const handleHome = (history) => {
        history.push('/');
    }
    const handleNewQuestion = (history) => {
        history.push('/new_question');
    }
    const handleLeaderBoard = (history) => {
        history.push('/leader_board');
    }
    const handleLogoutBtn = (history) => {
        handleLogout();
        history.push('/logout');
    }
    const handleLoginBtn = (history) => {
        handleLogin();
        history.push('/');
    }
    let userLoginData = (<button onClick={handleLoginBtn.bind(this, history)}>Login</button>);
    if (user && user.name){
            userLoginData = (
        <div>
                    <div>{user.name}</div>
                <button onClick={handleLogoutBtn.bind(this, history)}>Logout</button>
        </div>
    )
    }

    return (
        <div className="navigation-header">
                <button onClick={handleHome.bind(this, history)}>Home</button>
                <button onClick={handleNewQuestion.bind(this, history)}>New Question</button>
                <button onClick={handleLeaderBoard.bind(this, history)}>Leader Board</button>
                {/* TODO Based on login/logout:*/}
            {userLoginData}
        </div>
    );
}


export default withRouter( NavigationHeader );
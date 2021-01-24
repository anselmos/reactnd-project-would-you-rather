import React from "react";
import {withRouter} from "react-router-dom";

function NavigationHeader({
user,
history
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

    return (
        <div className="navigation-header">
                <button onClick={handleHome.bind(this, history)}>Home</button>
                <button onClick={handleNewQuestion.bind(this, history)}>New Question</button>
                <button onClick={handleLeaderBoard.bind(this, history)}>Leader Board</button>
                {/* TODO Based on login/logout:*/}
                <div>{user.name}</div>
                <button>Logout</button>
        </div>
    );
}


export default withRouter( NavigationHeader );
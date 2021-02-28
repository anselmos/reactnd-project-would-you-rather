import React from "react";
import PropTypes from "prop-types";
import { useHistory } from 'react-router-dom';
function Login({store, handleLogin}) {
    let history = useHistory();
    const handleLoginBtn = (selectedUser) => {
        handleLogin(selectedUser);
        history.push("/");
    }
    const { users } = store.getState();
    let renderQuestions = null;
    if(users !== null){
         const data = Object.keys(users).map(key =>
             (
                <div key={key}>
                    <button
                        onClick={handleLoginBtn.bind(this, users[key])}
                    >
                        Login as {users[key].name}
                        <img
                            src={users[key].avatarURL}
                            width="100"
                            height="100"
                            alt={users[key].name}
                        />
                    </button>

                </div>
             )
        );
        renderQuestions  = (
            <div><h1>Users:</h1>
                {data}
            </div>
        )
    }
    return (
        <div className="navigation-header">
            {renderQuestions}
        </div>
    )
}


Login.propTypes = {
  store: PropTypes.object.isRequired,
}
export default Login;
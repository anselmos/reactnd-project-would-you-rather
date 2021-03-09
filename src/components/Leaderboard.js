import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

// to reverse the sort you would need to move a_value first : a_value - b_value
function sort_questions_answeres_count([a_key, a_value], [b_key, b_value]) {
    return (
        (
            Object.keys(b_value.answers).length +
            Object.keys(b_value.questions).length
        )
        -
        (
            Object.keys(a_value.answers).length +
            Object.keys(a_value.questions).length
        )
    );
}
function Leaderboard({auth_user, users}) {
    if(auth_user === null){
        return (
            <div> Please log in!</div>
        )
    }
    const users_data = Object.entries(users).sort(
            sort_questions_answeres_count
        ).map(([key, value]) =>
         (
                 <tr key={key}>
                     <td>{value.name}</td>
                     <td>
                         <img
                            src={value.avatarURL}
                            width="100"
                            height="100"
                            alt={value.name}
                        /></td>
                     <td>{Object.keys(value.questions).length}</td>
                     <td>{Object.keys(value.answers).length}</td>
                 </tr>
         )
    );

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <td>User name</td>
                    <td>User Picture</td>
                    <td>Nb of questions asked</td>
                    <td>Nb of questions answered</td>
                </tr>
                </thead>
                <tbody>
                {users_data}
                </tbody>
            </table>
        </div>
    )
}


Leaderboard.propTypes = {
  auth_user: PropTypes.object,
  users: PropTypes.object,

}
function mapStateToProps ({ users, auth_user }) {
  return {
    auth_user: auth_user,
    users: users,
  }
}
export default connect(mapStateToProps)(Leaderboard);

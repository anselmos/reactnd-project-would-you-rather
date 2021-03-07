import React from "react";
import PropTypes from "prop-types";


function Leaderboard({user, store}) {
    const { users } = store.getState()
    if(user === null){
        return (
            <div> Please log in!</div>
        )
    }
    // to reverse the sort you would need to move a_value first : a_value - b_value
    const users_data = Object.entries(users).sort(
    function([a_key, a_value], [b_key, b_value]) {
            return (
                (Object.keys(b_value.answers).length +
                Object.keys(b_value.questions).length)
                -
                (Object.keys(a_value.answers).length +
                Object.keys(a_value.questions).length )

            );
        }
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
        <div className="navigation-header">
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
  user: PropTypes.object,
  store: PropTypes.object,

}
export default Leaderboard;
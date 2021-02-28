import React from "react";
import PropTypes from "prop-types";
import QuestionVote from "./QuestionVote";


function Leaderboard({user, store}) {
    if(user === null){
        return (
            <div> Please log in!</div>
        )
    }
    const { users, loading, questions } = store.getState();
    // FIXME move this business-logic into redux!!!!!

    // to reverse the sort you would need to move a_value first : a_value - b_value
    const users_data = Object.entries(users).sort(
    function([a_key, a_value], [b_key, b_value]) {
            return (
                (Object.keys(b_value.answers).length +
                Object.keys(b_value.answers).length)
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
                     <td>{Object.keys(value.answers).length}</td>
                     <td>{Object.keys(value.questions).length}</td>
                     {/*<td>{users[key].questions.count()}</td>*/}
                 </tr>
         )
    );

    //the user’s name;
    // the user’s picture;
    // the number of questions the user asked; and
    // the number of questions the user answered.
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
    // TODO update to object since this is what it will be in future.
  questions: PropTypes.object,
  user: PropTypes.object,
  store: PropTypes.object,

}
export default Leaderboard;
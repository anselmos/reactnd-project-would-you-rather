import React from "react";
import PropTypes from "prop-types";
export const OPTION_ONE=1
export const OPTION_TWO=2

function QuestionVote({users, question, user, voteCallback}) {

    const user_voted = (
        question.optionOne.votes.includes(user.id)? OPTION_ONE:
            question.optionTwo.votes.includes(user.id) ? OPTION_TWO : null
    );
    const userAvatarUrl = (
        <div>
            <img
                src={users[question.author].avatarURL}
                width="100"
                height="100"
                alt={users[question.author].name}
            />
        </div>

    )
    // TODO!!
    let number_of_votes_for_user_option = 0;
    let percentage_of_votes_for_user_option = 0;
    return (
                <tr key={question.id}>
                    <td>{question.id}</td>
                    <td>{userAvatarUrl}</td>
                    <td style={{backgroundColor: user_voted !== null? user_voted === OPTION_ONE? "green" : '': ''}}>
                        {question.optionOne.text}
                        {user_voted ? "" : <button onClick={voteCallback.bind(user, OPTION_ONE, question)}>Vote </button>}
                    </td>
                    <td style={{backgroundColor: user_voted !== null? user_voted === OPTION_TWO? "green"  : '': ''}}>
                        {question.optionTwo.text}
                        {user_voted ? "" : <button onClick={voteCallback.bind(user, OPTION_TWO, question)}>Vote </button>}
                    </td>
                    <td>{ user_voted? number_of_votes_for_user_option: "N/A"}</td>
                    <td>{ user_voted? percentage_of_votes_for_user_option: "N/A"}</td>
                </tr>
    )
}


QuestionVote.propTypes = {
  question: PropTypes.object,
  user: PropTypes.object,

}
export default QuestionVote;

import React from "react";
import PropTypes from "prop-types";
export const OPTION_ONE=1
export const OPTION_TWO=2

function QuestionVote({users, question, user, voteCallback}) {

    const user_voted = question.optionOne.votes.includes(user.id) || question.optionTwo.votes.includes(user.id)
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
    return (
                <tr key={question.id} style={{backgroundColor: user_voted? "green" : "red"}}>
                    <td>{question.id}</td>
                    <td>{userAvatarUrl}</td>
                    <td>
                        {question.optionOne.text}
                        {user_voted ? "" : <button onClick={voteCallback.bind(user, OPTION_ONE, question)}>Vote </button>}
                    </td>
                    <td>
                        {question.optionTwo.text}
                        {user_voted ? "" : <button onClick={voteCallback.bind(user, OPTION_TWO, question)}>Vote </button>}
                    </td>
                    <td>{question.optionOne.votes.join(", ")}</td>
                    <td>{question.optionTwo.votes.join(", ")}</td>
                    <td>
                        {user_voted ? "Voted": "Not voted"}
                    </td>
                </tr>
    )
}


QuestionVote.propTypes = {
  question: PropTypes.object,
  user: PropTypes.object,

}
export default QuestionVote;

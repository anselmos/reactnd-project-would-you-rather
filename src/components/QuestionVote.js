import React from "react";
import PropTypes from "prop-types";


function QuestionVote({question, user, voteCallback}) {

    const user_voted = question.optionOne.votes.includes(user.id) || question.optionTwo.votes.includes(user.id)
    return (
                <tr style={{backgroundColor: user_voted? "green" : "red"}}>
                    <td>
                        {question.optionOne.text}
                        {user_voted ? "" : <button onClick={voteCallback.bind(question.optionOne)}>Vote </button>}
                    </td>
                    <td>
                        {question.optionTwo.text}
                        {user_voted ? "" : <button onClick={voteCallback.bind(question.optionTwo)}>Vote </button>}
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

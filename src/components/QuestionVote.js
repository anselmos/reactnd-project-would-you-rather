import React from "react";
import PropTypes from "prop-types";

function QuestionVote({question, user}) {
    const user_voted = question.optionOne.votes.includes(user.id) ||question.optionTwo.votes.includes(user.id)
    return (
                <tr>
                    <td>{question.optionOne.text}</td>
                    <td>{question.optionTwo.text}</td>
                    <td>{question.optionOne.votes.join(", ")}</td>
                    <td>{question.optionTwo.votes.join(", ")}</td>
                    <td>{user_voted ? "Voted": "You can vote on this!"}</td>
                </tr>
    )
}


QuestionVote.propTypes = {
    // TODO update to object since tdis is what it will be in future.
  question: PropTypes.object,
  user: PropTypes.object,

}
export default QuestionVote;

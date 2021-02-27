import React from "react";
import PropTypes from "prop-types";

function QuestionVote({question}) {
    // FIXME add voting option for user!!!!
    return (

                <div>
                  {<h1> question Id: {question.id} </h1>}
                  <br/>
                     {question.optionOne.text}, Voted : {question.optionOne.votes.toString()}
                     <br/>
                     {question.optionTwo.text}, Voted : {question.optionTwo.votes.toString()}
                </div>
    )
}


QuestionVote.propTypes = {
    // TODO update to object since this is what it will be in future.
  data: PropTypes.string.isRequired,
  questions: PropTypes.object,

}
export default QuestionVote;

import React from "react";
import PropTypes from "prop-types";

function DataBody({data, user, questions = null}) {
    if(user === null){
        return (
            <div> Please log in!</div>
        )
    }
    let renderQuestions = null;
    if(questions !== null){
         const data = Object.keys(questions).map(key =>
             (
                 <div>
                  {<h1> question Id: {key} </h1>}
                  <br/>
                     {questions[key].optionOne.text}, Voted : {questions[key].optionOne.votes.toString()}
                     <br/>
                     {questions[key].optionTwo.text}, Voted : {questions[key].optionTwo.votes.toString()}
                </div>
             )
        );
        renderQuestions  = (
            <div><h1>Questions:</h1>
                {data}
            </div>
        )
    }
    return (
        <div className="navigation-header">
            {data}
            {renderQuestions}

        </div>
    )
}


DataBody.propTypes = {
    // TODO update to object since this is what it will be in future.
  data: PropTypes.string.isRequired,
  questions: PropTypes.object,

}
export default DataBody;
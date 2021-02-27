import React from "react";
import PropTypes from "prop-types";
import QuestionVote from "./QuestionVote";

function Home({data, questions = null}) {

    let renderQuestions = null;
    if(questions !== null){
        // FIXME add here bind for voting call.
         const data = Object.keys(questions).map(key =>
             (
                <QuestionVote question={questions[key]} />
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


Home.propTypes = {
    // TODO update to object since this is what it will be in future.
  data: PropTypes.string.isRequired,
  questions: PropTypes.object,

}
export default Home;
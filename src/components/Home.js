import React from "react";
import PropTypes from "prop-types";
import QuestionVote from "./QuestionVote";
import {voteOnQuestionAction} from '../questions/questions.action'

// The user can alternate between viewing answered and unanswered polls.
// FIXME change into class based since I will need additional props.


function Home({questions = null, user, store}) {
    function voteCallbackFunction(vote, question){
       store.dispatch(
            voteOnQuestionAction(user, vote, question)
        )
    }
    if(user === null){
        return (
            <div> Please log in!</div>
        )
    }
    let renderQuestions = null;
    if(questions !== null){
         const data = Object.keys(questions).map(key =>
             (
                <QuestionVote key={key} question={questions[key]} user={user} voteCallback={voteCallbackFunction}/>
             )
        );
        renderQuestions  = (
            <div>
                <h1>Questions:</h1>
                <table>
                    <tbody>
                        <tr>
                            <th>Option One</th>
                            <th>Option Two</th>
                            <th>Voted on Option one</th>
                            <th>Voted on Option two</th>
                            <th>Voted?</th>
                        </tr>
                            {data}
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div className="navigation-header">
            {renderQuestions}
        </div>
    )
}


Home.propTypes = {
    // TODO update to object since this is what it will be in future.
  questions: PropTypes.object,
  user: PropTypes.object,
  store: PropTypes.object,

}
export default Home;
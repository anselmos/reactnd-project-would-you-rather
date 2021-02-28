import React from "react";
import PropTypes from "prop-types";
import QuestionVote from "./QuestionVote";
import {voteOnQuestionAction} from '../questions/questions.action'

// FIXME change into class based since I will need additional props.


function Home({questions = null, user, store, answeredToggle=false, answeredToggleCallback}) {
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
        if(answeredToggle){
            questions = Object.fromEntries(
                Object.entries(questions).filter(
                    ([k, v]) => v.optionOne.votes.includes(user.id) || v.optionTwo.votes.includes(user.id)
                )
            );
        }else{
            questions = Object.fromEntries(
                Object.entries(questions).filter(
                    ([k, v]) => !(v.optionOne.votes.includes(user.id)) && !(v.optionTwo.votes.includes(user.id))
                )
            );
        }
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
        Show answered ? <input type="checkbox" onClick={answeredToggleCallback}/>
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
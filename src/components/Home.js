import React from "react";
import PropTypes from "prop-types";
import QuestionVote from "./QuestionVote";
import {voteOnQuestionAction} from '../questions/questions.action'
import {voteUser} from "../users/users.action";
function sort_questions([a_key, a_value], [b_key, b_value]) {
    return (
        b_value.timestamp - a_value.timestamp
    );
}
function Home({user, store, answeredToggle=false, answeredToggleCallback}) {
    const { questions} = store.getState()
    function voteCallbackFunction(vote, question){
        store.dispatch(
            voteOnQuestionAction(user, vote, question)
        )
        store.dispatch(
            voteUser(user, vote, question)
        )
    }
    if(user === null){
        return (
            <div> Please log in!</div>
        )
    }
    let renderQuestions = null;
    if(questions !== null){
        let new_questions = null;
        if(answeredToggle){
            new_questions = Object.fromEntries(
                Object.entries(questions).filter(
                    ([k, v]) => v.optionOne.votes.includes(user.id) || v.optionTwo.votes.includes(user.id)
                )
            );
        }else{
            new_questions = Object.fromEntries(
                Object.entries(questions).filter(
                    ([k, v]) => !(v.optionOne.votes.includes(user.id)) && !(v.optionTwo.votes.includes(user.id))
                )
            );
        }
        const data = Object.entries(new_questions).sort(sort_questions).map(([key, value]) =>
             (
                <QuestionVote key={key} question={new_questions[key]} user={user} voteCallback={voteCallbackFunction}/>
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
  user: PropTypes.object,
  store: PropTypes.object,
  answeredToggle: PropTypes.bool,
  answeredToggleCallback: PropTypes.func,

}
export default Home;
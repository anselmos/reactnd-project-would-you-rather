import React from "react";
import PropTypes from "prop-types";
import QuestionVote from "./QuestionVote";
import {voteOnQuestionAction} from '../questions/questions.action'
import {voteUserAction} from "../users/users.action";
import {isLogged} from "../users/user.utils";
function sort_questions([a_key, a_value], [b_key, b_value]) {
    return (
        b_value.timestamp - a_value.timestamp
    );
}
export function voteCallbackFunction(user, vote, question, store){
    store.dispatch(
        voteOnQuestionAction(user, vote, question)
    )
    store.dispatch(
        voteUserAction(user, vote, question)
    )
}
function Home({user, store, answeredToggle=false, answeredToggleCallback}) {
    const { users, questions } = store.getState()

    if(!isLogged(user)){
        return <div> Please log in!</div>
    }
    let renderQuestions = null;
    if(questions !== null) {
        let new_questions = null;
        if (answeredToggle) {
            new_questions = Object.fromEntries(
                Object.entries(questions).filter(
                    ([k, v]) => v.optionOne.votes.includes(user.id) || v.optionTwo.votes.includes(user.id)
                )
            );
        } else {
            new_questions = Object.fromEntries(
                Object.entries(questions).filter(
                    ([k, v]) => !(v.optionOne.votes.includes(user.id)) && !(v.optionTwo.votes.includes(user.id))
                )
            );
        }
        const data = Object.entries(new_questions).sort(sort_questions).map(([key, value]) =>
            (
                <QuestionVote
                    users={users}
                    key={key}
                    question={new_questions[key]}
                    user={user}
                    store={store}
                    voteCallback={voteCallbackFunction}
                />
            )
        );
        renderQuestions = (
            <div>
                <h1>Questions {answeredToggle? "answered": "unanswered"}:</h1>
                <table>
                    <tbody>
                    <tr>
                        <th>Question Id</th>
                        <th>Pic. of question creator.</th>
                        <th>Option One</th>
                        <th>Option Two</th>
                        <th>Nb of people Voted on user Option:</th>
                        <th>Percentage of people Voted on user Option:</th>
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
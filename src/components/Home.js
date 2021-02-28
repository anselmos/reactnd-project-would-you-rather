import React from "react";
import PropTypes from "prop-types";
import QuestionVote from "./QuestionVote";

function Home({questions = null, user, store}) {
    function voteCallbackFunction(){
        // FIXME add a redux store setup for making vote here.
        //        store.dispatch(
        //             addQuestionAction(question)
        //         )
        console.log(this)
    }
    if(user === null){
        return (
            <div> Please log in!</div>
        )
    }
    let renderQuestions = null;
    if(questions !== null){
        // FIXME add here bind for voting call.
         const data = Object.keys(questions).map(key =>
             (
                <QuestionVote question={questions[key]} user={user} voteCallback={voteCallbackFunction}/>
             )
        );
        renderQuestions  = (
            <div><h1>Questions:</h1>
                <table>
                <tr>
                    <th>Option One</th>
                    <th>Option Two</th>
                    <th>Voted on Option one</th>
                    <th>Voted on Option two</th>
                    <th>Voted?</th>
                </tr>
                    {data}
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
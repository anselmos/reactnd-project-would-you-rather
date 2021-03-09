import React from "react";
import PropTypes from "prop-types";
import { useHistory } from 'react-router-dom';
import {connect} from "react-redux";
export const OPTION_ONE=1
export const OPTION_TWO=2
function QuestionVote({users, question, user, voteCallback, dispatch}) {
    let history = useHistory();

    const user_voted = (
        question.optionOne.votes.includes(user.id)? question.optionOne:
            question.optionTwo.votes.includes(user.id) ? question.optionTwo : null
    );
    const userAvatarUrl = (
        <div>
            <img
                src={users[question.author].avatarURL}
                width="100"
                height="100"
                alt={users[question.author].name}
            />
        </div>

    )
    let number_of_votes_for_user_option = 0;
    let percentage_of_votes_for_user_option = 0;
    if(user_voted !== null){
        number_of_votes_for_user_option = user_voted.votes.length;
        percentage_of_votes_for_user_option = Math.round((
            (
                (user_voted.votes.length) /
                (question.optionOne.votes.length + question.optionTwo.votes.length)
            ) * 100)
        *10/10).toString() + "%";
    }
    return (
                <tr key={question.id}>
                    <td><button onClick={()=> {history.push("/questions/" + question.id)}}>{question.id}</button></td>
                    <td>{userAvatarUrl}</td>
                    <td style={{backgroundColor: user_voted !== null? user_voted === question.optionOne? "green" : '': ''}}>
                        {question.optionOne.text}
                        {user_voted ? "" : <button onClick={voteCallback.bind(this, user, OPTION_ONE, question, dispatch)}>Vote </button>}
                    </td>
                    <td style={{backgroundColor: user_voted !== null? user_voted === question.optionTwo? "green"  : '': ''}}>
                        {question.optionTwo.text}
                        {user_voted ? "" : <button onClick={voteCallback.bind(this, user, OPTION_TWO, question, dispatch)}>Vote </button>}
                    </td>
                    <td>{ user_voted? number_of_votes_for_user_option: "N/A"}</td>
                    <td>{ user_voted? percentage_of_votes_for_user_option: "N/A"}</td>
                </tr>
    )
}


QuestionVote.propTypes = {
  question: PropTypes.object,
  user: PropTypes.object,

}
export default connect()(QuestionVote);

import React from "react";
import PropTypes from "prop-types";
import {useHistory} from 'react-router-dom';
import {connect} from "react-redux";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

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
                <TableRow key={question.id}>
                    <TableCell><Button color="primary" onClick={()=> {history.push("/questions/" + question.id)}}>{question.id}</Button></TableCell>
                    <TableCell>{userAvatarUrl}</TableCell>
                    <TableCell style={{backgroundColor: user_voted !== null? user_voted === question.optionOne? "green" : '': ''}}>
                        {question.optionOne.text}
                        {user_voted ? "" : <Button color="secondary" onClick={voteCallback.bind(this, user, OPTION_ONE, question, dispatch)}>Vote </Button>}
                    </TableCell>
                    <TableCell style={{backgroundColor: user_voted !== null? user_voted === question.optionTwo? "green"  : '': ''}}>
                        {question.optionTwo.text}
                        {user_voted ? "" : <Button color="secondary" onClick={voteCallback.bind(this, user, OPTION_TWO, question, dispatch)}>Vote </Button>}
                    </TableCell>
                    <TableCell>{ user_voted? number_of_votes_for_user_option: "N/A"}</TableCell>
                    <TableCell>{ user_voted? percentage_of_votes_for_user_option: "N/A"}</TableCell>
                </TableRow>
    )
}


QuestionVote.propTypes = {
  question: PropTypes.object,
  user: PropTypes.object,

}
export default connect()(QuestionVote);

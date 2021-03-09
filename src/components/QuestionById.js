import React from "react";
import {useParams} from "react-router-dom";
import {isLogged} from "../users/user.utils";
import NoMatch from "./NoMatch";
import QuestionVote from "./QuestionVote";
import {voteCallbackFunction} from "./Home"
import PropTypes from "prop-types";
import {connect} from "react-redux";

function QuestionById({auth_user, users, questions}) {
  let { questionid } = useParams();
    if(!isLogged(auth_user)){
        return <div> Please log in!</div>
    }
  const question = questions[questionid];
  if(question === null || question === undefined){
        return <NoMatch />
    }
    return (
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
              <QuestionVote
                users={users}
                question={question}
                user={auth_user}
                voteCallback={voteCallbackFunction}
              />
          </tbody>
      </table>

  );
}
QuestionById.propTypes = {
  user: PropTypes.object,
  users: PropTypes.object,
  questions: PropTypes.object,
}
function mapStateToProps ({ users, questions, auth_user }) {
  return {
    users: users,
    questions: questions,
    auth_user: auth_user,
  }
}
export default connect(mapStateToProps)(QuestionById);

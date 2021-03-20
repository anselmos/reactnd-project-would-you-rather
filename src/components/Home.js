import React, { useState } from "react";
import PropTypes from "prop-types";
import QuestionVote from "./QuestionVote";
import { voteOnQuestionAction } from "../questions/questions.action";
import { voteUserAction } from "../users/users.action";
import { isLogged } from "../users/user.utils";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

function sort_questions([a_key, a_value], [b_key, b_value]) {
  return b_value.timestamp - a_value.timestamp;
}
export function voteCallbackFunction(user, vote, question, dispatch) {
  dispatch(voteOnQuestionAction(user, vote, question));
  dispatch(voteUserAction(user, vote, question));
}
function Home({ auth_user, users, questions }) {
  const [answeredToggle, toggleAnswered] = useState(false);
  if (!isLogged(auth_user)) {
    return <div> Please log in!</div>;
  }
  let renderQuestions = null;
  if (questions !== null) {
    let new_questions = null;
    if (answeredToggle) {
      new_questions = Object.fromEntries(
        Object.entries(questions).filter(
          ([k, v]) =>
            v.optionOne.votes.includes(auth_user.id) ||
            v.optionTwo.votes.includes(auth_user.id)
        )
      );
    } else {
      new_questions = Object.fromEntries(
        Object.entries(questions).filter(
          ([k, v]) =>
            !v.optionOne.votes.includes(auth_user.id) &&
            !v.optionTwo.votes.includes(auth_user.id)
        )
      );
    }
    const data = Object.entries(new_questions)
      .sort(sort_questions)
      .map(([key, value]) => (
        <QuestionVote
          users={users}
          key={key}
          question={new_questions[key]}
          user={auth_user}
          voteCallback={voteCallbackFunction}
        />
      ));
    renderQuestions = (
      <div>
        <h1>Questions {answeredToggle ? "answered" : "unanswered"}:</h1>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Question Id</TableCell>
              <TableCell>Pic. of question creator.</TableCell>
              <TableCell>Option One</TableCell>
              <TableCell>Option Two</TableCell>
              <TableCell>Nb of people Voted on user Option:</TableCell>
              <TableCell>Percentage of people Voted on user Option:</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{data}</TableBody>
        </Table>
      </div>
    );
  }
  return (
    <div>
      Show answered ?{" "}
      <input type="checkbox" onClick={() => toggleAnswered(!answeredToggle)} />
      {renderQuestions}
    </div>
  );
}

Home.propTypes = {
  user: PropTypes.object,
  users: PropTypes.object,
  questions: PropTypes.object,
  answeredToggle: PropTypes.bool,
  answeredToggleCallback: PropTypes.func,
};

function mapStateToProps({ users, questions, auth_user }) {
  return {
    users: users,
    questions: questions,
    auth_user: auth_user,
  };
}
export default connect(mapStateToProps)(Home);

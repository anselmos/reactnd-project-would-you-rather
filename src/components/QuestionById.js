import React from "react";
import { useParams } from "react-router-dom";
import { isLogged } from "../users/user.utils";
import NoMatch from "./NoMatch";
import QuestionVote from "./QuestionVote";
import { voteCallbackFunction } from "./Home";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";

function QuestionById({ auth_user, users, questions }) {
  let { questionid } = useParams();
  if (!isLogged(auth_user)) {
    return <div> Please log in!</div>;
  }
  const question = questions[questionid];
  if (question === null || question === undefined) {
    return <NoMatch />;
  }
  return (
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
      <TableBody>
        <QuestionVote
          users={users}
          question={question}
          user={auth_user}
          voteCallback={voteCallbackFunction}
        />
      </TableBody>
    </Table>
  );
}
QuestionById.propTypes = {
  user: PropTypes.object,
  users: PropTypes.object,
  questions: PropTypes.object,
};
function mapStateToProps({ users, questions, auth_user }) {
  return {
    users: users,
    questions: questions,
    auth_user: auth_user,
  };
}
export default connect(mapStateToProps)(QuestionById);

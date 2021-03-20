import React from "react";
import PropTypes from "prop-types";
import { addQuestionAction } from "./questions.action";
import { formatQuestion } from "../api/_DATA";
import { newQuestionUser } from "../users/users.action";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

class NewQuestion extends React.Component {
  addItem = (e) => {
    e.preventDefault();
    const option1 = this.option1.value;
    this.option1.value = "";
    const option2 = this.option2.value;
    this.option2.value = "";
    const question = formatQuestion({
      optionOneText: option1,
      optionTwoText: option2,
      author: this.props.auth_user.id,
    });
    this.props.dispatch(addQuestionAction(question));
    this.props.dispatch(newQuestionUser(this.props.auth_user, question));
  };

  render() {
    if (this.props.auth_user === null) {
      return <div>Please log in!</div>;
    }
    return (
      <div>
        <Paper className="new-question-title">Create New Question</Paper>
        <Grid>
          <Paper className="new-question-would-you-rather">
            Would you rather ...
          </Paper>
          <Input
            type="text"
            placeholder="Enter option one text here"
            ref={(input) => (this.option1 = input)}
          />
          <Paper className="new-question-or">OR</Paper>
          <Input
            type="text"
            placeholder="Enter option two text here"
            ref={(input) => (this.option2 = input)}
          />
        </Grid>
        <Button className="new-question-submit" onClick={this.addItem}>
          Submit
        </Button>
      </div>
    );
  }
}

NewQuestion.propTypes = {
  dispatch: PropTypes.func,
  auth_user: PropTypes.object,
};
function mapStateToProps({ auth_user }) {
  return {
    auth_user: auth_user,
  };
}
export default connect(mapStateToProps)(NewQuestion);

import React from "react";
import PropTypes from "prop-types";
import {addQuestionAction} from './questions.action'
import {formatQuestion} from '../api/_DATA';
import {newQuestionUser} from '../users/users.action'
import {connect} from "react-redux";

class NewQuestion extends React.Component {
    addItem = (e) => {
        e.preventDefault();
        const option1 = this.option1.value
        this.option1.value = ''
        const option2 = this.option2.value
        this.option2.value = ''
        const question = formatQuestion(
            {
                optionOneText: option1,
                optionTwoText: option2,
                author:this.props.auth_user.id
            }
        )
        this.props.dispatch(
            addQuestionAction(question)
        )
        this.props.dispatch(
            newQuestionUser(this.props.auth_user, question)
        )
    }

    render() {
        if(this.props.auth_user === null){
            return (
            <div>Please log in!</div>
            )
        }
        return (

            <div className="new-question-top">
                <div className="new-question-title">Create New Question</div>
                <div className="new-question-body">
                    <div className="new-question-complete">Complete the question:</div>
                    <div className="new-question-would-you-rather">Would you rather ...</div>
                    <input
                        type='text'
                        placeholder="Enter option one text here"
                        ref={(input) => this.option1 = input}
                    />
                    <div className="new-question-or">OR</div>
                    <input
                        type='text'
                        placeholder="Enter option two text here"
                        ref={(input) => this.option2 = input}
                    />
                    <button className="new-question-submit" onClick={this.addItem}>Submit</button>
                </div>
            </div>
        )
    }
}


NewQuestion.propTypes = {
  dispatch: PropTypes.func,
  auth_user: PropTypes.object,
}
function mapStateToProps ({ auth_user }) {
  return {
    auth_user: auth_user
  }
}
export default connect(mapStateToProps)(NewQuestion);

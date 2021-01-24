import React from "react";
// import PropTypes from "prop-types";

class NewQuestion extends React.Component {

    render() {
        return (

            <div className="new-question-top">
                <div className="new-question-title">Create New Question</div>
                <div className="new-question-body">
                    <div className="new-question-complete">Complete the question:</div>
                    <div className="new-question-would-you-rather">Would you rather ...</div>
                    <input text="Enter option one text here"/>
                    <div className="new-question-or">OR</div>
                    <input text="Enter option two text here"/>
                    <button className="new-question-submit">Submit</button>
                </div>
            </div>
        )
    }
}
NewQuestion.propTypes = {

}
export default NewQuestion;
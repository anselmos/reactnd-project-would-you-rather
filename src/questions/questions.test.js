import * as actions from "./questions.action";
import * as types from "./questions.types";

describe("question actions", () => {
  it("should create an action to add a new question", () => {
    const question = "The question object itself";
    const expectedAction = {
      type: types.ADD_QUESTION,
      question,
    };
    expect(actions.addQuestionAction(question)).toEqual(expectedAction);
  });
  it("should create an action to vote on question", () => {
    const question = "The question object itself";
    const vote = 1;
    const user = "username";
    const expectedAction = {
      type: types.VOTE_QUESTION,
      user,
      vote,
      question,
    };
    expect(actions.voteOnQuestionAction(user, vote, question)).toEqual(
      expectedAction
    );
  });
});

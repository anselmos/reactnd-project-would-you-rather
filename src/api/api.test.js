import * as actions from "./api.action";
import RECEIVE_DATA from "./api.types";
describe("api actions", () => {
  it("should create an action to receive data", () => {
    const users = ["user1", "user2"];
    const questions = ["q1", "q2"];
    const expectedAction = {
      type: RECEIVE_DATA,
      users,
      questions,
    };
    expect(actions.receiveDataAction(users, questions)).toEqual(expectedAction);
  });
});

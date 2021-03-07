import * as actions from './users.action'
import * as types from './users.types'



describe('users actions', () => {
  it('should create an action for user to vote', () => {
    const question = 'The question object itself'
    const vote = 1
    const user = 'username'
    const expectedAction = {
      type: types.VOTE_USER,
      user, vote, question
    }
    expect(actions.voteUserAction(user, vote, question)).toEqual(expectedAction)
  })
  it('should create an action to update questions user asked', () => {
    const question = 'The question object itself'
    const user = 'username'
    const expectedAction = {
      type: types.QUESTION_USER,
      user, question
    }
    expect(actions.newQuestionUser(user, question)).toEqual(expectedAction)
  })
})
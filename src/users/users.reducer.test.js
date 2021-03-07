import * as reducer from './users.reducer'
import * as types from './users.types'

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(reducer.users(undefined, {})).toEqual({})
  })

  it('should handle VOTE_USER', () => {
    const user = {id: "dd"}
    const state = {[user.id]: {answers: {[ "question1" ]: "optionOne"}}}
    const vote = 2
    const question = {id: "question2"}
    const expectedState = {[user.id]: {answers: {[ "question1"]: "optionOne", ["question2"]: "optionTwo"}}}
    expect(
      reducer.users(state, {
        type: types.VOTE_USER,
        user: user, vote: vote, question: question
      })
    ).toEqual(expectedState)
    // FIXME this is wrong :( why ???
    expect(
      reducer.users(state, {
        type: types.VOTE_USER,
        user: user, vote: vote, question: question
      })
    ).toEqual({...state})

  })
})
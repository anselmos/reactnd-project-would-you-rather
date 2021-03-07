import * as reducer from './users.reducer'
import * as types from './users.types'

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(reducer.users(undefined, {})).toEqual([])
  })

  it('should handle VOTE_USER', () => {
    const state = {["dd"]: {answers: []}}
    const user = {id: "dd"}
    const vote = 2
    const question = {id: "questionID"}
    // FIXME this is wrong :( why ???
    expect(
      reducer.users({... state}, {
        type: types.VOTE_USER,
        user: user, vote: vote, question: question
      })
    ).toEqual({... state})

  })
})
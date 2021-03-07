import React from "react";
import {useParams} from "react-router-dom";
import {isLogged} from "../users/user.utils";
import NoMatch from "./NoMatch";
import QuestionVote from "./QuestionVote";
import {voteCallbackFunction} from "./Home"

export default function QuestionById({store, user}) {
  const {users} = store.getState();
  let { questionid } = useParams();
    if(!isLogged(user)){
        return <div> Please log in!</div>
    }
    const {questions} = store.getState();
  const question = questions[questionid];
  if(question === null || question === undefined){
        return <NoMatch />
    }
    return (
      <table>
          <tbody>
          <tr>
              <th>Question Id</th>
              <th>Pic. of question creator.</th>
              <th>Option One</th>
              <th>Option Two</th>
              <th>Nb of people Voted on user Option:</th>
              <th>Percentage of people Voted on user Option:</th>
          </tr>
              <QuestionVote
                users={users}
                question={question}
                user={user}
                voteCallback={voteCallbackFunction}
                store={store}
              />
          </tbody>
      </table>

  );
}
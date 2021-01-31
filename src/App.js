import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css';
import './spacer.css';
import NavigationHeader from "./NavigationHeader";
import DataBody from "./DataBody";
import NewQuestion from "./NewQuestion";
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {_getUsers} from "./_DATA";
const RECEIVE_DATA = "RECEIVE_DATA";

function receiveDataAction (users) {
  return {
    type: RECEIVE_DATA,
    users,
  }
}

function users(state= [], action){
    switch(action.type){
        case RECEIVE_DATA:
            return action.users
        default:
            return state
    }
}

const logger = (store) => (next) => (action) => {
  console.group(action.type)
    console.log('The action: ', action)
    const result = next(action)
    console.log('The new state: ', store.getState())
  console.groupEnd()
  return result
}

async function getOrUpdateUserData(){
    const users = await _getUsers();
    this.store.dispatch(receiveDataAction(users))
}
class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
        this.store = createStore(combineReducers({
            users,
        }), applyMiddleware(logger))
    }
    handleLogin() {
        const {users} = this.store.getState();
        // TODO change to a state-selected user not hardcoded by one.
        this.setState({user: users.tylermcginnis});
    }
    componentDidMount() {
        getOrUpdateUserData.call(this);
    }

    handleLogout() {
        this.setState({user: null});
  }
  render(){
    const { users } = this.store.getState()
    return (
        <div className="App">

          <BrowserRouter>
        <NavigationHeader
            user={this.state.user}
            users={users}
            handleLogout={this.handleLogout.bind(this)}
            handleLogin={this.handleLogin.bind(this)}
        />
          <div className="spacer-header-body"/>
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <DataBody data={"root"}/>
                )}
              />
                <Route
                exact
                path="/new_question"
                render={() => (
                  <NewQuestion user={this.state.user}/>
                )}
              />
              <Route
                exact
                path="/leader_board"
                render={() => (
                  <DataBody data={"leader_board"}/>
                )}
              />
                <Route
                exact
                path="/logout"
                render={() => (
                  <DataBody data={"leader_board"}/>
                )}
              />
            </Switch>
          </BrowserRouter>
        </div>
      );
    };
  }


export default App;

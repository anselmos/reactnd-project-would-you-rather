import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css';
import '../style/spacer.css';
import NavigationHeader from "./NavigationHeader";
import DataBody from "./DataBody";
import NewQuestion from "../questions/NewQuestion";
import {_getUsers, _getQuestions} from "../api/_DATA";
import {receiveDataAction} from '../api/api.action';


async function getOrUpdateUserData(){
    const users = await _getUsers();
    const questions = await _getQuestions();
    this.props.store.dispatch(receiveDataAction(users, questions));
}

class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }
    handleLogin() {
        const {users} = this.props.store.getState();
        // TODO change to a state-selected user not hardcoded by one.
        this.setState({user: users.tylermcginnis});
    }
    componentDidMount() {
        getOrUpdateUserData.call(this);
        this.props.store.subscribe(() => this.forceUpdate())
    }

    handleLogout() {
        this.setState({user: null});
  }
  render(){
    const { users, loading, questions} = this.props.store.getState()
    if( loading === true){
      return <h3>Loading</h3>
    }
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
                  <DataBody data="Home" questions={questions} />
                )}
              />
                <Route
                exact
                path="/new_question"
                render={() => (
                  <NewQuestion user={this.state.user} store={this.props.store}/>
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

import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css';
import '../style/spacer.css';
import NavigationHeader from "./NavigationHeader";
import DataBody from "./DataBody";
import NewQuestion from "../questions/NewQuestion";
import {_getUsers, _getQuestions} from "../api/_DATA";
import {receiveDataAction} from '../api/api.action';
import Login from "./Login";
import Home from "./Home";
import Leaderboard from "./Leaderboard";

async function getOrUpdateUserData(){
    const users = await _getUsers();
    const questions = await _getQuestions();
    this.props.store.dispatch(receiveDataAction(users, questions));
}

class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            show_answered: false
        }
    }
    handleLogin(selectedUser) {
        this.setState({user: selectedUser});
    }
    componentDidMount() {
        getOrUpdateUserData.call(this);
        this.props.store.subscribe(() => this.forceUpdate())
    }

    handleLogout() {
        this.setState({user: null});
    }
    handleAnsweredToggle(){
        this.setState({show_answered: !this.state.show_answered})
    }
  render(){
    const { users, loading, questions} = this.props.store.getState()
    if( loading === true){
      return <h3>Loading</h3>
    }
    /// FIXME move from using props into only store!! i.e. replace questions with store.getState in Home.
    return (
        <div className="App">

          <BrowserRouter>
        <NavigationHeader
            user={this.state.user}
            users={users}
            handleLogout={this.handleLogout.bind(this)}
        />
          <div className="spacer-header-body"/>
            <Switch>
                <Route
                path="/add"
                render={() => (
                  <NewQuestion user={this.state.user} store={this.props.store}/>
                )}
              />
              <Route
                path="/leaderboard"
                render={() => (
                  <Leaderboard
                      user={this.state.user}
                      store={this.props.store}
                  />
                )}
              />
               <Route
                path="/logout"
                render={() => (
                  <DataBody user={this.state.user} data="logged-out" />
                )}
              />
              <Route
                path="/login"
                render={() => (
                  <Login
                      store={this.props.store}
                      handleLogin={this.handleLogin.bind(this)}
                  />
                )}
              />
            <Route
                path="/"
                render={() => (
                  <Home
                      answeredToggle={this.state.show_answered}
                      questions={questions}
                      user={this.state.user}
                      store={this.props.store}
                      answeredToggleCallback={this.handleAnsweredToggle.bind(this)}
                  />
                )}
              />
            </Switch>
          </BrowserRouter>
        </div>
      );
    };
  }


export default App;

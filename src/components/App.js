import React from "react";
import {Route, Switch, withRouter} from "react-router-dom";
import './App.css';
import '../style/spacer.css';
import NavigationHeader from "./NavigationHeader";
import NewQuestion from "../questions/NewQuestion";
import {_getQuestions, _getUsers} from "../api/_DATA";
import {receiveDataAction} from '../api/api.action';
import Login from "./Login";
import Home from "./Home";
import Leaderboard from "./Leaderboard";
import {isLogged} from "../users/user.utils";
import NoMatch from "./NoMatch";
import QuestionById from "./QuestionById";

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
            show_answered: false,
            path_no_login: null,
        }
    }
    handleLogin(selectedUser) {
        // TODO can move this into redux as action/reducer later.
        this.setState({user: selectedUser, show_answered: false});
    }
    componentDidMount() {
        getOrUpdateUserData.call(this);
        this.props.store.subscribe(() => this.forceUpdate())
        const path = this.props.history.location.pathname;
        if(path !== "/login" && !isLogged(this.state.user)){
            this.setState({path_no_login: path})
        }
    }
    componentWillMount() {
        this.unlisten = this.props.history.listen((location, action) => {
            const path = location.pathname;
            if(path !== "/login" && !isLogged(this.state.user)){
                this.setState({path_no_login: path})
            }
        });
    }
    componentWillUnmount() {
        this.unlisten();
    }

    handleLogout() {
        this.setState({user: null});
    }
    handleAnsweredToggle(){
        this.setState({show_answered: !this.state.show_answered})
    }
  render(){
    const { loading } = this.props.store.getState()
    if( loading === true){
      return <h3>Loading</h3>
    }
    return (
        <div className="App">
        <NavigationHeader
            user={this.state.user}
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
                    <div> Logged-out. Please log-in.</div>
                )}
              />
              <Route
                path="/login"
                render={() => (
                  <Login
                      store={this.props.store}
                      handleLogin={this.handleLogin.bind(this)}
                      path_no_login={this.state.path_no_login}
                  />
                )}
              />
          <Route
                path="/questions/:questionid"
                render={() => (
                    <QuestionById store={this.props.store} user={this.state.user}/>
                )}
              />
            <Route
                exact
                path="/"
                render={() => (
                  <Home
                      answeredToggle={this.state.show_answered}
                      user={this.state.user}
                      store={this.props.store}
                      answeredToggleCallback={this.handleAnsweredToggle.bind(this)}
                  />
                )}
              />
            <Route path="*">
                <NoMatch />
            </Route>
            </Switch>

        </div>
      );
    };
  }


export default withRouter( App );

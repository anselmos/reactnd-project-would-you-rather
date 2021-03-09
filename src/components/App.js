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
import { connect } from "react-redux";

async function getOrUpdateUserData(){
    const users = await _getUsers();
    const questions = await _getQuestions();
    this.props.dispatch(receiveDataAction(users, questions));
}

class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            path_no_login: null,
        }
    }

    componentDidMount() {
        getOrUpdateUserData.call(this);
        const path = this.props.history.location.pathname;
        if(path !== "/login" && path !=="/logout" && !isLogged(this.props.auth_user)){
            this.setState({path_no_login: path});
        }
        this.unlisten = this.props.history.listen((location, action) => {
            const path = location.pathname;
            if(path !== "/login" && path !=="/logout" && !isLogged(this.props.auth_user)){
                this.setState({path_no_login: path})
            }
        });
    }
    componentWillUnmount() {
        this.unlisten();
    }


  render(){
    if( this.props.loading === true){
      return <h3>Loading</h3>
    }
    return (
        <div className="App">
        <NavigationHeader />
          <div className="spacer-header-body"/>
            <Switch>
                <Route
                path="/add"
                render={() => (
                  <NewQuestion />
                )}
              />
              <Route
                path="/leaderboard"
                render={() => (
                  <Leaderboard />
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
                      path_no_login={this.state.path_no_login}
                  />
                )}
              />
          <Route
                path="/questions/:questionid"
                render={() => (
                    <QuestionById />
                )}
              />
            <Route
                exact
                path="/"
                render={() => (
                  <Home />
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
function mapStateToProps ({ users, loading, auth_user }) {
  return {
    loading: loading,
    auth_user: auth_user
  }
}

export default withRouter(connect(mapStateToProps)( App ));

import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css';
import './spacer.css';
import NavigationHeader from "./NavigationHeader";
import DataBody from "./DataBody";
import NewQuestion from "./NewQuestion";
class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: {
                id: 'sarahedo',
                name: 'Sarah Edo',
                avatarURL: '',
                answers: {
                  "8xf0y6ziyjabvozdd253nd": 'optionOne',
                  "6ni6ok3ym7mf1p33lnez": 'optionTwo',
                  "am8ehyc8byjqgar0jgpub9": 'optionTwo',
                  "loxhs1bqm25b708cmbf3g": 'optionTwo'
                },
                questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
          }
        }
    }
    handleLogin() {
      this.setState({user: {
            id: 'sarahedo',
            name: 'Sarah Edo',
            avatarURL: '',
            answers: {
              "8xf0y6ziyjabvozdd253nd": 'optionOne',
              "6ni6ok3ym7mf1p33lnez": 'optionTwo',
              "am8ehyc8byjqgar0jgpub9": 'optionTwo',
              "loxhs1bqm25b708cmbf3g": 'optionTwo'
            },
            questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
      }})
    }
  handleLogout() {
        this.setState({user: null});
  }
  render(){
    return (
        <div className="App">

          <BrowserRouter>
        <NavigationHeader
            user={this.state.user}
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

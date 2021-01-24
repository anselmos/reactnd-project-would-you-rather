import React from "react";
import './App.css';
import './spacer.css';
import NavigationHeader from "./NavigationHeader";
import DataBody from "./DataBody";

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

  render(){
    return (
        <div className="App">
          <NavigationHeader loggedIn={this.state.user}/>
          <div className="spacer-header-body"/>
          <DataBody/>
        </div>
      );
    };
  }


export default App;

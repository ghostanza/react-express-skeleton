import React from 'react';
import Header from './main/Header';
import Main from './main/Main';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      token: document.cookie.replace(/.*token=([^;]*).*$/,"$1")
    }
  }
  render() {
    return(
      <div>
        {this.state.token ? (
          <Header token={this.state.token}/>
        ) : ''}
        <Main token={this.state.token}/>
      </div>
    )
  }
}

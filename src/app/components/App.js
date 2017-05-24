import React from 'react';
import LoginButton from './main/LoginButton';
import Dashboard from './main/Dashboard';

export default class App extends React.Component {
  render() {
    var has_token = document.cookie.replace(/.*token=([^;]*).*$/,"$1");
    return(
      <div>
        {has_token ?
          <Dashboard token={has_token} /> : <LoginButton />
        }
        </div>
    )
  }
}

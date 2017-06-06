import React from 'react';
import Header from './main/Header';
import Main from './main/Main';
import { connect } from 'react-redux';
import { getUserInfo } from 'actions/userActions';

function mapStateToProps(state){
  return { ...state }
}



class App extends React.Component {
  /*
  constructor(props){
    super(props);
    this.state = {
      token: document.cookie.replace(/.*token=([^;]*).*$/,"$1")
    }
  }*/

  /*{this.state.token ? (
    <Header token={this.state.token}/>
  ) : ''}
  <Main token={this.state.token}/></h1> */
  componentWillMount(){
    if(this.props.user.token){
      this.props.dispatch(getUserInfo(this.props.user.token));
    }
  }
  render() {
    if(localStorage){localStorage.setItem('appState', JSON.stringify(this.props))}
    return(
      <div>
        { this.props.user.info.id ? (
            <Header name={this.props.user.info.id} />
        ) : ''}
        <Main token={this.props.user.token} />
      </div>
    )
  }
}

export default connect(mapStateToProps)(App);

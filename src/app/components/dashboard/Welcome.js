import React from 'react';
import * as spotify from 'spotify';

export default class Welcome extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userData: {}
    }
  }
  componentDidMount(){
    spotify.getUserInfo(this.props.token).then( (userData) => {
      console.log(userData);
      userData.data && this.setState({ userData: userData.data });
    });
  }
  render() {
    return(
      <h1>{ this.state.userData.id ? `Welcome ${this.state.userData.id}` : 'Loading' }!</h1>
    )
  }
}

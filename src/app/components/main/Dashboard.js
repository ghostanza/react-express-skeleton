import React from 'react';
import Welcome from '../dashboard/Welcome';

export default class Dashboard extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return(
      <div>
        <Welcome token={this.props.token} />
      </div>
    )
  }
}

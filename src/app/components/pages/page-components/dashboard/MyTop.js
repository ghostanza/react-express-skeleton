import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as actions from 'actions/userActions';

function mapStateToProps(state, ownProps){
  return {...state, ...ownProps}
}

class MyTop extends React.Component {
  changeRange(e){
    var range = e.target.value,
        type = this.props.type;

    this.props.dispatch(actions.changeTopItemsRange(range, type));
    if( this.props.user.token && !this.props.user.top[type][range].length ){
      this.props.dispatch(actions.getTopItems(this.props.user.token, type, { limit: 10, time_range: range }))
    }
  }
  componentDidMount(){
    var type = this.props.type;
    if( this.props.user.token && !this.props.user.top[type][this.props.user.top[type].current_range].length ){
      this.props.dispatch(actions.getTopItems(this.props.user.token, type, { limit: 10, time_range: this.props.user.top[type].current_range }))
    }
  }
  render() {
    console.log('rendering top artists',this.props);
    var type = this.props.type,
        page = type.replace(/s$/i, '');
    console.log('page', page);
    return(
      <div className="topArtists dash-block">
        <h2>{this.props.user.top[type][this.props.user.top[type].current_range] ? `Top 10 ${ type }` : `Loading top ${ type }...`}</h2>
          <div className="select-wrapper">
            <select onChange={this.changeRange.bind(this)} value={this.props.user.top[type].current_range}>
              <option value="long_term">All Time</option>
              <option value="medium_term">6 Months</option>
              <option value="short_term">Recent</option>
            </select>
          </div>
          <ul>
            {
              this.props.user.top[type][this.props.user.top[type].current_range].map((item) => {
                return <li key={item.id}><Link to={`/${page}/${item.id}`}>{item.name}</Link></li>
              })
            }
          </ul>
      </div>
    )
  }
}

export default connect(mapStateToProps)(MyTop);

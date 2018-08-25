import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class Home extends Component {
  render() {
    console.log("here");
    return (
      <div>
        <h4>Welcome!</h4>
      </div>
    )
  }
}

export default withRouter((Home)
);
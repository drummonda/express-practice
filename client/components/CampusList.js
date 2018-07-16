import React, { Component } from 'react';

export default class CampusList extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const {campuses} = this.props;
    return (
      <ul>
        {campuses.map(campus => <li>{campus.name}</li>)}
      </ul>
    )
  }
}

/* eslint react/no-unused-state:0 */
import React, { Component } from 'react';

export default class CampusForm extends Component {

  constructor (props) {
    super(props);
    this.state = {
      name: '',
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event) {
    const newName = event.target.value;
    this.setState({
      name: newName,
    })
  }

  render() {

    return (
      <form className='campus-form'>
        <label></label>
        <input onChange={this.handleChange} ></input>
      </form>
    )
  }
}

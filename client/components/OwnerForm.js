/* eslint react/no-unused-state:0 */
import React, { Component } from 'react'
import axios from 'axios'

export default class OwnerForm extends Component {

  constructor (props) {
    super(props);
    this.state = {
      name: '',
      age: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    const { name, value } = event.target;
    console.log(name, value);
    this.setState({ [name]: value });
  }

  async handleSubmit (event) {
    event.preventDefault();
    const { name, age } = this.state;
    await axios.post('/api/owners', { name, age });
    this.setState({ name: '', age: '' });
    this.props.fetchOwner();
  }

  render() {
    const { name, age } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className='campus-form'>
        <div className='ui input focus'>
          <input
            onChange={this.handleChange}
            value={name}
            placeholder='Name'
            name='name'
          />
          <input
            onChange={this.handleChange}
            value={age}
            placeholder='Age'
            name='age'
          />
        </div>

        <button className='ui teal basic button'>Create!</button>
      </form>
    )
  }
}

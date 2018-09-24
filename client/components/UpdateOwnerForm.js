import React, { Component } from 'react'
import axios from 'axios'

export default class UpdateOwnerForm extends Component {

  constructor (props) {
    super(props);
    this.state = {
      name: this.props.owner.name,
      age: this.props.owner.age,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async handleSubmit (event) {
    event.preventDefault();
    const { name, age } = this.state;
    const { owner: { id } } = this.props;
    const updatedOwner = await axios.put(`/api/owners/${id}`, { name, age });
    this.setState({
      name: updatedOwner.name,
      age: updatedOwner.age,
    });
    this.props.fetchOwner();
  }

  render() {
    let { name, age } = this.state;

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

        <button className='ui teal basic button'>Update!</button>
      </form>
    )
  }
}

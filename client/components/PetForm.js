import React, { Component } from 'react'
import axios from 'axios'

export default class PetForm extends Component {

  constructor (props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      favorite_food: ''
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
    const { name, age, favorite_food } = this.state;
    await axios.post('/api/pets', { name, age, favorite_food });
    this.setState({ name: '', age: '', favorite_food: '' });
    this.props.fetchPets();
  }

  render() {
    const { name, age, favorite_food } = this.state;

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
          <input
            onChange={this.handleChange}
            value={favorite_food}
            placeholder='Favorite food'
            name='favorite_food'
          />
        </div>

        <button className='ui teal basic button'>Create!</button>
      </form>
    )
  }
}

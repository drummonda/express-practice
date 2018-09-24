import React, { Component } from 'react'
import axios from 'axios'

export default class UpdatePetForm extends Component {

  constructor (props) {
    super(props);
    this.state = {
      name: this.props.pet.name,
      age: this.props.pet.age,
      favorite_food: this.props.pet.favorite_food
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
    const { pet: { id } } = this.props;
    const updatedPet = await axios.put(`/api/pets/${id}`, { name, age, favorite_food });
    this.setState({
      name: updatedPet.name,
      age: updatedPet.age,
      favorite_food: updatedPet.favorite_food
    });
    this.props.fetchPet();
  }

  render() {
    let { name, age, favorite_food } = this.state;

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

        <button className='ui teal basic button'>Update!</button>
      </form>
    )
  }
}

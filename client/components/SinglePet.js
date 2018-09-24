import React, { Component } from 'react'
import axios from 'axios'

import UpdatePetForm from './UpdatePetForm'

export default class SinglePet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pet: {},
    }
    this.fetchPet = this.fetchPet.bind(this);
  }

  async fetchPet() {
    const petId = Number(this.props.match.params.id);
    const { data } = await axios.get(`/api/pets/${petId}`);
    this.setState({ pet: data });
  }

  async componentDidMount() {
    await this.fetchPet();
  }

  render () {
    const { pet } = this.state;

    return (
      (pet.name ?
        <div className='student-list' >
          <h2>Name: {pet.name}</h2>
          <h4>Age: {pet.age}</h4>
          <h4>Favorite food: {pet.favorite_food}</h4>
          <h3>Edit this pet!</h3>
          <UpdatePetForm pet={pet} fetchPet={this.fetchPet} />
        </div>
       :
       <h2>No data yet!</h2>)
    )
  }

}

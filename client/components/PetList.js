import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import PetForm from './PetForm'

export default class PetList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pets: [],
    }
    this.fetchPets = this.fetchPets.bind(this);
  }

  async componentDidMount () {
    await this.fetchPets();
  }

  async fetchPets() {
    const { data } = await axios.get('/api/pets');
    this.setState({ pets: data });
  }

  async handleRemove(id) {
    await axios.delete(`/api/pets/${id}`);
    await this.fetchPets();
  }

  render () {
    const { pets } = this.state;
    return (
      (pets ?

      (<div className='campus-list'>
        <h2>This is the list of pets!</h2>
        <ul className='ui list'>

          {pets.map(pet =>
            <div className='item campus-item' key={pet.id}>
              <Link to={`pets/${pet.id}`} >
                <h3>{pet.name}</h3>
              </Link>
              <button className='ui red basic button' onClick={() => this.handleRemove(pet.id)}>
                Remove
              </button>
            </div>)}

        </ul>
        <h2>Add a new pet!</h2>
        <PetForm fetchPets={this.fetchPets} />
      </div>)

      :

      (<h2>No pets!</h2>) )

    )
  }
}

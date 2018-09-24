import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import SinglePet from './SinglePet'
import UpdateOwnerForm from './UpdateOwnerForm'

export default class SingleOwner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: {},
    }
    this.fetchOwner = this.fetchOwner.bind(this);
  }

  async componentDidMount() {
    this.fetchOwner();
  }

  async fetchOwner() {
    const ownerId = Number(this.props.match.params.id);
    const { data } = await axios.get(`/api/owners/${ownerId}`);
    this.setState({ owner: data });
  }

  render () {
    const { owner } = this.state;
    console.log(owner);

    return (
      (owner.name ?
        <div className='student-list' >
          <h2>Name: {owner.name}</h2>
          <h4>Age: {owner.age}</h4>
          <h4>My pets</h4>
          <ul>
            {owner.pets.map(pet => (
              <h3>{pet.name}</h3>
            ))}
          </ul>
          <h3>Update this owner</h3>
          <UpdateOwnerForm owner={owner} fetchOwner={this.fetchOwner}/>
        </div>
       :
       <h2>No data yet!</h2>)
    )
  }

}

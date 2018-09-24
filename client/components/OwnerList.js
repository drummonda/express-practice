import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import OwnerForm from './OwnerForm'

export default class OwnerList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      owners: [],
    }
    this.handleRemove = this.handleRemove.bind(this);
    this.fetchOwner = this.fetchOwner.bind(this);
  }

  async componentDidMount () {
    await this.fetchOwner();
  }

  async fetchOwner() {
    const { data } = await axios.get('/api/owners');
    this.setState({ owners: data });
  }

  async handleRemove (id) {
    await axios.delete(`/api/owners/${id}`);
    await this.fetchOwner();
  }

  render () {
    const { owners } = this.state;

    return (
      (owners ?

      (<div className='campus-list'>
        <h2>This is the list of owners!</h2>
        <ul className='ui list'>

          {owners.map(owner =>
            <div className='item campus-item' key={owner.id}>
              <Link to={`owners/${owner.id}`} >
                <h3>{owner.name}</h3>
              </Link>
              <button className='ui red basic button' onClick={() => this.handleRemove(owner.id)}>
                Remove
              </button>
            </div>)}

        </ul>
        <h2>Add a new owner!</h2>
        <OwnerForm fetchOwner={this.fetchOwner}/>
      </div>)

      :

      (<h2>No owners!</h2>) )

    )
  }
}

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCampuses } from '../redux/actions';
import CampusForm from './CampusForm'

class CampusList extends Component {
  constructor (props) {
    super(props);
  }

  async componentDidMount () {
    this.props.fetchCampuses();
  }

  render () {
    const {campuses} = this.props;
    return (
      (campuses ?
      <div className='campus-list'>
        <h2>This is the list of campuses!</h2>
        <ul>
          {campuses.map(campus =>
            <li key={campus.id}>
              <Link to={`campuses/${campus.id}`} >
                {campus.name}
              </Link>
            </li>)}
        </ul>
        <h2>make a new campus!</h2>
        <CampusForm />
      </div>
      :
      <h2>No campuses!</h2>)
    )
  }
}

const mapStateToProps = state => ({
  campuses: state.campuses,
});

const mapDispatchToProps = dispatch => ({
  fetchCampuses: () => dispatch(fetchCampuses()),
})

const CampusListContainer = connect(mapStateToProps, mapDispatchToProps)(CampusList);

export default CampusListContainer;

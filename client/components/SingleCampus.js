import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOneCampus } from '../redux/actions'
import SingleStudent from './SingleStudent';

class SingleCampus extends Component {
  constructor (props) {
    super(props);

  }

  async componentDidMount () {
    const { currentParams } = this.props;
    await this.props.fetchOneCampus(currentParams);
  }

  render () {

    const campus = this.props.selectedCampus;
    console.log(this.props);

    return (
      (campus.name ?
      <div className='student-list' >
        <h2>{campus.name}</h2>
        { campus.students.map(student => <SingleStudent key={student.id} student={student} />) }
      </div>
      : <h2>Loading!</h2>)
    );
  }

}

const mapStateToProps = (state, ownProps) => ({
  selectedCampus: state.selectedCampus,
  currentParams: Number(ownProps.match.params.id),
});

const mapDispatchToProps = dispatch => ({
  fetchOneCampus: campusId => dispatch(fetchOneCampus(campusId)),
 })

const SingleCampusContainer = connect(mapStateToProps, mapDispatchToProps)(SingleCampus);

export default SingleCampusContainer;

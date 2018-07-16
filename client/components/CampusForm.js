/* eslint react/no-unused-state:0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postCampus, addCampusForm } from '../redux/actions'

class CampusForm extends Component {

  constructor (props) {
    super(props);
    this.state = {
      name: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    const newName = event.target.value;
    this.props.addCampusForm(newName);
  }

  handleSubmit (event) {
    event.preventDefault();
    const { campusEntry } = this.props;
    this.props.postCampus({ name: campusEntry });
    this.props.addCampusForm('');
  }

  render() {
    const { campusEntry } = this.props;
    console.log(campusEntry);

    return (
      <form onSubmit={this.handleSubmit} className='campus-form'>
        <label>Campus Name</label>
        <input onChange={this.handleChange} value={campusEntry} ></input>

        <button>Create!</button>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  campusEntry: state.campusEntry,
});

const mapDispatchToProps = dispatch => ({
  addCampusForm: campus => dispatch(addCampusForm(campus)),
  postCampus: campus => dispatch(postCampus(campus)),
})

const CampusFormContainer = connect(mapStateToProps, mapDispatchToProps)(CampusForm);

export default CampusFormContainer;

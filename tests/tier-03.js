const chai = require('chai');
const expect = chai.expect;
const chaiThings = require('chai-things');
const chaiSpies = require('chai-spies');
const sinon = require('sinon');
chai.use(chaiThings);
chai.use(chaiSpies);

// Models
const db = require('../server/models');
const Campus = db.models.campus;
const Student = db.models.student;

// Routes
const app = require('../server/app');
const agent = require('supertest')(app);

// Components
import React from 'react';
import { shallow } from 'enzyme';
import CampusForm from '../client/components/CampusForm'

// Redux
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);
const initialState = {
  campuses: [],
  selectedCampus: {}
};
const store = mockStore(initialState);
import reducer from '../client/redux/reducer';
import { ADD_CAMPUS } from '../client/redux/constants';
import { postCampus, addCampus } from '../client/redux/actions';

describe('Tier Three', () => {
  describe('Back-end', () => {
    beforeEach(async () => {
      const graceHopperCampus = await Campus.create({
        name: 'Grace Hopper'
      });
      await Student.create({
        name: 'Terry Witz',
        phase: 'junior',
        campusId: graceHopperCampus.id
      });
      await Student.create({
        name: 'Yuval Ivana',
        phase: 'senior',
        campusId: graceHopperCampus.id
      });
    });

    describe('Student', () => {
      describe('Class method - findByPhase', () => {
        // defined in ../server/models/Student.js

        it('should find all students belonging to a certain phase', async () => {
          const students = await Student.findByPhase('junior')
          expect(students.length).to.be.equal(1);
          expect(students[0].name).to.be.equal('Terry Witz');
        })
      })
    })

    describe('Campus', () => {

      describe('GET /campuses/:id route enhanced', () => {
        // defined in ../server/routes/campuses.js

        it('should populate (eager-load) the student information for the found campus', async () => {
          const response = await agent.get('/api/campuses/1').expect(200);
          expect(response.body.students.length).to.equal(2);
          expect(response.body.students[0].name).to.exist; // eslint-disable-line no-unused-expressions
        })
      })

      describe('POST /campuses/ route', () => {
        it('should create a campus', async () => {
          // defined in ../server/routes/campuses.js

          const response = await agent.post('/api/campuses')
            .send({
              name: 'Fullstack Remote Campus'
            })
            .expect(201);
          const createdCampus = await Campus.findById(response.body.id);
          expect(createdCampus.name).to.be.equal('Fullstack Remote Campus');
        });
      });

      describe('POST /campuses/:id/students route', () => {
        // defined in ../server/routes/campuses.js

        it('should create a student associated with the campus indicated by the route', async () => {
          const response = await agent.post('/api/campuses/1/students')
            .send({
              name: 'Karley Remoteson',
              phase: 'junior'
            })
            .expect(201);
          const createdStudent = await Student.findById(response.body.id);
          expect(createdStudent.name).to.be.equal('Karley Remoteson');
          expect(createdStudent.campusId).to.be.equal(1);
        });
      });
    })
  })

  describe('front end', () => {
    describe('<CampusForm /> component', () => {
      // defined in ../client/components/CampusForm.js

      let renderedCampusForm;
      let campusFormInstance;
      beforeEach(() => {
        renderedCampusForm = shallow(<CampusForm />);
        campusFormInstance = renderedCampusForm.instance();
      })

      it('should be a class component with an initial local state', () => {
        expect(campusFormInstance).to.exist; // eslint-disable-line no-unused-expressions
        expect(campusFormInstance.state).to.eql({name: ''});
      })

      it('should render an <input /> element', () => {
        expect(renderedCampusForm.find('input').node).to.exist; // eslint-disable-line no-unused-expressions
      })

      it('should have a method called handleChange that is invoked when there is a change event triggered by the <input /> element', () => {
        expect(typeof campusFormInstance.handleChange).to.equal('function')
        const handleChangeSpy = sinon.spy()
        campusFormInstance.handleChange = handleChangeSpy;
        renderedCampusForm.setState({})
        renderedCampusForm.find('input').simulate('change', {
          target: { value: 'A New Campus Name' }
        })
        expect(handleChangeSpy.calledOnce).to.equal(true);
      })

      it('handleChange should update the local state', () => {
        renderedCampusForm.find('input').simulate('change', {
          target: { value: 'Another Campus Name' }
        })
        expect(campusFormInstance.state.name).to.equal('Another Campus Name')
      })

    })

    describe('redux store', () => {

      describe('action creators', () => {
        // defined in ../client/redux/actions.js

        const starfleetCampus = {id: 1, name: 'Starfleet Academy'}

        let mock;
        before(() => {
          mock = new MockAdapter(axios)
        })

        afterEach(() => {
          mock.reset();
        })

        after(() => {
          mock.restore();
        })

        it('should allow synchronous creation of ADD_CAMPUS actions', () => {
          const addCampusAction = addCampus(starfleetCampus);
          expect(addCampusAction.type).to.equal(ADD_CAMPUS);
          expect(addCampusAction.campus).to.eql(starfleetCampus);
        });

        it('postCampus() returns a thunk to post a new campus to the backend and dispatch an ADD_CAMPUS action', async () => {
          mock.onPost('/api/campuses').replyOnce(201, starfleetCampus);

          await store.dispatch(postCampus(starfleetCampus))
          const actions = store.getActions();
          expect(actions[0].type).to.equal('ADD_CAMPUS');
          expect(actions[0].campus).to.deep.equal(starfleetCampus);
          await Campus.findById(1)
        });
      })

      describe('reducer', () => {
          // defined in ../client/redux/reducer.js

        it('returns a new state with the newly created campus added to the list of campuses', () => {
          const remoteCampus = {id: 1, name: 'Fullstack Remote Campus'}
          const starfleetCampus = {id: 2, name: 'Starfleet Academy'}
          initialState.campuses = [remoteCampus];

          const newState = reducer(
            initialState,
            {
              type: ADD_CAMPUS,
              campus: starfleetCampus
            }
          );
          expect(newState.campuses.length).to.equal(2);
          expect(newState.campuses.find((campus => campus.name === 'Starfleet Academy'))).to.deep.equal(starfleetCampus);
        });
      })
    })
  })
})

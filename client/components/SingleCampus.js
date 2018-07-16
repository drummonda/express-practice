import React from 'react';
import SingleStudent from './SingleStudent';

export default function SingleCampus ({ campus, students }) {

  return (
    <div className='student-list' >
      <h2>{campus.name}</h2>
      { students.map(student => <SingleStudent student={student} />) }
    </div>
  );
}

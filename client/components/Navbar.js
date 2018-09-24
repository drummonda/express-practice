import React from 'react';
import { Link } from 'react-router-dom';

export default function App () {
  return (
    <div className='ui inverted menu nav-bar' >
      <Link className='item' to='/'>Home</Link>
      <Link className='item' to='/owners'>Owners</Link>
      <Link className='item' to='/pets'>Pets</Link>
    </div>
  );
}

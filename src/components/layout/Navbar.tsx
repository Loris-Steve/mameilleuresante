import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './navbar.scss'
import { AiOutlineMenu } from 'react-icons/ai';


function Navbar(props: any) {

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link to="" className='navbar-brand'>MMS</Link>
      <div className='text-light font-weight-bold'>
        Soignez-vous naturellement !
      </div>
      </div>
    </nav>
  );
}

export default Navbar;


import React, { useState } from 'react'
import './Root.css'
import Home from './Home';
import Books from './Books';
import Authors from './Authors';

function Root() {
    const [screen, setScreen] = useState("Home");
  return (
    <div className='container-fluid no-padding'>
      <div className='row'>
        <div className='col-10 offset-md-2 bg-color nav-bar d-flex align-items-center justify-content-center'>
          <h3 className='no-padding text-white'>Library Management System</h3>
        </div>
      </div>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-2 bg-color position-fixed sticky-sidebar'>
            <img src='src\assets\LMS_Logo.jpg' className='img-logo'></img>
            <p className={screen == "Home" ? 'p-selected' : ''}><a href='' className='p-2' onClick={(e) => { e.preventDefault(); setScreen("Home") }}>Home</a></p>
            <p className={screen == "Books" ? 'p-selected' : ''}><a href='' className="p-2" onClick={(e) => { e.preventDefault(); setScreen("Books") }}>Books</a></p>
            <p className={screen == "Authors" ? 'p-selected' : ''}><a href='' className="p-2" onClick={(e) => { e.preventDefault(); setScreen("Authors") }}>Authors</a></p>
          </div>
          <div>
            {screen == "Home" ? <Home/> : screen == "Books" ? <Books/> : <Authors/> }
          </div>
        </div>
      </div>

    </div>
  )
}

export default Root
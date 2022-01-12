import { useEffect, useState } from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import logo from './logo.jpg';

export default function App({ name }) {
  const [items, setItems] = useState([]);

  //Similar to componentDidMount and componentDidUpdate:  
  useEffect(() => {    
    fetch('http://localhost:8600/applications')
      .then(res => res.json())
      .then(config => {
        setItems(config.navbar)
      })
  }, []);
  
  return (
    <BrowserRouter>
      <nav className="navbar is-info mb-4" role="navigation" aria-label="main navigation">
        <div className='container'>
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              <img src={logo} width="112" height="28" />
            </Link>

            <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          
          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              { items.map((item, i) => (<Link key={i} className="navbar-item" to={item.path}>{item.text}</Link>)) }

              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  More
                </a>

                <div className="navbar-dropdown">
                  <a className="navbar-item">
                    About
                  </a>
                  <a className="navbar-item">
                    Jobs
                  </a>
                  <a className="navbar-item">
                    Contact
                  </a>
                  <hr className="navbar-divider" />
                  <a className="navbar-item">
                    Report an issue
                  </a>
                </div>
              </div>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <a className="button is-primary">
                    <strong>Sign up</strong>
                  </a>
                  <a className="button is-light">
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </BrowserRouter>
  );
}
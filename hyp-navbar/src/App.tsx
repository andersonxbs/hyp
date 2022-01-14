import { useEffect, useState } from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import logo from './logo.jpg';
import { listenEvent, counterSubject } from '@hyp/common'

export default function App({ navApps }) {
  const [rxjsCount, setRxjsCount] = useState(0);
  const [customEventPaymentsCount, setCustomEventPaymentsCount] = useState(0);
  const [customEventBeautyCount, setCustomEventBeautyCount] = useState(0);

  useEffect(() => {    
    listenEvent('@hyp/payments/counter/increment', ({ detail }) => {
      setCustomEventPaymentsCount(previousValue => previousValue + detail.incrementalValue)
    })

    listenEvent('@hyp/beauty/counter/increment', ({ detail }) => {
      setCustomEventBeautyCount(previousValue => previousValue + detail.incrementalValue)
    })

    counterSubject.subscribe({
      next: (value) => setRxjsCount(previousValue => previousValue + value)
    });
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
              { navApps.map((item, i) => (<Link key={i} className="navbar-item" to={item.path}>{item.text}</Link>)) }
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <a className="button is-primary">
                    <strong>Beauty Event { customEventBeautyCount }</strong>
                  </a>
                  <a className="button is-primary">
                    <strong>Payments Event { customEventPaymentsCount }</strong>
                  </a>
                  
                  <a className="button is-light">
                    RxJS { rxjsCount }
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
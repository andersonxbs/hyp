import { Link } from 'react-router-dom';

export default function Layout({children}) {
  return (
    <div className='container'>
      <div className='columns'>
        
        <aside className="menu column is-3">
          <p className="menu-label">
            General
          </p>
          <ul className="menu-list">
            <li>
              <Link to='/'>Dashboard</Link>
            </li>
            <li>
              <Link to='/history'>Histórico</Link>
            </li>
          </ul>
        </aside>

        <main className='column is-9'>
          <nav className="breadcrumb" aria-label="breadcrumbs">
              <ul>
                  <li><Link to="/">Hyperlocal</Link></li>
                  <li><Link to="/">Payments</Link></li>
                  <li className="is-active"><a href="#" aria-current="page">...</a></li>
              </ul>
          </nav>
          {children}
        </main>
        
      </div>
    </div>
  );
}
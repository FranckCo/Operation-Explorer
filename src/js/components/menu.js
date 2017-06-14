import React from 'react'
import { Link } from 'react-router'

export default function Menu({ location }) {
  return (
    <header>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">
              <img className="logo" src="/img/gear.png" />
            </Link>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
            <li>
              <Link className={/^\/families/.test(location.pathname) && 'active'} to="/operations/families">Familles</Link>
            </li>
            <li>
              <Link className={/^\/series/.test(location.pathname) && 'active'} to="/operations/series">Séries</Link>
            </li>
            <li>
              <Link className={/^\/operations/.test(location.pathname) && 'active'} to="/operations">Opérations</Link>
            </li>
            <li>
              <Link className={/^\/products/.test(location.pathname) && 'active'} to="/products">Produits</Link>
            </li>
            <li>
              <Link className={/^\/producers/.test(location.pathname) && 'active'} to="/organisations">Producteurs</Link>
            </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

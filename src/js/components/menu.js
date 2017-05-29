import React from 'react'
import { Link } from 'react-router-dom'

export default function Menu({ location }) {
  return (
    <header>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">
              <img className="logo" src="/img/home.png" />
              Home
            </Link>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li>
                <Link className={/^\/operations/.test(location.pathname) && 'active'} to="/operations">Opérations</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

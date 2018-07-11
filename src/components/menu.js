import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import D from 'i18n'
import LangPicker from './lang-picker'

function Menu({ lang, location }) {
  return (
    <header>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">
              <img className="logo" alt="logo" src="/img/gear.png" />
            </Link>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li>
                <Link className={/^\/families/.test(location.pathname) && 'active'} to="/operations/familles">
                  {D.families}
                </Link>
              </li>
              <li>
                <Link className={/^\/series/.test(location.pathname) && 'active'} to="/operations/series">
                  {D.series}
                </Link>
              </li>
              <li>
                <Link className={/^\/operations/.test(location.pathname) && 'active'} to="/operations">
                  {D.operations}
                </Link>
              </li>
              <li>
                <Link className={/^\/products/.test(location.pathname) && 'active'} to="/produits">
                  {D.products}
                </Link>
              </li>
              <li>
                <Link className={/^\/producers/.test(location.pathname) && 'active'} to="/organisations">
                  {D.organizations}
                </Link>
              </li>
            </ul>
            <ul className="nav navbar-nav pull-right">
              <li>
                <Link className={/^\/help/.test(location.pathname) && 'active'} to="/help">
                  {D.help}
                </Link>
              </li>
              <li>
                <LangPicker location={location} lang={lang} />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default withRouter(Menu)

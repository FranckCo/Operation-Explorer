import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import OrganizationRoutes from './organizations/routes';
import ProductRoutes from './products/routes';
import OperationRoutes from './operations/routes';
import SIMSRoutes from './sims/routes';
import Menu from './menu'
import Login from './login'
import HelpExplorer from 'components/help'
import NotFound from './not-found'
import config from 'config'

//TODO handle authentication within an reducer
import { checkFromStorage } from '../utils/authentication'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loginStatus: 'PENDING',
      loggedIn: false
    }
    this.updateLogin = loggedIn => {
      this.setState({
        loginStatus: 'DONE',
        loggedIn
      })
    }
  }

  componentWillMount() {
    if (config.withAuth) checkFromStorage().then(this.updateLogin)
  }

  render() {
    const { lang, location } = this.props
    if (config.withAuth && this.state.loginStatus === 'PENDING')
        return <div>Checking credentials...</div>
    if (config.withAuth && !this.state.loggedIn)
        return <Login updateLogin={this.updateLogin} />
    return (
      <div className="container-fluid">
        <Menu lang={lang} location={location} />
        <Switch>
          {OperationRoutes}
          {ProductRoutes}
          {OrganizationRoutes}
          {SIMSRoutes}
          <Route exact path="/">
            <Redirect to="/operations/series" />
          </Route>
          <Route exact path="/help" component={HelpExplorer} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    )
  }
}

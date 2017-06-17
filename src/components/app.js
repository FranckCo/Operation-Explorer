import React, { Component } from 'react'
import { Switch } from 'react-router-dom'
import OrganizationRoutes from './organizations/routes';
import ProductRoutes from './products/routes';
import OperationRoutes from './operations/routes';
import SIMSRoutes from './sims/routes';
import Menu from './menu'
import Login from './login'
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
    checkFromStorage().then(this.updateLogin)
  }

  render() {
    const { location } = this.props
    if (this.state.loginStatus === 'PENDING') return <div>Checking credentials...</div>
    if (!this.state.loggedIn) return <Login updateLogin={this.updateLogin} />
    return (
      <div className="container-fluid">
        <Menu location={location} />
        <Switch>
          {OperationRoutes}
          {ProductRoutes}
          {OrganizationRoutes}
          {SIMSRoutes}
        </Switch>
      </div>
    )
  }
}
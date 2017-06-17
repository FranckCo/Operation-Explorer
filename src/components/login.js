import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { checkFromPassword } from '../utils/authentication'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = { user: '', password: '', error: false }
    //TODO handle errors
    this.handleSubmit = () =>
      checkFromPassword(this.refs.user.value, this.refs.password.value)
        .then(props.updateLogin)
  }

  render() {
    return (
      <div className="container">
        <form className="form-signin">
          <h2 className="form-signin-heading">Please sign in</h2>
          <label htmlFor="username" className="sr-only">User name</label>
          <input type="text" id="username" className="form-control" placeholder="Username" required ref="user" />
          <label htmlFor="password" className="sr-only">Password</label>
          <input type="password" id="password" className="form-control" placeholder="Password" required="" ref="password" />
          <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={e => { e.preventDefault(); this.handleSubmit() }}>
            Sign in
          </button>
        </form>
      </div>
    )
  }
}
export default withRouter(Login)
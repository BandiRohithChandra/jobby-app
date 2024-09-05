import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      isError: true,
      errorMsg,
    })
  }

  validateInputs = () => {
    const {username, password} = this.state
    if (!username.trim()) {
      return 'Username cannot be empty'
    }
    if (!password.trim()) {
      return 'Password cannot be empty'
    }
    return ''
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const errorMsg = this.validateInputs()

    if (errorMsg) {
      this.onSubmitFailure(errorMsg)
      return
    }

    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwtToken)
    } else {
      if (data.errorMsg === 'Invalid Password') {
        this.onSubmitFailure('Invalid Password')
      } else {
        this.onSubmitFailure(data.errorMsg)
      }
      this.onSubmitFailure(data.errorMsg)
    }
  }

  render() {
    const {username, password, isError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />

          <label htmlFor="username" className="label">
            USERNAME
          </label>
          <input
            type="text"
            onChange={this.onChangeUsername}
            value={username}
            id="username"
            className="input"
            placeholder="Username"
          />

          <label htmlFor="password" className="label">
            PASSWORD
          </label>
          <input
            type="password"
            onChange={this.onChangePassword}
            value={password}
            id="password"
            className="input"
            placeholder="Password"
          />
          {isError && <p>{errorMsg}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login

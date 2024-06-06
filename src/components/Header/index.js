import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = () => {
  const onClickLogout = props => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div>
      <nav className="nav-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="website-logo"
          />
        </Link>
        <div className="nav-elements">
          <Link to="/">Home</Link>

          <Link to="/jobs">Jobs</Link>
        </div>

        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </nav>
    </div>
  )
}

export default withRouter(Header)

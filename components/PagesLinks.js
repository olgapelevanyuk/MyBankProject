import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { NavLink } from "react-router-dom"
import { acLogOut } from "../constants/actionTypes"
import "./PagesLinks.css"

class PagesLinks extends React.Component {
  state = {}

  logOut = () => {
    this.props.dispatch(acLogOut())
    this.props.history.push("/")
  }

  render() {
    return (
      <div>
        <div className={"RegLoginNavLinks"}>
          {(!this.props.users.currentUser.userProfile && (
            <div>
              <NavLink
                to="/registration"
                className={"showMenu-login"}
                activeClassName="ActivePageLink-login"
              >
                Pегистрация
              </NavLink>
              <NavLink
                to="/login"
                className={"showMenu-login"}
                activeClassName="ActivePageLink-login"
              >
                Вход
              </NavLink>
            </div>
          )) || (
            <div>
              {this.props.users.currentUser.userProfile.surname +
                " " +
                this.props.users.currentUser.userProfile.firstName}{" "}
              <span onClick={this.logOut} className={"showMenu-login"}>
                Выйти
              </span>
            </div>
          )}
        </div>
        <div className="Links">
          <NavLink to="/" exact className={"showMenuImg"}>
            <img src="../images/logo.png" />
          </NavLink>
          <NavLink
            to="/depos"
            className={"showMenu"}
            activeClassName="ActivePageLink"
          >
            Депозиты
          </NavLink>
          <NavLink
            to="/cred"
            className={"showMenu"}
            activeClassName="ActivePageLink"
          >
            Кредиты
          </NavLink>
          <NavLink
            to="/kard"
            className={"showMenu"}
            activeClassName="ActivePageLink"
          >
            Платежные карты
          </NavLink>
          <NavLink
            to="/about"
            className={"showMenu"}
            activeClassName="ActivePageLink"
          >
            О банке
          </NavLink>

          {this.props.users.currentUser.userProfile &&
            (this.props.users.currentUser.userProfile.type === "admin" ||
              this.props.users.currentUser.userProfile.type === "operator") && (
              <NavLink
                to="/applications"
                className={"showMenu"}
                activeClassName="ActivePageLink"
              >
                Заявки
              </NavLink>
            )}
        </div>
      </div>
    )
  }
}

export default withRouter(
  connect((state) => ({
    users: state.users
  }))(PagesLinks)
)

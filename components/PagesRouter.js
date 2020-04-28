import React from "react";
import { Route } from "react-router-dom";
import "../App.css";
import Page_Start from "../Pages/Page_Start";
import Page_Depos from "../Pages/Page_Depos";
import Page_Cred from "../Pages/Page_Cred";
import Page_kard from "../Pages/Page_kard";
import Page_Registration from "../Pages/Page_Registartion";
import Page_login from "../Pages/Page_Login";
import Page_About from "../Pages/Page_About";
import ApplicationList from "../components/ApplicationList";
import Application from "../components/Application";
import Profile from "../components/Profile";
import UserProfile from "../components/UserProfile";
class PagesRouter extends React.Component {
  render() {
    return (
      <div className="Route">
        <Route path="/" exact component={Page_Start} />

        <Route path="/depos" component={Page_Depos} />

        <Route path="/cred" component={Page_Cred} />
        <Route path="/kard" component={Page_kard} />
        <Route path="/about" component={Page_About} />

        <Route path="/registration" component={Page_Registration} />
        <Route path="/login" component={Page_login} />
        <Route path="/applications" exact component={ApplicationList} />
        <Route path="/applications/:id" component={Application} />
        <Route path="/profile" component={Profile} />
        <Route path="/userProfile" component={UserProfile} />
      </div>
    );
  }
}

export default PagesRouter;

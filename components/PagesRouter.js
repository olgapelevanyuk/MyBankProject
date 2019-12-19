import React from 'react';
import { Route } from 'react-router-dom';
import '../App.css'
import Page_Start from '../pages/Page_Start';
import Page_Depos from '../pages/Page_Depos';
import Page_Cred from '../pages/Page_Cred';
import Page_kard from '../pages/Page_kard';
import Page_Registration from "../pages/Page_Registartion";
import Page_login from "../pages/Page_Login";
import Page_About from "../pages/Page_About";
import ApplicationList from '../components/ApplicationList';
import Application from '../components/Application';
class PagesRouter extends React.Component {

    render() {

      return (
        <div className='Route'>
          <Route path="/" exact component={Page_Start} />

          <Route path="/depos" component={Page_Depos} />

          <Route path="/cred" component={Page_Cred} />
          <Route path="/kard" component={Page_kard} />
          <Route path="/about" component={Page_About} />

      <Route path="/registration" component={Page_Registration} />
      <Route path="/login" component={Page_login} />
      <Route path="/applications" exact component={ApplicationList} />
      <Route path="/applications/:id" component={Application}/>
        </div>
      );

    }

  }

  export default PagesRouter;

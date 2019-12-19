import React from "react"
import { Provider } from "react-redux"
import { createStore } from "redux"
import { BrowserRouter } from "react-router-dom"
import PagesLinks from "../components/PagesLinks"
import PagesRouter from "../components/PagesRouter"
import Footer from "../components/Footer"
import CallOrderForm from "../components/CallOrderForm"
import appReducer from "../redux/appReducer"

let store = createStore(appReducer)
console.log(store.getState())

class MainPage extends React.PureComponent {
  componentDidMount() {}

  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <div className="App">
            <CallOrderForm />
            <PagesLinks />
            <PagesRouter />
            <Footer />
          </div>
        </Provider>
      </BrowserRouter>
    )
  }
}

export default MainPage

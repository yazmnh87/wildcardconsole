import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/auth/Login'
import Landing from './pages/Landing'
import { Provider } from './context/context'

class App extends Component {
  render() {
    return (
      <Provider>
      <Router>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/landing" component={Landing} />
        </Switch>
      </Router>
      </Provider>
      
    )
  }
}


export default App
import './index.css'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React from 'react'

import Add from 'pages/add'
import Ledger from 'pages/ledger'
import OverView from 'pages/overview'

function App() {
  return (
    <Router>
      <div className="app">
        <main className="app-body">
          <Switch>
            <Route path="/overview/:month" component={OverView} />
            <Route path="/add" component={Add} />
            <Route path="/" component={Ledger} />
          </Switch>
        </main>
      </div>
    </Router>
  )
}

export default App

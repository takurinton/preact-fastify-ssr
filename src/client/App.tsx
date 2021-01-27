import { h } from 'preact';
import { Router, Route } from "preact-router"

import { Home } from './components/pages/Home'
import { About } from './components/pages/About'

export const App = () => (
  <Router>
    <Route path='/' component={Home} />
    <Route path='/about' component={About} />
  </Router>
)
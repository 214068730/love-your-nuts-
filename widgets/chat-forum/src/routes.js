import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route } from 'react-router-dom'

import Profile from './Profile'
import ChatForum from './chatForum'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/chatforum' component={ChatForum} />
        <Route path='/profiles/:user' component={Profile} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes

import React from 'react';
import Login from './Login'
import Signup from './SignUp'
import { Route } from 'react-router-dom';


const DisplayPage = () => {
  return (
    <div>
    <Route path="/login">
      <Login/>
    </Route>
    <Route path="/signup">
      <Signup/>
    </Route>

    </div>
  )



}
export default DisplayPage
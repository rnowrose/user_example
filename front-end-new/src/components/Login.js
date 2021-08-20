import React, {useContext, useState}  from 'react'
import {AccountContext} from './AccountProvider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import Welcome from './Welcome'
import '../App.scss';





const Login = () => {
  const {authSuccess, sendAuthInfo, open, setOpen} = useContext(AccountContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const usernameChangeHandler = e => {
    setUsername(e.target.value);
  }

  const passwordChangeHandler = e => {
    setPassword(e.target.value);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };



  return (
    <div>
      <div className='login-form'>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <p className='login-label'>Login</p>
            </Grid>
            <Grid item xs={12}>
              <TextField className='login-input' id="outlined-basic" label="Username" variant="outlined"  onChange={usernameChangeHandler} /><br/>
            </Grid>
            <Grid item xs={12}>
              <TextField className='login-input' type="password" id="outlined-basic" label="Password" variant="outlined" onChange={passwordChangeHandler}/><br/>
            </Grid>
            <Grid item xs={12}>
              <Button className='button' variant="contained" color="primary" onClick={() => sendAuthInfo(username, password)}>
                  Submit
              </Button>
            </Grid>
          </Grid>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error">
                Invalid Email and/or Password
              </Alert>
        </Snackbar>
        

      </div >

      { authSuccess ? <Welcome/> : ""}
    </div>
  )

}

export default Login
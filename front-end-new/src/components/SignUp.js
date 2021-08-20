import React, {useState}  from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';



const SignUp = () => {
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [open, setOpen] = useState(false);


  const nameChangeHandler = e => {
    setName(e.target.value);
  }

  const pnumChangeHandler = e => {
    setPhoneNumber(e.target.value);
  }

  const usernameChangeHandler = e => {
    setUsername(e.target.value);
  }

  const passwordChangeHandler = e => {
    setPassword(e.target.value);
  }

  const sendAuthInfo = async () => {
    // create our POST request (JSON data)
    const configs = {
      method: "POST",
      body: JSON.stringify({
        "name": name,
        "pnum": phoneNumber,
        "email": username,
        "password": password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    };
    const response = await fetch("http://localhost:5000/signup", configs);
    const userData = await response.json();
    console.log(userData)
    setOpen(true);
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
              <p className='login-label'>Register</p>
            </Grid>
            <Grid item xs={12}>
            <TextField className='login-input' id="outlined-basic" label="Name" variant="outlined"  onChange={nameChangeHandler} /><br/>
            </Grid>
            <Grid item xs={12}>
            <TextField className='login-input' id="outlined-basic" label="Phone Number" variant="outlined"  onChange={pnumChangeHandler} /><br/>
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
              <Alert onClose={handleClose} severity="success">
                Register Successful
              </Alert>
        </Snackbar>
        

      </div >
    </div>
  )

}

export default SignUp
import React, {createContext, useState} from 'react'

const AccountContext = createContext({
})



const AccountProvider = ({children}) => {
  const [accessToken, setAccessToken] = useState('')
  const [refreshToken, setRefreshToken] = useState('')
  const [authSuccess, setAuthSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  

  const sendAuthInfo = async (username, password) => {
    // create our POST request (JSON data)
    const configs = {
      method: "POST",
      body: JSON.stringify({
        "email": username,
        "password": password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    };
    const response = await fetch("http://localhost:5000/login", configs);
    const userData = await response.json();
    console.log(userData)
    if (!userData.auth){
      setOpen(true);
    }
    setAccessToken(userData.access_token)
    setRefreshToken(userData.refresh_token)
    setAuthSuccess(userData.auth);
  }


  return (
    <AccountContext.Provider value={{ accessToken, refreshToken, authSuccess, sendAuthInfo, open, setOpen }}>
      {children}
    </AccountContext.Provider>
  );


}

export default AccountProvider
export {AccountContext}

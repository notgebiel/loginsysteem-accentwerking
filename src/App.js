import './App.css';
import React, { useState } from 'react';
import CryptoJS from 'crypto-js';


function App() {
  const [reg_user_value, Set_reg_user_value] = useState('');
  const [reg_pw_value, Set_reg_pw_value] = useState('');
  const [log_user_value, Set_log_user_value] = useState('');
  const [log_pw_value, Set_log_pw_value] = useState('');

  const handleReg = async (event) => {
    event.preventDefault();
    const encryptedPassword = CryptoJS.AES.encrypt(reg_pw_value, process.env.REACT_APP_CRYPTKEY).toString();
    const response = await fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: reg_user_value,
        password: encryptedPassword,
      }),
    });
    const data = await response.json();
    console.log(data);
    
  }

  const handleLog = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({
        email: log_user_value,
        password: log_pw_value
      }),
    });
    const data = await response.json()
    console.log(data);

    if(data.token) {
      localStorage.setItem('authToken', data.token);

      window.location.href = '/profile';
    }else {
      console.log('inloggen mislukt');
    }
    
  }
  return (
    <div className="App">
      <h1>Login systeem</h1>
      <div className='reg'>
        <h2>Registreer</h2>
        <form className='Register' onSubmit={handleReg}>
          <input id="reg_user" type="email" placeholder='e-mail' autoComplete='username' onChange={(e) => Set_reg_user_value(e.target.value)}/>
          <input id="reg_password" type="password" placeholder='wachtwoord' autoComplete='new-password' onChange={(e) => Set_reg_pw_value(e.target.value)}/>
          <input id="reg_submit" type="submit" value="Registreer" />
        </form>
      </div>
      <div className='log'>
        <h2>Login</h2>
          <form className='Login' onSubmit={handleLog}>
          <input id="log_user" type="email" placeholder='e-mail' autoComplete='username' onChange={(e) => Set_log_user_value(e.target.value)}/>
          <input id="log_password" type="password" placeholder='wachtwoord' autoComplete='current-password' onChange={(e) => Set_log_pw_value(e.target.value)}/>
          <input id="log_submit" type="submit" value="Login"/>
        </form>
      </div>
    </div>
  );
}

export default App;

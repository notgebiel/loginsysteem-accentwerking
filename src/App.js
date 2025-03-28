import './App.css';
import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import NavBar from './components/navbar';

const clientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;


function App() {
  const handleSuccess = (response) => {
    console.log('Google login succes: ', response);
    fetch("http://localhost:3001/google-login", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ token: response.credential })
    }).then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        window.location.href = '/profile';
      }else {
        console.log('Geen authToken!')
      }
  }
  )
    .catch(error => console.error(error));
  };

  const handleFailure = (error) => {
    console.error('Google login mislukt: ', error);
  };

  const handleMicrosoftLogin = () => {
    window.location.href = 'http://localhost:3001/auth/microsoft';
  }

  


  const [reg_user_value, Set_reg_user_value] = useState('');
  const [reg_pw_value, Set_reg_pw_value] = useState('');
  const [log_user_value, Set_log_user_value] = useState('');
  const [log_pw_value, Set_log_pw_value] = useState('');

  const handleReg = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: reg_user_value,
        password: reg_pw_value,
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

  const wwReset = () => {
    window.location.href = '/wachtwoord-vergeten';
  }

  return (
    <div className="App">
      <NavBar active="login"/>
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
        <button id="ww_reset" onClick={wwReset}>Wachtwoord vergeten?</button>
        <GoogleOAuthProvider clientId={clientID}>
        <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleFailure}
        />
        </GoogleOAuthProvider>
        <h2>Login met Microsoft</h2><br/>
        <button onClick={handleMicrosoftLogin}>Login met microsoft</button>
      </div>
    </div>
  );
}

export default App;

import React, { useState } from "react";


function Login({onLogin,onRegister,onGetUser}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn =() => {
    if(!username || !password) {
        alert('Please enter username and password')
        return
    }
    onLogin({username,password});
    setPassword('');
    onGetUser();
  }

  const onSignUp =() => {
    if(!username || !password) {
        alert('Please enter username and password')
        return
    }
    onRegister({username,password});
    setPassword('');
    onGetUser();
  }

  return (
      <div>
        <h2>Login</h2>
        <div className='form-control'>
            <label>Username</label>
            <input type='text' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className='form-control'>
            <label>Password</label>
            <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button className='btn' onClick={onSignIn}>Sign in</button>
        <button className='btn' onClick={onSignUp}>Sign Up</button>
      </div>
  );
}

export default Login;
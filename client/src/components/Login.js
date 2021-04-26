import React from 'react'
import {Link} from 'react-router-dom'
import {useState} from 'react'

export const Login = ({onLogin}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onClick = (e) => {
        e.preventDefault()

        if(!username || !password) {
            alert('Please enter username and password')
            return
        }
        onLogin({username,password})
        setPassword('')
    }

    return (
        <form  className='login-form'>
            <h2>Login</h2>
            <div className='form-control'>
                <label>Username</label>
                <input type='text' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Password</label>
                <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button className='btn' onClick={onClick}>Sign in</button>
        </form>
    )
}

export default Login
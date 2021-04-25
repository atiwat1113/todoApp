import React from 'react'
import {Link} from 'react-router-dom'

export const Login = () => {
    return (
        <div>
            <h2>Login</h2>
            <div className='form-control'>
                <label>Username</label>
                <input type='text' placeholder='username' />
            </div>
            <div className='form-control'>
                <label>Password</label>
                <input type='password' placeholder='password' />
            </div>
            <Link to='/' style={{ textDecoration: 'none' }}><input type='submit' value='Sign in' className='btn btn-block' /></Link>
        </div>
    )
}

export default Login
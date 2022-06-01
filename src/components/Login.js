import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Login = ({ setLoggedIn }) => {

    const navigate = useNavigate()

    const handleSubmit = () => {
        setLoggedIn(true)
        navigate(-1)
    }

    return (
        <div className='login-overlay'>
            <div className='login-container'>

                <h1>Login</h1>
                <div className="login-info">
                    <button className='login-close' onClick={() => navigate("/")}><FaTimes></FaTimes></button>
                    <h3>Username</h3>
                    <input type="text" />
                    <h3>Password</h3>
                    <input type="password" />
                </div>
                <button className="login-button" onClick={handleSubmit}>Login</button>
            </div>
        </div>
    )
}

export default Login
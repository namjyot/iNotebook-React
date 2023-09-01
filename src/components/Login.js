import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertContext from '../context/notes/alertContext'
import Alert from './Alert'

const Login = () => {
    const navigate = useNavigate();
    const {showAlert} = useContext(AlertContext);
    const [credentials, setCredentials] = useState({email: "", password: ""})

    const handleLogin = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/login",{
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
          });
        const json = await response.json()
        if(!json.success){
            console.log(json.error)
            showAlert({type: "danger", message: json.error});
        }
        else{
            localStorage.setItem("token", json.authToken);
            showAlert({type: "success", message: "Logged in Successfully!"});
            navigate('/');
        }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <>
    <Alert/>
    <div className="container">
        <h1 className="my-4">Login to use iNotebook</h1>
        <form  onSubmit={handleLogin}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' onChange={onChange} value={credentials.email} aria-describedby="emailHelp" required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" onChange={onChange} name='password' value={credentials.password} required/>
  </div>
  <button type="submit" className="btn btn-primary">Login</button>
</form>
    </div>
    </>
  )
}

export default Login
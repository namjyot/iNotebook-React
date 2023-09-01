import React, { useContext, useState } from 'react'
import Alert from './Alert'
import alertContext from '../context/notes/alertContext'
import {useNavigate} from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""})
  const {showAlert} = useContext(alertContext);

  const details = {
    name: credentials.name,
    email: credentials.email,
    password: credentials.password
  }
  const handleSignup = async (e) => {
    e.preventDefault();
    if(credentials.password !== credentials.cpassword){
      showAlert({type: "danger", message: "Password doesn't match!"})
    }
    const response = await fetch("http://localhost:5000/api/auth/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
    }
    ,body: JSON.stringify(details)
    });
    const json = await response.json();
    if(!json.success){
      showAlert({type: "danger", message: json.error})
    }
    else{
      localStorage.setItem('token', json.authToken);
      showAlert({type: "success", message: "Logged in Successfully!"})
      navigate('/');
    }
  }
  
  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  return (
    <>
    <Alert/>
    <div className="container">
        <h1 className="my-4">Create an account here</h1>
        <form onSubmit={handleSignup}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp" minLength={3} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" required/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} minLength={6} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name='cpassword' value={credentials.cpassword} onChange={onChange} minLength={6} required/>
  </div>
  <button type="submit" className="btn btn-primary">Sign up</button>
</form>
    </div>
    </>
  )
}

export default Signup
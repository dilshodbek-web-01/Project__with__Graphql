import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'

const REGISTRATION = gql`
mutation($username: String!, $email: String!, $role: String!, $age: Int!, $password: String!){
  register(username: $username, email: $email, role: $role, age: $age, password: $password) {
    message
  }
}
`

const LOGIN = gql`
mutation($email: String!, $password: String!){
  login(email: $email, password: $password) {
    message,
    token
  }
}
`

function Register() {

  const [register, { error }] = useMutation(REGISTRATION)
  const [login, { error: err }] = useMutation(LOGIN)


  const [isLogin, setIslogin] = useState(false)


  const registerFunc = async (e) => {
    e.preventDefault()

    const { username, email, role, age, password } = e.target
    let result = await register({ variables: { username: username.value, email: email.value, role: role.value, age: +age.value, password: password.value } })

    alert(result.data.register.message);
    console.log(result.data);

    username.value = '';
    email.value = '';
    role.value = '';
    age.value = '';
    password.value = '';
  }

  const loginFunc = async (e) => {
    e.preventDefault()

    const { email, password } = e.target

    let result = await login({ variables: { email: email.value, password: password.value } })

    alert(result.data.login.message);
    localStorage.setItem("token", result.data.login.token);

    email.value = '';
    password.value = '';
  }

  return (

    <div className='container d-flex justify-content-center'>
      {
        !isLogin ? <div>
          <h1 className='text-center' >Register</h1>
          <form onSubmit={(e) => registerFunc(e)}>
            <div className="form-group">
              <label for="username">Username:</label>
              <input type="text" className="form-control" name='username' placeholder="Enter Username" id="username" />
            </div>
            <div className="form-group">
              <label for="email">Email address:</label>
              <input type="email" className="form-control" name='email' placeholder="Enter email" id="email" />
            </div>
            <div className="form-group">
              <label for="role">Role:</label>
              <input type="text" className="form-control" name='role' placeholder="Enter role" id="role" />
            </div>
            <div className="form-group">
              <label for="age">Age:</label>
              <input type="number" className="form-control" name='age' placeholder="Enter age" id="age" />
            </div>
            <div className="form-group">
              <label for="password">Password:</label>
              <input type="password" className="form-control" name='password' placeholder="Enter password" id="password" />
            </div>
            <button type="submit" className="btn btn-primary ">REGISTRATION</button>
            <button onClick={() => setIslogin(true)} className="btn btn-primary ml-2">Login page</button>
          </form>
        </div> :
          <div>
            <h1 className='text-center' >Login</h1>
            <form onSubmit={(e) => loginFunc(e)}>
              <div className="form-group">
                <label for="email">Email address:</label>
                <input type="email" className="form-control" name='email' placeholder="Enter email" id="email" />
              </div>
              <div className="form-group">
                <label for="password">Password:</label>
                <input type="password" className="form-control" name='password' placeholder="Enter password" id="password" />
              </div>
              <button type="submit" className="btn btn-success">LOGIN</button>
              <button onClick={() => setIslogin(false)} className="btn btn-primary ml-2">Register page</button>

            </form>
          </div>
      }
    </div>
  )
}

export default Register
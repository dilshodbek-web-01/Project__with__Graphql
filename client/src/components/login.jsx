import { gql, useMutation } from '@apollo/client'
import React from 'react'


const CREATE_USER = gql`
mutation($username: String, $userSurname: String, $password: String, $email: String!,  $userRole: String, $age: Int){
  register(user_name: $username, user_surname: $userSurname, user_password: $password, user_email: $email,  user_role: $userRole, user_age: $age) {
    msg
    
  }
}
`
function Login() {

    const [Login, { error }] = useMutation(CREATE_USER)



    const createUser = (e) => {
        e.preventDefault()



        const { username, email, password, age } = e.target
        { Login({ headers: { token: 'token' }, variables: { username: username.value, email: email.value, password: password.value, age: +age.value } }) }

        username.value = ''
        email.value = ''
        password.value = ''
        age.value = ''

    }

    return (
        <div className='container d-flex justify-content-center'>
            <div>
                <h1 className='text-center' >Login</h1>
                <form onSubmit={(e) => createUser(e)}>
                    <div className="form-group">
                        <label for="Username">Username:</label>
                        <input type="text" className="form-control" name='username' placeholder="Enter Username" id="username" />
                    </div>
                    <div className="form-group">
                        <label for="email">Email address:</label>
                        <input type="email" className="form-control" name='email' placeholder="Enter email" id="email" />
                    </div>
                    <div className="form-group">
                        <label for="pwd">Password:</label>
                        <input type="password" className="form-control" name='password' placeholder="Enter password" id="pwd" />
                    </div>
                    <div className="form-group">
                        <label for="age">Age:</label>
                        <input type="number" className="form-control" name='age' placeholder="Enter age" id="age" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

        </div>
    )
}

export default Login
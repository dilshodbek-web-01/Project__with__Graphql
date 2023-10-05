import { useState } from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'
import Register from './components/register'
import Create_course from './components/create_course'

const USERS = gql`
query{
  getUsers {
    id,
    username,
    email,
    role,
    age,
    password
  }
}
`

const DELETE_USER = gql`
mutation($id: ID!){
  deleteUser(id: $id) {
    message
  }
}
`

function App() {

  const { data, loading, error } = useQuery(USERS)
  console.log(data);
  const [userId, setId] = useState(null)

  const [deleteUser, { data: d, loading: load, error: err }] = useMutation(DELETE_USER)


  const deletedUser = (id) => {
    { deleteUser({ variables: { id } }) }
  }

  return (
    <div className="App">
      <Register />
      <Create_course />
      <h1 className='text-center my-5' >User list</h1>
      <div className='container'>
        <table class="table table-hover">
          <thead>
            <tr>
              <th>id</th>
              <th>Username</th>
              <th>Email</th>
              <th>role</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading && <>Loading...</>}
            {
              data && data.getUsers.map((el, idx) => <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{el.username}</td>
                <td>{el.email}</td>
                <td>{el.role}</td>
                <td>{el.age}</td>
                <td>
                  <i className='fa fa-edit text-primary' style={{ cursor: 'pointer' }}></i>
                  <i className='fa fa-trash text-danger ml-5' style={{ cursor: 'pointer' }} onClick={() => deletedUser(el.id)}></i>
                </td>

              </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App

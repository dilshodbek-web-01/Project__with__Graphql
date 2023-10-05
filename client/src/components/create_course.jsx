import React from 'react'
import { gql, useMutation } from '@apollo/client'

const CREATE_COURSE = gql`
mutation($title: String!, $price: String!, $description: String!, $teacherId: String!) {
  createCourse(title: $title, price: $price, description: $description, teacher_id: $teacherId) {
    message
  }
}
`

export default function Create_course() {

  const [createCourse, { error }] = useMutation(CREATE_COURSE, {
    context: {
      headers: {
        token: localStorage.getItem("token")
      }
    }
  })


  const createCourseFunc = async (e) => {
    e.preventDefault()

    const { title, price, description, teacher_id } = e.target

    let result = await createCourse({
      variables:
      {
        title: title.value, price: price.value, description: description.value,
        teacherId: teacher_id.value
      }
    })
    alert(result.data.createCourse.message);
  }

  return (
    <div className='container  w-75'>
      <h1>Create course</h1>
      <form onSubmit={(e) => createCourseFunc(e)}>
        <div className="form-group">
          <label for="title">Title:</label>
          <input type="text" className="form-control" name='title' placeholder="Enter title" id="title" />
        </div>
        <div className="form-group">
          <label for="price">Price:</label>
          <input type="text" className="form-control" name='price' placeholder="Enter price" id="price" />
        </div>
        <div className="form-group">
          <label for="description">Description:</label>
          <input type="text" className="form-control" name='description' placeholder="Enter description" id="description" />
        </div>
        <div className="form-group">
          <label for="teacher_id">Teacher_id:</label>
          <input type="text" className="form-control" name='teacher_id' placeholder="Enter teacher_id" id="teacher_id" />
        </div>
        <button type="submit" className="btn btn-primary ">Create course</button>
      </form>
    </div>
  )
}

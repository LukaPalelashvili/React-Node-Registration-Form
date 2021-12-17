import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import withReactContent from 'sweetalert2-react-content'
import { useAuth } from '../../hooks/auth-hook'
import { Toast } from '../../Toastr/Toastr'
import { AddForm } from '../contacts/add'
import { EditForm } from '../contacts/edit'

const MySwal = withReactContent(Swal)

export const Main = () => {
  const navigate = useNavigate()
  const { userId, logout } = useAuth()

  const token = JSON.parse(localStorage.getItem('userData'))?.token

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [navigate, token])

  const { users } = useSelector(state => state)
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('')

  const AddHandler = values => {
    dispatch({ type: 'ADD_USER', user: values })
    MySwal.close()

    Toast.fire({
      icon: 'success',
      title: 'Contact added successfully'
    })
  }

  const EditHandler = (values, id) => {
    dispatch({ type: 'EDIT_USER', user: { id, ...values } })
    MySwal.close()

    Toast.fire({
      icon: 'success',
      title: 'Contact edited successfully'
    })
  }

  const handleAddBtn = () => {
    MySwal.fire({
      title: 'Add new contact',
      html: <AddForm onSave={AddHandler} />,
      showConfirmButton: false
    })
  }

  const handleEditBtn = user => {
    MySwal.fire({
      title: 'Edit contact',
      html: <EditForm onSave={EditHandler} user={user} />,
      showConfirmButton: false
    })
  }

  const handelSearchQueryChange = e => {
    setSearchQuery(e.target.value)
    dispatch({
      type: 'FILTER_USERS',
      query: e.target.value
    })
  }

  const handleCallBtn = id => {
    const user = users.find(user => user.id === id)

    if (!user) {
      MySwal.fire({
        title: 'Oops...',
        text: 'User not found',
        icon: 'error'
      })
      return
    }

    axios
      .post('http://localhost:4000/api/call/new', {
        id: user.id,
        name: user.name,
        phone: user.phone,
        userId
      })
      .then(r => {
        Toast.fire({
          icon: 'success',
          title: 'Call saved successfully'
        })
      })
      .catch(e => {
        MySwal.fire({
          title: 'Oops...',
          text: 'Error occurred, please try again',
          icon: 'error'
        })
      })
  }

  return (
    <div className="app">
      <div className="container">
        <div className="add-button-container">
          <input
            type="text"
            placeholder="Filter"
            value={searchQuery}
            onChange={handelSearchQueryChange}
          />
          <button className="add-button" onClick={handleAddBtn}>
            Add New
          </button>
          <button onClick={logout}>Log out</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td className="action-buttons">
                  <button onClick={() => handleEditBtn(user)}>Edit</button>
                  <button
                    onClick={() =>
                      dispatch({ type: 'REMOVE_USER', id: user.id })
                    }
                  >
                    Delete
                  </button>
                  <button onClick={() => handleCallBtn(user.id)}>Call</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

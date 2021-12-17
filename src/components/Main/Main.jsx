import axios from 'axios'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'

import withReactContent from 'sweetalert2-react-content'
import { AddForm } from '../contacts/add'

const MySwal = withReactContent(Swal)

export const Main = () => {
  const { users } = useSelector(state => state)
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('')

  const handleAddBtn = () => {
    MySwal.fire({
      title: 'Add new contact',
      html: <AddForm />,
      showConfirmButton: false
    })
  }

  const handelSearchQueryChange = e => {
    console.log(e.target.value)
    setSearchQuery(e.target.value)
    dispatch({
      type: 'FILTER_USERS',
      query: e.target.value
    })
  }

  const handleCallBtn = id => {
    const user = users.find(user => user.id === id)

    if (!user) {
      alert('User not found')
    }

    axios
      .post('http://localhost:4000/api/call/new', {
        id: user.id,
        name: user.name,
        phone: user.phone,
        username: 'CyberX6f6'
      })
      .then(r => console.log(r))
      .catch(e => console.log(e))
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
                  <button>Edit</button>
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

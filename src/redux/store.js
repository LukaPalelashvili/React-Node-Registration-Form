import { createStore } from 'redux'
import { users } from '../data/users'

const usersReducer = (state = { users }, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        users: [...state.users, { ...action.user, id: state.users.length + 1 }]
      }
    case 'EDIT_USER':
      return {
        users: state.users.map(user =>
          user.id === action.user.id ? action.user : user
        )
      }
    case 'REMOVE_USER':
      return { users: state.users.filter(user => user.id !== action.id) }
    case 'FILTER_USERS':
      return {
        users: users.filter(
          user =>
            user.name.toLowerCase().includes(action.query.toLowerCase()) ||
            user.phone.includes(action.query)
        )
      }
    default:
      return state
  }
}

export const store = createStore(usersReducer)

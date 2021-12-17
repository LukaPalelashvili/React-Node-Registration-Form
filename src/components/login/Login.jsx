import axios from 'axios'
import FormInput from '../../components/FormInput'
import { useState } from 'react'
import { useAuth } from '../../hooks/auth-hook'

export const Login = () => {
  const [values, setValues] = useState({
    username: '',
    password: ''
  })

  const { login } = useAuth()

  const handleSubmit = e => {
    e.preventDefault()

    axios
      .post('http://localhost:4000/api/users/login', values)
      .then(res => {
        if (res.status === 200) {
          login(res.data.userId, res.data.token)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const onChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <div className="app">
      <form onSubmit={handleSubmit} noValidate>
        <h1>Log In</h1>
        <FormInput
          name="username"
          type="text"
          placeholder="Enter Username"
          errorMessage="Username should be 3-16 characters and shouldn't include any special character!"
          label="Username"
          pattern="^[A-Za-z0-9]{3,16}$"
          required
          value={values.username}
          onChange={onChange}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Enter Password"
          errorMessage="Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!"
          label="Password"
          pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
          required
          value={values.password}
          onChange={onChange}
        />
        <button>Submit</button>
      </form>
    </div>
  )
}

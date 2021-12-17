import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import MySwal from 'sweetalert2'
import FormInput from '../../components/FormInput'
import { useEffect, useState } from 'react'
import { API_URL } from '../../consts'
import { useAuth } from '../../hooks/auth-hook'
import { Toast } from '../../Toastr/Toastr'

export const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const token = JSON.parse(localStorage.getItem('userData'))?.token

  useEffect(() => {
    if (token) {
      navigate('/main')
    }
  }, [navigate, token])

  const [values, setValues] = useState({
    username: { value: '', pattern: '^[A-Za-z0-9]{3,16}$' },
    password: {
      value: '',
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`
    }
  })

  const inputs = [
    {
      id: 1,
      name: 'username',
      type: 'text',
      placeholder: 'Username',
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: 'Username',
      pattern: '^[A-Za-z0-9]{3,16}$',
      required: true
    },
    {
      id: 4,
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorMessage:
        'Password should be 6-20 characters and include at least 1 letter, 1 number and 1 special character!',
      label: 'Password',
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true
    }
  ]

  const handleSubmit = e => {
    e.preventDefault()
    let isValid = true

    for (let val in values) {
      let re = new RegExp(values[val].pattern)
      if (!re.test(values[val].value)) {
        isValid = false
      }
    }

    if (!isValid) {
      MySwal.fire({
        title: 'Oops...',
        text: 'Please fill in all the fields correctly!',
        icon: 'error'
      })
      return
    }

    axios
      .post(`${API_URL}users/login`, {
        username: values.username.value,
        password: values.password.value
      })
      .then(res => {
        if (res.status === 200) {
          Toast.fire({
            icon: 'success',
            title: 'Login Successful!'
          })
          login(res.data.userId, res.data.token)
          navigate('/main')
        }
      })
      .catch(err => {
        MySwal.fire({
          title: 'Oops...',
          text: 'Username or password is incorrect!',
          icon: 'error'
        })
      })
  }

  const onChange = e => {
    setValues({
      ...values,
      [e.target.name]: { ...values[e.target.name], value: e.target.value }
    })
  }

  return (
    <div className="app">
      <form onSubmit={handleSubmit} noValidate>
        <h1>Log In</h1>
        {inputs.map(input => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name].value}
            onChange={onChange}
          />
        ))}
        <button>Submit</button>
      </form>
    </div>
  )
}

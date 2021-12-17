import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import FormInput from '../components/FormInput'
import withReactContent from 'sweetalert2-react-content'
import { API_URL } from '../consts'
import { Toast } from '../Toastr/Toastr'

const MySwal = withReactContent(Swal)

export const RegistrationForm = () => {
  let navigate = useNavigate()
  const token = JSON.parse(localStorage.getItem('userData'))?.token
  useEffect(() => {
    if (token) {
      navigate('/main')
    }
  }, [token, navigate])

  const [values, setValues] = useState({
    username: { value: '', pattern: '^[A-Za-z0-9]{3,16}$', isValid: false },
    password: {
      value: '',
      pattern:
        '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$'
    },
    passwordConfirmation: {
      value: '',
      pattern:
        '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$'
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
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$`,
      required: true
    },
    {
      id: 5,
      name: 'passwordConfirmation',
      type: 'password',
      placeholder: 'Confirm Password',
      errorMessage: "Passwords don't match!",
      pattern: values.password.value,
      label: 'Confirm Password',
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
      .post(`${API_URL}users/signup`, {
        username: values.username.value,
        password: values.password.value,
        passwordConfirmation: values.passwordConfirmation.value
      })
      .then(res => {
        if (res.status === 201) {
          navigate('/login')

          Toast.fire({
            icon: 'success',
            title: 'You signed up successfully!, please login!'
          })
        }
      })
      .catch(err => {
        console.log(err)
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
        <h1>Sign Up</h1>
        {inputs.map(input => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]?.value}
            onChange={onChange}
          />
        ))}

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

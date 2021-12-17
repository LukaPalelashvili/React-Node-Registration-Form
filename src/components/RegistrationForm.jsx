import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import FormInput from '../components/FormInput'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const RegistrationForm = () => {
  let navigate = useNavigate()

  const [values, setValues] = useState({
    username: '',
    password: '',
    confirmPassword: ''
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
        'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
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
      label: 'Confirm Password',
      pattern: values.password,
      required: true
    }
  ]

  const handleSubmit = e => {
    e.preventDefault()

    axios
      .post('http://localhost:4000/api/users/signup', values)
      .then(res => {
        if (res.status === 201) {
          MySwal.fire({
            title: 'Success!',
            text: 'Do you want to continue',
            icon: 'success',
            confirmButtonText: 'Cool'
          }).then(r => {
            navigate('/login')
          })
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
        <h1>Sign Up</h1>
        {inputs.map(input => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

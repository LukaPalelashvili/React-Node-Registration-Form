import { useState } from 'react'
import FormInput from '../FormInput'

export const EditForm = ({ onSave, user }) => {
  const [values, setValues] = useState({
    name: user.name,
    phone: user.phone
  })

  const onChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()

    onSave(values, user.id)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <FormInput
          name="name"
          type="text"
          placeholder="Name"
          errorMessage="Name should be 3-16 characters and shouldn't include any special character!"
          label="Name"
          pattern="^[A-Za-z0-9]{3,16}$"
          required
          value={values.name}
          onChange={onChange}
        />
      </div>
      <div>
        <FormInput
          name="phone"
          type="text"
          placeholder="Phone"
          errorMessage="Phone must be 9 characters long and must include only numbers!"
          label="Phone"
          pattern="^[0-9]{9}$"
          required
          value={values.phone}
          onChange={onChange}
        />
      </div>
      <button>Edit</button>
    </form>
  )
}

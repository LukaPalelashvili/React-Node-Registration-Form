import { useState } from 'react'
import FormInput from '../FormInput'

export const AddForm = ({ onSave }) => {
  const [values, setValues] = useState({
    name: '',
    phone: ''
  })

  const onChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()

    onSave(values)
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
          onChange={onChange}
        />
      </div>
      <button>Add</button>
    </form>
  )
}

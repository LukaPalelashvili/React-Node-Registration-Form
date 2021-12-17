import { useState } from 'react'
import MySwal from 'sweetalert2'
import FormInput from '../FormInput'

export const AddForm = ({ onSave }) => {
  const [values, setValues] = useState({
    name: { value: '', pattern: '^[A-Za-z0-9]{3,16}$' },
    phone: { value: '', pattern: '^[0-9]{9}$' }
  })

  const onChange = e => {
    setValues({
      ...values,
      [e.target.name]: { ...values[e.target.name], value: e.target.value }
    })
  }

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
      return
    }

    onSave({ name: values.name.value, phone: values.phone.value })
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div>
        <FormInput
          name="name"
          type="text"
          placeholder="Name"
          errorMessage="Name should be 3-16 characters and shouldn't include any special character!"
          label="Name"
          pattern="^[A-Za-z0-9]{3,16}$"
          required
          value={values.name.value}
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
          value={values.phone.value}
          onChange={onChange}
        />
      </div>
      <button>Add</button>
    </form>
  )
}

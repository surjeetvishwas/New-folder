let isEmailValid = (email = '') => email.includes('@') && email.includes('.')
let isEmpty = (param = '') => param.trim().length === 0

export const validateLogin = (values: any, formValues: any) => {
  for (const key of formValues) {
    if (key === 'email') {
      if (isEmpty(values[key])) {
        alert('Email address is required')
        return false
      }
      if (!isEmailValid(values[key])) {
        alert('Please enter a valid email address')
        return false
      }
    }
    if (isEmpty(values['password'])) {
      alert('Password is required')
      return false
    }
  }
  return true
}

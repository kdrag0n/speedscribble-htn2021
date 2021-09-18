import { useState } from 'react'

const AuthComponent = ({ action }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const emailInput = (
    <div className='mb-4'>
      <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
        Email
      </label>
      <input
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        id='username'
        type='email'
        placeholder='me@example.com'
        value={email}
        required
        onChange={({ target: { value: email } }) => setEmail(email)}
      />
    </div>
  )

  const passwordInput = (
    <div className='mb-6'>
      <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
        Password
      </label>
      <input
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
        id='password'
        type='password'
        placeholder='******************'
        value={password}
        required
        onChange={({ target: { value: password } }) => setPassword(password)}
      />
    </div>
  )

  return (
    <form className='bg-white shadow-md rounded px-8 pt-6 pb-8' onSubmit={(e) => this.login(e)}>
      {emailInput}
      {passwordInput}
      <div className='flex flex-col'>
        <button className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-2' type='submit'>
          {action}
        </button>
      </div>
    </form>
  )
}

export default AuthComponent

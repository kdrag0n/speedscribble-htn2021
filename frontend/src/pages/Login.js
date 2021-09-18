import AuthComponent from '../components/Auth'

const Login = () => {
  return (
    <div className='max-w-screen-sm mx-auto flex flex-col items-center py-36'>
      <AuthComponent action='Login' />
    </div>
  )
}

export default Login
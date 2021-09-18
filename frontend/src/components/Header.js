import { Link } from 'react-router-dom'

export default function Header({ authed }) {
  const authButtons = (
    <>
      <Link to="/login" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
        Sign in
      </Link>
      <Link
        to="/signup"
        className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Sign up
      </Link>
    </>
  )

  const gameButton = (
    <Link
      to="/game"
      className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
    >
      Game
    </Link>
  )

  return (
    <div className="relative bg-white">
      <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <Link to="/">
            <h1 className='font-extrabold text-4xl'>Game</h1>
          </Link>
        </div>
        {/* <nav className="flex space-x-10">
          <a href="/" className="text-base font-medium text-gray-500 hover:text-gray-900">
            Pricing
          </a>
        </nav> */}
        <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          {authed ? gameButton : authButtons}
        </div>
      </div>
    </div>
  )
}

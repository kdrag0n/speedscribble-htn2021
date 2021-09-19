import { classNames } from '../util'

const Button = ({ onClick = () => null, children, el = 'button', className = '', ...props }) => {
  const El = el

  return (
    <El
      className={classNames('whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700', className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </El>
  )
}

export default Button

import { classNames } from '../util'

const Button = ({ onClick = () => null, children, el = 'button', className = 'px-4', ...props }) => {
  const El = el

  return (
    <El
      className={classNames('whitespace-nowrap inline-flex items-center justify-center py-2 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700', className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </El>
  )
}

export default Button

import {ImSpinner2} from 'react-icons/im'

const Button = ({
  isLoading = false,
  title,
  className = '',
  color = 'primary',
  full = false,
  circle = false,
  rounded = true,
  children,
  ...rest
}) => {
  let colorName;
  let bgColor;
  let bgHoverColor;
  let textColor;
  let textHoverColor;
  let borderColor;
  let borderHoverColor;
  let borderFocusColor;

  switch (color) {
    case 'primary':
      colorName = 'royal-blue';
      bgColor = 'bg-blue-600';
      bgHoverColor = 'bg-blue-500';
      borderColor = 'border-transparent';
      textColor = 'text-white';
      break;

    case 'red':
      colorName = 'red';
      bgColor = 'bg-red-600';
      bgHoverColor = 'bg-red-500';
      borderColor = 'border-transparent';
      textColor = 'text-white';
      break;

    case 'default':
      colorName = 'gray';
      textColor = 'text-gray-700';
      bgColor = 'bg-gray-200';
      bgHoverColor = 'bg-gray-300';
      borderColor = 'border-transparent';
      break;

    case 'unset':
      colorName = 'gray';
      textColor = 'text-white';
      bgColor = 'bg-transparent';
      borderColor = 'border-gray-600';
      borderHoverColor = 'border-gray-300';
      break;

    default:
      break;
  }

  return (
    <button
      className={`
        flex justify-center items-center
        border focus:outline-none text-sm font-semibold
        transition duration-150 ease-in-out
        
        ${rounded ? 'rounded-full' : ''}
        ${full ? 'w-full' : ''}
        ${circle ? 'w-10 h-10' : ''}
        ${textColor}
        ${bgColor}
        ${borderColor}
        hover:${bgHoverColor} hover:${borderHoverColor}
        focus:${borderFocusColor}
        focus:shadow-outline-${colorName}
        active:${borderFocusColor}
        ${(!className && !circle) ? 'px-6 py-3' : ''}

        ${className}
      `}
      {...rest}
    >
      {isLoading && (
        <ImSpinner2
          width="20"
          className="absolute animate-spin"
        />
      )}
      <span className={isLoading ? 'invisible' : ''}>{children}</span>
    </button>
  )
}

export default Button
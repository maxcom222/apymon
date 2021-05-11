import { useState, useRef } from 'react';
import Transition from 'components/Transition'
import { useOnClickOutside } from 'hooks/useClickOutside';

const Dropdown = ({
  button,
  children,
  border = false,
  position = null,
  left = null,
  right = null,
  top = null,

  open,
  requestOpen = () => false,
  requestClose = () => false,

  buttonClassName = '',
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownNode = useRef();

  useOnClickOutside(dropdownNode, () => {
    if (typeof open !== 'undefined') {
      requestClose();
    } else {
      setDropdownOpen(false);
    }
  });

  const actionOpen = () => {
    if (typeof open !== 'undefined') {
      requestOpen();
    } else {
      setDropdownOpen(!dropdownOpen);
    }
  };

  return (
    <div
      className={`inline-block relative ${buttonClassName}`}
      ref={dropdownNode}
    >
      <div className="inline-block" onClick={() => actionOpen()}>
        {button}
      </div>
      <Transition
        show={typeof open !== 'undefined' ? open : dropdownOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div
          className={`
            absolute w-48 min-w-max mt-2 origin-top-right rounded-lg shadow-xl z-50 enter-done
            ${
              position === 'left'
                ? 'left-0'
                : position === 'right'
                  ? 'right-0'
                  : ''
            }
            ${
              left !== null ? (left >= 0 ? 'left-' + left : '-left' + left) : ''
            }
            ${
              right !== null
                ? right > 0
                  ? 'right-' + right
                  : '-right' + right
                : ''
            }
            ${top !== null ? (top >= 0 ? 'top-' + top : '-top' + top) : ''}
          `}
        >
          <div
            className={`
              bg-gray-900 rounded-lg shadow-xs
              ${border ? 'border border-gray-700' : ''}
            `}
            onClick={() => {
              if (typeof open !== 'undefined') {
                requestClose();
              } else {
                setDropdownOpen(false);
              }
            }}
          >
            {children}
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default Dropdown;

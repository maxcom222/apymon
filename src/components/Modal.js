import ReactModal from 'react-modal'

ReactModal.setAppElement('#root')

const Modal = ({
  open = false,
  className,
  children,
  requestClose = () => false,
}) => {
  const modalStyle = {
    overlay: {
      display: 'flex',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      justifyContent: 'center',
      alignItems: 'center',
      backdropFilter: 'blur(2px)',
    },
    content: {
      position: 'relative',
      backgroundColor: 'transparent',
      borderRadius: 'unset',
      border: 'unset',
      padding: 'unset',
    },
  }

  return (
    <ReactModal
      isOpen={open}
      onRequestClose={requestClose}
      style={modalStyle}
      className={className}
    >
      {children}
    </ReactModal>
  )
}

export default Modal

import { Modal } from 'literals'

const initialInfoModal = {
  isopen: false,
  content: null
}

const initialState = {
  isopenConnectModal: false,

  infoModal: initialInfoModal
}

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case Modal.openConnectModal:
      return {
        ...state, 
        isopenConnectModal: action.payload
      }

    case Modal.closeConnectModal:
      return {
        ...state,
        isopenConnectModal: action.payload
      }

    
    case Modal.openInfoModal:
      return {
        ...state,
        infoModal: action.payload
      }

    case Modal.closeInfoModal:
      return {
        ...state,
        infoModal: initialInfoModal
      }

    default:
      return state
  }
}
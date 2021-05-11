import {Modal} from 'literals'

export const openConnectModal = () => {
  return {
    type: Modal.openConnectModal,
    payload: true
  }
}

export const closeConnectModal = () => {
  return {
    type: Modal.closeConnectModal,
    payload: false
  }
}

export const openInfoModal = (data) => {
  return {
    type: Modal.openInfoModal,
    payload: {
      isopen: true,
      content: data
    }
  }
}

export const closeInfoModal = (data) => {
  return {
    type: Modal.closeInfoModal,
    payload: data
  }
}
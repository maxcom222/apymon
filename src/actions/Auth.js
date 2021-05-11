import {Auth} from 'literals'

export const login = (data) => {
  return {
    type: Auth.login,
    payload: data
  }
}

export const loginSuccess = (data) => {
  return {
    type: Auth.loginSuccess,
    payload: data
  }
}

export const loginError = (data) => {
  return {
    type: Auth.loginError,
    payload: data
  }
}

export const logout = (data) => {
  return {
    type: Auth.logout,
    payload: data
  }
}

export const logoutSuccess = (data) => {
  return {
    type: Auth.logoutSuccess,
    payload: data
  }
}

export const logoutError = (data) => {
  return {
    type: Auth.logoutError,
    payload: data
  }
}

export const setAddress = (address) => ({
  type: Auth.setAddress,
  payload: { address }
});

export const setNetworkId = (networkId) => ({
  type: Auth.setNetworkId,
  payload: { networkId }
});

export const setConnectType = (connectType) => ({
  type: Auth.setConnectType,
  payload: { connectType }
});

export const setError = (error) => ({
  type: Auth.setError,
  payload: { error }
});
import { Auth } from 'literals'

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? {
    loggedIn: true,
    user,
    error: false,
    errorMessage: '',
    address: null,
    networkId: null,
    connectType: ''
  }
  : {};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case Auth.login:
      return {
        ...state, 
        loggedIn: true, 
        user: action.payload
      }
    case Auth.logout:
      return {}
    case Auth.setAddress:
      return { ...state, address: action.payload.address };
    case Auth.setNetworkId:
      return { ...state, networkId: action.payload.networkId };
    case Auth.setConnectType:
      return { ...state, connectType: action.payload.connectType };
    case Auth.setError:
      return { ...state, error: action.payload.error };
    default:
      return state
  }
}
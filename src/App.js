import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { connect } from "react-redux";

import Home from 'containers/Home';
import Product from 'containers/Product';
import Activity from 'containers/Activity';
import Support from 'containers/Support';
import SingleSupport from 'containers/Support/Detail'
import Profile from 'containers/Profile'

import {
  setAddress,
  setNetworkId,
  setConnectType,
  setError
} from "./actions/Auth";

import { PublicRoute, PrivateRoute } from './Routes';
import { providerUrl, Web3, connector } from "./web3/wallet";

function App(props) {
  if (connector.connected) {
    props.setAddressRequest(connector._accounts[0]);
    props.setNetworkIdRequest(connector._chainId.toString(10));
    props.setConnectTypeRequest('walletConnect');
  } else {
    window.web3 = null;
    // modern broswers
    if (typeof window.ethereum !== "undefined") {
      window.web3 = new Web3(window.ethereum);
      window.web3.eth.net.getId((err, netId) => {
        handleNetworkChanged(`${netId}`);
        window.ethereum.request({ method: 'eth_accounts' }).then(accounts => {
          if (accounts[0]) {
            props.setAddressRequest(accounts[0]);
          }
        });
        window.ethereum.on("accountsChanged", (accounts) =>
          handleAddressChanged(accounts)
        );
        window.ethereum.on("chainChanged", (networkId) =>
          handleNetworkChanged(networkId)
        );
        props.setConnectTypeRequest('metamask');
      });
    } else if (window.web3) { // Legacy dapp browsers...
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.web3 = null;
    }
  }

  const handleAddressChanged = (accounts) => {
    if (typeof window.ethereum !== "undefined") {
      // window.location.reload(false);
      if (accounts[0]) {
        props.setAddressRequest(accounts[0]);
        props.setConnectTypeRequest('metamask');
        window.web3.eth.net.getId((err, netId) => {
          handleNetworkChanged(`${netId}`);
        })
      } else {
        props.setAddressRequest(null);
        props.setNetworkIdRequest(null);
        props.setConnectTypeRequest('');
      }
    }
  };

  const handleNetworkChanged = (networkId) => {
    props?.setNetworkIdRequest(networkId);
    switch (networkId) {
      case 1:
        if (providerUrl.includes("mainnet")) {
          props.setErrorRequest(false);
        } else {
          props.setErrorRequest(true);
        }
        break;
      case 42:
        if (providerUrl.includes("kovan")) {
          props.setErrorRequest(false);
        } else {
          props.setErrorRequest(true);
        }
        break;
      default:
        props.setErrorRequest(true);
    }
  };

  return (
    <>
      <Router>
        <Switch>
          <PublicRoute path="/" exact component={Home} />
          <PublicRoute path="/product" component={Product} />
          <PublicRoute path="/support" exact component={Support} />
          <PublicRoute path="/support/:id" component={SingleSupport} />

          <PrivateRoute path="/activity" component={Activity} />
          <PrivateRoute path="/profile/:profileContent" component={Profile} />

          <PublicRoute path="*">
            <p>Page not found</p>
          </PublicRoute>
        </Switch>
      </Router>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAddressRequest: (address) => dispatch(setAddress(address)),
    setNetworkIdRequest: (networkId) => dispatch(setNetworkId(networkId)),
    setConnectTypeRequest: (connectType) => dispatch(setConnectType(connectType)),
    setErrorRequest: (error) => dispatch(setError(error)),
  };
};


export default connect(null, mapDispatchToProps)(App);

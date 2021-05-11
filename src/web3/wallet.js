import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import Web3 from 'web3';
import config from './config';

const providerUrl = config.web3Provider;
const web3 = new Web3(window.ethereum || providerUrl);

// eslint-disable-next-line import/no-mutable-exports
let connector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org", // Required
  qrcodeModal: QRCodeModal,
});

const createConnector = () => {
  connector = new WalletConnect({
    bridge: "https://bridge.walletconnect.org", // Required
    qrcodeModal: QRCodeModal,
  });
}

export {
  Web3,
  providerUrl,
  web3,
  connector,
  createConnector
};

/* eslint-disable no-undef */
require('dotenv').config();

const networkId = process.env.REACT_APP_NETWORK_ID;

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
const CRYPTO_KEY = process.env.REACT_APP_CRYPTO_KEY;

const web3Provider = networkId === 1
  ? process.env.REACT_APP_MAIN_WEB3_PROVIDER
  : process.env.REACT_APP_KOVAN_WEB3_PROVIDER;
  
const config = {
  web3Provider,
  networkId,
  ZERO_ADDRESS,
  CRYPTO_KEY
};

module.exports = config;




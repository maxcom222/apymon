import { networkId } from './config';
import { web3 } from './wallet';

const wethABI = require('./abis/weth.json');
const apymonABI = require('./abis/apymon.json');

export const addresses = {
  'APYMON': {
    1: '',
    42: '0x895E1695aFc5EE114eFB896C69F35b7A8948a1eF'
  },
  'WETH': { // controller
    1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    42: '0xd0A1E359811322d97991E03f863a0C30C2cF029C'
  }
}

const wethContract = new web3.eth.Contract(wethABI, addresses.WETH[networkId]);
const apymonContract = new web3.eth.Contract(apymonABI, addresses.APYMON[networkId]);

export const contracts = {
  wethContract: {
    address: addresses.WETH[networkId],
    contract: wethContract,
    decimals: 18
  },
  apymonContract: {
    address: addresses.APYMON[networkId],
    contract: apymonContract,
    decimals: 18
  },
};

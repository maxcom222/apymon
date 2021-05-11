import BigNumber from 'bignumber.js';
import { connector, web3 } from './wallet';
import config from './config';

const { networkId } = config;

export const createEthAccount = () => {
  return web3.eth.accounts.create();
};

export const getETHBalance = async (address) => {
  if (address) {
    const bnbBalance = await web3.eth.getBalance(address);
    return bnDivdedByDecimals(new BigNumber(bnbBalance));
  }
  return new BigNumber(0);
}

export const getEtherScanURL = (trxHash) => {
  let url = null;
  if (!trxHash) return null;
  if (networkId === 1) {
    url = "https://etherscan.io/tx/" + trxHash;
  } else if (networkId === 2) {
    url = "https://ropsten.etherscan.io/tx/" + trxHash;
  } else if (networkId === 42) {
    url = "https://kovan.etherscan.io/tx/" + trxHash;
  }
  return url;
}

export const loadPricesByAddress = async (address) => {
  let data;
  try {
    const url = `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${address}&vs_currencies=usd`;
    const response = await fetch(url);
    data = await response.json();
  } catch (e) {
    return 0;
  }
  return data[address].usd;
}

export const sendTransaction = async (
  connectType,
  fromAddress,
  toAddress,
  encodedABI,
  successCallBack,
  errorCallBack,
  wei = `0x0`
) => {
  if (connectType === 'metamask') {
    if (window.ethereum && web3) {
      try {
        const gasPrice = await web3.eth.getGasPrice();
        const tx = {
          from: fromAddress,
          to: toAddress,
          gasPrice: web3.utils.toHex(gasPrice),
          data: encodedABI,
          value: wei
        };
        web3.eth.sendTransaction(tx)
          .on('transactionHash', (hash) => { console.log('hash: ', hash) })
          .on('receipt', (receipt) => {
            successCallBack();
          })
          .on('error', (err) => {
            errorCallBack(err)
          });
      } catch (err) {
        return null;
      }
    } else {
      return null;
    }
  } else if (connectType === 'walletConnect') {
    if (connector.connected) {
      try {
        const tx = {
          from: fromAddress,
          to: toAddress,
          data: encodedABI,
          value: wei
        };

        return new Promise((resolve, reject) => {
          connector.sendTransaction(tx)
            .then((result) => {
              resolve(result);
            })
            .catch((error) => {
              reject(error);
            });
        });
      } catch (err) {
        return null;
      }
    } else {
      return null;
    }
  }
  return null;
}

export const callMethod = async (method, args = []) => {
  // eslint-disable-next-line no-return-await
  return await method(...args).call();
}

export const bnToDec = (bn, decimals = 18) => {
  return bn.div(new BigNumber(10).pow(decimals)).toNumber();
}

export const bnToString = (bn, decimals = 18) => {
  return bn.div(new BigNumber(10).pow(decimals)).toString(10);
}

export const bnDivdedByDecimals = (bn, decimals = 18) => {
  return bn.div(new BigNumber(10).pow(decimals));
}

export const bnMultipledByDecimals = (bn, decimals = 18) => {
  return bn.times(new BigNumber(10).pow(decimals));
}

export const decToBn = (dec, decimals = 18) => {
  return new BigNumber(dec).times(new BigNumber(10).pow(decimals));
}

export const formatDecimal = (value, decimal = 18) => {
  BigNumber.config({
    DECIMAL_PLACES: 18,
    FORMAT: {
      // string to prepend
      prefix: '',
      // decimal separator
      decimalSeparator: '.',
      // grouping separator of the integer part
      groupSeparator: ',',
      // primary grouping size of the integer part
      groupSize: 3,
    }
  });
  const data = new BigNumber(value).dividedBy(new BigNumber(10).pow(decimal));
  if (data.isGreaterThan(1)) {
    return data.toFormat(4);
  }
  return data.toFormat(6);
}

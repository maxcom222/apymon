import BigNumber from 'bignumber.js';
import { contracts } from './contract';
import { callMethod, bnDivdedByDecimals } from './utils';

const { apymonContract } = contracts;

// Getters
export const getBalance = async (address) => {
  try {
    return new BigNumber(await callMethod(apymonContract.contract.methods.balanceOf, [address]));
  } catch {
    return new BigNumber(0);
  }
}

export const isApprovedForAll = async (owner, operator) => {
  try {
    return await callMethod(
      apymonContract.contract.methods.isApprovedForAll, [owner, operator]
    );
  } catch {
    return false;
  }
}

export const getApproved = async (tokenId) => {
  try {
    return await callMethod(
      apymonContract.contract.methods.getApproved, [tokenId]
    );
  } catch {
    return null;
  }
}

export const getTokenByIndex = async (index) => {
  try {
    return await callMethod(
      apymonContract.contract.methods.tokenByIndex, [index]
    );
  } catch {
    return null;
  }
}

export const getTotalSupply = async () => {
  try {
    return new BigNumber(await callMethod(
      apymonContract.contract.methods.totalSupply, []
    ));
  } catch {
    return new BigNumber(0);
  }
}

export const getOwner = async (tokenId) => {
  try {
    return await callMethod(
      apymonContract.contract.methods.ownerOf, [tokenId]
    );
  } catch {
    return null;
  }
}

export const getTokenURI = async (tokenId) => {
  try {
    return await callMethod(
      apymonContract.contract.methods.ownerOf, [tokenId]
    );
  } catch {
    return null;
  }
}

export const getBaseURI = async () => {
  try {
    return await callMethod(
      apymonContract.contract.methods.baseURI, []
    );
  } catch {
    return null;
  }
}

export const getMaxSupply = () => {
  return 9999;
}

export const getSaleStartTime = () => {
  return 1615402800;
}

export const getSaleEndTime = () => {
  return 1615402800 + (86400 * 20);
}

export const checkLocked = async (creatureId) => {
  try {
    const result = await callMethod(apymonContract.contract.methods.isLocked, [creatureId]);
    return {
      locked: result.locked,
      endTime: result.endTime
    }
  } catch {
    return {
      locked: false,
      endTime: null
    }
  }
}

export const getInsideTokensCount = async (creatureId) => {
  try {
    const result = await callMethod(
      apymonContract.contract.methods.getInsideTokensCount, [creatureId]
    );
    return {
      erc20Len: new BigNumber(result.erc20Len),
      erc721Len: new BigNumber(result.erc721Len),
      erc1155Len: new BigNumber(result.erc1155Len)
    }
  } catch {
    return {
      erc20Len: new BigNumber(0),
      erc721Len: new BigNumber(0),
      erc1155Len: new BigNumber(0)
    }
  }
}

export const getTokens = async (creatureId) => {
  try {
    const result = await callMethod(
      apymonContract.contract.methods.getTokens, [creatureId]
    );
    return {
      tokenTypes: result.tokenTypes,
      tokenAddresses: result.tokenAddresses
    }
  } catch {
    return {
      tokenTypes: null,
      tokenAddresses: null
    }
  }
}

export const getERC20Tokens = async (creatureId) => {
  try {
    const result = await callMethod(
      apymonContract.contract.methods.getERC20Tokens, [creatureId]
    );
    const len = result.addresses.length;
    const tokenBalances = [];

    for (let i = 0; i < len; i += 1) {
      tokenBalances.push(bnDivdedByDecimals(new BigNumber(result.tokenBalances[i])));
    }

    return {
      addresses: result.addresses,
      tokenBalances
    }
  } catch {
    return {
      addresses: null,
      tokenBalances: null
    }
  }
}

export const getERC721Tokens = async (creatureId) => {
  try {
    const result = await callMethod(
      apymonContract.contract.methods.getERC721Tokens, [creatureId]
    );
    const len = result.addresses.length;
    const tokenBalances = [];

    for (let i = 0; i < len; i += 1) {
      tokenBalances.push(new BigNumber(result.tokenBalances[i]));
    }

    return {
      addresses: result.addresses,
      tokenBalances
    }
  } catch {
    return {
      addresses: null,
      tokenBalances: null
    }
  }
}

export const getERC721OrERC1155Ids = async (creatureId, insideToken) => {
  try {
    return await callMethod(
      apymonContract.contract.methods.getERC721OrERC1155Ids, [creatureId, insideToken]
    );
  } catch {
    return null;
  }
}

export const getERC1155Tokens = async (creatureId) => {
  try {
    return await callMethod(
      apymonContract.contract.methods.getERC1155Tokens, [creatureId]
    );
  } catch {
    return null;
  }
}

export const getERC1155TokenBalance = async (creatureId, insideToken, tokenId) => {
  try {
    return new BigNumber(await callMethod(
      apymonContract.contract.methods.getERC1155TokenBalance, [creatureId, insideToken, tokenId]
    ));
  } catch {
    return new BigNumber(0);
  }
}

export const getAvailableCreatureAmount = async () => {
  try {
    return await callMethod(
      apymonContract.contract.methods.getAvailableCreatureAmount, []
    );
  } catch {
    return 0;
  }
}

export const getCreaturePrice = async () => {
  try {
    return bnDivdedByDecimals(new BigNumber(await callMethod(
      apymonContract.contract.methods.getCreaturePrice, []
    )));
  } catch {
    return new BigNumber(0);
  }
}

export const getNextPrice = (curPrice) => {
  if (curPrice === '0.08') {
    return '0.16';
  }
  if (curPrice === '0.16') {
    return '0.32';
  }
  if (curPrice === '0.32') {
    return '0.64';
  }
  if (curPrice === '0.64') {
    return '0.9';
  }
  if (curPrice === '0.9') {
    return '1.5';
  }
  if (curPrice === '1.5') {
    return '2';
  }
  return '0';
}

export const getCurrentTier = (curPrice) => {
  if (curPrice === '0.08') {
    return '1';
  }
  if (curPrice === '0.16') {
    return '2';
  }
  if (curPrice === '0.32') {
    return '3';
  }
  if (curPrice === '0.64') {
    return '4';
  }
  if (curPrice === '0.9') {
    return '5';
  }
  if (curPrice === '1.5') {
    return '6';
  }
  return '0';
}

export const getMaxTier = () => {
  return '6';
}
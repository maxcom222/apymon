import { useEffect, useState, useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {IoMdClose} from 'react-icons/io'
import {SiEthereum} from 'react-icons/si'
import LoadingBar, { showLoading, hideLoading } from 'react-redux-loading-bar'
import BigNumber from 'bignumber.js';

import {FaTelegram, FaTwitter, FaDiscord, FaMedium, FaGithub} from 'react-icons/fa'
import {login, logout, setAddress, setNetworkId, setConnectType } from 'actions/Auth'
import Modal from 'components/Modal'
import Dropdown from 'components/Dropdown'

import egg from 'assets/img/egg.png'
import hambuger from 'assets/img/hambuger.png'
import alarm from 'assets/img/alarm.png'
import metamask from 'assets/img/metamask.svg'
import walletConnect from 'assets/img/walletConnect.svg'
import coinbaseWallet from 'assets/img/coinbaseWallet.svg'

import config from '../web3/config';
import { web3, connector, createConnector } from '../web3/wallet';
import { getETHBalance, loadPricesByAddress } from '../web3/utils';
import { getBalance } from '../web3/apymon';

function importAll(r) {
  return r.keys().map(r);
}

const avatars = importAll(require.context('assets/img/avatars', true));
const profileBanners = importAll(require.context('assets/img/profile-banners', true));

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const address = useSelector(state => state.auth.address);
  // const connectType = useSelector(state => state.auth.connectType);
  const history = useHistory();

  const [toggleMenu, setToggleMenu] = useState(false)
  const [openConnectModal, setOpenConnectModal] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [ethBalance, setEthBalance] = useState(new BigNumber(0));
  const [eggBalance, setEggBalance] = useState(new BigNumber(0));
  const [ethPrice, setEthPrice] = useState(0);
  const [timerID, setTimerID] = useState(0);

  const onMetamaskConnect = async () => {
    if (typeof window.ethereum === 'undefined') {
      setAlertMessage('Please install Metamask!');
      setOpenAlertModal(true);
      return false;
    }
    try {
      const netId = `${await web3.eth.net.getId()}`;
      if (netId !== config.networkId) {
        if (config.networkId === 1) {
          setAlertMessage('Please select main net to proceed!');
        } else if (config.networkId === 3) {
          setAlertMessage('Please select ropsten net to proceed!');
        } else if (config.networkId === 42) {
          setAlertMessage('Please select kovan net to proceed!');
        } else {
          setAlertMessage('Unsupported newtwork!');
        }
        setOpenAlertModal(true);
        return false;
      }
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts[0]) {
        dispatch(setNetworkId(netId));
        dispatch(setAddress(accounts[0]));
        dispatch(setConnectType('metamask'));
        return true;
      }
    } catch (error) {
      setAlertMessage('Something went wrong while connect to wallet!');
      setOpenAlertModal(true);
    }
    return false;
  };

  const onWalletConnect = async () => {
    createConnector();
    // Check if connection is already established
    if (!connector.connected) {
      // create new session
      connector.createSession();
    } // else {
    //   console.log(connector._accounts[0]);
    //   console.log(connector._chainId.toString(10));
    // }

    // Subscribe to connection events
    connector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }

      // Get provided accounts and chainId
      const { accounts, chainId } = payload.params[0];
      dispatch(setAddress(accounts[0]));
      dispatch(setNetworkId(chainId.toString(10)));
      dispatch(setConnectType('walletConnect'));
    });

    connector.on("session_update", (error) => {
      if (error) {
        throw error;
      }
    });

    connector.on("disconnect", (error) => {
      if (error) {
        throw error;
      }

      dispatch(setAddress(null));
      dispatch(setNetworkId(null));
      dispatch(setConnectType(''));
      history.push('/');
      // Delete connector
    });
  };

  const handleConnect = async (walletProvider) => {
    let status = false;
    if (walletProvider === 'metamask') {
      status = await onMetamaskConnect();
    } else if (walletProvider === 'walletconnect') {
      status = await onWalletConnect();
    } else if (walletProvider === 'coinbasewallet') {
      setAlertMessage('Unsupported wallet provider yet!');
      setOpenAlertModal(true);
    }

    if (status) {
      // eslint-disable-next-line no-underscore-dangle
      const _user = {
        name: 'Default User',
        avatar: avatars[Math.floor(Math.random() * avatars.length)].default,
        profileBanner: profileBanners[Math.floor(Math.random() * profileBanners.length)].default,
      }

      localStorage.setItem('user', JSON.stringify(_user));
      dispatch(login(_user));
      setOpenConnectModal(false);
    }
  }

  const handleDisconnect = () => {
    if (connector.connected) {
      connector.killSession();
    }
    dispatch(setAddress(null));
    dispatch(setNetworkId(null));
    dispatch(setConnectType(''));
    history.push('/');
    localStorage.removeItem('user')
    dispatch(logout())
  }

  const fetchData = useCallback(async () => {
    setEthBalance(await getETHBalance(address));
    const wethAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
    setEthPrice(await loadPricesByAddress(wethAddress.toLocaleLowerCase()));
    setEggBalance(await getBalance(address));
  }, [address]);

  useEffect(async () => {
    if (address) {
      if (timerID > 0) clearInterval(timerID);

      const tempTimerID = setInterval(async () => {
        fetchData();
      }, 13000);

      setTimerID(tempTimerID);
      fetchData();
    }
  }, [address]);

  useEffect(() => { // loading bar test
    dispatch(showLoading())
    setTimeout(() => {
      dispatch(hideLoading())
    }, 1000)
  }, [])

  return (
    <>
      <LoadingBar className="fixed h-0.5 bg-blue-500 z-40" />
      <header className="fixed w-full body-font border-b border-gray-800 z-30 bg-background font-prompt">
        <div className="container mx-auto flex flex-wrap justify-between py-4 md:flex-row items-center">
          <div className="flex justify-between lg:w-auto md:w-auto sm:w-auto w-full">
            <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-0">
              <img src="/logo.png" className="w-32" alt="" />
              <span className="ml-4 px-1.5 bg-blue-600 text-xs text-white">BETA</span>
            </Link>
            <div className="lg:hidden md:hidden sm:hidden block text-white" onClick={() => setToggleMenu(!toggleMenu)}>
              <img src={hambuger} alt="" />
            </div>
          </div>
          <>
            <nav className={`lg:flex md:flex sm:flex ${toggleMenu ? '' : 'hidden'} md:mr-auto md:ml-6 md:py-1 md:pl-4 lg:mt-0 md:mt-0 sm:mt-0 mt-6 flex-wrap lg:flex-row md:flex-row sm:flex-row flex-col items-center text-base justify-center lg:w-auto md:w-auto sm:w-auto w-full`}>
              <a className="block sm:mr-6 mr-9 lg:mb-0 md:mb-0 sm:mb-0 mb-2 text-gray-300 hover:text-white cursor-pointer">Collection</a>
              <Dropdown
                position="left"
                border
                button={
                  <a className="block sm:mr-6 mr-9 lg:mb-0 md:mb-0 sm:mb-0 mb-2 text-gray-300 hover:text-white cursor-pointer">Community</a>
                }
              >
                <div className="w-60 font-sans px-6 py-4">
                  <a href="https://telegram.org" target="_blank" rel="noreferrer" className="flex items-center text-base font-semibold">
                    <span className="mr-2">
                      <FaTelegram />
                    </span>
                    <span>
                      Telegram
                    </span>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="flex items-center text-base font-semibold mt-3">
                    <span className="mr-2">
                      <FaTwitter />
                    </span>
                    <span>
                      Twitter
                    </span>
                  </a>
                  <a href="https://discord.com" target="_blank" rel="noreferrer" className="flex items-center text-base font-semibold mt-3">
                    <span className="mr-2">
                      <FaDiscord />
                    </span>
                    <span>
                      Discord
                    </span>
                  </a>
                  <a href="https://medium.com" target="_blank" rel="noreferrer" className="flex items-center text-base font-semibold mt-3">
                    <span className="mr-2">
                      <FaMedium />
                    </span>
                    <span>
                      Medium
                    </span>
                  </a>
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center text-base font-semibold mt-3">
                    <span className="mr-2">
                      <FaGithub />
                    </span>
                    <span>
                      Github
                    </span>
                  </a>
                </div>
              </Dropdown>
              <a className="block sm:mr-6 mr-9 lg:mb-0 md:mb-0 sm:mb-0 mb-2 text-gray-300 hover:text-white cursor-pointer">
                <div className="flex items-center">
                  <span>
                    Marketplace
                  </span>
                  <span className="ml-3 text-2xs font-bold px-1 py-0.5 rounded-full bg-gradient-to-br from-blue-600 to-pink-500">NEW</span>
                </div>
              </a>
              
              <Link to="/support" className="block sm:mr-6 mr-9 lg:mb-0 md:mb-0 sm:mb-0 mb-2 text-gray-300 hover:text-white cursor-pointer">Support</Link>
            </nav>
            <div className={`lg:inline-flex md:inline-flex sm:inline-flex ${toggleMenu ? 'flex' : 'hidden'} lg:flex-row flex-row justify-between items-center lg:w-auto md:w-auto sm:w-auto w-full lg:mt-0 md:mt-0 sm:mt-0 mt-4`}>
              {user &&
              <>
                <Link to="/profile/items" className="flex items-center px-3 py-1 bg-dark-600 rounded-lg text-gray-300 hover:text-white text-lg font-bold cursor-pointer">
                  <img src={egg} className="w-4" alt="" />
                  <span className="ml-3">{eggBalance.toString(10)}</span>

                </Link>
                <Link to="/activity" className="ml-5 cursor-pointer hover:text-white">
                  <img src={alarm} className="w-4" />
                </Link>
                <Dropdown
                  position="right"
                  border
                  button={
                    <a className="flex items-center bg-dark-600 p-0.5 rounded-full lg:ml-5 cursor-pointer text-gray-300 hover:text-white">
                      <span className="px-4 font-prompt text-sm font-medium">{user.name}</span>
                      <span className="w-9 h-9 rounded-full bg-gray-300 overflow-hidden">
                        <img src={user.avatar} />
                      </span>
                    </a>
                  }
                >
                  <div className="w-80 font-sans">
                    <div className="px-6 py-4 border-b border-gray-700">
                      <div className="text-xl font-bold">{user.name}</div>
                      <div className="text-gray-500 text-sm">{address ? `${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}` : null}</div>
                      <div className="flex mt-3">
                        <span className="w-9 h-9 rounded-full bg-gray-300 overflow-hidden">
                          <img src={user.avatar} />
                        </span>
                        <div className="ml-4">
                          <div className="text-sm text-gray-500 font-semibold">Balance</div>
                          <div className="flex items-center">
                            <span className="text-sm font-bold">{ethBalance.toFixed(4)}</span>
                            <span className="ml-1">
                              <SiEthereum size={18} />
                            </span>
                            <span className="ml-2 text-sm text-gray-500 font-semibold">${new BigNumber(ethPrice).times(ethBalance).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-6 py-4">
                      <Link to="/profile/items" className="block text-base font-semibold">My items</Link>
                      <a
                        to="#"
                        className="block text-base font-semibold mt-3"
                        onClick={() => {
                          handleDisconnect()
                        }}
                      >
                        Disconnect
                      </a>
                    </div>
                  </div>
                </Dropdown>
              </>
              }

              {!user &&
              <a
                className="flex items-center border border-white border-opacity-30 p-0.5 rounded-full lg:ml-5 cursor-pointer text-gray-300 hover:text-white"
                onClick={() => setOpenConnectModal(true)}
              >
                <span className="px-4 py-1.5 text-sm font-medium">Connect wallet</span>
              </a>
              }
            </div>
          </>
        </div>
      </header>

      <Modal
        open={openConnectModal}
        requestClose={() => setOpenConnectModal(false)}
        className="w-screen h-screen"
      >
        <div className="absolute top-0 left-0 w-full flex justify-between p-4">
          <Link to="/" className="flex title-font font-medium items-center text-gray-900 py-0.5 mb-0">
            <img src="/logo.png" className="w-32" alt="" />
            <span className="ml-4 px-1.5 bg-blue-600 text-xs text-white">BETA</span>
          </Link>
          <a
            className="absolute right-0 top-0 flex justify-center items-center w-10 h-10 hover:border-gray-300"
            onClick={() => setOpenConnectModal(false)}
          >
            <IoMdClose size={20} />
          </a>
        </div>
        <div className="flex justify-center items-center w-full h-full bg-black">
          <div className="w-80">
            <div className="text-3xl font-semibold mb-3">Connect your wallet</div>
            <div className="text-sm mb-7">
              <span className="text-gray-300">
                Connect with one of available wallet providers or create a new wallet. 
              </span>
              <Link to="#" className="text-blue-600">&nbsp;What is wallet?</Link>
            </div>
            <a
              className="relative flex justify-center items-center border border-white border-opacity-30 px-6 py-3.5 rounded-full cursor-pointer text-gray-300 hover:text-white mb-2"
              onClick={() => handleConnect('metamask')}
            >
              <img src={metamask} className="absolute left-0 ml-6" alt="" width={24} height={24} />
              <span className="font-prompt text-lg font-medium">Metamask</span>
            </a>
            <a
              className="relative flex justify-center items-center border border-white border-opacity-30 px-6 py-3.5 rounded-full cursor-pointer text-gray-300 hover:text-white mb-2"
              onClick={() => handleConnect('walletconnect')}
            >
              <img src={walletConnect} className="absolute left-0 ml-6" alt="" width={24} height={24} />
              <span className="font-prompt text-lg font-medium">Wallet Connect</span>
            </a>
            <a
              className="relative flex justify-center items-center border border-white border-opacity-30 px-6 py-3.5 rounded-full cursor-pointer text-gray-300 hover:text-white mb-2"
              onClick={() => handleConnect('coinbasewallet')}
            >
              <img src={coinbaseWallet} className="absolute left-0 ml-6" alt="" width={24} height={24} />
              <span className="font-prompt text-lg font-medium">Coinbase Wallet</span>
            </a>
            <div className="text-sm text-gray-300 mt-10">
              We do not own your private keys and cannot access your finds
              without your confirmation.
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        open={openAlertModal}
        requestClose={() => setOpenAlertModal(false)}
        className="w-96"
      >
        <div className="flex flex-col px-7 py-5 bg-gray-800 border border-gray-600 lg:rounded-xl lg:w-auto lg:h-auto w-screen h-screen">
          <div className="flex justify-between mb-4">
            <span className="text-3xl font-bold">Error</span>
            <a
              className="flex justify-center items-center w-10 h-10 rounded-full border border-gray-600 hover:border-gray-300"
              onClick={() => setOpenAlertModal(false)}
            >
              <IoMdClose size={14} />
            </a>
          </div>
          <div className="flex-grow flex items-center">
            <div className="lg:mb-0 mb-10">
              <div className="text-base mb-4">
                {alertMessage}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Header
import React, { useState, createRef, useEffect, useCallback } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {IoMdClose} from 'react-icons/io'
import {BiLock, BiHelpCircle, BiDownArrowAlt} from 'react-icons/bi'
import {FiPackage, FiRepeat} from 'react-icons/fi'
import {SiEthereum} from 'react-icons/si'
import {AiFillGift} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import BigNumber from 'bignumber.js';
import {openInfoModal} from 'actions/Modal'
import * as QueryString from 'query-string'
import Modal from 'components/Modal'

import rockbackground from 'assets/img/rockbackground.png'
import play from 'assets/img/play.png'
import deodato from 'assets/img/deodato.png'
import VideoPlayer from 'components/VideoPlayer'
import Button from 'components/Button'
import {
  getBalance,
  getTotalSupply,
  getMaxSupply,
  getCreaturePrice,
  getNextPrice,
  getCurrentTier,
  getMaxTier,
  getAvailableCreatureAmount
} from '../web3/apymon'
import {
  bnMultipledByDecimals,
  getETHBalance,
  sendTransaction
} from '../web3/utils';
import { contracts } from '../web3/contract';

import {
  ZERO_ADDRESS,
  CRYPTO_KEY
} from '../web3/config';

const CryptoJS = require("crypto-js");


const fekaFeaturedPacks = [
  {
    name: 'BASE SET',
    seriesName: 'Series 2',
    release: 22,
    isTba: false,
    cost: '$19.00',
    releasingIn: '4 days, 3 hours, 22 minutes',
    image: 'https://assets.nbatopshot.com/resize/packs/common/pack_2_base_set_common.png?width=576&quality=50'
  },
  {
    name: 'RISING STARS',
    seriesName: 'Series 2',
    release: 20,
    isTba: true,
    cost: null,
    releasingIn: null,
    image: 'https://assets.nbatopshot.com/resize/packs/common/pack_1_base_set_common.png?width=576&quality=50'
  },
  {
    name: 'SEEING STARS',
    seriesName: 'Series 2',
    release: 22,
    isTba: true,
    cost: null,
    releasingIn: null,
    image: 'https://assets.nbatopshot.com/resize/packs/common/pack_1_base_set_common.png?width=576&quality=50'
  },
  {
    name: 'BASE SET',
    seriesName: 'Series 2',
    release: 20,
    isTba: true,
    cost: null,
    releasingIn: null,
    image: 'https://assets.nbatopshot.com/resize/packs/common/pack_1_base_set_common.png?width=576&quality=50'
  }
]

const Home = ({location}) => {
  const dispatch = useDispatch()
  const params = QueryString.parse(location.search);
  const address = useSelector(state => state.auth.address);
  const connectType = useSelector(state => state.auth.connectType);

  const [openCheckoutModal, setOpenCheckoutModal] = useState(false);
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [openReferralLinkModal, setOpenReferralLinkModal] = useState(false);
  const [openAddressInput, setOpenAddressInput] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('Error');
  const [giftAddress, setGiftAddress] = useState('');
  const [amount, setAmount] = useState(1);
  const [timerID, setTimerID] = useState(0);
  const [eggBalance, setEggBalance] = useState(new BigNumber(0));
  const [ethBalance, setEthBalance] = useState(new BigNumber(0));
  const [currentSupply, setCurrentSupply] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(new BigNumber(0));
  const [availableAmount, setAvailableAmount] = useState(0);
  const [generatedReferralLink, setGeneratedReferralLink] = useState('');
  const [nextPrice, setNextPrice] = useState('0');
  const [currentTier, setCurrentTier] = useState('0');
  const [maxTier, setMaxTier] = useState('0');

  const [isTransacting, setIsTransacting] = useState(false)
  const giftAdressRef = createRef();

  if (params.w) localStorage.setItem('referralLink', JSON.stringify(params.w));
  const referralLink = JSON.parse(localStorage.getItem('referralLink'));
  
  const onBuy = async () => {
    if (address === null || address === '' || address === undefined) {
      setAlertType('Error');
      setAlertMessage('Please connect to wallet provider!');
      setOpenAlertModal(true);
      return;
    }
    
    let referee = ZERO_ADDRESS;
    if (referralLink) {
      const bytes = CryptoJS.AES.decrypt(referralLink, CRYPTO_KEY);
      const utf8Data = bytes.toString(CryptoJS.enc.Utf8);
      referee = utf8Data.slice(1, -1);
    }

    let encodedABI;
    const payment = bnMultipledByDecimals(new BigNumber(currentPrice * amount));
    if (payment.lte(new BigNumber(0))) {
      setAlertType('Error');
      setAlertMessage('Please fill out amount field!');
      setOpenAlertModal(true);
      return;
    }

    if (giftAddress !== null && giftAddress !== '') {
      encodedABI = contracts.apymonContract.contract.methods.mintCreatures(
        giftAddress,
        amount,
        referee
      ).encodeABI();
    } else {
      encodedABI = contracts.apymonContract.contract.methods.mintCreatures(
        address,
        amount,
        referee
      ).encodeABI();
    }
    setIsTransacting(true)

    await sendTransaction(
      connectType,
      address,
      contracts.apymonContract.address,
      encodedABI,
      transactionDone,
      transactionError,
      payment.toString(10)
    );
  }

  const transactionDone = () => {
    fetchData();
    setIsTransacting(false)
    
    setAlertType('Completion');
    setAlertMessage('Your order has been completed!');
    setOpenAlertModal(true);
  }

  const transactionError = () => {
    setIsTransacting(false)
    
    setAlertType('Error');
    setAlertMessage('Your order has been rejected!');
    setOpenAlertModal(true);
  }
 
  const fetchData = useCallback(async () => {
    setCurrentSupply(await getTotalSupply());
    setCurrentPrice(await getCreaturePrice());
    setEggBalance(await getBalance(address));
    setAvailableAmount(await getAvailableCreatureAmount());
    setEthBalance(await getETHBalance(address));
  }, [address]);

  const getSoldPercent = () => {
    return (currentSupply / getMaxSupply()) * 100 + '%';
  }

  useEffect(async () => {
    if (address) {
      if (timerID > 0) clearInterval(timerID);

      const tempTimerID = setInterval(async () => {
        fetchData();
      }, 13000);

      setTimerID(tempTimerID);
      fetchData();
    } else {
      setAmount(1);
      setTimerID(0);
      setEggBalance(new BigNumber(0));
      setEthBalance(new BigNumber(0));
      setCurrentSupply(0);
      setCurrentPrice(new BigNumber(0));
      setAvailableAmount(0);
    }
  }, [address]);

  useEffect(() => {
    giftAdressRef.current?.focus()
  }, [giftAdressRef])

  useEffect(() => {
    setNextPrice(getNextPrice(currentPrice.toString(10)));
    setCurrentTier(getCurrentTier(currentPrice.toString(10)));
    setMaxTier(getMaxTier());
  }, [currentPrice])

  useEffect(() => {
    if (eggBalance.gt(new BigNumber(0))) {
      const cipheredAddress = CryptoJS.AES.encrypt(JSON.stringify(address), CRYPTO_KEY).toString();
      const chiperedReferralLink = `${process.env.REACT_APP_PUBLIC_URL}/?w=${cipheredAddress}`;
      setGeneratedReferralLink(chiperedReferralLink);
    }
  }, [address, eggBalance])

  useEffect(() => {
    if (availableAmount !== 0 && parseInt(amount, 10) > parseInt(availableAmount, 10)) {
      setAmount(availableAmount);
    }
  }, [amount])

  return (
    <div className="container mx-auto py-5">
      <div className="relative lg:flex bg-black lg:h-100 rounded-lg overflow-hidden lg:mb-8 mb-16">
        <div className="lg:relative absolute lg:w-2/4 w-full lg:h-100 h-80">
          <div
            className="absolute left-0 top-0 flex justify-center items-center w-full h-full bg-no-repeat bg-center"
            style={{backgroundImage: `url(${rockbackground})`}}
          >
            <a
              className="relative flex w-16 h-16 cursor-pointer"
              onClick={() => setOpenVideoModal(true)}
            >
              <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75" />
              <img src={play} className="relative inline-flex w-full" alt="" />
            </a>
          </div>
          <div className="absolute flex justify-center left-0 bottom-0 w-full text-center py-6 text-gray-300 hover:text-white">
            <Button color="unset" className="font-bold px-5 py-2" onClick={() => setOpenReferralLinkModal(true)}>CREATE REFERRERAL LINK</Button>
          </div>
        </div>
        <div className="relative flex flex-col items-center lg:w-2/4 w-full lg:mt-0 mt-80 lg:px-0 px-2">
          <div className="relative lg:w-full h-1.5 bg-gray-600">
            <div className="absolute h-full bg-lime-400" style={{width: getSoldPercent()}} />
          </div>
          <div className="w-full flex-grow lg:px-20 py-2 flex flex-col justify-between">
            <div className="py-4">
              <div className="flex items-center text-center text-gray-300">
                <span className="text-white font-bold">{getMaxSupply() - currentSupply}</span>
                <span className="ml-1">EGGS LEFT - NEXT PRICE:</span>
                <span className="text-white font-bold ml-1">{nextPrice} - </span>
                <span className="ml-1">TIER</span>
                <span className="text-white font-bold ml-1">{currentTier}/{maxTier}</span>
                <button
                  className="text-white ml-6"
                  onClick={() => dispatch(openInfoModal(
                    <div className="">
                      <p>
                        Lorem ipsum dolor sit 
                      </p>
                    </div>
                  ))}
                >
                  <BiHelpCircle size={22} />
                </button>
              </div>
              <div className="mt-6 px-5 py-4 rounded-2xl border border-gray-700">
                <div className="flex justify-between">
                  <span className="text-sm">Choose amount</span>
                  <span className="text-sm">Balance: {eggBalance.toString(10)}</span>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <input
                    className="text-2xl font-semibold w-full bg-transparent"
                    value={amount}
                    type="number"
                    min={1}
                    max={20}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <div className="flex items-center text-2xl font-semibold">
                    <Button className="px-2 py-0.5 text-base text-blue-400 bg-blue-600 bg-opacity-30 rounded-md" onClick={() => setAmount(availableAmount)}>MAX</Button>
                    <span className="ml-8">
                      <FiPackage size={16} />
                    </span>
                    <span className="ml-4">APYMON</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center py-4 text-blue-500">
                <BiDownArrowAlt size={20} className="animate-bounce" />
              </div>
              <div className="px-5 py-4 rounded-2xl border border-gray-700">
                <div className="flex justify-between">
                  <span className="text-sm">Total Price</span>
                  <span className="text-sm">Balance: {ethBalance.toFixed(4)}</span>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="text-2xl font-semibold">{currentPrice * amount}</div>
                  <div className="flex items-center text-2xl font-semibold">
                    <span className="ml-8">
                      <SiEthereum size={16} />
                    </span>
                    <span className="ml-4">ETH</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between px-5 py-4  text-gray-300">
                <span>Price</span>
                <div className="flex items-center">
                  <span>{currentPrice.toString(10)} ETH PER APYMON EGG</span>
                  <button className="w-5 h-5 flex justify-center items-center bg-gray-600 rounded-full ml-2">
                    <FiRepeat size={12} />
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center text-lg text-gray-300">
                {!openAddressInput &&
                  <>
                    <a
                      className="flex pl-5 items-center w-full text-base"
                      onClick={() => {
                        setOpenAddressInput(true)
                      }}
                    >
                      <AiFillGift />
                      {giftAddress === '' &&
                        <>
                          <span className="font-semibold ml-3">Click here</span>
                          <span className="ml-1">to send as gift</span>
                        </>
                      }
                      {giftAddress !== '' &&
                        <>
                          <span className="ml-3 flex-shrink-0">Will be sent as gift to</span>
                          <span className="font-semibold ml-1 truncate">{giftAddress}</span>
                        </>
                      }
                    </a>
                    {giftAddress !== '' &&
                      <a
                        className="flex-shrink-0 text-sm font-bold"
                        onClick={() => {
                          setGiftAddress('');
                        }}
                      >
                        Cancel gift
                      </a>
                    }
                  </>
                }
                {openAddressInput &&
                  <div className="w-full flex px-5 justify-between items-center border border-gray-700 rounded-2xl">
                    <input
                      type="email"
                      className="py-2 text-white text-base bg-transparent w-full"
                      value={giftAddress}
                      onChange={(e) => setGiftAddress(e.target.value)} 
                      placeholder="Enter recipient address"
                      ref={giftAdressRef}
                    />
                    <button className="flex-shrink-0 text-sm font-bold ml-4" onClick={() => setOpenAddressInput(false)}>
                      {giftAddress === '' ? 'CANCEL' : 'CONFIRM'}
                    </button>
                  </div>
                }
              </div>
              {/* {referralLink &&
                <div className="w-full flex px-5 mt-2 justify-between items-center border border-gray-700 rounded-2xl">
                  <input
                    readOnly
                    className="py-2 text-white text-base bg-transparent w-full"
                    placeholder="Enter Referral Link"
                    defaultValue={referralLink}
                  />
                </div>
              } */}
            </div>
            <div className="flex lg:flex-col flex-col-reverse items-center lg:pb-4 pb-2">
              <Button
                color="primary"
                className="w-full px-6 py-3"
                onClick={() => onBuy()}
                isLoading={isTransacting}
              >
                BUY NOW
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-14">
        <div className="relative lg:grid lg:grid-cols-5 gap-5 lg:overflow-x-visible overflow-x-auto lg:whitespace-normal whitespace-nowrap">
          {[1,2,3,4,5].map((el, key) => 
            <div key={key} className="relative lg:block inline-block lg:w-auto w-full h-60 cursor-pointer rounded-2xl overflow-hidden">
              <img src={deodato} className="absolute w-full h-full transform hover:scale-110 transition duration-500" alt="" />
              <div className="absolute p-4 w-full">
                <div className="text-lg-sm text-white font-bold">The Modern Master of Comics</div>
                <div className="text-sm text-gray-400 font-semibold">by Mike Deodato</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mb-16">
        <div className="text-2xl text-white font-bold">FEATURED PACKS</div>
        <div className="lg:grid lg:grid-cols-4 gap-5 lg:overflow-x-hidden overflow-x-auto lg:whitespace-normal whitespace-nowrap">
          {fekaFeaturedPacks.map((el, key) => 
            <Link
              key={key}
              className="inline-block cursor-pointer"
              to={`/product`}
            >
              <div className="relative flex items-center">
                <div className="p-8">
                  <img src={el.image} className="w-full" alt="" />
                </div>
                {el.isTba &&
                  <div className="absolute flex justify-center w-full">
                    <div className="font-sarpanch text-5xl font-bold bg-gray-100 px-16 py-2 transform -rotate-12 text-black">T.B.A</div>
                  </div>
                }
              </div>
              <div className="px-12">
                <div className="font-sans text-sm text-white font-semibold">{el.name}</div>
                <div className="text-lg text-white font-semibold mb-2">{el.cost}</div>
                <div className="font-sans text-xs text-gray-300">{el.seriesName} | Release {el.release}</div>
                {!el.cost &&
                  <div className="mt-2.5">&nbsp;</div>
                }
              </div>
            </Link>
          )}
        </div>
      </div>

      <Modal
        open={openCheckoutModal}
        requestClose={() => setOpenCheckoutModal(false)}
        className="w-96"
      >
        <div className="flex flex-col px-7 py-5 bg-gray-800 border border-gray-600 lg:rounded-xl lg:w-auto lg:h-auto w-screen h-screen">
          <div className="flex justify-between mb-4">
            <span className="text-3xl font-bold">Checkout</span>
            <a
              className="flex justify-center items-center w-10 h-10 rounded-full border border-gray-600 hover:border-gray-300"
              onClick={() => setOpenCheckoutModal(false)}
            >
              <IoMdClose size={14} />
            </a>
          </div>
          <div className="flex-grow flex items-center">
            <div className="lg:mb-0 mb-10">
              <div className="text-base mb-4">
                You are about to purchase <span className="font-bold">1 BASE PACK 2021</span> from <span className="font-bold">Owner</span>
              </div>
              <div className="flex justify-between py-3 border-b-2 border-gray-700 mb-4">
                <span className="text-gray-400">7</span>
                <div className="flex items-center">
                  <span className="mr-4">ETH</span>
                  <BiLock size={18} className="text-gray-400" />
                </div>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Your balance</span>
                <span>6.329 ETH</span>
              </div>
              <div className="flex justify-between text-sm mb-4">
                <span className="text-gray-400">You will pay</span>
                <span>7.175 ETH</span>
              </div>
              <Button
                color="primary"
                className="mb-2 px-6 py-3"
                full
                onClick={() => setOpenCheckoutModal(false)}
              >
                Proceed to payment
              </Button>
              <Button
                color="primary"
                full
                className="bg-opacity-20 hover:bg-opacity-25 text-blue-600 px-6 py-3"
                onClick={() => setOpenCheckoutModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        open={openVideoModal}
        requestClose={() => setOpenVideoModal(false)}
        className="w-screen h-screen"
      >
        <a
          className="absolute right-0 top-0 flex justify-center items-center w-10 h-10 hover:border-gray-300"
          onClick={() => setOpenVideoModal(false)}
        >
          <IoMdClose size={20} />
        </a>
        <div className="flex justify-center items-center w-full h-full bg-black">
          <VideoPlayer
            url="https://www.youtube.com/watch?v=RC1lrx1IhLw"
            width={800}
            height={600}
          />
        </div>
      </Modal>

      <Modal
        open={openReferralLinkModal}
        requestClose={() => setOpenReferralLinkModal(false)}
        className="w-100"
      >
        <div className="flex flex-col px-7 py-5 bg-gray-800 border border-gray-600 lg:rounded-xl lg:w-auto lg:h-auto w-screen h-screen">
          <div className="flex justify-between mb-4">
            <span className="text-3xl font-bold">Your Referral Link</span>
            <a
              className="flex justify-center items-center w-10 h-10 rounded-full border border-gray-600 hover:border-gray-300"
              onClick={() => setOpenReferralLinkModal(false)}
            >
              <IoMdClose size={14} />
            </a>
          </div>
          <div className="flex-grow flex items-center">
            <div className="lg:mb-0 mb-10">
              <div className="text-base mb-4">
                You will receive 10% of all referrers as referral bonus.
                <br /><br />
                Note: Referral bonus will be deposited into your CREATURE!
              </div>
              <div className="rounded-2xl px-8 py-6 bg-gray-700 border border-gray-600 break-all mb-6">
                {generatedReferralLink}
              </div>
              <div className="mb-2 flex justify-center">
                <CopyToClipboard text={generatedReferralLink}>
                  <Button
                    color="unset"
                    full
                    onClick={() => setOpenReferralLinkModal(false)}
                  >
                    Copy referral link
                  </Button>
                </CopyToClipboard>
              </div>
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
            <span className="text-3xl font-bold">{alertType}</span>
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
    </div>
  )
}

export default Home
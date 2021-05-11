import {Link} from 'react-router-dom'
import {BiSearchAlt2} from 'react-icons/bi'
import Modal from 'components/Modal'
import { useState } from 'react'
import {IoMdClose} from 'react-icons/io'
import {FaTelegram, FaTwitter, FaDiscord, FaMedium, FaGithub} from 'react-icons/fa'

const Detail = ({match}) => {
  const [openFaqModal, setOpenFaqModal] = useState(false)

  return (
    <>
      <div className="container mx-auto flex flex-col py-6 flex-grow">
        <div className="lg:flex justify-between items-center">
          <div className="flex text-sm lg:mb-0 mb-8">
            <Link to="#" className="mr-2">NBA Top Shot &gt; </Link>
            <Link to="#" className="mr-2">Getting Started with Top Shot</Link>
          </div>
          <div className="flex items-center p-3 bg-white text-gray-600 lg:w-72 w-full">
            <BiSearchAlt2 size={22} className="flex-shrink-0" />
            <input className="ml-2 border-none w-full" placeholder="Search" />
          </div>
        </div>
        <div className="mt-16 lg:grid grid-cols-5">
          <div className="col-start-2 col-span-4 text-lg">
            <div className="text-3xl font-bold">Getting Started with Top Shot</div>
            <div className="text-sm italic mt-3">Create an account, Add a payment method, Crypto Education, Top Shot 101</div>
          </div>
        </div>
        <div className="mt-10">
          <div className="lg:grid grid-cols-5 gap-4">
            <div className="col-start-2 col-span-2 mb-10">
              <div className="text-2xl font-semibold mb-4">Create an account</div>
              <a className="block text-base mb-3" onClick={() => setOpenFaqModal(true)}>Create a new account</a>
              <a className="block text-base mb-3" onClick={() => setOpenFaqModal(true)}>Email verification</a>
              <a className="block text-base mb-3" onClick={() => setOpenFaqModal(true)}>2-step verification (2FA)</a>
              <a className="block text-base mb-3" onClick={() => setOpenFaqModal(true)}>Connecting your account to Google</a>
            </div>
            <div className="col-span-2 mb-10">
              <div className="text-2xl font-semibold mb-4">Add a payment method</div>
              <a className="block text-base mb-3" onClick={() => setOpenFaqModal(true)}>What is Dapper?</a>
              <a className="block text-base mb-3" onClick={() => setOpenFaqModal(true)}>Available payment methods</a>
            </div>
            <div className="col-start-2 col-span-2 mb-10">
              <div className="text-2xl font-semibold mb-4">What is Cryptocurrency and Blockchain?</div>
              <a className="block text-base mb-3" onClick={() => setOpenFaqModal(true)}>What is Cryptocurrency and Blockchain?</a>
            </div>
            <div className="col-span-2 mb-10">
              <div className="text-2xl font-bold mb-4">Top Shot 101</div>
              <a className="block text-base mb-3" onClick={() => setOpenFaqModal(true)}>How do I make a feature suggestion?</a>
              <a className="block text-base mb-3" onClick={() => setOpenFaqModal(true)}>I&apos;d like to refer my friend to NBA Top Shot? How do I do it?</a>
              <a className="block text-base mb-3" onClick={() => setOpenFaqModal(true)}>What to expect during Beta</a>
              <a className="block text-base mb-3" onClick={() => setOpenFaqModal(true)}>Is NBA Top Shot associated with the NBA or NBPA?</a>
              <a className="block text-base mb-3" onClick={() => setOpenFaqModal(true)}>What is a Moment? How do I get one?</a>
              <a className="block text-base mb-5" onClick={() => setOpenFaqModal(true)}>What is a Pack? how do I get one?</a>
              <a className="block text-base">See all 11 articles</a>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-20 relative border-t border-gray-800">
        <div className="container mx-auto py-10 flex justify-between items-center">
          <div className="flex">
            <Link to="/" className="text-base">Go back to Apymon</Link>
            <Link to="/support" className="text-base ml-6">Help center</Link>
          </div>
          <div className="flex">
            <a href="https://telegram.org" target="_blank" rel="noreferrer" className="flex justify-center items-center w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 overflow-hidden">
              <FaTelegram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="flex justify-center items-center w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 overflow-hidden ml-3">
              <FaTwitter />
            </a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="flex justify-center items-center w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 overflow-hidden ml-3">
              <FaDiscord />
            </a>
            <a href="https://medium.com" target="_blank" rel="noreferrer" className="flex justify-center items-center w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 overflow-hidden ml-3">
              <FaMedium />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="flex justify-center items-center w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 overflow-hidden ml-3">
              <FaGithub />
            </a>
          </div>
        </div>
      </footer>
      
      <Modal
        open={openFaqModal}
        requestClose={() => setOpenFaqModal(false)}
        className="w-150"
      >
        <div className="flex flex-col px-7 py-5 bg-gray-800 border border-gray-600 lg:rounded-xl lg:w-auto lg:h-auto w-screen h-screen">
          <div className="flex justify-between mb-4">
            <span className="text-2xl font-bold">Is NBA Top Shot associated with the NBA or NBPA?</span>
            <a
              className="flex justify-center items-center w-10 h-10 flex-shrink-0 rounded-full border border-gray-600 hover:border-gray-300"
              onClick={() => setOpenFaqModal(false)}
            >
              <IoMdClose size={14} />
            </a>
          </div>
          <div className="flex-grow flex items-center">
            <div className="lg:mb-0 mb-10">
              <div className="text-base mb-4">
                Lorem ipsum dolor sit
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Detail
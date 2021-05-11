import {Link} from 'react-router-dom'
import {BiSearchAlt2} from 'react-icons/bi'
import {FaTelegram, FaTwitter, FaDiscord, FaMedium, FaGithub} from 'react-icons/fa'

const Support = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col items-center py-16 flex-grow">
        <div className="flex items-center p-3 bg-white text-gray-600 lg:w-100 w-full">
          <BiSearchAlt2 size={22} className="flex-shrink-0" />
          <input className="ml-2 border-none w-full" placeholder="Search" />
        </div>
        <div className="mt-32">
          <div className="lg:grid grid-cols-3 gap-8">
            <Link
              to="/support/getting-started-with-top-shot"
              className="px-6 py-4 border-4 border-gray-600 hover:border-white hover:bg-white hover:bg-opacity-20 cursor-pointer"
            >
              <div className="text-lg font-bold mb-1">Getting Started with Top Shot</div>
              <div className="text-base font-normal">
                Create an account, Add a payment method, Crypto Education, Top Shot 101
              </div>
            </Link>
            <Link
              to="/support/getting-started-with-top-shot"
              className="px-6 py-4 lg:mt-0 mt-8 border-4 border-gray-600 hover:border-white hover:bg-white hover:bg-opacity-20 cursor-pointer"
            >
              <div className="text-lg font-bold mb-1">Managing My Account</div>
              <div className="text-base font-normal">
                Get back into my account, Update payment methods, Verify my identity, 
                Update my Account information
              </div>
            </Link>
            <Link
              to="/support/getting-started-with-top-shot"
              className="px-6 py-4 lg:mt-0 mt-8 border-4 border-gray-600 hover:border-white hover:bg-white hover:bg-opacity-20 cursor-pointer"
            >
              <div className="text-lg font-bold mb-1">Purchases, Sales and Gifts</div>
              <div className="text-base font-normal">
                Pricing and Fees, Dapper Balance, Cancelling a Purchase, 
                Troubleshooting Purchase failures
              </div>
            </Link>
          </div>
          <div className="lg:grid grid-cols-2 gap-8 mt-8">
            <Link
              to="/support/getting-started-with-top-shot"
              className="px-6 py-4 border-4 border-gray-600 hover:border-white hover:bg-white hover:bg-opacity-20 cursor-pointer"
            >
              <div className="text-lg font-bold mb-1">Privacy and Security</div>
              <div className="text-base font-normal">
                Data Privacy, Unauthorized transactions, Avoiding cryptocurrency scams, 
                Account compromised
              </div>
            </Link>
            <Link
              to="/support/getting-started-with-top-shot"
              className="px-6 py-4 lg:mt-0 mt-8 border-4 border-gray-600 hover:border-white hover:bg-white hover:bg-opacity-20 cursor-pointer"
            >
              <div className="text-lg font-bold mb-1">Other Topics</div>
              <div className="text-base font-normal">
                APIs, About the Blockchain, Legal Policies
              </div>
            </Link>
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
    </>
  )
}

export default Support
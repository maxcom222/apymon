import { FiUpload } from 'react-icons/fi'
import { BsThreeDots } from 'react-icons/bs'
import { HiHeart } from 'react-icons/hi'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import { CgArrowsExpandRight } from 'react-icons/cg'
import Button from "components/Button"

const Product = () => {
  return (
    <div className="container mx-auto flex lg:flex-row flex-col lg:h-full flex-grow">
      <div className="relative flex justify-center items-center w-full px-8 lg:py-6 pt-16 pb-6">
        <div className="absolute flex right-0 top-0 lg:px-8 lg:py-6 py-3">
          <Button circle color="unset">
            <HiHeart />
          </Button>
          <Button circle color="unset" className="ml-2">
            <CgArrowsExpandRight />
          </Button>
        </div>
        <div className="lg:w-98 rounded-xl overflow-hidden">
          <img src="https://assets.nbatopshot.com/resize/packs/common/pack_2_base_set_common.png?width=576&quality=50" className="w-full" />
        </div>
      </div>
      <div className="relative lg:w-98 flex-shrink-0 lg:pl-8 lg:py-6 lg:border-l border-gray-600 flex-grow">
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-bold">
            BASE BACK 2021
          </div>
          <div className="flex">
            <Button circle color="unset">
              <BsThreeDots />
            </Button>
            <Button circle color="unset" className="ml-2">
              <FiUpload />
            </Button>
          </div>
        </div>
        <div className="flex text-base font-medium">
          <span className="text-blue-500 mr-2">ONLY 5 LEFT!</span>
          <span className="text-gray-400">495/500</span>
        </div>
        <div className="mt-4">
          This rare pack contains seven Shots:
        </div>
        <div className="mt-5">
          6 x CARDS
        </div>
        <div className="mt-5">
          1 x SURPRISE ARTIST ARTWORK. <br />
          Style: Had a Tarboosh just a second ago, must have lost it in the clouds.
        </div>
        <div className="mt-5 mb-4">
          <Tabs>
            <TabList>
              <Tab>Info</Tab>
              <Tab>Owners</Tab>
              <Tab>History</Tab>
              <Tab>Bids</Tab>
            </TabList>

            <TabPanel>
              <div className="flex border-b border-gray-600 py-4 w-full">
                <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" className="w-12 h-12 rounded-full border-none bg-white" />
                <di className="font-semibold ml-2">
                  <div className="text-gray-500">Sold by</div>
                  <div className="text-white">Ourselves</div>
                </di>
              </div>
              <div className="my-8 bg-gray-800 w-full rounded-full px-6 py-3 text-sm text-gray-300 font-medium">
                10% of sales will go to holders of featured apymon
              </div>
              <div className="flex pt-3 pb-2 w-full">
                <img src="https://1.gravatar.com/avatar/767fc9c115a1b989744c755db47feb60?s=200&r=pg&d=mp" className="w-12 h-12 rounded-full border-none bg-white" />
                <di className="font-semibold ml-2">
                  <div className="flex text-base">
                    <span className="text-gray-500">Buy</span>
                    <span className="ml-1">1 PACK</span>
                  </div>
                  <div className="flex text-lg font-bold">
                    <span className="text-gray-500">1.1 WETH</span>
                    <span className="ml-2">$2024.44</span>
                  </div>
                </di>
              </div>
            </TabPanel>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
          </Tabs>        
        </div>
        <div className="lg:relative fixed flex flex-col items-center left-0 bottom-0 w-full lg:px-0 px-4 lg:pt-0 pt-4 bg-background bg-opacity-80 backdrop-filter">
          <Button full color="primary">
            BUY NOW
          </Button>
          <div className="py-4 text-sm font-semibold text-gray-400">Item is not on sale, but you can place a bid</div>
        </div>
      </div>
    </div>
  )
}

export default Product
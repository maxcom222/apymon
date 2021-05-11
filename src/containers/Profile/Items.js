import cat1 from 'assets/img/cats/cat1.png'
import cat2 from 'assets/img/cats/cat2.png'
import {HiBadgeCheck, HiHeart, HiOutlineHeart} from 'react-icons/hi'
import { BsThreeDots } from 'react-icons/bs'
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa'
import Dropdown from 'components/Dropdown'
import Button from 'components/Button'
import { useState } from 'react'

const fakeItems = [
  {
    name: 'NIGAN THE BAD BOSS CAT',
    sales: '1 of 1',
    highestBid: '',
    image: cat1,
    isFav: false,
  },
  {
    name: 'JOEL THE SKATER CAT',
    sales: '1 of 1',
    highestBid: '0.4 WETH',
    image: cat2,
    isFav: true,
  },
  {
    name: 'NIGAN THE BAD BOSS CAT',
    sales: '1 of 1',
    highestBid: '',
    image: cat1,
    isFav: false,
  },
  {
    name: 'JOEL THE SKATER CAT',
    sales: '1 of 1',
    highestBid: '',
    image: cat2,
    isFav: false,
  },
  {
    name: 'NIGAN THE BAD BOSS CAT',
    sales: '1 of 1',
    highestBid: '',
    image: cat1,
    isFav: true,
  },
  {
    name: 'JOEL THE SKATER CAT',
    sales: '1 of 1',
    highestBid: '0.4 WETH',
    image: cat2,
    isFav: false,
  },
  {
    name: 'NIGAN THE BAD BOSS CAT',
    sales: '1 of 1',
    highestBid: '',
    image: cat1,
    isFav: false,
  },
  {
    name: 'JOEL THE SKATER CAT',
    sales: '1 of 1',
    highestBid: '',
    image: cat2,
    isFav: false,
  },
]

const sortByList = [
  {
    name: 'latestRelease',
    label: 'Latest Release'
  },
  {
    name: 'oldestRelease',
    label: 'Oldest Release'
  },
  {
    name: 'highestBid',
    label: 'Highest Bid'
  },
  {
    name: 'lowestBid',
    label: 'Lowest Bid'
  },
]

const Items = () => {
  const [items, setItems] = useState(fakeItems)
  const [sortBy, setSortBy] = useState(sortByList[0])

  return (
    <div className="relative py-8">
      <div className="lg:grid grid-cols-4 gap-5">
        {items.map((item, key) => (
          <a key={key} className="block border border-gray-600 rounded-xl p-6 lg:mb-0 mb-4">
            <div className="flex justify-between items-center">
              <div className="">
                <div className="relative inline-block -mr-3 rounded-full w-6 h-6">
                  <img className="w-full h-full rounded-full" src={cat1} />
                </div>
                <div className="relative inline-block -mr-3 rounded-full w-6 h-6">
                  <img className="w-full h-full rounded-full" src={cat2} />
                  <HiBadgeCheck size={18} className="absolute -bottom-1 -right-1 text-yellow-300" />
                </div>
                <div className="relative inline-block -mr-3 rounded-full w-6 h-6">
                  <img className="w-full h-full rounded-full" src={cat2} />
                  <HiBadgeCheck size={18} className="absolute -bottom-1 -right-1 text-yellow-300" />
                </div>
              </div>
              <Dropdown
                position="right"
                border
                button={
                  <a className="block">
                    <BsThreeDots />
                  </a>
                }
              >
                <div className=" w-48 font-sans px-5 py-3">
                  ...
                </div>
              </Dropdown>                
            </div>
            <div className="mt-4">
              <div className="aspect-w-15 aspect-h-16 bg-no-repeat bg-center bg-cover rounded-md" style={{backgroundImage: `url(${item.image})`}} />
            </div>
            <div className="mt-6 text-lg font-bold">{item.name}</div>
            <div className="text-base font-bold text-gray-500">{item.sales}</div>
            <div className="flex justify-between mt-1">
              <div className="text-sm font-bold text-gray-500">
                Highest bid <span className="text-blue-500">{item.highestBid}</span>
              </div>
              <a
                className="block"
                onClick={() => {
                  const newItems = items
                  newItems[key].isFav = !newItems[key].isFav
                  setItems([...newItems])
                }}
              >
                {item.isFav &&
                  <HiHeart />
                }
                {!item.isFav &&
                  <HiOutlineHeart />
                }
              </a>
            </div>
          </a>
        ))}
      </div>
      <div className="mt-10 flex justify-center font-bold">
        <div className="flex">
          <a className="flex justify-center items-center w-10 h-10 rounded bg-gray-700 hover:bg-gray-600 mr-2">
            <FaChevronLeft />
          </a>
          <a className="flex justify-center items-center w-10 h-10 rounded bg-gray-900 mr-2">1</a>
          <a className="flex justify-center items-center w-10 h-10 rounded bg-gray-700 hover:bg-gray-600 mr-2">2</a>
          <a className="flex justify-center items-center w-10 h-10 rounded bg-gray-700 hover:bg-gray-600 mr-2">3</a>
          <a className="flex justify-center items-center w-10 h-10 rounded bg-gray-700 hover:bg-gray-600 mr-2">...</a>
          <a className="flex justify-center items-center w-10 h-10 rounded bg-gray-700 hover:bg-gray-600 mr-2">8</a>
          <a className="flex justify-center items-center w-10 h-10 rounded bg-gray-700 hover:bg-gray-600">
            <FaChevronRight />
          </a>
        </div>
      </div>
      <div className="absolute right-0 -top-6">
        <Dropdown
          position="right"
          border
          button={
            <Button color="unset" className="px-2.5 py-1.5 rounded-md" rounded={false}>Order By {sortBy.label}</Button>
          }
        >
          <div className=" w-48 font-sans px-5 py-3">
            {sortByList.map((el, key) => (
              <a
                key={key}
                className="block py-1"
                onClick={() => {
                  setSortBy(el)
                }}
              >
                {el.label}
              </a>
            ))}
          </div>
        </Dropdown>
      </div>
    </div>
  )
}

export default Items
import {RiArrowLeftRightFill} from 'react-icons/ri'
import {FiShoppingCart} from 'react-icons/fi'
import {FaMoneyBillWave} from 'react-icons/fa'

const fakeActivities = [
  {
    id: '#19069',
    text: 'Your gift has been sent to Topshottah01',
    name: 'John Collins',
    userType: 'Dunk',
    createdAt: 'Jan 18 2021',
    type: 'common',
    cost: null,
    status: 'success',
    _iconType: 'gift'
  },
  {
    id: '#4359',
    text: 'You purchased a Moment',
    name: 'Goran Dragic',
    userType: 'Layup',
    createdAt: 'Jan 18 2021',
    type: 'common',
    cost: '$20.00USD',
    status: 'success',
    _iconType: 'purchase'
  },
  {
    id: '#6399',
    text: 'You purchased a Moment',
    name: 'P.J.',
    userType: '3 pointer',
    createdAt: 'Jan 22 2021',
    type: 'common',
    cost: '$19.00USD',
    status: 'success',
    _iconType: 'purchase'
  },
  {
    id: '#20019',
    text: 'You purchased a Moment',
    name: 'Larry Nance Jr.',
    userType: 'dunk',
    createdAt: 'Jan 22 2021',
    type: 'common',
    cost: '$18.00USD',
    status: 'success',
    _iconType: 'purchase'
  },
  {
    id: '#23494',
    text: 'Your moment was sold',
    name: 'Nikola Jokic',
    userType: 'assist',
    createdAt: 'Jan 5 2021',
    type: 'common',
    cost: '$15.00USD',
    status: 'success',
    _iconType: 'sold'
  },
];

const Activity = () => {
  return (
    <div className="container mx-auto py-10 font-prompt">
      <div className="text-4xl font-bold">MY ACTIVITY</div>
      <div className="mt-6">
        {fakeActivities.map((el, key) => (
          <div key={key} className="flex justify-between lg:px-4 px-2 py-4 border-b-2 border-gray-600">
            <div className="flex items-center py-2">
              <div className="lg:mr-8 mr-5">
                <span
                  className="flex justify-center items-center w-11 h-11 bg-gray-800 rounded-full"
                >
                  {el._iconType === 'gift' && <RiArrowLeftRightFill size={20} />}
                  {el._iconType === 'purchase' && <FiShoppingCart size={20} />}
                  {el._iconType === 'sold' && <FaMoneyBillWave size={20} />}
                </span>
              </div>
              <div className="text-sm">
                <div className="font-semibold">{el.text}</div>
                <div className="text-gray-300 font-normal mt-1">
                  <span className="">{el.name},</span>
                  <span className="ml-1">{el.userType},</span>
                  <span className="ml-1">{el.createdAt},</span>
                  <span className="ml-1capitalize">{el.type},</span>
                  <span className="ml-1">{el.id}</span>
                </div>
                <div className="text-gray-400 font-normal mt-2">{el.cost}&nbsp;</div>
              </div>
            </div>
            <div className="flex flex-col justify-between items-end lg:py-0 py-2 lg:w-auto w-20 flex-shrink-0">
              <span className="px-2 py border border-green-600 text-green-600 font-semibold rounded-full text-sm capitalize">
                {el.status}
              </span>
              <span className="lg:text-sm text-xs text-gray-400">6 days ago</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Activity
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import OnSale from 'containers/Profile/OnSale'
import Items from 'containers/Profile/Items'
import Activity from 'containers/Profile/Activity'

import {useSelector} from 'react-redux'
import Button from 'components/Button'
import { FiUpload, FiCopy } from 'react-icons/fi'
import {CopyToClipboard} from 'react-copy-to-clipboard'

const Profile = ({match}) => {
  const user = useSelector(state => state.auth.user);
  const address = useSelector(state => state.auth.address);

  return (
    <div className="">
      <div
        className="fixed w-full h-64 left-0 bg-center bg-no-repeat bg-cover opacity-40"
        style={{
          backgroundImage: `url(${user.profileBanner})`
        }}
      />
      <div className="relative mt-64 bg-background">
        <div className="container mx-auto">
          <div className="absolute -top-24">
            <img className="w-28 h-28 rounded-full overflow-hidden" src={user.avatar} />
          </div>
          <div className="flex flex-wrap items-center py-10">
            <div className="text-2xl font-semibold">{user.name}</div>
            <Button color="unset" circle className="ml-4">
              <FiUpload />
            </Button>
            <div className="flex lg:ml-16">
              <span className="text-sm font-semibold">{address}</span>
              <CopyToClipboard text={address}>
                <button className="ml-2">
                  <FiCopy />
                </button>
              </CopyToClipboard>
            </div>
          </div>
          <div className="flex">
            <Link to="/profile/on-sale" className={`text-base font-bold mr-6 ${match.params.profileContent === 'on-sale' ? 'border-b-2 border-white text-white' : 'text-gray-500 '}`}>On sale</Link>
            <Link to="/profile/items" className={`text-base font-bold mr-6 ${match.params.profileContent === 'items' ? 'border-b-2 border-white text-white' : 'text-gray-500 '}`}>Items</Link>
            <Link to="/profile/activity" className={`text-base font-bold ${match.params.profileContent === 'activity' ? 'border-b-2 border-white text-white' : 'text-gray-500 '}`}>Activity</Link>
          </div>
          <div>
            <Switch>
              <Route path="/profile/on-sale" component={OnSale} />
              <Route path="/profile/items" component={Items} />
              <Route path="/profile/activity" component={Activity} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
import Header from 'components/Header'
import Modals from 'components/Modals';

const Layout = ({children}) => {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />
      <main className="flex flex-col mt-header-height flex-grow">
        {children}
      </main>
      <Modals />
    </div>
  )
}

export default Layout
import {useSelector, useDispatch} from 'react-redux'
import {closeInfoModal} from 'actions/Modal'
import Modal from 'components/Modal'

const Modals = () => {
  const dispatch = useDispatch()

  const infoModal = useSelector(state => state.modal.infoModal)

  return (
    <>
      <Modal // Info modal
        open={infoModal.isopen}
        requestClose={() => dispatch(closeInfoModal())}
        className="w-100"
      >
        <div className="flex flex-col px-7 py-5 bg-gray-800 border border-gray-600 lg:rounded-xl lg:w-auto lg:h-auto w-screen h-screen">
          <div className="flex justify-between mb-4">
            <span className="text-2xl font-bold">How it works</span>
          </div>
          {infoModal.content}
        </div>
      </Modal>
    </>
  )
}

export default Modals
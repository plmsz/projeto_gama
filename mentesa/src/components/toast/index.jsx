import { toast } from 'react-toastify'

function messageSuccess(message) {
  toast.success(message, {
    position: 'bottom-center',
    autoClose: 7000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}

function messageError(message) {
  toast.error(message, {
    position: 'bottom-center',
    autoClose: 7000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { messageError, messageSuccess }

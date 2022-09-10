import { toast } from 'react-toastify';

function messageSuccess(message) {
    toast.success(message, {
        position: 'top-right',
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

function messageError(message) {
    toast.error(message, {
        position: 'top-right',
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { messageError, messageSuccess };

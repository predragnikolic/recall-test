// Toast configuration
import { Slide, ToastContainer as _ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const ToastContainer = () => (
  <_ToastContainer theme="dark" position="bottom-right" transition={Slide} closeButton={false} hideProgressBar={true} autoClose={3000} />
)

import { Message } from 'element-ui'
const promptBox = function (title, status) {
  Message({
    showClose: true,
    message: title,
    type: status,  // string success/warning/info/error
    duration: 2000,
    offset:50
  })
}
export default promptBox
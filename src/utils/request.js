import axios from 'axios'
const service = axios.create({
  baseURL: 'http://liufusong.top:8899/api/private/v1/',
  timeout: 6000
})

export default service

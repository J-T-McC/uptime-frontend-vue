import { axios, apiEndpoint } from '@/helpers/api.js'

export default function useResource (resource = '') {

  const buildRoute = (...args) => {
    return apiEndpoint + '/' + args.join('/')
  }

  const index = async () => {
    return axios.get(buildRoute(resource))
  }

  const show = (id) => {
    return axios.get(buildRoute(resource, id))
  }

  const store = (data = {}) => {
    return axios.post(buildRoute(resource), data)
  }

  return {
    index,
    show,
    store,
  }

}
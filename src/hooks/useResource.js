import { axios, apiEndpoint } from '@/helpers/api.js'

export default function useResource (resource = '') {

  const buildRoute = (...args) => {
    return apiEndpoint + '/' + args.join('/')
  }

  const index = async (params = {}) => {
    return axios.get(buildRoute(resource), {
      params
    })
  }

  const show = async (id, params = {}) => {
    return axios.get(buildRoute(resource, id), {
      params
    })
  }

  const store = async (data = {}) => {
    return axios.post(buildRoute(resource), data)
  }

  const update = async (id, data = {}) => {
    return axios.put(buildRoute(resource, id), data)
  }

  const destroy = async (id) => {
    return axios.delete(buildRoute(resource, id))
  }

  return {
    index,
    show,
    store,
    update,
    destroy,
  }

}
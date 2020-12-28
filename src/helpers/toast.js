import { useToast } from 'vue-toastification'

export const toast = useToast()

/**
 * Toast a message based on the different variations of laravel responses
 * @param result
 * @returns {string | number}
 */
export const toastMessage = (result) => {

  //error
  if (result?.response?.data?.errors) {
    //toast any validation errors received
    const errors = result.response.data.errors
    const invalidFields = Object.keys(errors)
    const toastBody = invalidFields.reduce((prev, curr) => {
      return `${prev}` + (prev ? '\r\n' : '') + errors[curr].join(' - ')
    }, '')
    return toast.error(toastBody)
  }

  if (result?.response?.statusText) {
    return toast.error(result.response.statusText)
  }

  //info
  if (result?.response?.data?.message){
    return toast.info(result.response.data.message)
  }

  if (result?.data?.message) {
    return toast.info(result.data.message)
  }
}


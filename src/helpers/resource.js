import { useToast } from 'vue-toastification'

export const toastError = (error) => {
  const toast = useToast()
  if (error?.response?.data?.errors) {
    //toast any validation errors received
    const errors = error.response.data.errors
    const invalidFields = Object.keys(errors)
    const toastBody = invalidFields.reduce((prev, curr) => {
      return `${prev}` + (prev ? '\r\n' : '') + errors[curr].join(' - ')
    }, '')
    toast.warning(toastBody)
  }
  else if (error?.response?.data?.message){
    toast.info(error?.response?.data?.message)
  }
  else if (error?.response?.statusText) {
    toast.error(error.response.statusText)
  }
}


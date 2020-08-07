export const validateResponse = response => {
  if (response.errCode === 200) return Promise.resolve(response.data)
  else return Promise.reject(response)
}

export const submitOrder = formData => {
  return (
    Promise
      // fake post request/response
      .resolve({ errCode: 200, errMsg: '', data: 'success' })
      .then(validateResponse)
  )
}

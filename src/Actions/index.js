export const getCircleCode = code => ({
  type: 'SET_CODE',
  code
})

export const addNewCode = code => ({
  type: 'ADD_CODE',
  code
})

export const grabLocalCodes = codes => ({
  type: 'GRAB_LOCAL_CODES',
  codes
})

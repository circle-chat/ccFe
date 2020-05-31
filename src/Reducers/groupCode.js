export const groupCode = (state = '', action) => {
  switch (action.type) {
    case 'ADD_CODE':
        return action.code
    case 'SET_CODE':
        return action.code
    default:
      return state
  }
}

export const name = (state = '', action) => {
  switch (action.type) {
    case 'ADD_NAME':
        return action.name
    default:
      return state
  }
}

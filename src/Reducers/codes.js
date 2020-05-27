export const codes = (state = [], action) => {
  switch (action.type) {
    case 'SET_CODE':
      return [action.code, ...state];
    default:
      return state
  }
}

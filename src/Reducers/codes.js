export const codes = (state = [], action) => {
  switch (action.type) {
    case 'SET_CODE':
      return [action.code, ...state];
    case 'ADD_CODE':
      if ( !state.includes(action.code)) {
        return [action.code, ...state];
      } else {
        return state
      }
    case 'GRAB_LOCAL_CODES':
      return action.codes;
    default:
      return state
  }
}

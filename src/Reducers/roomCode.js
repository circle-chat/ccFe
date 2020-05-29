export const roomCode = (state = '', action) => {
  switch (action.type) {
    case 'ADD_ROOM_CODE':
        return action.code
    default:
      return state
  }
}

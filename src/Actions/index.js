export const getCircleCode = code => ({
  type: 'SET_CODE',
  code
})

export const addNewCode = code => ({
  type: 'ADD_CODE',
  code
})

export const addName = name => ({
  type: 'ADD_NAME',
  name
})

export const addRoomCode = code => ({
  type: 'ADD_ROOM_CODE',
  code
})

export const grabLocalCodes = codes => ({
  type: 'GRAB_LOCAL_CODES',
  codes
})

export const leaveChat = () => ({
  type: 'LEAVE_CHAT',
})

export const createAction = (type, payload) => ({ type, payload });

export const randomReactKey = () => Math.floor(Math.random() * 1000000000)

export const randomGameId = (games) => {
  const number = Math.floor(Math.random() * 1000000)

  // Check if already exist
  if(games && games.find(game => game.id === number)) {
    return randomGameId()
  } else {
    return number
  }
}

export const tryParseJson = (string) => {
  let json
  try{
    json = JSON.parse(string)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch(error){
    json = null
  }

  return json
}
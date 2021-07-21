const initialState = {
    Videogames: [],
    Genres: [],
    Videogame: {}
  }

function rootReducers (state = initialState, {type, payload}){
 // eslint-disable-next-line default-case
  switch(type) {
    case "GET_VIDEOGAMES": 
      return {
        ...state,
        Videogames: payload.data
      }

      case "GET_VIDEOGAME_BY_ID": 
      return {
        ...state,
        Videogame: payload.data
      }

    case "GET_GENRES":
      return {
        ...state,
        Genres: payload.data
      }

    case "ADD_VIDEOGAME":
      return {
        ...state,
        Videogames: state.Videogames.concat(payload)
      }

    default: return state;
  }
}
 export default rootReducers;


import { ADD_FAVORITE, DELETE_FAVORITE, FILTER, ORDER } from "./actions-types.js";

const initialState = {
    myFavorites : [],
    allCharactersFav : [] 
}

const reducer = (state = initialState,  {type, payload}) =>{
    switch (type) {
        case ADD_FAVORITE:
            return {
                ...state,
                myFavorites:payload,
                allCharactersFav: payload
            }
        case DELETE_FAVORITE: 
            return {
                ...state, 
                myFavorites: payload,
            }
        case FILTER:
            if (payload === 'AllCharacters') {
                const allCharactersFavUpdate = state.allCharactersFav 
                return {
                    ...state,
                    myFavorites: allCharactersFavUpdate
                }
            } else {
                const allCharactersFavUpdate = state.allCharactersFav.filter((character) => character.gender === payload)
                return {
                    ...state,
                    myFavorites: allCharactersFavUpdate
                }
            }
            
        case ORDER: 
            // Creamos una copia para ordernar este y no al estado en si
            const allCharactersFavCopy = [...state.allCharactersFav]  
            return{ 
                ...state,
                myFavorites: 
                payload === 'A'
                ? allCharactersFavCopy.sort((a, b) => a.id - b.id)
                : allCharactersFavCopy.sort((a, b) => b.id - a.id)
                
            }
        default:
            return {...state}
    }
}
export default reducer
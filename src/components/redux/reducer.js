import { ADD_FAVORITE, DELETE_FAVORITE } from "./actions-types.js";

const initialState = {
    myFavorites : []
}
const reducer = (state = initialState,  {type, payload}) =>{
    switch (type) {
        case ADD_FAVORITE:
            return {
                ...state,
                myFavorites:[...state.myFavorites, payload]
            }
        case DELETE_FAVORITE: 
            return {
                ...state,
                myFavorites: state.myFavorites.filter((character) => character.id!== payload),
            }
        default:
            return {...state}
    }
}
export default reducer
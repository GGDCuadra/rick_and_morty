import { ADD_FAVORITE, DELETE_FAVORITE, FILTER, ORDER } from "./actions-types";
import axios from 'axios'


export const addFavorite = (character) => {
    /* return {
        type: ADD_FAVORITE,
        payload: character
    } */
    //URL de nuestro servidor
    const endpoint = 'http://localhost:3001/rickandmorty/fav';
    //retornamos una funcion que hace una peticion
    return async (dispatch) => {
        //Hace una peticion de tipo post a nuestro server
        //character es un obj que recibe de body
        //cuando hacemos un post :
        //        url    lo que queremos postear
        try {
            const {data} = await axios.post(endpoint, character)
            return dispatch({
                type: ADD_FAVORITE, 
                payload: data,
            });
        } catch (error) {
            console.log(error.message);
        }
      
         

   };
}

export const deleteFavorite = (id) => {
    const endpoint = 'http://localhost:3001/rickandmorty/fav/' + id;
    
    return async (dispatch) => {
        try {
            const {data}= await axios.delete(endpoint)
                return dispatch({
                    type: DELETE_FAVORITE,
                    payload: data,
                });
        } catch (error) {
            console.log(error.message);
        }
    };
};


export const filterCards = (gender) => {
    return{
        type: FILTER,
        payload: gender
    }
} 

export const orderCards = (order) =>{
    return {
        type: ORDER,
        payload: order
    }
}
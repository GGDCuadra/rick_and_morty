import { connect, useDispatch, useSelector } from "react-redux"
import Cards from "../Cards/Cards" 
import { filterCards, orderCards, deleteFavorite } from "../redux/actions"


const Favorites = () => {
    const myFavorites = useSelector(state => state.myFavorites)
    console.log(myFavorites);
    const dispatch = useDispatch()
    const hanldeOrder = (event)=> {
        dispatch(orderCards(event.target.value))
    }
    const handleFilter = (event) =>{
        dispatch(filterCards(event.target.value))
    }
    const handleCloseCard = (id) => {
        dispatch(deleteFavorite(id))
    }
    return (
        <div>
            <h2>FAVORITOS</h2> 
            <select onChange={hanldeOrder} >
                <option value="A">Ascendente</option>    
                <option value="D">Descendente</option>    
            </select>
            <select onChange={handleFilter}>
                <option value="Male">Male</option>    
                <option value="Female">Female</option>    
                <option value="Genderless">Genderless</option>    
                <option value="unknown">unknown</option>
                <option value='AllCharacters'>All Characters</option>    
            </select> 

            {

                    <Cards
                     characters={myFavorites}
                     onClose={()=>handleCloseCard(myFavorites.includes('id'))}
                    />
                 
            }
        </div>
    )
}

export default Favorites
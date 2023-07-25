import { connect } from "react-redux"
import Cards from "../Cards/Cards" 

const Favorites = ({myFavorites}) => {
    console.log(myFavorites);
    return (
        <div>
            <h2>FAVORITOS</h2>   
            {
                
                <Cards characters={myFavorites} /> 
            }
            
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        myFavorites: state.myFavorites
    }
}
export default connect(mapStateToProps, null)(Favorites)
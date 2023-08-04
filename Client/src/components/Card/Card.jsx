import { connect } from 'react-redux';
import style from './Card.module.css'
import { Link } from 'react-router-dom';
import { addFavorite, deleteFavorite } from '../redux/actions';
import { useState, useEffect } from 'react';



function Card({ id, name, species, gender, image, onClose, deleteFavorite, addFavorite, myFavorites}) {

   const [isFav, setIsFav] = useState(false)

   const handleFavorite = () => {
      if (isFav) {
         setIsFav(false)
         deleteFavorite(id)
      } else {
         setIsFav(true)
         addFavorite({ id, name, species, gender, image}) 
      }
   }
   useEffect(() => {
      myFavorites.forEach((fav) => {
         if (fav.id === id) {
            setIsFav(true);
         }
      });
   }, [myFavorites]);

   return (

      <div className={style.cardBody}> 
         <div className={style.btnContainer} >
            <button className={style.btnFav} onClick={handleFavorite}>{isFav ? '❤️':'🤍' }</button>
          
            <button className={style.btnFav} onClick={() => onClose(id)}>❌</button>
         </div>
         
         <img src={image} alt={name} />

         <Link className={style.link} to={`/detail/${id}`}>
            <h2 className={style.name}>{name}</h2>
         </Link>
         <div>
            <h2>Species: {species}</h2>
            <h2>Gender: {gender}</h2>
         </div>
         

      </div>
   );
}
 
const mapDispatchToProps = (dispatch) => {
   return {
      addFavorite: (character) => dispatch(addFavorite(character)),
      deleteFavorite: (id) => dispatch(deleteFavorite(id))
   } 
}
const mapStateToProps = (state) => {
   return { myFavorites: state.myFavorites}
}
export default connect(mapStateToProps, mapDispatchToProps)(Card)
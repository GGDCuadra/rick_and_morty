import Card from '../Card/Card';
import style from './Cards.module.css'
export default function Cards(props) {
   const {characters, onClose} = props
  return (
   <div className={style.cardsContainer}>
      {
         characters.map(({id, name, species, gender, image}) =>{
            return (
               <Card 
               key={id}//react necesita una key para saber que esta renderizando otro objeto 
               id={id}
               name = {name}
               species = {species}
               gender = {gender}
               image = {image}
               onClose = {onClose}     
            />
            )  
         })
      } 
   </div>
  )
   
}

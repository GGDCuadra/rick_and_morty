
import { useState } from "react";
import style from "./SearchBar.module.css"
export default function SearchBar({ onSearch }) {
   const [id, setId] = useState('')

   const handleChange = (event) => {
      //? Por qué en este caso no usamos el [...id]?
      //! Al tratarse de un input, yo no quiero guardar el valor, que si despues borra el valor y escribe otra cosa, al tener un valor almacenado se va a concatenar
      setId(event.target.value)
   }



   //? Por que los eventos van hacia arriba?
   //! Basicamente al no estar definido onSearch en este archivo, el programa va a ir preguntando hacia arriba en la jerarquia de padres e hijos, hasta encontrar quien tiene definido la funcion y ahi lo va a ejecutar
   //--------------------
   //?Por que el estado local "id" debe ser el valor de input?
   //! Eso es asi, para que siempre esten relacionados y no brindemos un valor equiocado al usuario, de esta manera si por alguna cosa se cambiara el estado, el valor del input tambien cambiara y viceversa 
   return (
      <div className={style.searchContainer}>
          
         <input type='search' onChange={handleChange} value={id}/>
         <button onClick={()=>{onSearch(id); setId("")}}>Agregar</button>
          
      </div>
   );
}

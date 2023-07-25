import React, {  useEffect, useState } from 'react'; 
import './App.css';
import Cards from './components/Cards/Cards.jsx';
import Nav from "./components/Nav/Nav.jsx"
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import Favorites from './components/Favorites/Favorites';
import axios from 'axios';
import { Routes, Route, useLocation, useNavigate} from 'react-router-dom'



function App() {
   const [characters, setCharacters] = useState([])
   const { pathname } = useLocation()
   const navigate = useNavigate();
   const  [access, setAccess] = useState(false);
   const EMAIL = '';
   const PASSWORD = ''

   const login = (userData) => {
      if(userData.password === PASSWORD && userData.email === EMAIL){
         setAccess(true)
         navigate('/home')
      }
      
   }
   useEffect(() => {
      !access && navigate('/');
   },[access]);
   //? Por qué destructuring con corchetes? 
   //! Es porque retorna un array y no un objeto
   //* chacracters es la variable que nos permite acceder al estado actual y setCharacters es la funcion que nos permite actualizar el estado
   //!El id es el value del input
   const onSearch = (id) => {
      axios(`https://rickandmortyapi.com/api/character/${id}`)
      //!Cuadno axios obtiene una respuesta le hacemos destructuring
      //? Porque cuadno axios hace una llamada a la api retorna un objeto muy grande, y en su propiedad data guarda la respuesta de la api
      .then(({ data }) => {
         // Verificamos que exista un valor
         if (data.name) {
            const isExistCharacter = characters.some((char) => char.id === data.id)
            //Aca realizamos una cb que primero obtiene todo mi estado localm luego le hace una copia con el ... y luego le añade data 
            if(!isExistCharacter){
               setCharacters((oldChars) => [...oldChars, data]);
            } else {
               alert ("Ese personaje con el id introducido, ya esta en pantalla")
            }
            
         } else {
            alert('¡No hay personajes con este ID!');
         }
      });
   }
   const onClose = (id) =>{
      //*Creamos una variable para almacenar el el resultado
      //* nos quedamos con los ids diferentes a los de del id pasado por parametro
      //* ya que a ese queremos eliminarlo 
      const characterFiltered = characters.filter(character => character.id !== Number(id))
      setCharacters(characterFiltered)
   }
   const onRandom = () => {
      axios.get("https://rickandmortyapi.com/api/character/")
        .then((response) => {
          const data = response.data;
          if (data && data.results) {
            const randomIndex = Math.floor(Math.random() * data.results.length);
            const randomCharacter = data.results[randomIndex];
            const isExistCharacter = characters.some((char) => char.id === randomCharacter.id);
            if (!isExistCharacter) {
              setCharacters((oldChars) => [...oldChars, randomCharacter]);
            } else {
              // Si ya existe el personaje, vuelva a llamar a la función para obtener otro aleatorio
              onRandom();
            }
          }
        })
        .catch((error) => {
          console.log("Error al obtener los datos:", error);
        });
    };
   return (
         //?Por qué hay que pasarle como propiedad onSearch?
         //! Debemos hacerlo ya App no puede pasarle a SearchBar directamente las props, asi que Nav le va a pasar a Searchbar para que pueda usarlo
         //*Así que podemos concluir que las props se pasan de padres a hijos
         //!Ademas debemos pasarle onClose a Cards
      <div className='App'>
         {
            pathname !== '/'&& <Nav onSearch={onSearch} onRandom ={onRandom}access={access} setAccess={setAccess}/> 
         }
         <Routes>
            <Route path='/' element={<Form login={login}/>}/>
            <Route path='/home' element={ <Cards characters={characters} onClose={onClose}/>}></Route>
            <Route path='/about' element={<About/>}></Route>
            <Route path='/detail/:id' element={<Detail/>}></Route>
            <Route path='/favorites' element={<Favorites/>}/>
         </Routes>
        
      </div>
   );
}

export default App;
 
/* Imports*/
import axios from 'axios';
import React, {  useEffect, useState } from 'react'; 
import './App.css';
import Cards from './components/Cards/Cards.jsx';
import Nav from "./components/Nav/Nav.jsx"
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import Favorites from './components/Favorites/Favorites';
import { Routes, Route, useLocation, useNavigate} from 'react-router-dom'


const URL = 'http://localhost:3001/rickandmorty/login/';


function App() {
   const [characters, setCharacters] = useState([])
   const { pathname } = useLocation()
   const navigate = useNavigate();
   const  [access, setAccess] = useState(false);

   const login= async(userData) => {
      try {
         const { email, password } = userData;
         const {data} = await axios(URL + `?email=${email}&password=${password}`)
         
         const { access } = data;

         setAccess(access);
         access && navigate('/home');
      } catch (error) {
         console.error(error.message);
      }
      //url del backend
      //peticion a nuestro back, concatenando la query
      
   }

   useEffect(() => {
      !access && navigate('/');
   },[access, navigate]);

   const onSearch = async (id) => {
      try {

         const {data} = await axios(`http://localhost:3001/rickandmorty/character/${id}`)
         // Verificamos que exista un valor
         if (data.name) {
            const isExistCharacter = characters.some((char) => char.id === data.id)
            //Aca realizamos una cb que primero obtiene todo mi estado localm luego le hace una copia con el ... y luego le añade data 
            if(!isExistCharacter){
               setCharacters((oldChars) => [...oldChars, data]);
            } else {
               alert ("Ese personaje con el id introducido, ya esta en pantalla")
            }
         }
      } catch (error) {
          return alert('¡No hay personajes con este ID!');
      }
      
            
          
   }
   const onClose = (id) =>{
      //*Creamos una variable para almacenar el el resultado
      //* nos quedamos con los ids diferentes a los de del id pasado por parametro
      //* ya que a ese queremos eliminarlo 
      const characterFiltered = characters.filter(character => character.id !== id)
      setCharacters(characterFiltered)
   }
   const onRandom = () => {
      const id = Math.floor(Math.random() * 826);
      axios(`http://localhost:3001/rickandmorty/character/`+id)
        .then(({data}) => {
          if (data) {
            const isExistCharacter = characters.some((char) => char.id === data.id);
            if (!isExistCharacter) {
              setCharacters((oldChars) => [...oldChars, data]);
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
            <Route path='/about' element={ <About /> }> </Route>
            <Route path='/detail/:id' element={ <Detail/> }></Route>
            <Route path='/favorites' element={< Favorites/> }/>
         </Routes>
        
      </div>
   );
}

export default App;
 
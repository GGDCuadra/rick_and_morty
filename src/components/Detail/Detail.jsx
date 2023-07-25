import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import style from './Detail.module.css'

const Detail = () => {
    const [character, setCharacter] = useState({})
    //* useParamas sacara el id del que definimos en detail:id
    const { id } = useParams()
    //* useEffect simula los 3 estados de los componentes
    useEffect(() => {
        axios(`https://rickandmortyapi.com/api/character/${id}`)
            .then(({ data }) => {
                if (data.name) {
                    setCharacter(data)
                } else {
                    alert("No hay personaje con ese ID")
                }
            });
        return setCharacter({})
    }, [id])

    return (
        <div>
            {
                character ? (
                    <div>
                        <div className={style.containerCard}>
                            <div className={style.containerInfo}> 
                                <h1>{character.name}</h1>
                                <p>{`STATUS: ${character.status}`}</p>
                                <p>{`GENDER: ${character.gender}`}</p>
                                <p>{`SPECIE: ${character.species}`}</p>
                                <p>{`ORIGIN: ${character.origin?.name}`}</p>
                            </div>

                            <img className={style.img} src={character.image} alt={character.name} />
                        </div>

                    </div>
                ) : null
            }
        </div>

    )
}

export default Detail;
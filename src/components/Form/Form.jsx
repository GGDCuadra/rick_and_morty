import { useState } from "react"
import validation from "../Validation/Validation.js"
import style from './Form.module.css'

const Form = ({ login }) => {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const handleInputChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        });
        setErrors(validation({
            ...userData,
            [event.target.name]: event.target.value,

        }))

    }
    const handleSubmit = (event) => {
        event.preventDefault()
        login(userData)
    }


    return (
        <div className={style.containerAll}>
            <form onSubmit={handleSubmit} className={style.containerLogin} >
                <div className={style.containerh2}>
                    <h2 className={style.tituloLogin}> LOGIN</h2>
                </div>
                <div className={style.containerEmail}>
                    <label className={style.labelLogin} htmlFor="email">User email:</label>
                    <input
                        className={style.inputLogin}
                        type="email"
                        name="email"
                        id="email"
                        value={userData.email}
                        onChange={handleInputChange} />

                    {
                        errors.email ? (
                            <span className={style.spanError}>{errors.email}</span>
                        ) : null
                    }
                </div>
                <label className={style.labelLogin} htmlFor="password">Password:</label>
                <input
                    className={style.inputLogin}
                    type="password"
                    name="password"
                    id="password"
                    value={userData.password}
                    onChange={handleInputChange}
                />

                {
                    errors.password ? (
                        <span>{errors.password}</span>
                    ) : null
                }


                <button className={style.btnLogin} type="submit" >SUBMIT</button>
            </form>
        </div>

    )
}

export default Form 
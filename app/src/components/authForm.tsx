import { useState } from "react"
import { motion } from "framer-motion"

export default function AuthForm() {
    const [isLoginMode, setIsLoginMode] = useState<boolean>(true)
    const [userLogin, setUserLogin] = useState<string>('')
    const [userPassword, setUserPassword] = useState<string>('')
    const [userEmail, setUserEmail] = useState<string>('')
    const [userConfirmPassword, setUserConfirmPassword] = useState<string>('')

    const modeSwitch = () => {
        setIsLoginMode((prevMode) => !prevMode)
    }

    const authHandler = () => {
        console.log(userLogin, userPassword, userEmail, userConfirmPassword)
    }

    return <form className="auth">
        <h2 className="auth--heading">{isLoginMode ? "Вход" : "Регистрация"}</h2>
        <div className="auth--inputs">
            {isLoginMode 
                ? (<>
                    <input
                        className="auth--inputs__input"
                        type="text"
                        placeholder="Логин"
                        onChange={(event) => setUserLogin(event.target.value)}  
                    />
                    <input
                        className="auth--inputs__input"
                        type="password"
                        placeholder="Пароль"
                        onChange={(event) => setUserPassword(event.target.value)}
                    />
                </>)
                : (<>
                    <input
                        className="auth--inputs__input"
                        type="text"
                        placeholder="Логин"
                        onChange={(event) => setUserLogin(event.target.value)}  
                    />
                    <input
                        className="auth--inputs__input"
                        type="email"
                        placeholder="Почта"
                        onChange={(event) => setUserEmail(event.target.value)}
                    />
                    <input
                        className="auth--inputs__input"
                        type="password"
                        placeholder="Пароль"
                        onChange={(event) => setUserPassword(event.target.value)}  
                    />
                    <input
                        className="auth--inputs__input"
                        type="password"
                        placeholder="Подтвердите пароль"
                        onChange={(event) => setUserConfirmPassword(event.target.value)}
                    />
                </>)
            }
        </div>
        <div className="auth--lower">
            <motion.button 
                type="button"
                className="auth--lower__button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={authHandler}
            >
                {isLoginMode ? "Войти" : "Зарегистрироваться"}
            </motion.button>
            <p className="auth--lower__text">{
                isLoginMode 
                    ? <>ещё не зарегистрированы?<br/><span onClick={modeSwitch}>создать аккаунт</span></>
                    : <>уже есть аккаунт?<br/><span onClick={modeSwitch}>войти в систему</span></>
            }</p>
        </div>
    </form>
}
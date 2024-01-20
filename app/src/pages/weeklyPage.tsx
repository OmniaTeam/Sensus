import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"

import { temperatureWeekly } from "../data/temperatureWeeklyInfo"
import { pressureWeekly } from "../data/pressureWeeklyInfo"
import { humidityWeekly } from "../data/humidityWeeeklyInfo"
import { windWeekly } from "../data/windWeeklyInfo"

import Modal from "../components/modal"
import AuthForm from "../components/authForm"
import Chart from "../components/chartComponent"

import menu from '../assets/menu.svg'
import WindCard from "../components/windCard"

export default function WeeklyPage() {
    const navigateTo = useNavigate()

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false)

    return (<>
        <main className="main">
            <section className="weekly">
                <div className="weekly--container">
                    <div className="heading" style={{
                        alignItems: "flex-start"
                    }}>
                        <div className="heading--info">
                            <h2 className="heading--info__title">Прогноз на 7 дней</h2>
                        </div>
                        <motion.div 
                            className="heading--menu" 
                            onClick={() => (setIsMenuOpen(true))}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <img src={menu} alt="" />
                        </motion.div>
                    </div>
                    <div className="weekly--container__content">
                        <div className="temperature-block">
                            <h2 className="temperature-block--title">Температура <span>C°</span></h2>
                            <div className="temperature-blovk--container">
                                <Chart
                                    labels={temperatureWeekly.map((element) => element.day)}
                                    values={temperatureWeekly.map((element) => element.temperature)}
                                />
                            </div>
                        </div>
                        <div className="wind-block">
                            <h2 className="wind-block--title">Ветер <span>м/с</span></h2>
                            <div className="wind-block--container">
                                {windWeekly.map((value, index) => 
                                    <WindCard 
                                        key={index}
                                        windDirection={value.direction}
                                        wind={value.wind}
                                        hour={value.hour}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="pressure-block">
                            <h2 className="pressure-block--title">Давление <span>мм.рт.ст.</span></h2>
                            <div className="pressure-block--container">
                                <Chart
                                    labels={pressureWeekly.map((element) => element.label)}
                                    values={pressureWeekly.map((element) => element.value)}
                                />
                            </div>
                        </div>
                        <div className="humidity-block">
                            <h2 className="humidity-block--title">Влажность <span>%</span></h2>
                            <div className="humidity-block--container">
                                <Chart
                                    labels={humidityWeekly.map((element) => element.label)}
                                    values={humidityWeekly.map((element) => element.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        <AnimatePresence>
            {isMenuOpen && (                
                <Modal
                    onClose={() => setIsMenuOpen(false)}
                >
                    <nav className="nav-menu">
                        <motion.button
                            type="button"
                            className="nav-menu--button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {setIsAuthModalOpen(true); setIsMenuOpen(false)}}
                        >Войти / Зарегистрироваться</motion.button>
                        <motion.button 
                            type="button"
                            className="nav-menu--button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => navigateTo('/')}
                        >Домашняя страница</motion.button>
                    </nav>
                </Modal>
            )}
        </AnimatePresence>
        <AnimatePresence>
            {isAuthModalOpen && (                   
                <Modal
                    onClose={() => setIsAuthModalOpen(false)}
                >
                    <AuthForm/>
                </Modal>
            )}
        </AnimatePresence>
    </>)
}
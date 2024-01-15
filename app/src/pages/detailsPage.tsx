import { useEffect, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { ECircleType } from "../models/ECircleType";
import { useNavigate } from "react-router-dom";

import TemperatureCircle from "../components/temperatureCircle";
import Modal from "../components/modal";
import Metric from "../components/metric";
import AuthForm from "../components/authForm";

import menu from '../assets/menu.svg'
import humidity from '../assets/humidity.svg'
import wind from '../assets/wind.svg'
import pressure from '../assets/pressure.svg'
import exportIcon from '../assets/export.svg'

export default function DetailsPage() {
    const currentDate = new Date()
    const controls = useAnimation();
    const navigator = useNavigate()

    const day: number = currentDate.getDate();
    const month: number = currentDate.getMonth() + 1;
    const year: number = currentDate.getFullYear();

    const formattedDay: string = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [isReportOpen, setIsReportOpen] = useState<boolean>(false)
    const [isExportMenuOpen, setIsExportMenuOpen] = useState<boolean>(false) 
    const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false)

    const [userReport, setUserReport] = useState<string>('')

    useEffect(() => {
        controls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.8 },
        });
    }, [controls]);

    return (<>
        <motion.main 
            className="main"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
        >
            <section className="details">
                <div className="details--container">
                    <div className="heading">
                        <div className="heading--info">
                            <h2 className="heading--info__title">Липецк</h2>
                            <p className="heading--info__date">{formattedDay}.{formattedMonth}.{year}</p>
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
                    <div className="details--container__content">
                        <div className="summary">
                            <div className="summary--heading">
                                <h2 className="summary--heading__title">Краткая сводка</h2>
                                <motion.button 
                                    className="summary--heading__icon"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <img src={exportIcon} alt="" />
                                </motion.button>
                            </div>
                            <div className="summary--info">
                                <TemperatureCircle
                                    circletType={ECircleType.shortCircle}
                                    temperature={-23}
                                />
                                <div className="summary--info__metrics">
                                    <Metric 
                                        svgElement={
                                            <img src={humidity} alt=""/>
                                        }
                                        value={'85%'}
                                    />
                                    <Metric 
                                        svgElement={
                                            <img src={wind} alt=""/>
                                        }
                                        value={'9 м/c'}
                                    />
                                    <Metric 
                                        svgElement={
                                            <img src={pressure} alt=""/>
                                        }
                                        value={'763mmHg'}
                                    />
                                </div>
                            </div>
                            <motion.button 
                                className="summary--button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsReportOpen(true)}
                            >
                                Не согласен? Составь отчёт
                            </motion.button>
                        </div>
                    </div>
                </div>
            </section>
        </motion.main>
        <AnimatePresence>
            {isMenuOpen && (                
                <Modal
                    onClose={() => setIsMenuOpen(false)}
                >
                    <nav className="nav-menu">
                        <motion.button 
                            className="nav-menu--button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {setIsAuthModalOpen(true); setIsMenuOpen(false)}}
                        >Войти / Зарегистрироваться</motion.button>
                        <motion.button 
                            className="nav-menu--button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => navigator('/')}
                        >Домашняя страница</motion.button>
                    </nav>
                </Modal>
            )}
        </AnimatePresence>
        <AnimatePresence>
            {isExportMenuOpen && (                
                <Modal
                    onClose={() => setIsExportMenuOpen(false)}
                >
                    <></>
                </Modal>
            )}
        </AnimatePresence>
        <AnimatePresence>
            {isReportOpen && (                
                <Modal
                    onClose={() => setIsReportOpen(false)}
                >
                    <form className="report-form">
                        <h2 className="report-form--heading">Отчёт</h2>
                        <div className="report-form--input">
                            <p className="report-form--input__text">Как вы ощущаете температуру?</p>
                            <input 
                                type="text" 
                                className="report-form--input__place"
                                placeholder="-23°"
                                onChange={(event) => setUserReport(event.target.value)}
                            />
                        </div>
                        <motion.button 
                            className="report-form--button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => console.log(userReport)}
                        >Составить отчёт</motion.button>
                    </form>
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
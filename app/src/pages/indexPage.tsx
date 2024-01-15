import { useState } from 'react'
import { ECircleType } from '../models/ECircleType';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getFormattedCurrentData } from '../utils/dataUtils';

import AuthForm from '../components/authForm';
import TemperatureCircle from '../components/temperatureCircle';
import Metric from '../components/metric';
import Modal from '../components/modal'

import humidity from '../assets/humidity.svg'
import wind from '../assets/wind.svg'
import pressure from '../assets/pressure.svg'

export default function IndexPage() {
    const navigator = useNavigate()

    const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false)

    return (<>
        <main className="main">
            <section className="hero">
                <div className="container">
                    <div className="heading">
                        <div className="heading--info">
                            <h2 className="heading--info__title">Липецк</h2>
                            <p className="heading--info__date">{getFormattedCurrentData()}</p>
                        </div>
                        <motion.button 
                            className="heading--button" 
                            onClick={() => (setIsAuthModalOpen(true))}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            Войти
                        </motion.button>
                    </div>
                    <div className="temperature">
                        <TemperatureCircle
                            circletType={ECircleType.primaryCircle}
                            temperature={-23}
                            description={'Значительная обл.'}
                        />
                        <div className="metrics">
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
                        <div className="hourly">
                            <TemperatureCircle
                                circletType={ECircleType.secondaryCircle}
                                temperature={-23}
                                hour={'Сейчас'}
                            />
                            <TemperatureCircle
                                circletType={ECircleType.secondaryCircle}
                                temperature={-25}
                                hour={'14:00'}
                            />
                            <TemperatureCircle
                                circletType={ECircleType.secondaryCircle}
                                temperature={-22}
                                hour={'16:00'}
                            />
                            <TemperatureCircle
                                circletType={ECircleType.secondaryCircle}
                                temperature={-27}
                                hour={'18:00'}
                            />
                        </div>
                    </div>
                    <div className="buttons">
                        <motion.button
                            className="buttons--button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => navigator('/details')}
                        >
                            Подробнее
                        </motion.button>
                        <motion.button
                            className="buttons--button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            Следующие 7 дней
                        </motion.button>
                    </div>
                </div>
            </section>
        </main>
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
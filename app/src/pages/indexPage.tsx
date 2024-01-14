import { useState, useEffect } from 'react'
import { ECircleType } from '../models/ECircleType';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

import AuthForm from '../components/authForm';
import TemperatureCircle from '../components/temperatureCircle';
import Metric from '../components/metric';
import Modal from '../components/modal'

import humidity from '../assets/humidity.svg'
import wind from '../assets/wind.svg'
import pressure from '../assets/pressure.svg'

export default function IndexPage() {
    const currentDate = new Date()
    const controls = useAnimation();

    const day: number = currentDate.getDate();
    const month: number = currentDate.getMonth() + 1;
    const year: number = currentDate.getFullYear();

    const formattedDay: string = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;

    const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false)

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
            <section className="hero">
                <div className="container">
                    <div className="heading">
                        <div className="heading--info">
                            <h2 className="heading--info__title">Липецк</h2>
                            <p className="heading--info__date">{formattedDay}.{formattedMonth}.{year}</p>
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
                                description={''}
                                hour={'Сейчас'}
                            />
                            <TemperatureCircle
                                circletType={ECircleType.secondaryCircle}
                                temperature={-25}
                                description={''}
                                hour={'14:00'}
                            />
                            <TemperatureCircle
                                circletType={ECircleType.secondaryCircle}
                                temperature={-22}
                                description={''}
                                hour={'16:00'}
                            />
                            <TemperatureCircle
                                circletType={ECircleType.secondaryCircle}
                                temperature={-27}
                                description={''}
                                hour={'18:00'}
                            />
                        </div>
                    </div>
                    <div className="buttons">
                        <motion.button
                            className="buttons--button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
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
        </motion.main>
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
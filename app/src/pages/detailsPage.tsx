import { useEffect, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { ECircleType } from "../models/ECircleType";

import menu from '../assets/menu.svg'
import TemperatureCircle from "../components/temperatureCircle";
import Modal from "../components/modal";

export default function DetailsPage() {
    const currentDate = new Date()
    const controls = useAnimation();

    const day: number = currentDate.getDate();
    const month: number = currentDate.getMonth() + 1;
    const year: number = currentDate.getFullYear();

    const formattedDay: string = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [isReportOpen, setIsReportOpen] = useState<boolean>(false)
    const [isExportMenuOpen, setIsExportMenuOpen] = useState<boolean>(false) 

    useEffect(() => {
        controls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.8 },
        });
    }, [controls]);

    return (<>
        <main className="main">
            <section className="details">
                <div className="container">
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
                    <div className="content">
                        <div className="summary">
                            <div className="summary--info">
                                <TemperatureCircle
                                    circletType={ECircleType.shortCircle}
                                    temperature={-23}
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
                    <></>
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
                    <></>
                </Modal>
            )}
        </AnimatePresence>
    </>)
}
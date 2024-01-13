import { useState } from 'react'

import Modal from '../components/modal'

export default function IndexPage() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    return (<>
        <main className="main">
            <section className="hero">
                <div className="container">
                    <h1>Hello</h1>
                </div>
            </section>
        </main>
        {isModalOpen && 
            (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <div className="modal--container">
                        <h3 className="modal--container__title">Modal</h3>
                    </div>
                </Modal>
            )
        }
    </>)
}
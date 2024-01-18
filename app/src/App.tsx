import React from "react";
import ReactDOM from "react-dom/client";

import './global.scss';
import './styles/index.scss';
import './styles/circle.scss';
import './styles/metric.scss';
import './styles/authForm.scss';
import './styles/modal.scss';
import './styles/wind.scss';
import 'swiper/css';

import { BrowserRouter, Route, Routes } from "react-router-dom";

import IndexPage from "./pages/indexPage";
import DetailsPage from "./pages/detailsPage";
import WeeklyPage from "./pages/weeklyPage";

navigator.serviceWorker.register('service-worker.js');

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

const App = () => {
    return <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" index={true} element={<IndexPage/>}/>
                <Route path="/details" element={<DetailsPage/>}/>
                <Route path="/weekly" element={<WeeklyPage/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
};

root.render(<App/>);
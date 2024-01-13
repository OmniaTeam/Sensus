import React from "react";
import ReactDOM from "react-dom/client";

import './global.scss'
import './styles/index.scss'

import { BrowserRouter, Route, Routes } from "react-router-dom";

import IndexPage from "./pages/indexPage";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

const App = () => {
    return <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" index={true} element={<IndexPage/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
};

root.render(<App/>);